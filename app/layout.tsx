import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RotatingImage from "@/components/loadingPage";
import { Link } from "lucide-react";
import { Html, Head, Main, NextScript } from 'next/document'
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
  <head>
        <link rel="icon" href="/images/loading.jpeg" />
        {/* bisa juga pakai png: <link rel="icon" type="image/png" href="/favicon.png" /> */}
      </head>
      <body className="bg-base-100 text-base-content">
        <RotatingImage />
        {children}
      </body>
    </html>
  );
}
