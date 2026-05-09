import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/useAuthStore'

export function useLeaderboard({ tab = 'All Time' } = {}) {
  const queryClient = useQueryClient()
  const { profile } = useAuthStore()
  const scoreCol = tab === 'Monthly' ? 'monthly_points' : 'total_points'

  // Realtime subscription — invalidates cache on any user row update
  useEffect(() => {
    const channel = supabase
      .channel('leaderboard-realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users' }, () => {
        queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [queryClient])

  return useQuery({
    queryKey: ['leaderboard', tab, profile?.team_id],
    queryFn: async () => {
      let query = supabase
        .from('users')
        .select('id,full_name,total_points,monthly_points')
        .order(scoreCol, { ascending: false })
        .limit(50)

      if (tab === 'My Team' && profile?.team_id) {
        query = query.eq('team_id', profile.team_id)
      }

      const { data, error } = await query
      if (error) throw error
      return data ?? []
    },
    enabled: !!profile?.id,
  })
}
