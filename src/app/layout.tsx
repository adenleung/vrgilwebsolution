import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { siteUrl, studio } from "@/lib/site-data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: {
    default: "VRGIL Web Solutions | Websites for Singapore Businesses",
    template: "%s | VRGIL Web Solutions",
  },
  description:
    "Custom landing pages, business websites and redesigns for Singapore businesses. Independent studio, clear pricing from S$599, and direct communication.",
  openGraph: {
    title: "VRGIL Web Solutions",
    description: studio.description,
    siteName: studio.name,
    locale: "en_SG",
    type: "website",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/api/og",
              width: 1200,
              height: 630,
              alt: "VRGIL Web Solutions — We build websites. You focus on your business.",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "VRGIL Web Solutions",
    description: studio.description,
    ...(siteUrl ? { images: ["/api/og"] } : {}),
  },
  robots: { index: true, follow: true },
  icons: { icon: "/vrgil-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
