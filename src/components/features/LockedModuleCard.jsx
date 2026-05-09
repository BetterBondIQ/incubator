import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

const CARD_HEIGHT = 188

export function LockedModuleCard({ module, index = 0 }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setFlipped(f => !f)}
      style={{ height: CARD_HEIGHT, perspective: '900px', cursor: 'pointer', marginBottom: 10 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
          willChange: 'transform',
        }}
      >
        {/* ── FRONT ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'var(--bb-navy-dark)',
          backgroundImage: `
            radial-gradient(circle at 88% 12%, rgba(229,48,42,0.18), transparent 55%),
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 48px 48px, 48px 48px',
          borderRadius: 16,
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--bb-shadow-card)',
        }}>
          {/* Top row: module number + LOCKED badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
              background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)',
              padding: '3px 10px', borderRadius: 999, letterSpacing: 1.5,
            }}>
              MODULE {module.number}
            </span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                background: 'rgba(229,48,42,0.18)', color: 'var(--bb-red)',
                padding: '3px 10px', borderRadius: 999, letterSpacing: 1.5,
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              <Lock size={9} /> LOCKED
            </motion.span>
          </div>

          {/* Middle: lock icon + title + teaser */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 52, height: 52, borderRadius: 15, flexShrink: 0,
                background: 'rgba(229,48,42,0.12)',
                border: '1.5px solid rgba(229,48,42,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Lock size={22} color="var(--bb-red)" strokeWidth={2} />
            </motion.div>
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontSize: 14, fontWeight: 700, color: '#fff',
                lineHeight: 1.3, marginBottom: 4,
                fontFamily: 'var(--font-body)',
              }}>
                {module.title}
              </p>
              <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.4 }}>
                {module.teaser}
              </p>
            </div>
          </div>

          {/* Bottom: tap hint */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
            <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
              Tap to preview
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}
            >
              →
            </motion.span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'var(--bb-navy)',
          backgroundImage: 'radial-gradient(circle at 10% 90%, rgba(229,48,42,0.1), transparent 50%)',
          borderRadius: 16,
          padding: '15px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          boxShadow: 'var(--bb-shadow-card)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ flex: 1, paddingRight: 8 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, color: '#8FAEE8',
                fontWeight: 700, letterSpacing: 1.5, display: 'block', marginBottom: 3,
              }}>
                MODULE {module.number}
              </span>
              <p style={{
                fontSize: 13, fontWeight: 700, color: '#fff',
                lineHeight: 1.3, fontFamily: 'var(--font-body)',
              }}>
                {module.title}
              </p>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)',
              padding: '3px 8px', borderRadius: 999, letterSpacing: 1, flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>
              COMING SOON
            </span>
          </div>

          {/* Bullet points */}
          <div style={{ flex: 1 }}>
            {module.bullets.map((bullet, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 5, alignItems: 'flex-start' }}>
                <span style={{
                  color: 'var(--bb-red)', fontSize: 9, marginTop: 3,
                  flexShrink: 0, fontWeight: 700,
                }}>▸</span>
                <span style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.45, fontFamily: 'var(--font-body)',
                }}>
                  {bullet}
                </span>
              </div>
            ))}
          </div>

          {/* Footer badge */}
          <div style={{ marginTop: 8 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              background: 'rgba(229,48,42,0.15)', color: 'var(--bb-red)',
              padding: '4px 10px', borderRadius: 999, letterSpacing: 0.8,
              display: 'inline-flex', alignItems: 'center', gap: 5,
            }}>
              🎓 UNLOCKS AFTER LIVE TRAINING SESSION
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
