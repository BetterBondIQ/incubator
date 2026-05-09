import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { BetterBondLogo } from '../../components/ui/BetterBondLogo'

export function OTPScreen() {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCooldown, setResendCooldown] = useState(60)
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state?.email ?? ''

  useEffect(() => {
    refs[0].current?.focus()
    const interval = setInterval(() => {
      setResendCooldown(c => c > 0 ? c - 1 : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  async function verify(code) {
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })
    setLoading(false)
    if (err) {
      setError('Invalid or expired code. Try again.')
      setDigits(['', '', '', '', '', ''])
      refs[0].current?.focus()
    }
    // On success App.jsx onAuthStateChange will redirect automatically
  }

  function handleDigit(idx, val) {
    const cleaned = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[idx] = cleaned
    setDigits(next)

    if (cleaned && idx < 5) refs[idx + 1].current?.focus()

    const code = next.join('')
    if (code.length === 6) verify(code)
  }

  function handleKeyDown(idx, e) {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      refs[idx - 1].current?.focus()
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return
    await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
    setResendCooldown(60)
    setError('')
    setDigits(['', '', '', '', '', ''])
    refs[0].current?.focus()
  }

  return (
    <div style={{
      height: '100dvh',
      background: 'var(--bb-navy-dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 32px',
    }}>
      <div style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <BetterBondLogo size={36} darkBg />
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: '#fff', marginBottom: 8, lineHeight: 1.1 }}>
          Check your <em style={{ color: '#8FAEE8' }}>email.</em>
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 8, lineHeight: 1.6 }}>
          We sent a 6-digit code to
        </p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 700, marginBottom: 40 }}>
          {email}
        </p>

        {/* 6-digit inputs */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleDigit(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              disabled={loading}
              style={{
                width: 48, height: 56,
                borderRadius: 12,
                border: `2px solid ${d ? 'var(--bb-red)' : 'rgba(255,255,255,0.15)'}`,
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: 22,
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          ))}
        </div>

        {error && (
          <p style={{
            color: '#FF8C88', fontSize: 13, marginBottom: 16,
            padding: '10px 14px', background: 'rgba(229,48,42,0.12)',
            borderRadius: 10, lineHeight: 1.5,
          }}>
            {error}
          </p>
        )}

        {loading && (
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 16 }}>
            Verifying…
          </p>
        )}

        <button
          onClick={handleResend}
          disabled={resendCooldown > 0}
          style={{
            background: 'none', border: 'none', cursor: resendCooldown > 0 ? 'default' : 'pointer',
            color: resendCooldown > 0 ? 'rgba(255,255,255,0.3)' : 'var(--bb-red)',
            fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)',
            display: 'block', margin: '0 auto 16px',
          }}
        >
          {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
        </button>

        <button
          onClick={() => navigate('/login')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'var(--font-body)',
          }}
        >
          ← Back to email
        </button>
      </div>
    </div>
  )
}
