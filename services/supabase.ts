
import { createClient } from '@supabase/supabase-js';

// 1. Intentar leer variables de entorno (Vercel)
// Usamos 'any' para evitar errores de tipado estricto si el entorno es indefinido
const env = import.meta.env || ({} as any);

let supabaseUrl = env.VITE_SUPABASE_URL;
let supabaseKey = env.VITE_SUPABASE_ANON_KEY;

// 2. Fallback: Si no hay variables de entorno (ej. error de config en Vercel), usar las credenciales directas
// Esto asegura que la aplicación funcione sí o sí.
if (!supabaseUrl || !supabaseKey) {
  console.log("Usando credenciales de respaldo...");
  supabaseUrl = "https://raowzaqjwskepprvzjcy.supabase.co";
  supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb3d6YXFqd3NrZXBwcnZ6amN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzM4NDAsImV4cCI6MjA3OTE0OTg0MH0.5_2v_irWFSfGytd5NCd-XQSMsPvSAapg3v3cEMbBhJw";
}

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error Crítico: No se encontraron credenciales de Supabase.");
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
