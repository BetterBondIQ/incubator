import { getTier } from '../../lib/constants'

// Tier badge — shows emoji + tier name for a given points total
export function RankBadge({ points, darkBg = false, style }) {
  const tier = getTier(points)

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 12px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-body)',
      background: darkBg ? 'rgba(229,48,42,0.2)' : 'var(--bb-navy-light)',
      border: darkBg ? '1px solid rgba(229,48,42,0.4)' : 'none',
      color: darkBg ? '#FF9590' : 'var(--bb-navy)',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {tier.emoji} {tier.name} Tier
    </span>
  )
}

// Avatar circle with initial — used in leaderboard rows and profile header
export function AvatarCircle({ name = 'U', size = 36, inverted = false, style }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: inverted ? 'linear-gradient(135deg, var(--bb-red), #FF6B65)' : 'var(--bb-navy-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.35,
      fontWeight: 800,
      color: inverted ? '#fff' : 'var(--bb-navy)',
      flexShrink: 0,
      ...style,
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  )
}
