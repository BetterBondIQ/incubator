import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { supabase } from '../../lib/supabase'

export function ModuleDetail() {
  const { moduleId } = useParams()
  const { profile } = useAuthStore()
  const navigate = useNavigate()

  const [module, setModule] = useState(null)
  const [lessons, setLessons] = useState([])
  const [completed, setCompleted] = useState([])
  const [audience, setAudience] = useState('agent')

  async function loadModule() {
    const [modRes, lessonsRes, progressRes] = await Promise.all([
      supabase.from('modules').select('*').eq('id', moduleId).single(),
      supabase.from('lessons').select('id,title,sort_order,points_value').eq('module_id', moduleId).order('sort_order'),
      profile?.id
        ? supabase.from('user_progress').select('lesson_id').eq('user_id', profile.id).eq('module_id', moduleId).eq('type', 'lesson_complete')
        : Promise.resolve({ data: [] }),
    ])

    if (modRes.data) setModule(modRes.data)
    if (lessonsRes.data) setLessons(lessonsRes.data)
    if (progressRes.data) setCompleted(progressRes.data.map(p => p.lesson_id))
  }

  useEffect(() => {
    // Existing module detail pattern: fetch module data when the route/user changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadModule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, profile?.id])

  if (!module) return <LoadingState />

  const allDone = lessons.length > 0 && lessons.every(l => completed.includes(l.id))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'var(--bb-navy-dark)', padding: '16px 20px 20px', flexShrink: 0 }}>
        <button
          onClick={() => navigate('/learn')}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 12, padding: 0 }}
        >
          ← Back to Learn
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 36 }}>{module.icon ?? '📋'}</span>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#fff', lineHeight: 1.1, marginBottom: 4 }}>
              {module.title}
            </h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
              {lessons.length} lessons · +{module.points_completion ?? 50} pts available
            </p>
          </div>
        </div>
      </div>

      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto' }}>
        {/* Audience Toggle */}
        <div style={{ background: '#fff', padding: '14px 16px', borderBottom: '1px solid var(--bb-grey-200)' }}>
          <div style={{ display: 'flex', background: 'var(--bb-grey-100)', borderRadius: 12, padding: 4 }}>
            {['agent', 'buyer'].map(a => (
              <button
                key={a}
                onClick={() => setAudience(a)}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: audience === a ? (a === 'agent' ? 'var(--bb-navy)' : 'var(--bb-red)') : 'transparent',
                  color: audience === a ? '#fff' : 'var(--bb-grey-700)',
                  fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}
              >
                {a === 'agent' ? '🤝 For Agents' : '🏠 For Buyers'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        {module[`${audience}_benefits`] && (
          <div style={{ margin: '16px 16px 0', background: 'var(--bb-navy-light)', borderRadius: 14, padding: '14px 16px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--bb-navy)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
              Key Benefits
            </p>
            {(module[`${audience}_benefits`] ?? []).map((b, i) => (
              <p key={i} style={{ fontSize: 13, color: 'var(--bb-grey-700)', padding: '6px 0', borderBottom: i < module[`${audience}_benefits`].length - 1 ? '1px solid var(--bb-grey-200)' : 'none', display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--bb-navy)', fontWeight: 700, flexShrink: 0 }}>→</span>
                {b}
              </p>
            ))}
          </div>
        )}

        {/* Lessons List */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bb-grey-400)', padding: '18px 16px 10px', fontFamily: 'var(--font-mono)' }}>
          Lessons
        </p>
        <div style={{ padding: '0 16px' }}>
          {lessons.map((lesson, i) => {
            const isDone = completed.includes(lesson.id)
            const isLocked = !isDone && i > 0 && !completed.includes(lessons[i - 1].id)
            return (
              <div
                key={lesson.id}
                onClick={() => !isLocked && navigate(`/learn/${moduleId}/lesson/${lesson.id}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', marginBottom: 8, borderRadius: 14,
                  background: '#fff', border: '1px solid var(--bb-grey-200)',
                  cursor: isLocked ? 'default' : 'pointer',
                  opacity: isLocked ? 0.5 : 1,
                  boxShadow: 'var(--bb-shadow-card)',
                  transition: 'transform 0.15s',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: isDone ? 'var(--bb-navy)' : isLocked ? 'var(--bb-grey-100)' : 'var(--bb-navy-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  color: isDone ? '#fff' : isLocked ? 'var(--bb-grey-400)' : 'var(--bb-navy)',
                }}>
                  {isDone ? '✓' : isLocked ? '🔒' : i + 1}
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--bb-navy)' }}>
                  {lesson.title}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isDone ? 'var(--bb-navy)' : 'var(--bb-red)', fontWeight: 700 }}>
                  +{lesson.points_value ?? 20} pts
                </span>
              </div>
            )
          })}
        </div>

        {/* Quiz CTA */}
        <div style={{ margin: '16px 16px 24px' }}>
          <button
            onClick={() => allDone && navigate(`/learn/${moduleId}/quiz`)}
            disabled={!allDone}
            style={{
              width: '100%', padding: '16px', borderRadius: 999, border: 'none',
              background: allDone ? 'var(--bb-red)' : 'var(--bb-grey-100)',
              color: allDone ? '#fff' : 'var(--bb-grey-400)',
              fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)',
              cursor: allDone ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s',
            }}
          >
            {allDone ? '🎯 Take Quiz — +60 pts' : `🔒 Complete all ${lessons.length} lessons to unlock quiz`}
          </button>
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton" style={{ width: 200, height: 24 }} />
    </div>
  )
}
