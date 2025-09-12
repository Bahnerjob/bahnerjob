import "./globals.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Bahnerjob",
  description: "Die Jobbörse für den Bahnsektor  klar, modern, fokussiert.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const globalCss = `
    :root {
      --bg: #0a0a0b; --text: #ebebf0; --muted: rgba(235,235,240,.72);
      --panel: #18181c; --accent: #dc2626;
      --border: rgba(255,255,255,.14);
    }
    html, body {
      background: var(--bg) !important; color: var(--text) !important;
      margin: 0; padding: 0; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif !important;
    }
    a { color: inherit; text-decoration: none; }
    .container { max-width: 72rem; margin: 0 auto; padding: 0 1rem; }

    /* STICKY HEADER */
    .site-header {
      position: sticky; top: 0; z-index: 50;
      border-bottom: 1px solid rgba(60,60,68,.4);
      background: rgba(10,10,11,.72);
      backdrop-filter: blur(8px);
    }

    .muted { color: var(--muted); }

    .chip {
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 14px; border-radius:999px; font-size:14px; font-weight:700;
      background: rgba(255,255,255,.16); color: #fff;
    }

    .btn {
      display:inline-flex; align-items:center; justify-content:center; gap:.6rem;
      height: 48px; padding: 0 18px; font-weight: 800; letter-spacing:.02em;
      border-radius: 14px; border: 1px solid var(--border);
      background: rgba(255,255,255,.08); color: var(--text);
      box-shadow: 0 1px 0 rgba(0,0,0,.35);
      transition: transform .15s ease, filter .15s ease, background .15s ease, box-shadow .15s ease;
    }
    .btn:hover { transform: translateY(-1px); background: rgba(255,255,255,.12); }
    .btn:focus-visible { outline: 3px solid rgba(220,38,38,.6); outline-offset: 2px; }

    .btn-primary {
      background: var(--accent); border-color: var(--accent); color: #fff;
      box-shadow: 0 10px 24px rgba(220,38,38,.28), 0 1px 0 rgba(0,0,0,.35) inset;
    }
    .btn-primary:hover { filter: brightness(1.06); transform: translateY(-1px); }

    .btn-secondary {
      background: transparent; border-color: rgba(255,255,255,.22);
    }
    .btn-secondary:hover { background: rgba(255,255,255,.10); }

    .panel {
      background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01)), var(--panel);
      border-radius: 18px; padding: 24px; box-shadow: 0 1px 0 rgba(0,0,0,.25);
    }

    hr.rule { height:1px; border:0; background: rgba(60,60,68,.4); margin: 40px 0; }
  `;
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0b" />
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      </head>
      <body style={{ minHeight: "100vh", position: "relative", background:"#0a0a0b", color:"#ebebf0" }}>
        <div aria-hidden="true" style={{ position:"fixed", inset:0, background:"#0a0a0b", zIndex:-1 }} />
        <header className="site-header">
          <div className="container" style={{height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <Link href="/" style={{display:"inline-flex", alignItems:"center", gap:"12px"}}>
              <Image src="/icon.svg" alt="Bahnerjob" width={44} height={44} />
              <span style={{fontSize:"22px",fontWeight:800,letterSpacing:"-0.01em"}}>Bahnerjob</span>
            </Link>
          </div>
        </header>
        <main className="container" style={{ padding:"40px 16px" }}>
          {children}
        </main>
        <footer className="container" style={{ padding:"48px 16px", fontSize:"14px", color:"rgba(235,235,240,.7)" }}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px"}}>
            <div> {new Date().getFullYear()} Bahnerjob</div>
            <nav style={{display:"flex", gap:"16px"}}>
              <Link href="/legal/impressum">Impressum</Link>
              <Link href="/legal/datenschutz">Datenschutz</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}