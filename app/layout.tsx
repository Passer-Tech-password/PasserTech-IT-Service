import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { AuthProvider } from "@/lib/auth";
import { ContentProvider } from "@/lib/ContentContext";
import LayoutClient from "./LayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://passertech.com"),
  title: {
    default: "PasserTech IT Service | Learn Coding in Igbo, Hausa, Yoruba & Pidgin",
    template: "%s | PasserTech IT Service",
  },
  description: "Empowering marginalized youths to build global careers without language barriers. Learn software engineering, cloud, and IT in your mother tongue.",
  keywords: ["coding in igbo", "coding in hausa", "coding in yoruba", "nigerian tech education", "software development nigeria", "it training enugu", "mother tongue tech", "PasserTech"],
  authors: [{ name: "PasserTech Team" }],
  creator: "PasserTech IT Service",
  publisher: "PasserTech IT Service",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  themeColor: "#00E676",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://passertech.com",
    siteName: "PasserTech IT Service",
    title: "PasserTech IT Service | Building the Future of African Tech",
    description: "Learn tech in your own language. Breaking barriers for marginalized youths across Nigeria.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PasserTech IT Service - Learn Coding in Your Language",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PasserTech IT Service | Learn Coding in Your Tongue",
    description: "Empowering Nigerian youths with world-class tech skills in Igbo, Hausa, Yoruba, and Pidgin.",
    images: ["/og-image.png"],
    creator: "@PasserTech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}>
        <AuthProvider>
          <ContentProvider>
            <LanguageProvider>
              <LayoutClient>{children}</LayoutClient>
            </LanguageProvider>
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
