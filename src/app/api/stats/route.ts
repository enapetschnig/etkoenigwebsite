import { createServiceClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (token !== (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Get page views for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: views } = await supabase
    .from("page_views")
    .select("created_at, path")
    .gte("created_at", thirtyDaysAgo.toISOString());

  // Aggregate by day
  const dailyViews: Record<string, number> = {};
  const pathCounts: Record<string, number> = {};

  (views || []).forEach((v: { created_at: string; path: string }) => {
    const day = v.created_at.split("T")[0];
    dailyViews[day] = (dailyViews[day] || 0) + 1;
    pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
  });

  // Today & this week
  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const todayViews = dailyViews[today] || 0;
  const weekViews = Object.entries(dailyViews)
    .filter(([d]) => new Date(d) >= weekAgo)
    .reduce((sum, [, c]) => sum + c, 0);
  const monthViews = (views || []).length;

  // Inquiry stats
  const { count: totalInquiries } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true });

  const { count: newInquiries } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  // Top pages
  const topPages = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  return NextResponse.json({
    todayViews,
    weekViews,
    monthViews,
    totalInquiries: totalInquiries || 0,
    newInquiries: newInquiries || 0,
    dailyViews,
    topPages,
  });
}
