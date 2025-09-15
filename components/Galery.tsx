
"use client";

import React, { useState } from "react";
import Image from "next/image";

export function Gallery() {
  const images = [
    "/images/asas.png",
    "/images/pic2.png",
    "/images/pic3.png",
    "/images/pic1.png",

  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="galeri" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
          Galery Foto <span className="text-blue-600">Perusahaan</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
          Kumpulan dokumentasi dan arsip penting perusahaan kami sebagai bukti
          transparansi dan profesionalisme.
        </p>
      </div>

      {/* Grid Foto */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative w-full h-40 md:h-56 rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-xl transition cursor-pointer"
            onClick={() => setSelected(src)}
          >
            <Image
              src={src}
              alt={`Dokumen ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-[90%] max-w-4xl h-[80%]">
            <Image
              src={selected}
              alt="Preview dokumen"
              fill
              className="object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-lg text-black font-bold"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
