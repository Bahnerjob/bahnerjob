import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Bahnerjob",
  description: "Die Jobbörse für den Bahnsektor  klar, modern, fokussiert.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <style jsx global>{`
          /* ABSOLUTE NOTFALL-STYLES  unabhängig von Tailwind/globals */
          html, body {
            background: #0a0a0b !important;   /* tiefes neutrales Schwarz */
            color: #ebebf0 !important;        /* sehr helles Grau */
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            margin: 0; padding: 0;
            font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif !important;
          }
          a { color: inherit; text-decoration: none; }
          /* einfache Container-Utilities */
          .container { max-width: 72rem; margin: 0 auto; padding: 0 1rem; }
          .muted { color: rgba(235,235,240,.7); }
          /* Header */
          .site-header {
            border-bottom: 1px solid rgba(60,60,68,.4);
            background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,0));
            backdrop-filter: blur(6px);
          }
          .hstack { display:flex; align-items:center; }
          .between { justify-content: space-between; }
          /* Buttons  klar erkennbar, kein Blau/Lila */
          .btn {
            display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
            height: 44px; min-width: 44px; padding: 0 16px; border-radius: 14px;
            font-weight: 700; letter-spacing: .01em; border: 1px solid rgba(255,255,255,.12);
            background: rgba(255,255,255,.08); color: #ebebf0; cursor: pointer;
            transition: transform .15s ease, filter .15s ease, box-shadow .15s ease, background .15s ease;
          }
          .btn:hover { transform: translateY(-1px); background: rgba(255,255,255,.12); }
          .btn-primary {
            background: #dc2626; border-color: #dc2626; color: #fff;
            box-shadow: 0 8px 20px rgba(220,38,38,.25);
          }
          .btn-primary:hover { filter: brightness(1.06); }
          /* Panels  weiche Flächen ohne harte Ränder */
          .panel {
            background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01)), #18181c;
            border-radius: 18px; padding: 24px; box-shadow: 0 1px 0 rgba(0,0,0,.25);
          }
          /* Typo */
          .h1 { font-family: Manrope, Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
                font-size: clamp(2.25rem, 5vw, 3rem); font-weight: 700; letter-spacing: -0.01em; margin: 0; }
          .h2 { font-family: Manrope, Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
                font-size: clamp(1.25rem, 2.5vw, 1.5rem); font-weight: 700; letter-spacing: -0.01em; margin: .5rem 0 0 0; }
          .lead { color: rgba(235,235,240,.9); }
          .chip {
            display:inline-flex; align-items:center; gap:8px; padding:6px 12px; border-radius:999px;
            background: rgba(255,255,255,.08); color: rgba(235,235,240,.9); font-size: 12px;
          }
          .center { text-align: center; }
          .section { padding: 3.5rem 0; }
          .divider { height:1px; background: rgba(60,60,68,.4); margin: 3.5rem 0; }
          /* Grid */
          .grid { display:grid; gap: 1.5rem; }
          @media (min-width: 900px) { .grid.two { grid-template-columns: 1fr 1fr; } }
        `}</style>
      </head>
      <body>
        <header className="site-header">
          <div className="container" style={{height:"64px"}}>
            <div className="hstack between" style={{height:"100%"}}>
              <Link href="/" className="hstack" style={{gap:"12px"}}>
                <Image src="/icon.svg" alt="Bahnerjob" width={44} height={44} />
                <span style={{fontSize:"22px",fontWeight:700,letterSpacing:"-0.01em"}}>Bahnerjob</span>
              </Link>
              <nav className="hstack" style={{gap:"8px", display:"none"}} aria-hidden="true">
                {/* Navigation ist optional  Startseite bietet unten die CTAs */}
              </nav>
            </div>
          </div>
        </header>

        <main className="container" style={{padding:"40px 16px"}}>
          {children}
        </main>

        <footer className="container" style={{padding:"48px 16px", fontSize:"14px"}}>
          <div className="hstack between" style={{gap:"16px"}}>
            <div className="muted"> {new Date().getFullYear()} Bahnerjob</div>
            <nav className="hstack" style={{gap:"16px"}}>
              <Link href="/legal/impressum" className="muted">Impressum</Link>
              <Link href="/legal/datenschutz" className="muted">Datenschutz</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}