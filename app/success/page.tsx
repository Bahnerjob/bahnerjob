import Stripe from "stripe";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id;
  const secret = process.env.STRIPE_SECRET_KEY;

  let meta: Record<string, string> | null = null;
  if (sessionId && secret) {
    try {
      const stripe = new Stripe(secret);
      const s = await stripe.checkout.sessions.retrieve(sessionId);
      meta = (s.metadata || {}) as Record<string, string>;
    } catch {
      meta = null;
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-1">Zahlung erfolgreich</h1>
        <p className="text-neutral-300">
          Vielen Dank! Wir haben deine Anzeige erhalten. Sie wird zeitnah geprüft und veröffentlicht.
        </p>

        <div className="mt-4">
          <Link className="btn btn-accent" href="/jobs">Zu den Jobs</Link>
          <span className="ml-2" />
          <Link className="btn" href="/">Zur Startseite</Link>
        </div>
      </div>

      <div className="card p-6">
        <div className="badge mb-3">Übermittelte Anzeige</div>
        {meta ? (
          <>
            <div className="text-lg font-bold">{meta.ad_title || "Jobtitel"}</div>
            <div className="text-neutral-400">
              {(meta.ad_company || "Firma")} · {(meta.ad_location || "Ort")}
              {meta.ad_bundesland ? ` (${meta.ad_bundesland})` : ""}
            </div>
            <p className="mt-3 text-neutral-300 whitespace-pre-wrap">
              {meta.ad_desc || ""}
            </p>
            <div className="mt-3 text-sm text-neutral-400">
              Bewerbungsweg: {meta.ad_apply || ""}
            </div>
          </>
        ) : (
          <div className="text-neutral-400">Keine Metadaten verfügbar.</div>
        )}
      </div>
    </div>
  );
}
