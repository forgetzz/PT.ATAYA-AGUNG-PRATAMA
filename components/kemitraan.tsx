"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const sokidPackages = [
  {
    title: "STOKIS",
    price: "Rp 3.750.000",
    description:
      "Jadilah pusat distribusi di kota Anda dan nikmati keuntungan maksimal.",
    benefits: [
      "Keuntungan penjualan terbesar",
      "Hak distribusi area",
      "Bonus dan reward eksklusif",
      "Dukungan penuh dari pusat",
    ],
    badge: "EKSCLUSIF",
    onJoin: () => alert("Gabung sebagai SOKID STOKIS"),
  },

];

export function SokidList() {
  return (
    <div id="kemitraan" className="  gap-8 md:grid-cols-3 py-10">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 text-center leading-tight">
          Pilihan Paket <span className="text-red-600">Kemitraan</span> Kami
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Bergabunglah dengan kami dan pilih jalur kesuksesan Anda. Kami
          menyediakan berbagai level kemitraan sesuai dengan tujuan dan
          kapasitas Anda, didukung penuh untuk pertumbuhan bisnis Anda.
        </p>
      </div>
      <div className=" grid gap-8 md:grid-cols-3 py-10">
      {sokidPackages.map((pkg, i) => (
        <div
          key={i}
          className={cn(
            "relative rounded-xl border-2 p-6 shadow-xl transition-all hover:scale-[1.02] hover:shadow-gold/50",
            pkg.badge === "EKSCLUSIF" &&
              "border-yellow-400 bg-red-500 text-white",
            pkg.badge === "REKOMENDASI" && "border-red-600",
            !pkg.badge && "border-muted bg-white"
          )}
        >
          {pkg.badge && (
            <div
              className={cn(
                "absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full",
                pkg.badge === "EKSCLUSIF" && "bg-yellow-400 text-black",
                pkg.badge === "REKOMENDASI" && "bg-red-600 text-white"
              )}
            >
              {pkg.badge}
            </div>
          )}

          <h2 className="text-2xl font-bold mb-1">{pkg.title}</h2>
          <p className="text-sm opacity-80 mb-4">{pkg.description}</p>
          <div
            className={cn(
              "text-3xl font-extrabold mb-6",
              pkg.badge === "EKSCLUSIF" && "text-yellow-400"
            )}
          >
            {pkg.price}
          </div>

          <ul className="mb-6 space-y-2 text-sm">
            {pkg.benefits.map((item, idx) => (
              <li key={idx} className="flex items-center">
                <CheckCircle
                  className={cn(
                    "w-4 h-4 mr-2",
                    pkg.badge === "EKSCLUSIF"
                      ? "text-yellow-400"
                      : "text-green-500"
                  )}
                />
                {item}
              </li>
            ))}
          </ul>

          <Button
            className={cn(
              "w-full text-sm font-bold",
              pkg.badge === "EKSCLUSIF" &&
                "bg-yellow-400 text-black hover:bg-yellow-300",
              pkg.badge === "REKOMENDASI" && "bg-red-600 hover:bg-red-500",
              !pkg.badge && ""
            )}
            onClick={pkg.onJoin}
          >
            Gabung Sekarang
          </Button>
        </div>
      ))}
      </div>
    </div>
  );
}
