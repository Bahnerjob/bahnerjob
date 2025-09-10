"use client";

export default function BuyButton({ label, priceId }: { label: string; priceId: string }) {
  async function go() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Stripe nicht konfiguriert.");
  }

  return (
    <button
      onClick={go}
      className="mt-3 px-4 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800"
    >
      {label}
    </button>
  );
}
