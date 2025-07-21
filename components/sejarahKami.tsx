import React from "react";
import Image from "next/image";

export default function SejarahKami() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-10 px-6 text-center">
        <h1 className="text-3xl font-bold">Tentang PT AUTO SUKSES BERJAMAAH</h1>
        <p className="text-lg mt-2">
          Membangun kesehatan dan kesejahteraan bersama
        </p>
      </div>

      {/* Gambar dan Konten Berdampingan */}
      <div className="flex flex-wrap md:flex-nowrap bg-white p-6 items-center gap-6">
        {/* Gambar */}

        <div className="relative w-full md:w-1/3 aspect-video px-1">
          <Image
            src="/images/logo123.png"
            alt="ASB Family Background"
            fill
            className="object-full rounded"
            priority
          />
        </div>


        {/* Teks */}
        <div className="w-full md:w-1/2 text-black">
          <p className="text-justify">
            AUTO SUKSES BERJAMAAH (ASB) adalah sebuah komunitas yang dibangun di
            atas fondasi semangat kebersamaan untuk mencapai kesuksesan bersama.
            Kami percaya bahwa kesuksesan sejati tidak hanya diukur dari
            pencapaian finansial, tetapi juga dari kemampuan untuk bertumbuh,
            saling mendukung, dan menciptakan dampak positif. Melalui model
            bisnis yang inklusif dan produk-produk herbal berkualitas, ASB
            membuka pintu bagi siapa saja yang ingin meraih impian, meningkatkan
            kesejahteraan, dan menjadi bagian dari keluarga besar yang solid dan
            inspiratif.
          </p>
        </div>
      </div>
    </div>
  );
}
