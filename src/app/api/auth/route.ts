import { createServiceClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const supabase = createServiceClient();

  // Check if email is admin and password matches
  const { data: admin } = await supabase
    .from("admins")
    .select("email, password")
    .eq("email", email)
    .single();

  if (!admin) {
    return NextResponse.json({ error: "Kein Zugang" }, { status: 403 });
  }

  if (password !== admin.password) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  // Return service role key as admin token
  return NextResponse.json({
    token: process.env.SUPABASE_SERVICE_ROLE_KEY,
    email: admin.email,
  });
}
