import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { usePointsStore } from '../../store/usePointsStore'
import { supabase } from '../../lib/supabase'
import { getTier } from '../../lib/constants'

const ACHIEVEMENTS = [
  { id: 'bond_master',  emoji: '🏠', name: 'Bond Master',   desc: 'Complete Bond Origination' },
  { id: 'hot_streak',   emoji: '🔥', name: 'Hot Streak',    desc: '7-day login streak' },
  { id: 'quiz_ace',     emoji: '🎯', name: 'Quiz Ace',      desc: '100% on any quiz' },
  { id: 'diamond_tier', emoji: '👑', name: 'Diamond Tier',  desc: 'Reach 2,000 points' },
  { id: 'top_gun',      emoji: '🏆', name: 'Top Gun',       desc: 'Reach #1 on monthly board' },
  { id: 'full_house',   emoji: '⭐', name: 'Full House',    desc: 'Complete all 5 modules' },
]

export function ProfileScreen() {
  const { profile, logout } = useAuthStore()
  const { totalPoints } = usePointsStore()
  const tier = getTier(totalPoints)
  const [progress, setProgress] = useState([])
  const [myRank, setMyRank] = useState(0)
  const [moduleCount, setModuleCount] = useState(0)

  const streak = profile?.streak_current ?? 0
  const streakBest = profile?.streak_best ?? 0

  useEffect(() => {
    if (!profile?.id) return
    loadAchievementData()
  }, [profile?.id])

  async function loadAchievementData() {
    const [progRes, lbRes, modsRes] = await Promise.all([
      supabase.from('user_progress').select('type,module_id').eq('user_id', profile.id),
      supabase.from('users').select('id').order('total_points', { ascending: false }).limit(50),
      supabase.from('modules').select('id').eq('is_active', true),
    ])
    if (progRes.data) setProgress(progRes.data)
    if (lbRes.data) {
      const rank = lbRes.data.findIndex(u => u.id === profile.id) + 1
      setMyRank(rank)
    }
    if (modsRes.data) setModuleCount(modsRes.data.length)
  }

  function isUnlocked(achId) {
    switch (achId) {
      case 'bond_master':
        return progress.some(p => p.module_id === 'mod-001' && p.type === 'module_complete')
      case 'hot_streak':
        return streak >= 7
      case 'quiz_ace':
        return progress.some(p => p.type === 'quiz_perfect')
      case 'diamond_tier':
        return totalPoints >= 2000
      case 'top_gun':
        return myRank === 1
      case 'full_house':
        return moduleCount > 0 &&
          progress.filter(p => p.type === 'module_complete').length >= moduleCount
      default:
        return false
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    logout()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto' }}>
        {/* Profile Header */}
        <div style={{ background: 'var(--bb-navy-dark)', padding: '32px 20px 24px', textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--bb-navy), var(--bb-red))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 900, color: '#fff',
            margin: '0 auto 12px',
            border: '3px solid rgba(255,255,255,0.2)',
          }}>
            {(profile?.full_name ?? 'U').charAt(0)}
          </div>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{profile?.full_name ?? 'Consultant'}</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>{profile?.email ?? ''}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span style={{ background: 'rgba(229,48,42,0.2)', border: '1px solid rgba(229,48,42,0.4)', color: '#FF9590', fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
              {tier.emoji} {tier.name} Tier
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'var(--bb-grey-200)', borderBottom: '1px solid var(--bb-grey-200)' }}>
          {[
            { label: 'Total Points', value: totalPoints.toLocaleString() },
            { label: 'Streak', value: `${streak} days` },
            { label: 'Best Streak', value: `${streakBest} days` },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', padding: '16px 8px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--bb-navy)', lineHeight: 1, marginBottom: 4 }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: 'var(--bb-grey-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bb-grey-400)', padding: '18px 16px 10px', fontFamily: 'var(--font-mono)' }}>
          Achievements
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, padding: '0 16px' }}>
          {ACHIEVEMENTS.map(ach => {
            const unlocked = isUnlocked(ach.id)
            return (
              <div
                key={ach.id}
                style={{
                  background: '#fff', border: '1px solid var(--bb-grey-200)', borderRadius: 14,
                  padding: '14px 10px', textAlign: 'center',
                  opacity: unlocked ? 1 : 0.35, boxShadow: 'var(--bb-shadow-card)',
                  borderTop: unlocked ? '3px solid var(--bb-navy)' : '1px solid var(--bb-grey-200)',
                  transition: 'opacity 0.3s',
                }}
              >
                <p style={{ fontSize: 28, marginBottom: 6 }}>{ach.emoji}</p>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--bb-navy)', marginBottom: 2, lineHeight: 1.3 }}>{ach.name}</p>
                <p style={{ fontSize: 9, color: 'var(--bb-grey-400)', lineHeight: 1.4 }}>{ach.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Settings */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bb-grey-400)', padding: '24px 16px 10px', fontFamily: 'var(--font-mono)' }}>
          Settings
        </p>
        <div style={{ margin: '0 16px 32px', background: '#fff', border: '1px solid var(--bb-grey-200)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--bb-shadow-card)' }}>
          <button
            onClick={handleSignOut}
            style={{
              width: '100%', padding: '16px 20px', textAlign: 'left', background: 'none',
              border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600,
              color: 'var(--bb-red)', fontFamily: 'var(--font-body)',
              display: 'flex', alignItems: 'center', gap: 12, minHeight: 52,
            }}
          >
            <span>🚪</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
