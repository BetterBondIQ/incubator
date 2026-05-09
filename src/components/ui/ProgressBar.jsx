import { motion } from 'framer-motion'

export function ProgressBar({
  value = 0,
  height = 6,
  completed = false,
  delay = 0,
  style,
}) {
  const pct = Math.min(100, Math.max(0, value))

  return (
    <div style={{
      height,
      background: 'var(--bb-grey-100)',
      borderRadius: 999,
      overflow: 'hidden',
      ...style,
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: '100%',
          background: completed
            ? 'var(--bb-navy)'
            : 'linear-gradient(90deg, var(--bb-navy), var(--bb-red))',
          borderRadius: 999,
        }}
      />
    </div>
  )
}
