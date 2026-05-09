import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/useAuthStore'

export function useProgress(moduleId = null) {
  const { profile } = useAuthStore()

  return useQuery({
    queryKey: ['progress', profile?.id, moduleId],
    queryFn: async () => {
      let query = supabase
        .from('user_progress')
        .select('module_id,lesson_id,type,score,points_awarded,completed_at')
        .eq('user_id', profile.id)
      if (moduleId) query = query.eq('module_id', moduleId)
      const { data, error } = await query
      if (error) throw error
      return data ?? []
    },
    enabled: !!profile?.id,
  })
}

// Call after marking a lesson/quiz complete to refresh progress cache
export function useInvalidateProgress() {
  const queryClient = useQueryClient()
  const { profile } = useAuthStore()
  return () => queryClient.invalidateQueries({ queryKey: ['progress', profile?.id] })
}
