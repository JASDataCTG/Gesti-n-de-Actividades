
import { createClient } from '@supabase/supabase-js';

// Best Practice: Use environment variables
// Vercel will inject these during build time
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
