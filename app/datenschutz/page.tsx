export const metadata = { title: "Datenschutz | Bahnerjob" };

export default function DatenschutzPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-4">Datenschutzerklärung</h1>
      <div className="space-y-4 text-sm text-neutral-300">
        <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Personenbezogene Daten werden vertraulich und entsprechend den gesetzlichen Vorschriften verarbeitet.</p>
        <h2 className="text-lg font-semibold">1. Verantwortlicher</h2>
        <p>[Name/Anschrift/E-Mail des Verantwortlichen]</p>
        <h2 className="text-lg font-semibold">2. Erhobene Daten</h2>
        <p>Server-Logs, Kontaktdaten bei Formularen, Zahlungsdaten bei Checkout (über Zahlungsdienstleister).</p>
        <h2 className="text-lg font-semibold">3. Zwecke</h2>
        <p>Bereitstellung der Website, Abwicklung von Anzeigen, Kommunikation, Sicherheit.</p>
        <h2 className="text-lg font-semibold">4. Rechtsgrundlagen</h2>
        <p>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), lit. f (berechtigtes Interesse), ggf. lit. a (Einwilligung).</p>
        <h2 className="text-lg font-semibold">5. Empfänger</h2>
        <p>Hosting/Deployment (z. B. Vercel), Zahlungsdienstleister (z. B. Stripe), Analyse/Fehlertracking (falls eingesetzt).</p>
        <h2 className="text-lg font-semibold">6. Speicherdauer</h2>
        <p>Entsprechend gesetzlicher Aufbewahrungspflichten oder bis Zweckfortfall.</p>
        <h2 className="text-lg font-semibold">7. Betroffenenrechte</h2>
        <p>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Beschwerde bei einer Aufsichtsbehörde.</p>
        <h2 className="text-lg font-semibold">8. Cookies/Tracking</h2>
        <p>Sofern Tools eingesetzt werden, informieren wir gesondert und bieten Opt-In/Opt-Out an.</p>
        <h2 className="text-lg font-semibold">Kontakt</h2>
        <p>Bei Fragen zum Datenschutz: datenschutz@bahnerjob.de</p>
      </div>
    </div>
  );
}
