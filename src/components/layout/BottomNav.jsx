import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { id: 'home',    path: '/home',    icon: '🏠', label: 'Home' },
  { id: 'learn',   path: '/learn',   icon: '📚', label: 'Learn' },
  { id: 'rank',    path: '/rank',    icon: '🏆', label: 'Rank' },
  { id: 'profile', path: '/profile', icon: '👤', label: 'Me' },
]

export function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const activeTab = TABS.find(t => pathname.startsWith(t.path))?.id ?? 'home'

  return (
    <div style={{
      flexShrink: 0,
      width: '100%',
      minHeight: 64,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      background: '#fff',
      borderTop: '1px solid var(--bb-grey-200)',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 8,
      boxShadow: 'var(--bb-shadow-nav)',
      zIndex: 100,
    }}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '4px 0',
              background: 'none',
              border: 'none',
              minHeight: 44,
              transition: 'transform 0.15s',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.92)'}
            onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              color: isActive ? 'var(--bb-navy)' : 'var(--bb-grey-400)',
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
