import { createClient } from "@supabase/supabase-js";

console.log("All env vars:", import.meta.env);
console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Anon key:", import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);