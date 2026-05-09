import { create } from 'zustand'

export const useAppStore = create((set) => ({
  activeTab: 'home',
  rankUpModal: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  showRankUp: (tier) => set({ rankUpModal: tier }),
  dismissRankUp: () => set({ rankUpModal: null }),
}))
