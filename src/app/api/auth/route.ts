import { createServiceClient } from "@/lib/supabase";
import { getAdminToken } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const supabase = createServiceClient();

  // Check if email is admin and password matches
  const { data: admin, error: dbError } = await supabase
    .from("admins")
    .select("email, password")
    .eq("email", email)
    .maybeSingle();

  if (dbError) {
    console.error("Admin DB error:", dbError.message, "URL:", process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "MISSING");
    return NextResponse.json({ error: "Datenbankfehler: " + dbError.message }, { status: 500 });
  }

  if (!admin) {
    return NextResponse.json({ error: "Kein Zugang" }, { status: 403 });
  }

  if (password !== admin.password) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  // Return service role key as admin token
  return NextResponse.json({
    token: getAdminToken(),
    email: admin.email,
  });
}
