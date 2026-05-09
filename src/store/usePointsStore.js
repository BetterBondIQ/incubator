import { create } from 'zustand'
import { getTier } from '../lib/constants'
import { useAppStore } from './useAppStore'

export const usePointsStore = create((set, get) => ({
  totalPoints: 0,
  monthlyPoints: 0,
  animating: false,

  setPoints: (total, monthly) => set({ totalPoints: total, monthlyPoints: monthly }),

  addPoints: (amount) => {
    const prevTotal = get().totalPoints
    const nextTotal = prevTotal + amount
    const prevTierName = getTier(prevTotal).name
    const nextTier = getTier(nextTotal)

    set({
      totalPoints: nextTotal,
      monthlyPoints: get().monthlyPoints + amount,
      animating: true,
    })
    setTimeout(() => set({ animating: false }), 500)

    if (prevTierName !== nextTier.name) {
      useAppStore.getState().showRankUp(nextTier)
    }
  },
}))
