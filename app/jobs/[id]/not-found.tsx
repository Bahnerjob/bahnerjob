import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-semibold">Stelle nicht gefunden</h1>
      <p className="text-neutral-400 mt-2">Die angeforderte Anzeige ist nicht mehr verfügbar oder die URL ist falsch.</p>
      <div className="mt-4">
        <Link href="/jobs" className="btn rounded-lg px-4 py-2 border border-neutral-800">Zur Übersicht</Link>
      </div>
    </div>
  );
}
