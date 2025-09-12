import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 900;
export async function GET(){
  const items = [
    { id:"n1", title:"Neue RE-Linie testet modernisierte Dosto-Garnituren", date:"2025-09-10", link:"/news" },
    { id:"n2", title:"SWEG startet weitere TfZ-Ausbildungsklassen",        date:"2025-09-08", link:"/news" },
    { id:"n3", title:"metronom erweitert Quereinstieg",                     date:"2025-09-05", link:"/news" },
  ];
  return NextResponse.json({
    status:"ok",
    items,
    news: items,
    data: items,
    entries: items,
    articles: items,
    generatedAt: new Date().toISOString()
  });
}