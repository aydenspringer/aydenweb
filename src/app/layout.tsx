import "@/styles/globals.css";

import { type Metadata } from "next";
import { Crimson_Text, Inter } from "next/font/google";
import { ContactFooter } from "@/components/ContactFooter";
import { SiteNav } from "@/components/SiteNav";
import { AudioProvider } from "@/components/AudioContext";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://aydenweb.com"),
  title: {
    default: "Ayden Springer — Product Design & Development",
    template: "%s — Ayden Springer",
  },
  description:
    "I design and build web and mobile products for founders and small teams, from the first product flow to a working release.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aydenweb.com",
    siteName: "Ayden Springer",
    title: "Ayden Springer — Product Design & Development",
    description:
      "I design and build web and mobile products for founders and small teams, from the first product flow to a working release.",
  },
  twitter: {
    card: "summary",
    title: "Ayden Springer — Product Design & Development",
    description:
      "I design and build web and mobile products for founders and small teams, from the first product flow to a working release.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://aydenweb.com",
  },
};

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson-text",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${crimsonText.variable} ${inter.variable} h-full`}>
      <body className="h-full bg-[var(--color-bg)]">
        <AudioProvider>
          <SmoothScroll />
          <SiteNav />
          {children}
          <ContactFooter />
        </AudioProvider>
        <Analytics />
      </body>
    </html>
  );
}
