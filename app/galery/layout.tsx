import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientWrapper from "./wrapper"; // bungkus client

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
  description: "Service AC terbaik di Indonesia",
  icons: {
    icon: "/images/aa.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-base-100 text-base-content min-h-screen">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
