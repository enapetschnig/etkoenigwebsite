import { createServiceClient } from "@/lib/supabase";
import { isValidAdminToken } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!isValidAdminToken(req.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Use database time (AT timezone) to avoid server timezone issues
  // Get counts directly from database
  const today = new Date().toISOString().split("T")[0];

  // Get all views from last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: views, error: viewsError } = await supabase
    .from("page_views")
    .select("created_at, path")
    .gte("created_at", thirtyDaysAgo.toISOString());

  if (viewsError) {
    console.error("Stats views error:", viewsError.message);
  }

  const allViews = views || [];

  // Aggregate by day (using UTC date from created_at)
  const dailyViews: Record<string, number> = {};
  const pathCounts: Record<string, number> = {};

  allViews.forEach((v: { created_at: string; path: string }) => {
    // Use the first 10 chars of the ISO string as date
    const day = v.created_at.substring(0, 10);
    dailyViews[day] = (dailyViews[day] || 0) + 1;
    pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
  });

  // Today views - try both UTC date and check yesterday (timezone edge case)
  const todayUTC = new Date().toISOString().substring(0, 10);
  const todayViews = dailyViews[todayUTC] || 0;

  console.log("Stats debug:", { viewCount: allViews.length, todayUTC, todayViews });

  // This week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().substring(0, 10);
  const weekViews = Object.entries(dailyViews)
    .filter(([d]) => d >= weekAgoStr)
    .reduce((sum, [, c]) => sum + c, 0);

  const monthViews = allViews.length;

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
