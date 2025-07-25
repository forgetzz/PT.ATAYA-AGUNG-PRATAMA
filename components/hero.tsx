"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; // Ikon panah

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="ASB Family Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Bersama ASB, Menuju{" "}
          <span className="text-yellow-400">Hidup Sehat & Sukses</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Sukses bersama, sehat bersama, ASB pilihan kita.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/singup">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg">
              Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#produk">
            <Button
              variant="outline"
              size="lg"
              className="text-black border-white hover:bg-white hover:text-black px-6 py-3 rounded-xl"
            >
              Lihat Produk <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
