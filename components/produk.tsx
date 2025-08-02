import Image from "next/image";
import React from "react";

export default function ProductCards() {
  return (
    <section id="produk" className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-16">
      {/* Judul */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Produk <span className="text-red-500">Kami</span>
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Temukan pilihan terbaik untuk kebutuhan Anda
        </p>
      </div>

      {/* Grid 2 Produk */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 justify-items-center">
        {/* Produk 1 */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 w-full max-w-md overflow-hidden">
          <div className="w-full h-64 bg-red-800 flex items-center justify-center">
            <Image
              src="/images/produk2.jpeg"
              alt="Kopi ASB"
              width={300}
              height={200}
              className="object-contain max-h-60"
              priority
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">ASB BOOSTER</h2>
            <p className="text-gray-600 mb-4">ASB Boostrer untuk meningkatkan imunitas anak</p>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition duration-200">
              Lihat Detail
            </button>
          </div>
        </div>

        {/* Produk 2 */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 w-full max-w-md overflow-hidden">
          <div className="w-full h-64 bg-red-800 flex items-center justify-center">
            <Image
              src="/images/produk1.jpeg"
              alt="Teh ASB"
              width={300}
              height={200}
              className="object-contain max-h-60"
              priority
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">ASB OIL</h2>
            <p className="text-gray-600 mb-4">Asb oil mengatasi nyeri sendi, batu dan demam dan mengatasi patah tulang</p>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition duration-200">
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
