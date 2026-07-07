import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Ak premenné prostredia nie sú nastavené (napr. lokálne bez .env), appka
// nebude crashovať - jednoducho nebude ukladať/čítať reálne registrácie,
// kým sa Supabase nepripojí.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const SUPABASE_ENABLED = Boolean(supabase)
