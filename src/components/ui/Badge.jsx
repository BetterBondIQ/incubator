const VARIANTS = {
  navy: {
    background: 'var(--bb-navy-light)',
    color: 'var(--bb-navy)',
  },
  red: {
    background: 'var(--bb-red-light)',
    color: 'var(--bb-red)',
  },
  dark: {
    background: 'rgba(229,48,42,0.2)',
    border: '1px solid rgba(229,48,42,0.4)',
    color: '#FF9590',
  },
  green: {
    background: 'rgba(34,197,94,0.1)',
    color: '#16a34a',
  },
  grey: {
    background: 'var(--bb-grey-100)',
    color: 'var(--bb-grey-700)',
  },
}

export function Badge({ children, variant = 'navy', style }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 10px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      whiteSpace: 'nowrap',
      ...VARIANTS[variant],
      ...style,
    }}>
      {children}
    </span>
  )
}
