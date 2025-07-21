"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCards() {
  return (
    <div id="produk" className="max-w-7xl mx-auto px-6 py-12">
      {/* Judul Section */}
      <h1 className="text-4xl font-bold text-white-700 mb-8 text-center">
        Produk kami
      </h1>

      {/* Grid Produk */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Produk A */}
        <div className="bg-red-50 border border-red-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
           <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src="/images/produk1.jpeg"
              alt="Produk B"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-red-700 mb-2">Produk A</h2>
            <p className="text-gray-700 mb-4">
              Ini adalah deskripsi singkat untuk Produk A.
            </p>
            <Link
              href="/produk/1"
              className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Lihat Detail
            </Link>
          </div>
        </div>

        {/* Produk B */}
        <div className="bg-red-50 border border-red-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src="/images/produk2.jpeg"
              alt="Produk B"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-red-700 mb-2">Produk B</h2>
            <p className="text-gray-700 mb-4">
              Deskripsi singkat mengenai Produk B yang sangat keren.
            </p>
            <Link
              href="/produk/2"
              className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Lihat Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
