const FORMSPREE_ACTION = "https://formspree.io/f/mpwjblpq";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm">{label}</span>
      {children}
    </label>
  );
}
function inputCls() { return "w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2"; }

export default function NewJob() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold mb-4">Job posten</h1>
      <p className="text-neutral-300 mb-6">Nach dem Absenden erhältst du eine Bestätigung per E-Mail. Wir schalten die Anzeige nach kurzer Prüfung frei.</p>
      <form action={FORMSPREE_ACTION} method="POST" className="grid gap-4">
        <Field label="Unternehmen"><input name="company" required className={inputCls()} /></Field>
        <Field label="E-Mail für Rückfragen / Rechnung"><input type="email" name="email" required className={inputCls()} /></Field>
        <Field label="Jobtitel"><input name="title" required className={inputCls()} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ort / Region"><input name="location" required className={inputCls()} /></Field>
          <Field label="Kategorie">
            <select name="category" className={inputCls()}>
              <option>Lokführer:in</option><option>Instandhaltung</option><option>Disposition</option>
              <option>Fahrdienstleitung</option><option>IT / Technik</option><option>Service / Vertrieb</option>
            </select>
          </Field>
        </div>
        <Field label="Anstellungsart">
          <select name="type" className={inputCls()}>
            <option>Vollzeit</option><option>Teilzeit</option><option>Ausbildung</option><option>Werkstudent</option><option>Freelance</option>
          </select>
        </Field>
        <Field label="Gehalt (optional)"><input name="salary" className={inputCls()} /></Field>
        <Field label="Bewerbungslink (optional)"><input name="applyUrl" className={inputCls()} placeholder="https://" /></Field>
        <Field label="Beschreibung (Aufgaben, Profil, Benefits)">
          <textarea name="description" required className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 h-40" />
        </Field>
        <input type="text" name="_gotcha" className="hidden" />
        <input type="hidden" name="_subject" value="Neue Jobanzeige (bahnerjob.de)" />
        <input type="hidden" name="_next" value="/?submitted=1" />
        <button type="submit" className="px-4 py-2 rounded-md bg-emerald-500 text-neutral-900 font-semibold">Absenden</button>
      </form>
    </main>
  );
}
