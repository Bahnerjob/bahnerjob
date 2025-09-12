import { NextResponse } from "next/server";
import { fetchRailNews } from "../../../lib/railnews";

export const revalidate = 900;

export async function GET() {
  const items = await fetchRailNews(24);
  return NextResponse.json({ items }, { status: 200 });
}