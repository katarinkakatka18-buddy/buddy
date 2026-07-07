import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

// Ak premenné prostredia nie sú nastavené alebo sú neplatné, appka
// nebude crashovať - jednoducho nebude ukladať/čítať reálne registrácie,
// kým sa Supabase nepripojí správne.
function buildClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null
  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (err) {
    console.error('[Buddy] Supabase sa nepodarilo inicializovať – skontroluj VITE_SUPABASE_URL a VITE_SUPABASE_ANON_KEY.', err)
    return null
  }
}

export const supabase = buildClient()

export const SUPABASE_ENABLED = Boolean(supabase)
