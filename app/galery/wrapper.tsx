"use client";

import dynamic from "next/dynamic";

// RotatingImage hanya jalan di client
const RotatingImage = dynamic(() => import("@/components/loadingPage"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RotatingImage />
      {children}
    </>
  );
}
