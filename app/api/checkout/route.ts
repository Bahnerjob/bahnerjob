import Stripe from "stripe";
import { NextResponse } from "next/server";

function clip(v: any, n: number) {
  return (v ?? "").toString().slice(0, n);
}

function mapPackageToPriceId(pkgKey: string) {
  switch (pkgKey) {
    case "basic":
      return process.env.NEXT_PUBLIC_PRICE_ID_BASIC || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
    case "featured":
      return process.env.NEXT_PUBLIC_PRICE_ID_FEATURED || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
    case "boost":
      return process.env.NEXT_PUBLIC_PRICE_ID_BOOST || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
    default:
      return process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const pkgKey = body.package as string | undefined;
  const ad = body.ad || {};
  const priceId = body.priceId || mapPackageToPriceId(pkgKey || "featured");

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || !priceId) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(secret);

  // Metadaten kurz halten (Stripe: max. ~500 Zeichen pro Feld)
  const metadata: Record<string, string> = {
    ad_title:       clip(ad.title, 80),
    ad_company:     clip(ad.company, 80),
    ad_location:    clip(ad.location, 80),
    ad_bundesland:  clip(ad.bundesland, 40),
    ad_apply:       clip(ad.applyUrl, 120),
    ad_logo:        clip(ad.logoUrl, 120),
    ad_desc:        clip(ad.description, 400),
    ad_pkg:         clip(pkgKey || "", 16),
  };

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
    metadata,
  });

  return NextResponse.json({ url: session.url });
}
