import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { path, referrer } = await req.json();
  const userAgent = req.headers.get("user-agent") || "";

  await supabase.from("page_views").insert({
    path,
    referrer: referrer || null,
    user_agent: userAgent.slice(0, 500),
  });

  return NextResponse.json({ ok: true });
}
