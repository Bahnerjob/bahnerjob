import { NextResponse } from "next/server";

export const revalidate = 900; // 15 Minuten

export async function GET() {
  try {
    // HINWEIS: Hier gehört dein echter Fetch/Parser rein.
    // Falls etwas fehlschlägt, fangen wir es ab und geben [] zurück.
    // Beispiel: return NextResponse.json(await fetchNewsSomehow());
    return NextResponse.json([]);
  } catch (e) {
    return NextResponse.json([]);
  }
}