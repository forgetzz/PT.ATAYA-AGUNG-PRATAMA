"use client";
import Image from "next/image";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="ASB Family Background"
          fill
          className="object-cover brightness-30"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Bersama ASB, Menuju <span className="text-yellow-500">Hidup sehat dan sukses</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 text-white">
          Sukses bersama, sehat bersama, ASB pilihan kita 
        </p>
        <div className="flex-col flex gap-2">
          <Link href="/singup">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition">
              Daftar Sekarang 
            </button>
          </Link>
          <Link href="#produk">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition">
              Lihat Produk
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
