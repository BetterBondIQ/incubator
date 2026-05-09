import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/useAuthStore'
import { usePointsStore } from '../../store/usePointsStore'
import { supabase } from '../../lib/supabase'
import { getTier, getProgressToNextTier } from '../../lib/constants'
import { ProgressBar } from '../../components/ui/ProgressBar'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
})

export function HomeScreen() {
  const { profile } = useAuthStore()
  const { totalPoints } = usePointsStore()
  const navigate = useNavigate()

  const [modules, setModules] = useState([])
  const [progress, setProgress] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [dailyQuestion, setDailyQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const tier = getTier(totalPoints)
  const greeting = getGreeting()
  const streak = profile?.streak_current ?? 0
  const anyLessonsStarted = progress.some(p => p.type === 'lesson_complete')

  useEffect(() => {
    if (!profile?.id) return
    loadData()
  }, [profile?.id])

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const [modsRes, progressRes, lbRes, quizRes] = await Promise.all([
        supabase.from('modules').select('*').eq('is_active', true).order('sort_order').limit(4),
        supabase.from('user_progress').select('module_id,type').eq('user_id', profile.id),
        supabase.from('users').select('id,full_name,total_points,monthly_points').order('total_points', { ascending: false }).limit(5),
        supabase.from('quiz_questions').select('*').eq('module_id', null).limit(1),
      ])
      if (modsRes.data) setModules(modsRes.data)
      if (progressRes.data) setProgress(progressRes.data)
      if (lbRes.data) setLeaderboard(lbRes.data)
      if (quizRes.data?.length) setDailyQuestion(quizRes.data[0])
    } catch {
      setError('Could not load your dashboard. Pull down to refresh.')
    } finally {
      setLoading(false)
    }
  }

  function getModuleProgress(moduleId) {
    return progress.filter(p => p.module_id === moduleId && p.type === 'lesson_complete').length
  }

  function isModuleComplete(moduleId) {
    return progress.some(p => p.module_id === moduleId && p.type === 'module_complete')
  }

  function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  function handleAnswer(optionId) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(optionId)
  }

  const myRank = leaderboard.findIndex(u => u.id === profile?.id) + 1
  const overallLessons = progress.filter(p => p.type === 'lesson_complete').length
  const totalLessons = Math.max(1, modules.length * 4)
  const overallPct = Math.min(100, Math.round((overallLessons / totalLessons) * 100))

  const displayModules = modules.length ? modules : PLACEHOLDER_MODULES

  if (error) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
        <div>
          <p style={{ fontSize: 32, marginBottom: 12 }}>⚠️</p>
          <p style={{ fontSize: 14, color: 'var(--bb-grey-700)', marginBottom: 20, lineHeight: 1.5 }}>{error}</p>
          <button onClick={loadData} style={{ background: 'var(--bb-navy)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>

      {/* Hero Card */}
      <motion.div {...fadeUp(0)} style={{ margin: '16px 16px 0' }}>
        <div style={{
          background: 'var(--bb-navy)', borderRadius: 18, padding: '18px 20px 20px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', right: 20, bottom: -20, width: 80, height: 80, background: 'rgba(229,48,42,0.12)', borderRadius: '50%' }} />
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>{greeting},</p>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 14, lineHeight: 1.2 }}>
            {profile?.full_name ?? 'Consultant'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ background: 'rgba(229,48,42,0.2)', border: '1px solid rgba(229,48,42,0.4)', color: '#FF9590', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              {tier.emoji} {tier.name} Tier
            </span>
            {myRank > 0 && (
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>#{myRank} overall</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Progress Strip */}
      {!loading && modules.length > 0 && (
        <motion.div {...fadeUp(0.05)} style={{ background: '#fff', margin: '12px 16px 0', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--bb-shadow-card)', border: '1px solid var(--bb-grey-200)' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--bb-grey-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
              Overall Progress
            </p>
            <ProgressBar value={overallPct} height={6} completed={overallPct === 100} delay={0.3} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--bb-navy)' }}>
            {overallPct}%
          </span>
        </motion.div>
      )}

      {/* Module Grid */}
      <motion.p {...fadeUp(0.1)} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bb-grey-400)', padding: '18px 16px 10px' }}>
        {anyLessonsStarted ? 'Continue Learning' : 'Start Learning'}
      </motion.p>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 16px' }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ height: 120, borderRadius: 16 }} />
          ))}
        </div>
      ) : (
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {displayModules.slice(0, 4).map((mod, idx) => {
              const done = isModuleComplete(mod.id ?? mod.slug)
              const completed = getModuleProgress(mod.id ?? mod.slug)
              const pct = Math.round((completed / 4) * 100)
              return (
                <motion.div
                  key={mod.id ?? mod.slug}
                  {...fadeUp(0.12 + idx * 0.05)}
                  onClick={() => mod.id && navigate(`/learn/${mod.id}`)}
                  role={mod.id ? 'button' : undefined}
                  tabIndex={mod.id ? 0 : undefined}
                  onKeyDown={e => e.key === 'Enter' && mod.id && navigate(`/learn/${mod.id}`)}
                  style={{ background: '#fff', border: `1px solid ${done ? 'transparent' : 'var(--bb-grey-200)'}`, borderTop: done ? '3px solid var(--bb-navy)' : '1px solid var(--bb-grey-200)', borderRadius: 16, padding: '14px 12px 12px', boxShadow: 'var(--bb-shadow-card)', cursor: mod.id ? 'pointer' : 'default', position: 'relative', overflow: 'hidden' }}
                >
                  {done && (
                    <div style={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, background: 'var(--bb-navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>✓</div>
                  )}
                  <span style={{ fontSize: 22, marginBottom: 8, display: 'block' }}>{mod.icon ?? '📋'}</span>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--bb-navy)', marginBottom: 3, lineHeight: 1.3 }}>{mod.title}</p>
                  <p style={{ fontSize: 11, color: 'var(--bb-grey-400)', marginBottom: 8 }}>{done ? 'Completed' : `${completed}/4 lessons`}</p>
                  <ProgressBar value={pct} height={4} completed={done} delay={0.3 + idx * 0.08} />
                </motion.div>
              )
            })}
          </div>
          {/* 5th module — full width to avoid orphaned card */}
          {displayModules.length === 5 && (() => {
            const mod = displayModules[4]
            const done = isModuleComplete(mod.id ?? mod.slug)
            const completed = getModuleProgress(mod.id ?? mod.slug)
            const pct = Math.round((completed / 4) * 100)
            return (
              <motion.div
                {...fadeUp(0.32)}
                onClick={() => mod.id && navigate(`/learn/${mod.id}`)}
                role={mod.id ? 'button' : undefined}
                tabIndex={mod.id ? 0 : undefined}
                onKeyDown={e => e.key === 'Enter' && mod.id && navigate(`/learn/${mod.id}`)}
                style={{ marginTop: 10, background: '#fff', border: `1px solid ${done ? 'transparent' : 'var(--bb-grey-200)'}`, borderTop: done ? '3px solid var(--bb-navy)' : '1px solid var(--bb-grey-200)', borderRadius: 16, padding: '14px 16px 12px', boxShadow: 'var(--bb-shadow-card)', cursor: mod.id ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 14 }}
              >
                <span style={{ fontSize: 22 }}>{mod.icon ?? '📋'}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--bb-navy)', marginBottom: 2 }}>{mod.title}</p>
                  <ProgressBar value={pct} height={4} completed={done} delay={0.35} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--bb-grey-400)', flexShrink: 0 }}>{done ? '✓' : `${completed}/4`}</span>
              </motion.div>
            )
          })()}
        </div>
      )}

      {/* Daily Quiz Banner */}
      {!loading && dailyQuestion && (
        <motion.div {...fadeUp(0.2)}>
          <DailyQuizBanner question={dailyQuestion} selected={selectedAnswer} onSelect={handleAnswer} />
        </motion.div>
      )}

      {/* Leaderboard Peek */}
      {!loading && leaderboard.length > 0 && (
        <motion.div {...fadeUp(0.25)}>
          <LeaderboardPeek rows={leaderboard} myId={profile?.id} onSeeAll={() => navigate('/rank')} />
        </motion.div>
      )}

      {/* Streak Card */}
      <motion.div {...fadeUp(0.3)}>
        <StreakCard streak={streak} />
      </motion.div>
    </div>
  )
}

/* ── Sub-components ── */

function DailyQuizBanner({ question, selected, onSelect }) {
  const options = question.options ?? []
  return (
    <div style={{ margin: '12px 16px 0', background: 'var(--bb-navy-dark)', borderRadius: 16, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, background: 'rgba(229,48,42,0.1)', borderRadius: '50%' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span className="animate-blink" style={{ width: 7, height: 7, background: 'var(--bb-red)', borderRadius: '50%', display: 'inline-block' }} />
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bb-red)', fontFamily: 'var(--font-mono)' }}>Daily Quiz</span>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.5, marginBottom: 14, maxWidth: 280 }}>
        {question.question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {options.map(opt => {
          const isCorrect = selected && opt.id === question.correct_option_id
          const isWrong = selected === opt.id && opt.id !== question.correct_option_id
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              style={{
                background: isCorrect ? 'rgba(26,54,112,0.5)' : isWrong ? 'rgba(229,48,42,0.2)' : 'rgba(255,255,255,0.07)',
                border: `1px solid ${isCorrect ? 'rgba(143,174,232,0.5)' : isWrong ? 'rgba(229,48,42,0.4)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 10, padding: '10px 14px', fontSize: 13,
                color: isCorrect ? '#8FAEE8' : 'rgba(255,255,255,0.75)',
                fontWeight: isCorrect ? 700 : 400, fontFamily: 'var(--font-body)',
                cursor: selected ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}
            >
              {opt.text}
            </button>
          )
        })}
      </div>
      {selected && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', textAlign: 'right', marginTop: 10 }}>
          {selected === question.correct_option_id ? '✓ Correct! +30 pts' : '✗ Not quite — ' + (question.explanation ?? '')}
        </p>
      )}
    </div>
  )
}

function LeaderboardPeek({ rows, myId, onSeeAll }) {
  const rankColor = { 0: '#D4AF37', 1: '#A8A9AD', 2: '#CD7F32' }
  const rankEmoji = { 0: '🥇', 1: '🥈', 2: '🥉' }
  return (
    <div style={{ margin: '12px 16px 0', background: '#fff', border: '1px solid var(--bb-grey-200)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--bb-shadow-card)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', borderBottom: '1px solid var(--bb-grey-100)' }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--bb-navy)' }}>Leaderboard</span>
        <button onClick={onSeeAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--bb-red)' }}>See all →</button>
      </div>
      {rows.slice(0, 3).map((user, i) => {
        const isMe = user.id === myId
        return (
          <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: i < 2 ? '1px solid var(--bb-grey-100)' : 'none', background: isMe ? 'var(--bb-navy-light)' : 'transparent' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, width: 20, textAlign: 'center', color: rankColor[i] ?? 'var(--bb-grey-400)' }}>
              {rankEmoji[i] ?? i + 1}
            </span>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bb-navy-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'var(--bb-navy)', flexShrink: 0 }}>
              {(user.full_name ?? 'U').charAt(0)}
            </div>
            <span style={{ flex: 1, fontSize: 13, fontWeight: isMe ? 800 : 600, color: isMe ? 'var(--bb-navy)' : 'var(--bb-black)' }}>
              {user.full_name ?? 'Consultant'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--bb-navy)' }}>
              {(user.total_points ?? 0).toLocaleString()}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function StreakCard({ streak }) {
  if (streak === 0) {
    return (
      <div style={{ margin: '12px 16px 0', borderRadius: 16, padding: '16px 20px', background: 'linear-gradient(135deg, var(--bb-navy), #2A4A90)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 32, flexShrink: 0 }}>🔥</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 2 }}>Start Your Streak</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Log in daily to build your streak and earn bonus points. 7 days = +75 pts!</p>
        </div>
      </div>
    )
  }
  return (
    <div style={{ margin: '12px 16px 0', borderRadius: 16, padding: '16px 20px', background: 'linear-gradient(135deg, var(--bb-navy), #2A4A90)', display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ fontSize: 36, flexShrink: 0 }}>🔥</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{streak}-Day Streak!</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{7 - (streak % 7)} more days to your next streak bonus</p>
      </div>
      <div style={{ background: 'var(--bb-red)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 999, flexShrink: 0 }}>
        +75 pts
      </div>
    </div>
  )
}

const PLACEHOLDER_MODULES = [
  { slug: '1', icon: '🏠', title: 'Bond Origination' },
  { slug: '2', icon: '📋', title: 'Pre-Approval Cert.' },
  { slug: '3', icon: '💰', title: 'First Home Finance' },
  { slug: '4', icon: '⚔️', title: 'Competitors' },
]
