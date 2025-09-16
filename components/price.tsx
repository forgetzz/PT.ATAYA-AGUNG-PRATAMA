"use client";

import Image from "next/image";
import React, { useState } from "react";
import { X } from "lucide-react";

export default function Price() {
  const [selected, setSelected] = useState<string | null>(null);

  // cukup 1 gambar
  const product = { image: "/images/price1.jpeg" };

  return (
    <section
      id="price"
      className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-16 relative"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Price <span className="text-blue-500">List</span>
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Temukan pilihan terbaik untuk kebutuhan Anda
        </p>
      </div>

      {/* Card di tengah */}
      <div className="flex justify-center">
        <div
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer max-w-md w-full"
          onClick={() => setSelected(product.image)}
        >
          <div className="relative w-full h-96">
            <Image
              src={product.image}
              alt="AAP"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
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
