
import { createClient } from '@supabase/supabase-js';

// Credenciales de respaldo (Hardcoded para asegurar que la app funcione siempre)
const FALLBACK_URL = "https://raowzaqjwskepprvzjcy.supabase.co";
const FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb3d6YXFqd3NrZXBwcnZ6amN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzM4NDAsImV4cCI6MjA3OTE0OTg0MH0.5_2v_irWFSfGytd5NCd-XQSMsPvSAapg3v3cEMbBhJw";

let supabaseUrl = FALLBACK_URL;
let supabaseKey = FALLBACK_KEY;

// En Vite/Vercel se usa import.meta.env en lugar de process.env
// @ts-ignore
if (typeof import.meta !== 'undefined' && import.meta.env) {
  // @ts-ignore
  if (import.meta.env.VITE_SUPABASE_URL) supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  // @ts-ignore
  if (import.meta.env.VITE_SUPABASE_ANON_KEY) supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
}

export const supabase = createClient(supabaseUrl, supabaseKey);
