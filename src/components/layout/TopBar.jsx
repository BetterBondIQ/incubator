import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePointsStore } from '../../store/usePointsStore'
import { BetterBondLogo } from '../ui/BetterBondLogo'

export function TopBar() {
  const { totalPoints } = usePointsStore()
  const prevPoints = useRef(totalPoints)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (totalPoints !== prevPoints.current) {
      setBurst(true)
      const t = setTimeout(() => setBurst(false), 600)
      prevPoints.current = totalPoints
      return () => clearTimeout(t)
    }
  }, [totalPoints])

  return (
    <div style={{
      flexShrink: 0,
      background: 'var(--bb-navy-dark)',
      padding: '12px 20px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <BetterBondLogo size={28} darkBg />
        <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.2px' }}>
          BetterBond<span style={{ color: '#8FAEE8', fontWeight: 400 }}> IQ</span>
        </span>
      </div>

      <motion.div
        animate={burst ? { scale: [1, 1.25, 0.95, 1] } : { scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--bb-red)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13,
          padding: '7px 14px', borderRadius: 999,
          position: 'relative', overflow: 'hidden',
        }}
      >
        <span>⭐</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={totalPoints}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {totalPoints.toLocaleString()} pts
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
