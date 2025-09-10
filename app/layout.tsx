import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css?v=2025-09-10-fonts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bahnerjob",
  description: "Jobs aus der Bahnbranche  Anzeigen schalten & finden.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      <footer className="mt-10 border-t border-neutral-800 bg-[#0d0d0d] text-neutral-400">
  <div className="container py-8 text-sm"> {new Date().getFullYear()} Bahnerjob</div>
  <div className="container py-2 text-xs site-legal-links">
    <a href="/impressum" className="underline underline-offset-2 mr-4">Impressum</a>
    <a href="/datenschutz" className="underline underline-offset-2">Datenschutz</a>
  </div>
</footer></body>
    </html>
  );
}



