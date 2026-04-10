// Centralized admin token logic – one place, no inconsistencies
export function getAdminToken(): string {
  // Try all possible env var names
  const token =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    "";
  // Filter out empty strings
  return token.trim();
}

export function isValidAdminToken(token: string | null): boolean {
  if (!token) return false;
  const expected = getAdminToken();
  if (!expected) return false;
  return token.trim() === expected.trim();
}
