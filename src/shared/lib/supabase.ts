import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const isPlaceholderUrl = supabaseUrl.includes('placeholder.supabase.co');
const isPlaceholderKey = supabaseAnonKey === 'placeholder-anon-key' || !supabaseAnonKey;

/** True when .env has real values (not build-time placeholders). */
export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey) && !isPlaceholderUrl && !isPlaceholderKey;

/**
 * Values come from next.config `env` (maps VITE_* → NEXT_PUBLIC_*).
 * If requests still hit the placeholder host, set .env / .env.local and restart `next dev`.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
