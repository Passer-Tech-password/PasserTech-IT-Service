import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import { AuthProvider } from "@/lib/auth";
import { ContentProvider } from "@/lib/ContentContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PasserTech IT Service | Learn Coding in Igbo",
  description: "Learn Coding in Igbo. Build the Future. Mother tongue tech education for marginalized youths.",
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
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </LanguageProvider>
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
