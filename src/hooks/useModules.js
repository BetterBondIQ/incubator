import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useModules({ limit } = {}) {
  return useQuery({
    queryKey: ['modules', limit],
    queryFn: async () => {
      let query = supabase
        .from('modules')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      if (limit) query = query.limit(limit)
      const { data, error } = await query
      if (error) throw error
      return data ?? []
    },
    staleTime: 1000 * 60 * 10, // modules change rarely
  })
}
