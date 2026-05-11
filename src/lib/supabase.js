import { createClient } from '@supabase/supabase-js'
import { mockSupabase } from './supabaseMock'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)
const useLiveSupabase = import.meta.env.VITE_USE_LIVE_SUPABASE === 'true'
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true' || !useLiveSupabase || !hasSupabaseEnv

if (isDemoMode) {
  console.info('Using built-in demo course data.')
}

const realSupabase = createClient(supabaseUrl ?? 'https://placeholder.supabase.co', supabaseAnonKey ?? 'placeholder')

export const supabase = isDemoMode ? mockSupabase : realSupabase
