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

export function LayananKami() {
  const [open, setOpen] = useState(false);

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
        <button onClick={() => setOpen(!open)}>
          {" "}
          <Wrench className="w-8 h-8 text-white" />
        </button>
      ),
      title: "INSTALL",
    },
    {
      icon: <Settings className="w-8 h-8 text-white" />,
      title: "MAINTENANCE & SERVICE",
    },
    {
      icon: (
        <a href="https://wa.me/+6281356649191">
          <Truck className="w-8 h-8 text-white" />
        </a>
      ),
      title: "PENGADAAN",
    },
    {
      icon: (
        <a href="https://wa.me/+6281356649191">
          <ShoppingCart className="w-8 h-8 text-white" />
        </a>
      ),
      title: "SALES",
    },
    {
      icon: <Building2 className="w-8 h-8 text-white" />,
      title: "AIR CONDITIONER CONTRACTOR",
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-10">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            {/* Tombol close pojok kanan atas */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-blue-500"
            >
              <X />
            </button>

            {/* Gambar di tengah */}
            <div>
              <img
                src="/images/price3.jpeg"
                alt="logo"
                className="w-[70%] max-h-[80vh] mx-auto"
              />
            </div>
          </div>
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
