// components/Footer.tsx
import React from "react";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#7b1b1b] to-[#a94442] text-white pt-12 pb-6 mt-16 shadow-inner shadow-black/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Deskripsi */}
        <div className="space-y-3">
          <Image
            src="/images/logo123.jpeg"
            alt="Teh ASB"
            width={200}
            height={200}
            className="object-contain max-h-60 rounded-lg"
            priority
          />
          <p className="text-sm text-gray-100">
            PT. Auto Sukses Berjamaah. Membangun Kesehatan dan Kesejahteraan
            Bersama.
          </p>
        </div>

        {/* Admin Kontak */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold underline underline-offset-4 decoration-white/40">
            Admin Kontak
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-green-400" />

              <a href="https://wa.link/ajnx61">Fachira: 087723776111</a>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-green-400" />
              <a href="https://wa.link/gaue50">Baby: 085777982292</a>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-green-400" />
              <a href="https://wa.link/z2tflg">Ade: 085122475755</a>
            </li>
          </ul>
        </div>

        {/* Lokasi & Map */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-300" />
            Alamat Kami
          </h3>
          <p className="text-sm text-gray-100">
            Pettuadae, Kec. Turikale, Kabupaten Maros, Sulawesi Selatan 90516
          </p>
          <div className="rounded-xl overflow-hidden border border-white/30 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.5517336929215!2d119.57309347362144!3d-5.013841751059025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbef9000f277701%3A0x6a7e9e3143107bb6!2sASB%20MAROS!5e0!3m2!1sid!2sid!4v1753995710257!5m2!1sid!2sid"
              width="100%"
              height="180"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Quotes / Slogan */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">🚀 Visi Kami</h3>
          <p className="text-sm italic text-gray-100">
            "Sukses bersama, sehat bersama."
          </p>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-gray-200">
        {/* © {new Date().getFullYear()}{" "} */}
        <strong className="text-white">ASB Family</strong>. All rights reserved.
      </div>
    </footer>
  );
}
