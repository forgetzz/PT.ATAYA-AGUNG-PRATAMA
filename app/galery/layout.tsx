import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Ataya Agung Pratama",
  description: "Service ac terbaik di indonesia",
    icons: {
    icon: "/images/aa.png", // atau /favicon.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
  <head>
        {/* Favicon manual */}
 
      </head>

      <body className="bg-base-100 text-base-content min-h-screen">
        <RotatingImage />
        {children}
      </body>
    </html>
  );
}
