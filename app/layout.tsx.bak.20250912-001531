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
    <html lang="de" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bj-hard-dark">
        <header className="site-header">
          <div className="container-bj h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/icon.svg" alt="Bahnerjob" width={44} height={44} />
              <span className="text-[20px] sm:text-[22px] font-semibold tracking-tight" style={{letterSpacing:"-0.01em"}}>
                Bahnerjob
              </span>
            </Link>
            <nav className="hidden sm:flex items-center gap-2">
              <Link href="/jobs" className="btn btn-secondary">Jobs durchsuchen</Link>
              <Link href="/jobs/new?pkg=basic" className="btn btn-primary">Anzeige schalten</Link>
            </nav>
          </div>
        </header>

        <main className="container-bj">
          {children}
        </main>

        <footer className="container-bj py-12 text-sm text-neutral-400">
          <div className="flex items-center justify-between gap-4">
            <div> {new Date().getFullYear()} Bahnerjob</div>
            <nav className="flex items-center gap-4">
              <Link href="/legal/impressum">Impressum</Link>
              <Link href="/legal/datenschutz">Datenschutz</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}