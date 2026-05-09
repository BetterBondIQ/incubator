-- ═══════════════════════════════════════════
-- BetterBond IQ — Migration 003
-- 1. Fix leaderboard RLS (allow all authenticated users to read users table)
-- 2. increment_points RPC (atomic point awarding)
-- 3. update_login_streak RPC (daily login + streak bonuses)
-- 4. check_module_complete RPC (auto-award module completion bonus)
-- ═══════════════════════════════════════════

-- ── 1. FIX LEADERBOARD RLS ──────────────────
-- Original policy only returned the caller's own row, breaking the leaderboard.
-- All authenticated users need to read all consultant rows.

DROP POLICY IF EXISTS "Users: read own" ON users;

CREATE POLICY "Users: read authenticated"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

-- ── 2. increment_points RPC ─────────────────
-- Called client-side after lesson completion or quiz pass.
-- Atomically increments total_points and monthly_points.
-- SECURITY DEFINER so it can bypass RLS, but verifies caller identity.

CREATE OR REPLACE FUNCTION increment_points(p_user_id uuid, p_amount integer)
RETURNS void AS $$
BEGIN
  IF auth.uid() IS NULL OR auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  IF p_amount < 0 OR p_amount > 500 THEN
    RAISE EXCEPTION 'Invalid points amount: %', p_amount;
  END IF;

  UPDATE users
  SET
    total_points   = total_points   + p_amount,
    monthly_points = monthly_points + p_amount
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 3. update_login_streak RPC ──────────────
-- Call once per session load. Idempotent — safe to call multiple times per day.
-- Awards +5 daily login points when a new day is detected.
-- Awards +75 streak bonus at 7-day intervals, +150 at 14-day intervals.
-- Returns: { points_awarded, streak }

CREATE OR REPLACE FUNCTION update_login_streak(p_user_id uuid)
RETURNS jsonb AS $$
DECLARE
  v_user              users%ROWTYPE;
  v_today             date := CURRENT_DATE;
  v_new_streak        integer;
  v_new_streak_best   integer;
  v_points_awarded    integer := 0;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT * INTO v_user FROM users WHERE id = p_user_id;

  -- Already logged in today — nothing to do
  IF v_user.last_login_date = v_today THEN
    RETURN jsonb_build_object('points_awarded', 0, 'streak', v_user.streak_current);
  END IF;

  -- Calculate new streak
  IF v_user.last_login_date = v_today - INTERVAL '1 day' THEN
    v_new_streak := v_user.streak_current + 1;
  ELSE
    v_new_streak := 1;  -- streak broken or first login
  END IF;

  v_new_streak_best := GREATEST(v_new_streak, COALESCE(v_user.streak_best, 0));

  -- Daily login points
  v_points_awarded := 5;

  -- Streak milestone bonuses (14-day takes priority over 7-day)
  IF v_new_streak % 14 = 0 THEN
    v_points_awarded := v_points_awarded + 150;
  ELSIF v_new_streak % 7 = 0 THEN
    v_points_awarded := v_points_awarded + 75;
  END IF;

  -- Persist streak + points to users table
  UPDATE users
  SET
    last_login_date = v_today,
    streak_current  = v_new_streak,
    streak_best     = v_new_streak_best,
    total_points    = total_points   + v_points_awarded,
    monthly_points  = monthly_points + v_points_awarded
  WHERE id = p_user_id;

  -- Log point event
  INSERT INTO point_events (user_id, event_type, points)
  VALUES (p_user_id, 'login', v_points_awarded);

  RETURN jsonb_build_object('points_awarded', v_points_awarded, 'streak', v_new_streak);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 4. check_module_complete RPC ─────────────
-- Call after every lesson completion.
-- Checks if ALL lessons in the module are now done.
-- If so, inserts a module_complete progress record and awards +50 pts.
-- Returns: { complete, newly_complete, points_awarded }

CREATE OR REPLACE FUNCTION check_module_complete(p_user_id uuid, p_module_id uuid)
RETURNS jsonb AS $$
DECLARE
  v_total_lessons     integer;
  v_completed_lessons integer;
  v_bonus_points      integer := 50;
  v_rows_inserted     integer;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT COUNT(*) INTO v_total_lessons
  FROM lessons WHERE module_id = p_module_id;

  SELECT COUNT(*) INTO v_completed_lessons
  FROM user_progress
  WHERE user_id = p_user_id
    AND module_id = p_module_id
    AND type = 'lesson_complete';

  -- Not all lessons done yet
  IF v_total_lessons = 0 OR v_completed_lessons < v_total_lessons THEN
    RETURN jsonb_build_object('complete', false, 'newly_complete', false, 'points_awarded', 0);
  END IF;

  -- Try to mark module complete (ON CONFLICT = already done before)
  INSERT INTO user_progress (user_id, module_id, type, points_awarded)
  VALUES (p_user_id, p_module_id, 'module_complete', v_bonus_points)
  ON CONFLICT (user_id, module_id, type) DO NOTHING;

  GET DIAGNOSTICS v_rows_inserted = ROW_COUNT;

  IF v_rows_inserted > 0 THEN
    -- First completion — award bonus points
    INSERT INTO point_events (user_id, event_type, points, reference_id)
    VALUES (p_user_id, 'module_complete', v_bonus_points, p_module_id);

    UPDATE users
    SET
      total_points   = total_points   + v_bonus_points,
      monthly_points = monthly_points + v_bonus_points
    WHERE id = p_user_id;

    RETURN jsonb_build_object('complete', true, 'newly_complete', true, 'points_awarded', v_bonus_points);
  END IF;

  -- Module was already marked complete previously
  RETURN jsonb_build_object('complete', true, 'newly_complete', false, 'points_awarded', 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
