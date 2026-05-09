import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

export function RankUpModal() {
  const { rankUpModal, dismissRankUp } = useAppStore()

  return (
    <AnimatePresence>
      {rankUpModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={dismissRankUp}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(17, 37, 80, 0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0.72, opacity: 0, y: 48 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 18, stiffness: 280 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bb-navy-dark)',
              backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(229,48,42,0.2), transparent 60%)',
              borderRadius: 24, padding: '44px 32px 36px', textAlign: 'center',
              maxWidth: 320, width: '100%',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'var(--bb-shadow-float)',
            }}
          >
            {/* Tier emoji */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10, stiffness: 180, delay: 0.18 }}
              style={{ fontSize: 76, lineHeight: 1, marginBottom: 20, display: 'block' }}
            >
              {rankUpModal.emoji}
            </motion.div>

            {/* Label */}
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
              letterSpacing: 2, color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase', marginBottom: 6,
            }}>
              Rank Up!
            </p>

            {/* Tier name */}
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 34,
              color: '#fff', marginBottom: 10, lineHeight: 1.15,
            }}>
              {rankUpModal.name}
            </p>

            {/* Sub copy */}
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6, marginBottom: 32, maxWidth: 240, margin: '0 auto 32px',
            }}>
              You've reached <strong style={{ color: '#fff' }}>{rankUpModal.name} Tier</strong>.
              Keep completing modules and quizzes to climb higher.
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={dismissRankUp}
              style={{
                background: 'var(--bb-red)', color: '#fff',
                border: 'none', borderRadius: 999, padding: '14px 32px',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font-body)', width: '100%',
                boxShadow: '0 4px 16px rgba(229,48,42,0.35)',
              }}
            >
              Keep Going →
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
