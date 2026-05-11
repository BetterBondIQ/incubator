import { createClient } from '@supabase/supabase-js'
import { mockSupabase } from './supabaseMock'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true' || !hasSupabaseEnv

if (!hasSupabaseEnv) {
  console.warn('Supabase env vars missing. Using built-in demo data for this build.')
}

const realSupabase = createClient(supabaseUrl ?? 'https://placeholder.supabase.co', supabaseAnonKey ?? 'placeholder')

export const supabase = isDemoMode ? mockSupabase : realSupabase
