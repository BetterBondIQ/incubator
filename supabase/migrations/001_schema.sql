-- ═══════════════════════════════════════════
-- BetterBond IQ — Database Schema v1.0
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- ── TEAMS ──
CREATE TABLE IF NOT EXISTS teams (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ── USERS (extends auth.users) ──
CREATE TABLE IF NOT EXISTS users (
  id               uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name        text,
  email            text,
  team_id          uuid REFERENCES teams(id),
  role             text NOT NULL DEFAULT 'consultant' CHECK (role IN ('consultant','admin','manager')),
  total_points     integer NOT NULL DEFAULT 0,
  monthly_points   integer NOT NULL DEFAULT 0,
  streak_current   integer NOT NULL DEFAULT 0,
  streak_best      integer NOT NULL DEFAULT 0,
  last_login_date  date,
  created_at       timestamptz DEFAULT now()
);

-- ── MODULES ──
CREATE TABLE IF NOT EXISTS modules (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title             text NOT NULL,
  slug              text UNIQUE NOT NULL,
  description       text,
  icon              text,
  category          text NOT NULL DEFAULT 'core' CHECK (category IN ('core','insurance','competitive','special')),
  sort_order        integer NOT NULL DEFAULT 0,
  is_active         boolean NOT NULL DEFAULT true,
  points_completion integer NOT NULL DEFAULT 50,
  agent_benefits    text[],
  buyer_benefits    text[],
  created_at        timestamptz DEFAULT now()
);

-- ── LESSONS ──
CREATE TABLE IF NOT EXISTS lessons (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id      uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title          text NOT NULL,
  content_agent  jsonb,
  content_buyer  jsonb,
  key_points     text[],
  sort_order     integer NOT NULL DEFAULT 0,
  points_value   integer NOT NULL DEFAULT 20,
  created_at     timestamptz DEFAULT now()
);

-- ── QUIZ QUESTIONS ──
CREATE TABLE IF NOT EXISTS quiz_questions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id         uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  question          text NOT NULL,
  options           jsonb NOT NULL,
  correct_option_id text NOT NULL,
  explanation       text,
  sort_order        integer NOT NULL DEFAULT 0,
  created_at        timestamptz DEFAULT now()
);

-- ── USER PROGRESS ──
CREATE TABLE IF NOT EXISTS user_progress (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id      uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  lesson_id      uuid REFERENCES lessons(id) ON DELETE CASCADE,
  type           text NOT NULL CHECK (type IN ('lesson_complete','quiz_pass','quiz_perfect','module_complete')),
  score          integer,
  points_awarded integer NOT NULL DEFAULT 0,
  completed_at   timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id, type),
  UNIQUE(user_id, module_id, type)
);

-- ── POINT EVENTS (immutable log) ──
CREATE TABLE IF NOT EXISTS point_events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type   text NOT NULL,
  points       integer NOT NULL,
  reference_id uuid,
  created_at   timestamptz DEFAULT now()
);

-- ═══════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════

ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules        ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons        ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_events   ENABLE ROW LEVEL SECURITY;

-- Users: read own row + update own row; admins see all
CREATE POLICY "Users: read own"   ON users FOR SELECT USING (auth.uid() = id OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Users: update own" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users: insert own" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Modules: everyone authenticated can read active modules
CREATE POLICY "Modules: read active" ON modules FOR SELECT USING (is_active = true OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Modules: admin write" ON modules FOR ALL USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

-- Lessons: everyone authenticated can read
CREATE POLICY "Lessons: read all" ON lessons FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Lessons: admin write" ON lessons FOR ALL USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

-- Quiz questions: everyone authenticated can read
CREATE POLICY "Quiz: read all" ON quiz_questions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Quiz: admin write" ON quiz_questions FOR ALL USING ((SELECT role FROM users WHERE id = auth.uid()) = 'admin');

-- User progress: own rows only
CREATE POLICY "Progress: own" ON user_progress FOR ALL USING (auth.uid() = user_id);

-- Point events: own rows only (insert via edge function)
CREATE POLICY "Points: own read"   ON point_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Points: own insert" ON point_events FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ═══════════════════════════════════════════
-- REALTIME
-- ═══════════════════════════════════════════

-- Enable realtime on users table for live leaderboard
ALTER PUBLICATION supabase_realtime ADD TABLE users;

-- ═══════════════════════════════════════════
-- TRIGGER: auto-create user profile on signup
-- ═══════════════════════════════════════════

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
