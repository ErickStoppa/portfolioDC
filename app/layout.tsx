import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { SplashScreen } from "@/components/splash-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Development Consulting — Experiências de Software Premium",
    template: "%s | Development Consulting",
  },
  description:
    "Experiências de software premium e soluções digitais. Desenvolvemos aplicações web, plataformas SaaS e produtos digitais de nível mundial para empresas que exigem o melhor.",
  keywords: [
    "desenvolvimento de software",
    "desenvolvimento web",
    "SaaS",
    "arquitetura frontend",
    "design UI/UX",
    "consultoria digital",
  ],
  authors: [{ name: "Development Consulting" }],
  creator: "Development Consulting",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://developmentconsulting.io",
    siteName: "Development Consulting",
    title: "Development Consulting — Experiências de Software Premium",
    description:
      "Experiências de software premium e soluções digitais. Desenvolvemos aplicações web, plataformas SaaS e produtos digitais de nível mundial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Development Consulting — Experiências de Software Premium",
    description:
      "Experiências de software premium e soluções digitais para empresas que exigem o melhor.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06080f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] antialiased`}
      >
        <SplashScreen />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
