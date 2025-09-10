export const metadata = { title: "Datenschutz | Bahnerjob" };

export default function DatenschutzPage() {
  return (
    <div className="legal-wrap">
      <h1>Datenschutzerklärung</h1>
      <div className="legal-body">
        <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Personenbezogene Daten werden vertraulich und entsprechend den gesetzlichen Vorschriften verarbeitet.</p>
        <h2>1. Verantwortlicher</h2>
        <p><strong>Dieter Kuhlmann</strong><br/>Bodenseestraße 103<br/>88048 Friedrichshafen<br/>E-Mail: <a href="mailto:info@bahnerjob.de">info@bahnerjob.de</a></p>

        <h2>2. Erhobene Daten</h2>
        <p>Server-Logs, Kontaktdaten bei Formularen, Zahlungsdaten bei Checkout (über Zahlungsdienstleister).</p>

        <h2>3. Zwecke</h2>
        <p>Bereitstellung der Website, Abwicklung von Anzeigen, Kommunikation, Sicherheit.</p>

        <h2>4. Rechtsgrundlagen</h2>
        <p>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), lit. f (berechtigtes Interesse), ggf. lit. a (Einwilligung).</p>

        <h2>5. Empfänger</h2>
        <p>Hosting/Deployment (z. B. Vercel), Zahlungsdienstleister (z. B. Stripe), Analyse/Fehlertracking (falls eingesetzt).</p>

        <h2>6. Speicherdauer</h2>
        <p>Entsprechend gesetzlicher Aufbewahrungspflichten oder bis Zweckfortfall.</p>

        <h2>7. Betroffenenrechte</h2>
        <p>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Beschwerde bei einer Aufsichtsbehörde.</p>

        <h2>8. Cookies/Tracking</h2>
        <p>Sofern Tools eingesetzt werden, informieren wir gesondert und bieten Opt-In/Opt-Out an.</p>

        <h2>Kontakt</h2>
        <p>Bei Fragen zum Datenschutz: <a href="mailto:info@bahnerjob.de">info@bahnerjob.de</a></p>
      </div>
    </div>
  );
}
