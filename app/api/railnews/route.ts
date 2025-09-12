import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 900; // 15 Minuten

export async function GET() {
  const payload = {
    status: "ok",
    source: "placeholder",
    items: [],
    generatedAt: new Date().toISOString(),
  };
  return NextResponse.json(payload);
}