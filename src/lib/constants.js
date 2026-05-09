export const POINTS = {
  LOGIN:           5,
  LESSON:          20,
  MODULE_COMPLETE: 50,
  QUIZ_PASS:       30,
  QUIZ_PERFECT:    60,
  STREAK_7:        75,
  STREAK_14:       150,
  CATEGORY_MASTER: 100,
  ALL_COMPLETE:    250,
}

export const RANK_TIERS = [
  { name: 'Bronze',   min: 0,    max: 299,  emoji: '🥉', color: '#CD7F32' },
  { name: 'Silver',   min: 300,  max: 699,  emoji: '🥈', color: '#A8A9AD' },
  { name: 'Gold',     min: 700,  max: 1199, emoji: '🥇', color: '#D4AF37' },
  { name: 'Platinum', min: 1200, max: 1999, emoji: '💎', color: '#1A3670' },
  { name: 'Diamond',  min: 2000, max: Infinity, emoji: '👑', color: '#E5302A' },
]

export function getTier(points) {
  return RANK_TIERS.find(t => points >= t.min && points <= t.max) ?? RANK_TIERS[0]
}

export function getProgressToNextTier(points) {
  const current = getTier(points)
  const idx = RANK_TIERS.indexOf(current)
  if (idx === RANK_TIERS.length - 1) return { pct: 100, needed: 0, next: null }
  const next = RANK_TIERS[idx + 1]
  const range = next.min - current.min
  const progress = points - current.min
  return { pct: Math.round((progress / range) * 100), needed: next.min - points, next }
}
