import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { usePointsStore } from '../../store/usePointsStore'
import { supabase } from '../../lib/supabase'
import { POINTS } from '../../lib/constants'

export function QuizScreen() {
  const { moduleId } = useParams()
  const { profile } = useAuthStore()
  const { addPoints } = usePointsStore()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)
  const [alreadyPassed, setAlreadyPassed] = useState(false)

  useEffect(() => {
    loadQuiz()
  }, [moduleId, profile?.id])

  async function loadQuiz() {
    const [qRes, passedRes] = await Promise.all([
      supabase.from('quiz_questions').select('*').eq('module_id', moduleId).order('sort_order'),
      profile?.id
        ? supabase.from('user_progress').select('id').eq('user_id', profile.id).eq('module_id', moduleId).in('type', ['quiz_pass', 'quiz_perfect']).maybeSingle()
        : Promise.resolve({ data: null }),
    ])
    if (qRes.data) setQuestions(qRes.data)
    if (passedRes.data) setAlreadyPassed(true)
  }

  function handleSelect(optionId) {
    if (selected !== null) return
    setSelected(optionId)
  }

  function handleNext() {
    const q = questions[current]
    const isCorrect = selected === q.correct_option_id
    const newAnswers = [...answers, { questionId: q.id, correct: isCorrect }]
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      finishQuiz(newAnswers)
    }
  }

  async function finishQuiz(finalAnswers) {
    setDone(true)
    if (alreadyPassed || !profile?.id) return

    const correctCount = finalAnswers.filter(a => a.correct).length
    const score = Math.round((correctCount / questions.length) * 100)
    const isPerfect = score === 100
    const isPassed = score >= 70

    if (isPassed) {
      const pts = isPerfect ? POINTS.QUIZ_PERFECT : POINTS.QUIZ_PASS
      const eventType = isPerfect ? 'quiz_perfect' : 'quiz_pass'

      await supabase.from('user_progress').insert({
        user_id: profile.id, module_id: moduleId,
        type: eventType, score, points_awarded: pts,
      })
      // Persist points to DB + log event (parallel)
      await Promise.all([
        supabase.rpc('increment_points', { p_user_id: profile.id, p_amount: pts }),
        supabase.from('point_events').insert({
          user_id: profile.id, event_type: eventType, points: pts, reference_id: moduleId,
        }),
      ])
      addPoints(pts)
    }
  }

  if (questions.length === 0) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton" style={{ width: 200, height: 24 }} />
    </div>
  )

  if (done) {
    const score = Math.round((answers.filter(a => a.correct).length / questions.length) * 100)
    const isPerfect = score === 100
    const isPassed = score >= 70
    return <ResultsScreen score={score} total={questions.length} correct={answers.filter(a => a.correct).length} isPerfect={isPerfect} isPassed={isPassed} alreadyPassed={alreadyPassed} onBack={() => navigate(`/learn/${moduleId}`)} />
  }

  const q = questions[current]
  const options = q.options ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ background: 'var(--bb-navy-dark)', padding: '16px 20px', flexShrink: 0 }}>
        <button onClick={() => navigate(`/learn/${moduleId}`)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 12, padding: 0 }}>
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--bb-red)', fontWeight: 700 }}>
            Q{current + 1} OF {questions.length}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            {alreadyPassed ? 'Practice mode' : '+60 pts available'}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((current + 1) / questions.length) * 100}%`, background: 'linear-gradient(90deg, #8FAEE8, var(--bb-red))', borderRadius: 999, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto', padding: '24px 16px' }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--bb-black)', lineHeight: 1.5, marginBottom: 24 }}>
          {q.question}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {options.map(opt => {
            const isSelected = selected === opt.id
            const isCorrect = selected !== null && opt.id === q.correct_option_id
            const isWrong = isSelected && opt.id !== q.correct_option_id

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                style={{
                  padding: '14px 18px', borderRadius: 14, border: `2px solid ${isCorrect ? 'var(--bb-navy)' : isWrong ? 'var(--bb-red)' : isSelected ? 'var(--bb-navy-light)' : 'var(--bb-grey-200)'}`,
                  background: isCorrect ? 'var(--bb-navy-light)' : isWrong ? 'var(--bb-red-light)' : '#fff',
                  fontSize: 15, color: isCorrect ? 'var(--bb-navy)' : isWrong ? 'var(--bb-red)' : 'var(--bb-grey-700)',
                  fontWeight: isCorrect || isWrong ? 700 : 400,
                  fontFamily: 'var(--font-body)', cursor: selected !== null ? 'default' : 'pointer',
                  textAlign: 'left', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                }}
              >
                <span>{opt.text}</span>
                {isCorrect && <span>✓</span>}
                {isWrong && <span>✗</span>}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {selected !== null && q.explanation && (
          <div style={{ background: 'var(--bb-navy-light)', borderLeft: '4px solid var(--bb-navy)', borderRadius: '0 12px 12px 0', padding: '14px 16px', marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--bb-navy)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>Explanation</p>
            <p style={{ fontSize: 14, color: 'var(--bb-grey-700)', lineHeight: 1.6 }}>{q.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <button
            onClick={handleNext}
            style={{
              width: '100%', padding: '16px', borderRadius: 999, border: 'none',
              background: 'var(--bb-navy)', color: '#fff',
              fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer',
            }}
          >
            {current < questions.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        )}
      </div>
    </div>
  )
}

function ResultsScreen({ score, total, correct, isPerfect, isPassed, alreadyPassed, onBack }) {
  const pts = isPerfect ? 60 : isPassed ? 30 : 0
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', background: 'var(--bb-off-white)' }}>
      <span style={{ fontSize: 64, marginBottom: 16 }}>{isPerfect ? '🎯' : isPassed ? '🥇' : '📚'}</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--bb-navy)', marginBottom: 8, textAlign: 'center' }}>
        {isPerfect ? 'Perfect Score!' : isPassed ? 'Quiz Passed!' : 'Keep Studying'}
      </h1>
      <p style={{ fontSize: 16, color: 'var(--bb-grey-700)', marginBottom: 8 }}>
        {correct}/{total} correct · {score}%
      </p>
      {!alreadyPassed && pts > 0 && (
        <div style={{ background: 'var(--bb-red)', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, padding: '10px 24px', borderRadius: 999, marginBottom: 32 }}>
          +{pts} pts earned!
        </div>
      )}
      {alreadyPassed && <p style={{ fontSize: 13, color: 'var(--bb-grey-400)', marginBottom: 32 }}>Practice run — no extra points awarded</p>}
      {!alreadyPassed && !isPassed && <p style={{ fontSize: 13, color: 'var(--bb-grey-400)', marginBottom: 32 }}>Score 70%+ to earn points. Review the lessons and try again!</p>}
      <button onClick={onBack} style={{ width: '100%', maxWidth: 320, padding: '16px', borderRadius: 999, border: 'none', background: 'var(--bb-navy)', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
        Back to Module
      </button>
    </div>
  )
}
