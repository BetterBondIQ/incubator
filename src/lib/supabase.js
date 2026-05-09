import { createClient } from '@supabase/supabase-js'
import { mockSupabase } from './supabaseMock'

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!isDemoMode && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('Supabase env vars missing — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local')
}

const realSupabase = createClient(supabaseUrl ?? 'https://placeholder.supabase.co', supabaseAnonKey ?? 'placeholder')

export const supabase = isDemoMode ? mockSupabase : realSupabase
