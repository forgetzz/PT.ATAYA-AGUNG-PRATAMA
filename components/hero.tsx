"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-white text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ac.jpg"
          alt="Inovasi Service AC"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Inovasi{" "}
          <span className="text-blue-300">Layanan Service AC Modern</span>{" "}
          untuk Kenyamanan Anda
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Teknologi terbaru, tim profesional, dan solusi hemat energi.  
          Kami hadir untuk menjadikan udara rumah dan kantor Anda lebih sejuk dan sehat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              Pesan Sekarang <FaWhatsapp className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#produk">
            <Button
              variant="outline"
              size="lg"
              className="text-black border-white hover:bg-white hover:text-blue-700 px-6 py-3 rounded-xl"
            >
              Lihat Sevice <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
