import { usePointsStore } from '../../store/usePointsStore'

// Standalone chip showing a fixed points value — e.g. "+20 pts"
export function PointsChip({ points, style }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'var(--bb-red)',
      color: '#fff',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 11,
      padding: '4px 10px',
      borderRadius: 999,
      whiteSpace: 'nowrap',
      ...style,
    }}>
      +{points} pts
    </span>
  )
}

// Live chip in the TopBar — reads from Zustand store, animates on change
export function LivePointsChip() {
  const { totalPoints, animating } = usePointsStore()
  return (
    <div
      className={animating ? 'animate-points' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'var(--bb-red)',
        color: '#fff',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 13,
        padding: '7px 14px',
        borderRadius: 999,
      }}
    >
      <span>⭐</span>
      <span>{totalPoints.toLocaleString()} pts</span>
    </div>
  )
}
