import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { usePointsStore } from '../../store/usePointsStore'
import { supabase } from '../../lib/supabase'
import { getTier, getProgressToNextTier, RANK_TIERS } from '../../lib/constants'

const TABS = ['Monthly', 'All Time', 'My Team']

export function RankScreen() {
  const { profile } = useAuthStore()
  const { totalPoints } = usePointsStore()
  const [tab, setTab] = useState('All Time')
  const [leaderboard, setLeaderboard] = useState([])
  const tabRef = useRef(tab)

  useEffect(() => { tabRef.current = tab }, [tab])

  const tier = getTier(totalPoints)
  const { pct, needed, next } = getProgressToNextTier(totalPoints)

  async function loadLeaderboard(currentTab) {
    const resolvedTab = currentTab ?? tabRef.current
    const scoreCol = resolvedTab === 'Monthly' ? 'monthly_points' : 'total_points'
    let query = supabase
      .from('users')
      .select('id,full_name,total_points,monthly_points')
      .order(scoreCol, { ascending: false })
      .limit(50)

    if (resolvedTab === 'My Team' && profile?.team_id) {
      query = query.eq('team_id', profile.team_id)
    }

    const { data } = await query
    if (data) setLeaderboard(data)
  }

  useEffect(() => {
    if (!profile?.id) return
    loadLeaderboard()
    // Existing rank screen pattern: fetch leaderboard data when tab/user changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, profile?.id])

  useEffect(() => {
    if (!profile?.id) return
    const channel = supabase
      .channel('leaderboard')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users' }, () => {
        loadLeaderboard(tabRef.current)
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
    // Existing realtime subscription intentionally depends on profile only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id])

  const rankColors = ['#D4AF37', '#A8A9AD', '#CD7F32']
  const rankEmojis = ['🥇', '🥈', '🥉']
  const scoreCol = tab === 'Monthly' ? 'monthly_points' : 'total_points'
  const myRank = leaderboard.findIndex(u => u.id === profile?.id) + 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ background: 'var(--bb-navy-dark)', padding: '16px 20px 20px', flexShrink: 0 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: '#fff', marginBottom: 4 }}>
          <em style={{ color: '#8FAEE8' }}>Rank</em> Board
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Live rankings - updated in real time</p>
      </div>

      <div style={{
        background: 'var(--bb-navy)', margin: '16px 16px 0', borderRadius: 18,
        padding: 20, display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--bb-red), #FF6B65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 900, color: '#fff', flexShrink: 0,
        }}>
          {(profile?.full_name ?? 'U').charAt(0)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{profile?.full_name ?? 'Consultant'}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
            {tier.emoji} {tier.name} Tier
            {myRank > 0 && ` · #${myRank} overall`}
          </p>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden', marginBottom: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #8FAEE8, var(--bb-red))', borderRadius: 999, transition: 'width 0.8s ease' }} />
          </div>
          {next && (
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
              {needed} pts to {next.name}
            </p>
          )}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: '#fff' }}>
            {totalPoints.toLocaleString()}
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>TOTAL PTS</span>
        </div>
      </div>

      <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid var(--bb-grey-200)', padding: '0 16px', flexShrink: 0 }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, textAlign: 'center', padding: '13px 0',
              fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-body)',
              color: tab === t ? 'var(--bb-navy)' : 'var(--bb-grey-400)',
              borderBottom: `2px solid ${tab === t ? 'var(--bb-navy)' : 'transparent'}`,
              border: 'none', background: 'none', cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 16px' }}>
        {leaderboard.map((user, i) => {
          const isMe = user.id === profile?.id
          const isTop3 = i < 3
          return (
            <div
              key={user.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 14, marginBottom: 6,
                background: isMe ? 'var(--bb-navy-light)' : '#fff',
                border: isTop3 && !isMe
                  ? `1.5px solid ${rankColors[i]}`
                  : `1px solid ${isMe ? 'rgba(26,54,112,0.2)' : 'var(--bb-grey-200)'}`,
                boxShadow: 'var(--bb-shadow-card)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, width: 24, textAlign: 'center', color: rankColors[i] ?? 'var(--bb-grey-400)', flexShrink: 0 }}>
                {rankEmojis[i] ?? i + 1}
              </span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: isMe ? 'var(--bb-navy)' : 'var(--bb-navy-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: isMe ? '#fff' : 'var(--bb-navy)', flexShrink: 0 }}>
                {(user.full_name ?? 'U').charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: isMe ? 800 : 600, color: isMe ? 'var(--bb-navy)' : 'var(--bb-black)', marginBottom: 2 }}>
                  {user.full_name ?? 'Consultant'}
                </p>
                <p style={{ fontSize: 11, color: 'var(--bb-grey-400)', fontFamily: 'var(--font-mono)' }}>
                  {getTier(user.total_points ?? 0).emoji} {getTier(user.total_points ?? 0).name}
                </p>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--bb-navy)', flexShrink: 0 }}>
                {(user[scoreCol] ?? 0).toLocaleString()}
              </span>
            </div>
          )
        })}

        <div style={{ marginTop: 16, background: '#fff', border: '1px solid var(--bb-grey-200)', borderRadius: 14, padding: '14px 16px', boxShadow: 'var(--bb-shadow-card)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bb-grey-400)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
            Rank Tiers
          </p>
          {RANK_TIERS.map(t => (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--bb-grey-100)' }}>
              <span style={{ fontSize: 18 }}>{t.emoji}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: 'var(--bb-navy)' }}>{t.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--bb-grey-400)' }}>
                {t.max === Infinity ? `${t.min.toLocaleString()}+` : `${t.min.toLocaleString()} - ${t.max.toLocaleString()}`} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
