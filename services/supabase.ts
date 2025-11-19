import { createClient } from '@supabase/supabase-js';

// Acceso seguro a las variables de entorno para evitar errores si import.meta.env es undefined
// Usamos 'any' para evitar errores de tipado estricto de TypeScript si el objeto está vacío
const env = import.meta.env || ({} as any);

const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Advertencia: Las variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están definidas. La conexión a la base de datos fallará.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);