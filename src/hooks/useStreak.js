import { useAuthStore } from '../store/useAuthStore'

export function useStreak() {
  const { profile } = useAuthStore()

  const streak = profile?.streak_current ?? 0
  const streakBest = profile?.streak_best ?? 0

  // How many more days until the next 7-day bonus
  const daysToBonus = streak === 0 ? 7 : 7 - (streak % 7) || 7

  return { streak, streakBest, daysToBonus }
}
