
import { createClient } from '@supabase/supabase-js';

// Fallback credentials (hardcoded to ensure app works if env vars fail)
const FALLBACK_URL = "https://raowzaqjwskepprvzjcy.supabase.co";
const FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb3d6YXFqd3NrZXBwcnZ6amN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzM4NDAsImV4cCI6MjA3OTE0OTg0MH0.5_2v_irWFSfGytd5NCd-XQSMsPvSAapg3v3cEMbBhJw";

let supabaseUrl = FALLBACK_URL;
let supabaseKey = FALLBACK_KEY;

try {
  // Robust check for environment variables
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.VITE_SUPABASE_URL) supabaseUrl = process.env.VITE_SUPABASE_URL;
    if (process.env.VITE_SUPABASE_ANON_KEY) supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  }
  
  // Also check import.meta for Vite-specific build
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    if (import.meta.env.VITE_SUPABASE_URL) supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    // @ts-ignore
    if (import.meta.env.VITE_SUPABASE_ANON_KEY) supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  }
} catch (error) {
  console.warn("Using fallback Supabase credentials due to env access error.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
