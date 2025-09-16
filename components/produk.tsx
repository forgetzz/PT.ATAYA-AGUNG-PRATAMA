"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const products = [
    { image: "/images/price1.jpeg" },
    { image: "/images/price2.jpeg" },
    { image: "/images/price3.jpeg" },
    { image: "/images/Promo.png" },
  ];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const firstChild = scrollRef.current.firstChild as HTMLElement | null;
    if (!firstChild) return;

    const cardWidth = firstChild.clientWidth;
    const gap = 24; // gap-6 = 1.5rem
    const scrollAmount =
      direction === "left" ? -(cardWidth + gap) : cardWidth + gap;

    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      id="produk"
      className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-16 relative overflow-hidden"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Promo <span className="text-blue-500">Akhir Bulan</span>
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Temukan pilihan terbaik untuk kebutuhan Anda
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Arrow Left */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>

        {/* Arrow Right */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-0 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <ArrowRight className="w-6 h-6 text-blue-600" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md min-w-[300px] flex-shrink-0 snap-start hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              onClick={() => setSelected(product.image)}
            >
              <div className="w-full h-64 relative mb-4">
                <Image
                  src={product.image}
                  alt="AAP"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white bg-red-500 p-2 rounded-full hover:bg-red-600"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selected}
              alt="Preview"
              width={1200}
              height={800}
              className="rounded-lg object-contain max-h-[80vh] mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
