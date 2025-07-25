import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RotatingImage from "@/components/loadingPage";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asbfamily",
  description: "sehat bersama",
    icons: {
    icon: "/images/loading.jpeg", // atau /favicon.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>


      <body className="bg-base-100 text-base-content">
        <RotatingImage />
        {children}
      </body>
    </html>
  );
}
