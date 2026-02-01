
import { createClient } from '@supabase/supabase-js';

/**
 * Access environment variables for Supabase.
 * Robustly handles browser environments where 'process' might be undefined.
 */

// For Vite, use import.meta.env.VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Provide dummy values to prevent initialization crash.
// The library requires non-empty strings for both arguments.
const finalUrl = supabaseUrl && supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder-project.supabase.co';
const finalKey = supabaseAnonKey || 'placeholder-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase configuration missing. Database features will be unavailable.');
}

export const supabase = createClient(finalUrl, finalKey);
