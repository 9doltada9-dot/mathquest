import { createClient } from '@supabase/supabase-js'

let supabaseClient: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (typeof window === 'undefined') {
    // Server-side: return dummy client
    return createClient('https://placeholder.supabase.co', 'placeholder')
  }

  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      console.warn('⚠️ Supabase env vars missing')
      return createClient('https://placeholder.supabase.co', 'placeholder')
    }

    supabaseClient = createClient(url, key)
  }

  return supabaseClient
}

export const supabase = {
  auth: {
    onAuthStateChange: (cb: any) => getSupabaseClient().auth.onAuthStateChange(cb),
    signInWithPassword: (args: any) => getSupabaseClient().auth.signInWithPassword(args),
    signUp: (args: any) => getSupabaseClient().auth.signUp(args),
    signOut: () => getSupabaseClient().auth.signOut(),
    getSession: () => getSupabaseClient().auth.getSession(),
    getUser: () => getSupabaseClient().auth.getUser(),
  },
  from: (table: string) => getSupabaseClient().from(table),
}
