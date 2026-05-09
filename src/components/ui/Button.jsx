const VARIANTS = {
  primary: {
    background: 'var(--bb-red)',
    color: '#fff',
    border: 'none',
  },
  navy: {
    background: 'var(--bb-navy)',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--bb-navy)',
    border: '1.5px solid var(--bb-navy)',
  },
  ghost: {
    background: 'transparent',
    color: '#fff',
    border: '1.5px solid rgba(255,255,255,0.25)',
  },
  muted: {
    background: 'var(--bb-grey-100)',
    color: 'var(--bb-grey-400)',
    border: 'none',
  },
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  fullWidth = false,
  size = 'md',
  style,
  type = 'button',
}) {
  const padding = size === 'sm' ? '10px 18px' : size === 'lg' ? '18px 32px' : '14px 24px'
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 17 : 15

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding,
        borderRadius: 999,
        fontSize,
        fontWeight: 700,
        fontFamily: 'var(--font-body)',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        minHeight: 44,
        transition: 'transform 0.15s, box-shadow 0.15s, background 0.15s',
        ...VARIANTS[variant],
        ...style,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
    >
      {children}
    </button>
  )
}
