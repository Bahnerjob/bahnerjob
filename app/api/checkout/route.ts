import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  // Preis-ID bevorzugt aus dem Request-Body; sonst Fallbacks
  const priceId =
    body.priceId ||
    process.env.NEXT_PUBLIC_PRICE_ID_FEATURED ||
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID; // falls du noch eine alte Variable hattest

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || !priceId) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(secret);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`
  });

  return NextResponse.json({ url: session.url });
}
