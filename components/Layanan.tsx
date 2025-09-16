"use client";

import {
  Wrench,
  Sparkles,
  Settings,
  ShoppingCart,
  Truck,
  Building2,
  X,
} from "lucide-react";
import React, { useState } from "react";
import PromoPopup from "./Promo";
import PromoPopup2 from "./promo2";
import PromoPopup3 from "./Promo3";

export function LayananKami() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const services = [
    {
      icon: (
        <button onClick={() => setOpen(!open)}>
          {" "}
          <Sparkles className="w-8 h-8 text-white" />
        </button>
      ),
      title: "CLEANING",
    },
    {
      icon: (
        <button onClick={() => setOpen2(!open2)}>
          {" "}
          <Wrench className="w-8 h-8 text-white" />
        </button>
      ),
      title: "INSTALL",
    },
    {
      icon:   <button onClick={() => setOpen3(!open3)}>
          {" "}
         <Settings className="w-8 h-8 text-white" />
        </button>,
      title: "MAINTENANCE & SERVICE",
    },
    {
      icon: (
        <a href="https://wa.link/ytt8my">
          <Truck className="w-8 h-8 text-white" />
        </a>
      ),
      title: "SALES & PENGADAAN",
    },
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
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <PromoPopup onClose={() => setOpen(false)} />
        </div>
      )}
      {open2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <PromoPopup2 onClose={() => setOpen2(false)} />
        </div>
      )}
      {open3 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <PromoPopup3 onClose={() => setOpen3(false)} />
        </div>
      )}

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
