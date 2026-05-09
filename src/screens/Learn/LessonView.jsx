import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { usePointsStore } from '../../store/usePointsStore'
import { supabase } from '../../lib/supabase'

export function LessonView() {
  const { moduleId, lessonId } = useParams()
  const { profile } = useAuthStore()
  const { addPoints } = usePointsStore()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState(null)
  const [allLessons, setAllLessons] = useState([])
  const [audience, setAudience] = useState('agent')
  const [completed, setCompleted] = useState(false)
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    loadLesson()
  }, [lessonId])

  async function loadLesson() {
    const [lessonRes, allRes, progressRes] = await Promise.all([
      supabase.from('lessons').select('*').eq('id', lessonId).single(),
      supabase.from('lessons').select('id,sort_order').eq('module_id', moduleId).order('sort_order'),
      profile?.id
        ? supabase.from('user_progress').select('id').eq('user_id', profile.id).eq('lesson_id', lessonId).eq('type', 'lesson_complete').single()
        : Promise.resolve({ data: null }),
    ])
    if (lessonRes.data) setLesson(lessonRes.data)
    if (allRes.data) setAllLessons(allRes.data)
    if (progressRes.data) setCompleted(true)
  }

  async function handleMarkComplete() {
    if (completed || marking || !profile?.id) return
    setMarking(true)

    const pts = lesson.points_value ?? 20

    try {
      // Record lesson completion (ignore duplicate — user may re-enter the screen)
      const { error: progressErr } = await supabase.from('user_progress').insert({
        user_id: profile.id,
        module_id: moduleId,
        lesson_id: lessonId,
        type: 'lesson_complete',
        points_awarded: pts,
      })
      if (progressErr && progressErr.code !== '23505') throw progressErr

      // Award points in DB + log event (parallel)
      await Promise.all([
        supabase.rpc('increment_points', { p_user_id: profile.id, p_amount: pts }),
        supabase.from('point_events').insert({
          user_id: profile.id, event_type: 'lesson', points: pts, reference_id: lessonId,
        }),
      ])

      // Check if all lessons in module are now done (awards +50 module bonus if so)
      const { data: modResult } = await supabase.rpc('check_module_complete', {
        p_user_id: profile.id, p_module_id: moduleId,
      })

      addPoints(pts + (modResult?.points_awarded ?? 0))
      setCompleted(true)
    } catch (err) {
      console.error('Mark complete failed:', err)
    }

    setMarking(false)

    // Navigate to next lesson or back to module
    const currentIdx = allLessons.findIndex(l => l.id === lessonId)
    if (currentIdx < allLessons.length - 1) {
      navigate(`/learn/${moduleId}/lesson/${allLessons[currentIdx + 1].id}`)
    } else {
      navigate(`/learn/${moduleId}`)
    }
  }

  if (!lesson) return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="skeleton" style={{ width: 200, height: 24 }} /></div>

  const currentIdx = allLessons.findIndex(l => l.id === lessonId)
  const content = audience === 'agent' ? lesson.content_agent : lesson.content_buyer
  const keyPoints = lesson.key_points ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'var(--bb-navy-dark)', padding: '12px 20px 16px', flexShrink: 0 }}>
        <button
          onClick={() => navigate(`/learn/${moduleId}`)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 10, padding: 0 }}
        >
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--bb-red)', fontWeight: 700 }}>
            LESSON {currentIdx + 1} OF {allLessons.length}
          </span>
          {completed && (
            <span style={{ background: 'rgba(26,54,112,0.4)', color: '#8FAEE8', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)' }}>
              ✓ COMPLETE
            </span>
          )}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', marginTop: 6, lineHeight: 1.2 }}>
          {lesson.title}
        </h1>
      </div>

      {/* Audience Toggle */}
      <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid var(--bb-grey-200)', flexShrink: 0 }}>
        <div style={{ display: 'flex', background: 'var(--bb-grey-100)', borderRadius: 10, padding: 3 }}>
          {['agent', 'buyer'].map(a => (
            <button
              key={a}
              onClick={() => setAudience(a)}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: audience === a ? (a === 'agent' ? 'var(--bb-navy)' : 'var(--bb-red)') : 'transparent',
                color: audience === a ? '#fff' : 'var(--bb-grey-700)',
                fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-body)', transition: 'all 0.2s',
              }}
            >
              {a === 'agent' ? '🤝 For Agents' : '🏠 For Buyers'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px' }}>
        {/* Main content */}
        {content && (
          <div style={{ fontSize: 15, color: 'var(--bb-grey-700)', lineHeight: 1.75, marginBottom: 24 }}>
            {typeof content === 'string' ? content : JSON.stringify(content)}
          </div>
        )}

        {/* Key points callout */}
        {keyPoints.length > 0 && (
          <div style={{ background: 'var(--bb-navy-light)', borderLeft: '4px solid var(--bb-navy)', borderRadius: '0 14px 14px 0', padding: '16px 18px', marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--bb-navy)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
              Key Points
            </p>
            {keyPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: i < keyPoints.length - 1 ? '1px solid rgba(26,54,112,0.1)' : 'none' }}>
                <span style={{ color: 'var(--bb-red)', fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 14, color: 'var(--bb-grey-700)', lineHeight: 1.5 }}>{pt}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mark complete */}
        <button
          onClick={handleMarkComplete}
          disabled={completed || marking}
          style={{
            width: '100%', padding: '16px', borderRadius: 999, border: 'none',
            background: completed ? 'var(--bb-navy-light)' : 'var(--bb-red)',
            color: completed ? 'var(--bb-navy)' : '#fff',
            fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)',
            cursor: completed ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.2s',
          }}
        >
          {completed ? '✓ Completed' : marking ? 'Saving…' : `✓ Mark Complete — +${lesson.points_value ?? 20} pts`}
        </button>
      </div>
    </div>
  )
}
