import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Evita múltiplos clients durante HMR (Hot Module Replacement)
const globalForSupabase = global as unknown as {
  supabase: ReturnType<typeof createClient> | undefined;
};

export const supabase =
  globalForSupabase.supabase ??
  createClient(supabaseUrl, supabaseAnonKey);

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase;
}
