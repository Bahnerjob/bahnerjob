"use client";

export default function BuyButton({
  priceId,
  label = "Jetzt kaufen",
}: { priceId?: string; label?: string }) {
  async function go() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId })
    });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert("Checkout nicht verfügbar (Stripe nicht konfiguriert).");
  }

  return (
    <button onClick={go} className="btn btn-accent">
      {label}
    </button>
  );
}
