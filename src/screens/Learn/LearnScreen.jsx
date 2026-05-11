import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { supabase } from '../../lib/supabase'
import { COACHING_MODULES } from '../../lib/coachingModules'
import { LockedModuleCard } from '../../components/features/LockedModuleCard'

const FILTERS = ['All', 'In Progress', 'Complete', 'BetterSure']

export function LearnScreen() {
  const { profile } = useAuthStore()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [modules, setModules] = useState([])
  const [lessonCounts, setLessonCounts] = useState({})
  const [progress, setProgress] = useState([])
  const [seriesOpen, setSeriesOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  async function loadModules() {
    setLoading(true)
    const [modsRes, lessonsRes, progRes] = await Promise.all([
      supabase.from('modules').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('lessons').select('module_id'),
      supabase.from('user_progress').select('module_id,lesson_id,type').eq('user_id', profile.id),
    ])
    if (modsRes.data) setModules(modsRes.data)
    if (lessonsRes.data) {
      setLessonCounts(lessonsRes.data.reduce((counts, lesson) => {
        counts[lesson.module_id] = (counts[lesson.module_id] ?? 0) + 1
        return counts
      }, {}))
    }
    if (progRes.data) setProgress(progRes.data)
    setLoading(false)
  }

  useEffect(() => {
    if (!profile?.id) return
    // Existing screen pattern: load remote module data when the signed-in user changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadModules()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id])

  function getLessonCount(moduleId) {
    return progress.filter(p => p.module_id === moduleId && p.type === 'lesson_complete').length
  }

  function isComplete(moduleId) {
    return progress.some(p => p.module_id === moduleId && p.type === 'module_complete')
  }

  function isNew(module) {
    return getLessonCount(module.id) === 0 && !isComplete(module.id)
  }

  function filteredModules() {
    return modules.filter(m => {
      if (filter === 'All') return true
      if (filter === 'In Progress') return getLessonCount(m.id) > 0 && !isComplete(m.id)
      if (filter === 'Complete') return isComplete(m.id)
      if (filter === 'BetterSure') return m.category === 'insurance'
      return true
    })
  }

  const consultantMindsetModule = modules.find(m =>
    m.slug === 'the-consultant-mindset' ||
    m.slug === 'consultant-mindset' ||
    m.title === 'The Consultant Mindset'
  )
  const unlockedCoachingCount = consultantMindsetModule ? 1 : 0
  const seriesProgressPercent = Math.round((unlockedCoachingCount / COACHING_MODULES.length) * 100)
  const consultantMindsetCompleted = consultantMindsetModule ? getLessonCount(consultantMindsetModule.id) : 0
  const consultantMindsetTotal = consultantMindsetModule
    ? lessonCounts[consultantMindsetModule.id] ?? consultantMindsetModule.lesson_count ?? 7
    : 0
  const consultantMindsetProgress = consultantMindsetTotal > 0
    ? Math.round((consultantMindsetCompleted / consultantMindsetTotal) * 100)
    : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'var(--bb-navy-dark)', padding: '16px 20px 20px', flexShrink: 0 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: '#fff', marginBottom: 4 }}>
          Product <em style={{ color: '#8FAEE8' }}>Knowledge</em>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          Complete modules, earn points, climb the ranks
        </p>
      </div>

      {/* Filter pills */}
      <div className="scroll-hide" style={{
        display: 'flex', gap: 8, padding: '14px 16px',
        overflowX: 'auto', flexShrink: 0,
        background: '#fff', borderBottom: '1px solid var(--bb-grey-200)',
      }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flexShrink: 0, fontSize: 12, fontWeight: 700,
              padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
              border: `1.5px solid ${filter === f ? 'var(--bb-navy)' : 'var(--bb-grey-200)'}`,
              color: filter === f ? '#fff' : 'var(--bb-grey-700)',
              background: filter === f ? 'var(--bb-navy)' : '#fff',
              fontFamily: 'var(--font-body)', transition: 'all 0.15s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 24px' }}>

        {/* Loading skeletons */}
        {loading && [0, 1, 2, 3].map(i => (
          <div key={i} style={{
            background: '#fff', border: '1px solid var(--bb-grey-200)',
            borderRadius: 16, padding: 16, marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: 'var(--bb-shadow-card)',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bb-grey-100)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 14, width: '55%', background: 'var(--bb-grey-100)', borderRadius: 6, marginBottom: 8 }} />
              <div style={{ height: 10, width: '80%', background: 'var(--bb-grey-100)', borderRadius: 6, marginBottom: 10 }} />
              <div style={{ height: 4, background: 'var(--bb-grey-100)', borderRadius: 999 }} />
            </div>
          </div>
        ))}

        {/* ── Product knowledge modules (from Supabase) ── */}
        {!loading && filteredModules().map(mod => {
          const completed = getLessonCount(mod.id)
          const done = isComplete(mod.id)
          const fresh = isNew(mod)
          const totalLessons = lessonCounts[mod.id] ?? mod.lesson_count ?? 4
          const pct = done ? 100 : Math.round((completed / totalLessons) * 100)

          return (
            <div
              key={mod.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/learn/${mod.id}`)}
              onKeyDown={e => e.key === 'Enter' && navigate(`/learn/${mod.id}`)}
              style={{
                background: '#fff',
                border: `1px solid var(--bb-grey-200)`,
                borderLeft: done ? '4px solid var(--bb-navy)' : '1px solid var(--bb-grey-200)',
                borderRadius: 16, padding: 16, marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer', boxShadow: 'var(--bb-shadow-card)',
                transition: 'transform 0.15s',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>{mod.icon ?? '📋'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--bb-navy)', marginBottom: 3 }}>{mod.title}</p>
                <p style={{ fontSize: 12, color: 'var(--bb-grey-400)', marginBottom: 8, lineHeight: 1.4 }}>{mod.description}</p>
                <div style={{ height: 4, background: 'var(--bb-grey-100)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${pct}%`,
                    background: done ? 'var(--bb-navy)' : 'linear-gradient(90deg, var(--bb-navy), var(--bb-red))',
                    borderRadius: 999, transition: 'width 0.6s ease',
                  }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--bb-grey-400)' }}>
                    {done ? '✓ Complete' : `${completed}/${totalLessons} lessons`}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--bb-red)', fontWeight: 700 }}>
                    +{mod.points_completion ?? 50} pts
                  </span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  background: done ? 'var(--bb-navy)' : fresh ? 'var(--bb-red-light)' : 'var(--bb-navy-light)',
                  color: done ? '#fff' : fresh ? 'var(--bb-red)' : 'var(--bb-navy)',
                  fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {done ? 'DONE' : fresh ? 'NEW' : `${pct}%`}
                </span>
              </div>
            </div>
          )
        })}

        {!loading && filteredModules().length === 0 && filter !== 'All' && (
          filter === 'BetterSure'
            ? (
              <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--bb-grey-400)' }}>
                <p style={{ fontSize: 36, marginBottom: 12 }}>🛡️</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--bb-navy)', marginBottom: 8 }}>
                  BetterSure modules coming soon
                </p>
                <p style={{ fontSize: 13, color: 'var(--bb-grey-400)', lineHeight: 1.6, maxWidth: 260, margin: '0 auto 20px' }}>
                  Home, contents, and life cover modules launch in Phase 2. Check back after your next training session.
                </p>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  background: 'var(--bb-navy-light)', color: 'var(--bb-navy)',
                  padding: '5px 14px', borderRadius: 999, letterSpacing: 1,
                }}>
                  PHASE 2
                </span>
              </div>
            )
            : (
              <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--bb-grey-400)' }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>📭</p>
                <p style={{ fontSize: 14, fontWeight: 600 }}>No modules match this filter</p>
              </div>
            )
        )}

        {/* ── Consultant Series section ── */}
        {(filter === 'All') && (
          <div style={{ marginTop: modules.length > 0 ? 24 : 0 }}>
            {/* Section header — tappable to collapse */}
            <button
              onClick={() => setSeriesOpen(o => !o)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '0 0 14px', display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', gap: 12,
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 800,
                    color: 'var(--bb-navy)',
                  }}>
                    Consultant Coaching Series
                  </p>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                    background: 'var(--bb-navy-dark)', color: '#fff',
                    padding: '2px 8px', borderRadius: 999, letterSpacing: 1,
                  }}>
                    12 MODULES
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--bb-grey-400)', lineHeight: 1.4 }}>
                  Monthly live sessions with Shawn Mackrell · Unlocks after each session
                </p>
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: 999, flexShrink: 0, marginTop: 2,
                background: 'var(--bb-navy-light)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                {seriesOpen
                  ? <ChevronUp size={14} color="var(--bb-navy)" />
                  : <ChevronDown size={14} color="var(--bb-navy)" />}
              </div>
            </button>

            {/* Progress strip */}
            {seriesOpen && (
              <div style={{
                background: 'var(--bb-navy-dark)',
                backgroundImage: 'radial-gradient(circle at 92% 50%, rgba(229,48,42,0.12), transparent 50%)',
                borderRadius: 14, padding: '12px 16px', marginBottom: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>
                    Live training progress
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 120, height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 999 }}>
                      <div style={{ width: `${seriesProgressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--bb-navy), var(--bb-red))', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
                      {unlockedCoachingCount} / {COACHING_MODULES.length} sessions
                    </span>
                  </div>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                  background: unlockedCoachingCount > 0 ? 'rgba(143,174,232,0.18)' : 'rgba(229,48,42,0.18)',
                  color: unlockedCoachingCount > 0 ? '#8FAEE8' : 'var(--bb-red)',
                  padding: '4px 10px', borderRadius: 999, letterSpacing: 1,
                }}>
                  {unlockedCoachingCount > 0 ? '1 UNLOCKED' : 'ALL LOCKED'}
                </span>
              </div>
            )}

            {/* Module flip cards */}
            {seriesOpen && COACHING_MODULES.map((mod, i) => {
              const isConsultantMindsetCard = mod.number === 1 && consultantMindsetModule

              return (
                <LockedModuleCard
                  key={mod.id}
                  module={mod}
                  index={i}
                  unlocked={Boolean(isConsultantMindsetCard)}
                  completedLessons={isConsultantMindsetCard ? consultantMindsetCompleted : 0}
                  totalLessons={isConsultantMindsetCard ? consultantMindsetTotal : 0}
                  progressPercent={isConsultantMindsetCard ? consultantMindsetProgress : 0}
                  onOpen={() => navigate(`/learn/${consultantMindsetModule.id}`)}
                />
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
