"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const sokidPackages = [
  {
    title: "Cuci AC",
    price: "Rp 80.000 - 150.000",
    description:
      "layanan Cuci AC ",
    benefits: [
      "Pembersihan filter udara",
      "Pembersihan evaporator",
      "Pembersihan condensor",
      "Pembersihan blower",
      "Pembersihan body ac",
      "Pembersihan pembuangan air",
      "Free disinfectant untuk paket 150.000",
    ],
    badge: "EKSCLUSIF",
  },
  {
    title: "Pasang AC",
    price: "Rp 300.000 - All PK",
    description:
      "layanan Pasang AC",
    benefits: [
      "Garansi Instalasi 6 Bulan",
      "Garansi Pipa 1 Tahun",
      "Garansi Freon 6 Bulan",
    ],
    badge: "EKSCLUSIF",
  },
  {
    title: "Service AC",
    price: "Harga Mulai Dari Rp 250.000 - All PK",
    description:
      "layanan Service AC",
    benefits: [
      "Garansi Kerusakan Sama 3 Bulan",
      "Garansi Kerusakan Sparepart Sama 3 Bulan",
    ],
    badge: "EKSCLUSIF",
  },

];

export function JasaList() {
  return (
    <div id="kemitraan" className="  gap-8 md:grid-cols-3 py-10">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 text-center leading-tight">
          Pilihan Paket <span className="text-blue-600">Layanan</span> Member
        </h1>
      
      </div>
      <div className=" grid gap-8 md:grid-cols-3 py-10">
      {sokidPackages.map((pkg, i) => (
        <div
          key={i}
          className={cn(
            "relative rounded-xl border-2 p-6 shadow-xl transition-all hover:scale-[1.02] hover:shadow-gold/50",
            pkg.badge === "EKSCLUSIF" &&
              "border-blue-100 bg-blue-500 text-white",
            pkg.badge === "REKOMENDASI" && "border-blue-600",
            !pkg.badge && "border-muted bg-white"
          )}
        >
          {pkg.badge && (
            <div
              className={cn(
                "absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full",
                pkg.badge === "EKSCLUSIF" && "bg-blue-100 text-black",
                pkg.badge === "REKOMENDASI" && "bg-blue-600 text-white"
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
              pkg.badge === "EKSCLUSIF" && "text-white"
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
                      ? "text-blue-100"
                      : "text-green-500"
                  )}
                />
                {item}
              </li>
            ))}
          </ul>

       
          <a href="https://wa.me/+6281356649191">
               <Button
            className={cn(
              "w-full text-sm font-bold",
              pkg.badge === "EKSCLUSIF" &&
                "bg-blue-100 text-black hover:bg-blue-100",
              pkg.badge === "REKOMENDASI" && "bg-blue-600 hover:bg-blue-500",
              !pkg.badge && ""
            )}
          
          >
            Pesan Sekarang
          </Button>
          </a>
        </div>
      ))}
      </div>
    </div>
  );
}
