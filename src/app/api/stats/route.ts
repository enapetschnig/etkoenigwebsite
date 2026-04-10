import { createServiceClient } from "@/lib/supabase";
import { isValidAdminToken } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!isValidAdminToken(req.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const since = thirtyDaysAgo.toISOString();

  // Fetch ALL page views (Supabase default limit is 1000!)
  // Paginate to get everything
  const allViews: { created_at: string; path: string }[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("page_views")
      .select("created_at, path")
      .gte("created_at", since)
      .range(from, from + batchSize - 1);

    if (error) {
      console.error("Stats views error:", error.message);
      break;
    }

    if (!data || data.length === 0) break;
    allViews.push(...data);
    if (data.length < batchSize) break; // last page
    from += batchSize;
  }

  // Aggregate by day
  const dailyViews: Record<string, number> = {};
  const pathCounts: Record<string, number> = {};

  allViews.forEach((v) => {
    const day = v.created_at.substring(0, 10);
    dailyViews[day] = (dailyViews[day] || 0) + 1;
    pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
  });

  // Today
  const todayUTC = new Date().toISOString().substring(0, 10);
  const todayViews = dailyViews[todayUTC] || 0;

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
