import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 900;
export async function GET(){
  const items = [
    { id:"n1", title:"Demo: Neue RE-Linie testet modernisierte Dosto-Garnituren", date:"2025-09-10", link:"#"},
    { id:"n2", title:"Demo: SWEG startet weitere TfZ-Ausbildungsklassen", date:"2025-09-08", link:"#"},
    { id:"n3", title:"Demo: metronom erweitert Quereinstieg", date:"2025-09-05", link:"#"},
  ];
  return NextResponse.json({status:"ok", items, generatedAt:new Date().toISOString()});
}