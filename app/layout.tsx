import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RotatingImage from "@/components/loadingPage";
import Script from "next/script"; // ✅ import Script

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ataya Agung Pratama",
  description: "Service ac terbaik di indonesia",
  icons: {
    icon: "/images/aa.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* ✅ Google Tag Manager pakai Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17566965278"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17566965278');
          `}
        </Script>
      </head>

      <body className="bg-base-100 text-base-content min-h-screen">
        <RotatingImage />
        {children}
      </body>
    </html>
  );
}
