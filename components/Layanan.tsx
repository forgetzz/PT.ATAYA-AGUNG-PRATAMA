"use client";

import {
  Wrench,
  Sparkles,
  Settings,
  ShoppingCart,
  Truck,
  Building2,
} from "lucide-react";
import React from "react";

export function LayananKami() {
  const services = [
    { icon: <Sparkles className="w-8 h-8 text-white" />, title: "CLEANING" },
    { icon: <Wrench className="w-8 h-8 text-white" />, title: "INSTALL" },
    { icon: <Settings className="w-8 h-8 text-white" />, title: "MAINTENANCE & SERVICE" },
    { icon: <Truck className="w-8 h-8 text-white" />, title: "PENGADAAN" },
    { icon: <ShoppingCart className="w-8 h-8 text-white" />, title: "SALES" },
    { icon: <Building2 className="w-8 h-8 text-white" />, title: "AIR CONDITIONER CONTRACTOR" },
  ];

  return (
    <section id="layanan" className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
          Layanan <span className="text-blue-600">Kami</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-4">
          Berbagai layanan kami tawarkan mulai dari Distributor, penjualan B2B
          dan B2C, service dan maintenance berbagai Merk Air Conditioner.
        </p>
      </div>

      {/* Grid Layanan */}
      <div className="grid gap-10 grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center space-y-3"
          >
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
              {service.icon}
            </div>
            <h2 className="text-sm sm:text-base font-bold text-gray-700">
              {service.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
