"use client";

export default function Error({
  error,
  reset,
}: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="card p-6">
      <h1 className="font-bold tracking-tight">Uups, da ist etwas schiefgelaufen.</h1>
      <p className="mt-2 text-neutral-300">
        Bitte versuch es noch einmal. Falls der Fehler bleibt, sag mir die Meldung aus der Browser-Konsole.
      </p>
      <button className="btn btn-accent mt-4" onClick={() => reset()}>
        Neu laden
      </button>
    </div>
  );
}
