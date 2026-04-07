import { createClient } from "@supabase/supabase-js";

// Support both naming conventions for env vars
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  "";

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  "";

// Client-side (anon key, for form submissions + page tracking)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side (service role key, for admin operations)
export function createServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Get the admin token for comparison
export function getAdminToken() {
  return supabaseServiceKey;
}
