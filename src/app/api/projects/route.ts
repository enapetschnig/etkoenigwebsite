import { createServiceClient } from "@/lib/supabase";
import { isValidAdminToken } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isValidAdminToken(req.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const supabase = createServiceClient();

  const { error } = await supabase.from("projects").insert({
    title: body.title,
    category: body.category,
    year: body.year,
    location: body.location,
    description: body.description,
    visible: body.visible ?? true,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  if (!isValidAdminToken(req.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const supabase = createServiceClient();

  const { error } = await supabase
    .from("projects")
    .update({
      title: body.title,
      category: body.category,
      year: body.year,
      location: body.location,
      description: body.description,
      visible: body.visible,
    })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isValidAdminToken(req.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  const supabase = createServiceClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
