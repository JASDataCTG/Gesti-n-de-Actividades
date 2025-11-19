import { createClient } from '@supabase/supabase-js';

// Fallback credentials (hardcoded to ensure app works if env vars fail)
const FALLBACK_URL = "https://raowzaqjwskepprvzjcy.supabase.co";
const FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb3d6YXFqd3NrZXBwcnZ6amN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzM4NDAsImV4cCI6MjA3OTE0OTg0MH0.5_2v_irWFSfGytd5NCd-XQSMsPvSAapg3v3cEMbBhJw";

let supabaseUrl = FALLBACK_URL;
let supabaseKey = FALLBACK_KEY;

try {
  // Robust check for Vite environment variables
  // We check if import.meta and import.meta.env exist before accessing properties
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.VITE_SUPABASE_URL) {
      supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    }
    if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
      supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    }
  }
} catch (error) {
  // If accessing import.meta fails, we silently ignore and use fallbacks
  console.warn("Using fallback Supabase credentials.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);