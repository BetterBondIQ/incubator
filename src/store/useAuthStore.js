import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  profile: null,
  loading: true,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),

  logout: () => set({ session: null, user: null, profile: null }),
}))
