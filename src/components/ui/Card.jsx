export function Card({
  children,
  onClick,
  completed = false,
  padding = '16px',
  radius = 16,
  style,
}) {
  const interactive = !!onClick

  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        border: `1px solid var(--bb-grey-200)`,
        borderTop: completed ? '3px solid var(--bb-navy)' : undefined,
        borderRadius: radius,
        padding,
        boxShadow: 'var(--bb-shadow-card)',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
        ...style,
      }}
      onMouseEnter={e => {
        if (!interactive) return
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = 'var(--bb-shadow-float)'
        e.currentTarget.style.borderColor = 'var(--bb-navy-light)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--bb-shadow-card)'
        e.currentTarget.style.borderColor = 'var(--bb-grey-200)'
      }}
      onMouseDown={e => { if (interactive) e.currentTarget.style.transform = 'scale(0.97)' }}
      onMouseUp={e => { if (interactive) e.currentTarget.style.transform = 'translateY(-4px)' }}
    >
      {children}
    </div>
  )
}

export function DarkCard({ children, style }) {
  return (
    <div style={{
      background: 'var(--bb-navy-dark)',
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
      borderRadius: 18,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {/* Red glow accent */}
      <div style={{
        position: 'absolute', right: '-5%', top: '-5%',
        width: '50%', height: '60%',
        background: 'radial-gradient(circle, rgba(229,48,42,0.12), transparent 65%)',
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  )
}
