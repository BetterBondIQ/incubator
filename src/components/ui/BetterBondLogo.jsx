export function BetterBondLogo({ size = 32, darkBg = false }) {
  return (
    <svg width={size} height={size * 0.91} viewBox="0 0 32 29" fill="none">
      <circle
        cx="12" cy="17" r="10.5"
        stroke={darkBg ? '#FFFFFF' : '#1A3670'}
        strokeWidth="3.5"
      />
      <circle
        cx="21" cy="10" r="8"
        stroke="#E5302A"
        strokeWidth="3"
      />
    </svg>
  )
}
