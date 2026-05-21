import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import StarBackground from "@/components/layout/StarBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcelo Molina — Ingeniero Informático Senior",
  description: "Portfolio personal de Marcelo Alonso Molina Muñoz, Ingeniero Informático Senior con experiencia en GCP, AWS, Node.js, NestJS, React y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="h-full flex relative">
        <StarBackground />
        <Sidebar />
        <main className="ml-64 flex-1 min-h-screen relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
