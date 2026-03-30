import { createServiceClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, category, year, location")
    .eq("visible", true)
    .order("year", { ascending: false })
    .order("title", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
