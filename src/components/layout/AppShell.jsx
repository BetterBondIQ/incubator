import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'
import { RankUpModal } from '../ui/RankUpModal'

const variants = {
  initial:  { opacity: 0, x: 40 },
  animate:  { opacity: 1, x: 0 },
  exit:     { opacity: 0, x: -40 },
}

export function AppShell() {
  const location = useLocation()

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bb-off-white)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* iOS safe area top */}
      <div style={{ flexShrink: 0, height: 'env(safe-area-inset-top, 0px)', background: 'var(--bb-navy-dark)' }} />

      <TopBar />

      {/* Screen content with page transitions */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname.split('/')[1]}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'absolute', inset: 0 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav />
      <RankUpModal />
    </div>
  )
}
