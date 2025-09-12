import dynamic from "next/dynamic";
const NewsClient = dynamic(() => import("@/components/NewsClient"), { ssr: false });

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl font-bold">Bahnerjob</h1>
        <p className="text-neutral-400 mt-2">Jobs, die auf die Schiene gehören.</p>
        <div className="mt-6 flex gap-3">
          <a href="/jobs" className="px-4 py-2 rounded bg-white text-black font-medium">Jobs durchsuchen</a>
          <a href="/jobs/new" className="px-4 py-2 rounded border border-white/20">Anzeige schalten</a>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Neuigkeiten</h2>
        <NewsClient />
      </section>
    </main>
  );
}