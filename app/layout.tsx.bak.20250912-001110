import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata = {
  title: "Bahnerjob",
  description: "Die Jobbörse für den Bahnsektor  klar, modern, fokussiert.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
      style={{ backgroundColor: "#0a0a0b" }}   // <-- HARTE ERZWINUNG (HTML)
    >
      <body
        className="antialiased"
        style={{
          backgroundColor: "#0a0a0b",          // <-- HARTE ERZWINUNG (BODY)
          color: "#ebebf0"
        }}
      >
        <header
          className="site-header"
          style={{
            borderBottom: "1px solid rgba(60,60,68,.4)",
            background: "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,0))",
            WebkitBackdropFilter: "blur(6px)",
            backdropFilter: "blur(6px)"
          }}
        >
          <div style={{maxWidth:"72rem",margin:"0 auto",padding:"0 1rem",height:"4rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/icon.svg" alt="Bahnerjob" width={40} height={40} />
              <span style={{fontSize:"20px",fontWeight:600,letterSpacing:"-0.01em"}}>Bahnerjob</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-2">
              <Link href="/jobs" className="btn">Jobs durchsuchen</Link>
              <Link href="/jobs/new?pkg=basic" className="btn btn-accent">Anzeige schalten</Link>
            </nav>
          </div>
        </header>

        <main style={{maxWidth:"72rem",margin:"0 auto",padding:"2.5rem 1rem"}}>
          {children}
        </main>

        <footer style={{maxWidth:"72rem",margin:"0 auto",padding:"3rem 1rem",fontSize:"0.9rem",color:"rgba(235,235,240,.7)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem"}}>
            <div> {new Date().getFullYear()} Bahnerjob</div>
            <nav style={{display:"flex",gap:"1rem"}}>
              <Link href="/legal/impressum">Impressum</Link>
              <Link href="/legal/datenschutz">Datenschutz</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}