import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCallWhatsApp } from "@/components/FloatingCallWhatsApp";
import { JsonLd } from "@/components/JsonLd";
import { generateOrganizationSchema } from "@/lib/json-ld";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mahila Swashth Mission - Making a Difference",
    template: "%s | Mahila Swashth Mission",
  },
  description: "Join us in making a positive impact on society through our programs and initiatives.",
  keywords: ["NGO", "charity", "social work", "donation", "volunteer", "women health", "mahila swashth"],
  authors: [{ name: "Mahila Swashth Mission" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.SITE_URL,
    siteName: "Mahila Swashth Mission",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mahila Swashth Mission",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ngo",
    creator: "@ngo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={generateOrganizationSchema()} />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingCallWhatsApp />
      </body>
    </html>
  );
}
