"use client";
import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function SejarahKami() {
  return (
    <div id="tentangKami" className="w-full">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 px-6 text-center shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Tentang PT ATAYA AGUNG PRATAMA
        </h1>
        <p className="text-lg mt-3 max-w-2xl mx-auto">
          Inovasi Layanan Service AC untuk Kenyamanan dan Kepuasan Anda
        </p>
      </div>

      {/* Gambar dan Konten */}
      <div className="flex flex-wrap md:flex-nowrap bg-white p-8 items-center gap-8 max-w-7xl mx-auto">
        {/* Gambar */}
        <div className="relative w-full md:w-1/3 h-72 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/pic1.jpeg"
            alt="Logo ATT"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Teks */}
        <div className="w-full text-gray-700">
          <p className=" text-lg ">
            Kami adalah perusahaan yang bergerak dalam bidang Kontraktor,
            Distributor, Service, dan Maintenance Air Conditioner dengan
            pengalaman lebih dari puluhan tahun. Dengan komitmen tinggi pada
            kualitas dan kepuasan pelanggan, kami selalu memberikan layanan
            terbaik untuk mendukung kenyamanan Anda.
          </p>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="bg-gray-50 py-16 px-6 mt-10 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Visi <span className="text-blue-600">&</span> Misi
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Landasan kami dalam memberikan pelayanan Service AC terbaik untuk
            setiap pelanggan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Visi */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Visi</h3>
            <p className="text-gray-700 leading-relaxed">
              Menjadi perusahaan service AC terpercaya dan terdepan di
              Indonesia, yang selalu mengutamakan kualitas, inovasi, dan
              kepuasan pelanggan.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Misi</h3>
            <ul className="space-y-3 text-gray-700 text-left">
              {[
                "Memberikan layanan service AC yang cepat, profesional, dan berkualitas.",
                "Menyediakan solusi hemat energi dan ramah lingkungan.",
                "Membangun hubungan jangka panjang dengan pelanggan berdasarkan kepercayaan.",
                "Meningkatkan kualitas sumber daya manusia melalui pelatihan berkelanjutan.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 w-5 h-5 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
