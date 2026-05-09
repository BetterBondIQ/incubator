import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { BetterBondLogo } from '../../components/ui/BetterBondLogo'

export function LoginScreen() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSendOTP(e) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true },
    })

    setLoading(false)
    if (err) {
      setError(err.message.includes('not found') || err.message.includes('registered')
        ? 'This email is not registered. Contact your manager to get access.'
        : err.message)
    } else {
      navigate('/login/verify', { state: { email } })
    }
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
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background radial */}
      <div style={{
        position: 'absolute', right: '-10%', top: '-10%',
        width: '60%', height: '80%',
        background: 'radial-gradient(ellipse at center, rgba(229,48,42,0.08), transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 48 }}>
          <BetterBondLogo size={40} darkBg />
          <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>
            BetterBond<span style={{ color: '#8FAEE8', fontWeight: 400 }}> IQ</span>
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 36,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 8,
          textAlign: 'center',
        }}>
          Welcome <em style={{ color: '#8FAEE8' }}>back.</em>
        </h1>
        <p style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          marginBottom: 40,
          lineHeight: 1.6,
        }}>
          Sign in with your BetterBond email address.
        </p>

        <form onSubmit={handleSendOTP}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 14,
              border: '1.5px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.07)',
              color: '#fff',
              fontSize: 16,
              fontFamily: 'var(--font-body)',
              outline: 'none',
              marginBottom: 12,
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
          />

          {error && (
            <p style={{
              color: '#FF8C88',
              fontSize: 13,
              marginBottom: 12,
              padding: '10px 14px',
              background: 'rgba(229,48,42,0.12)',
              borderRadius: 10,
              lineHeight: 1.5,
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim()}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 999,
              border: 'none',
              background: loading ? 'rgba(229,48,42,0.5)' : 'var(--bb-red)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              cursor: loading ? 'default' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 52,
            }}
          >
            {loading ? 'Sending code…' : 'Send OTP →'}
          </button>
        </form>
      </div>
    </div>
  )
}
