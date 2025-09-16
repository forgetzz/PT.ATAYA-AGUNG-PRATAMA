// components/Footer.tsx
import React from "react";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="kontak"
      className="bg-gradient-to-br from-blue-600 to-blue-400 text-white pt-12 pb-6 mt-16 shadow-inner shadow-black/20"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Logo & Deskripsi */}
        <div className="space-y-3 flex justify-center items-center flex-col">
          <Image
            src="/images/ATAYA.png"
            alt="Logo AAP"
            width={200}
            height={200}
            className="object-contain max-h-60 bg-white rounded-lg "
            priority
          />
          <p className="text-sm text-gray-100">
            PT. ATAYA AGUNG PRATAMA. Inovasi Layanan Service AC untuk
            Kenyamanan dan Kepuasan Anda.
          </p>
        </div>

        {/* Admin Kontak */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold underline underline-offset-4 decoration-white/40">
            Admin Kontak
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone className="text-green-400" />
              <a
                href="https://wa.link/ytt8my"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin:0813-5664-9191
              </a>
            </li>
           
            <li className="flex items-center gap-2">
              <FaInstagram className="text-green-400" />
              <a
                href="https://facebook.com/atayaagungpratama"
                target="_blank"
                rel="noopener noreferrer"
              >
                atayaagungpratama
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-400" />
              <a
                href="mailto:ptatayaagungpratamaesp@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ptatayaagungpratamaesp@gmail.com
              </a>
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
            Jl. Nico, Blok I No.20, Kelurahan Lariang Bangi, Kota Makassar
          </p>
          <div className="rounded-xl overflow-hidden border border-white/30 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7959073388333!2d119.41944207324688!3d-5.136537651952524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefd5694cab3ad%3A0x2adb08314969179d!2sKomplek%20Ruko%2C%20Jl.%20Nico%20No.I%2C%20RW.27%2C%20Lariang%20Bangi%2C%20Kec.%20Makassar%2C%20Kota%20Makassar%2C%20Sulawesi%20Selatan%2090157!5e0!3m2!1sid!2sid!4v1757957568822!5m2!1sid!2sid"
              width="100%"
              height="180"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
           <p className="text-sm text-gray-100">
            Jl. Nico, Blok I No.20, Kelurahan Lariang Bangi, Kota Makassar
          </p>
          <div className="rounded-xl overflow-hidden border border-white/30 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7959073388333!2d119.41944207324688!3d-5.136537651952524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefd5694cab3ad%3A0x2adb08314969179d!2sKomplek%20Ruko%2C%20Jl.%20Nico%20No.I%2C%20RW.27%2C%20Lariang%20Bangi%2C%20Kec.%20Makassar%2C%20Kota%20Makassar%2C%20Sulawesi%20Selatan%2090157!5e0!3m2!1sid!2sid!4v1757957568822!5m2!1sid!2sid"
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
            Menjadi perusahaan service AC terpercaya dan terdepan di Indonesia,
            yang selalu mengutamakan kualitas, inovasi, dan kepuasan pelanggan.
          </p>
        </div>

        {/* Marketplace */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-center">Jangkauan Kami</h3>
          <div className="flex items-center justify-center flex-wrap gap-4">
            <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/shopee.jpg"
                alt="Shopee"
                width={50}
                height={50}
                className="rounded-lg bg-white p-1"
              />
            </a>
            <a
              href="https://tokopedia.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/tokopedia.png"
                alt="Tokopedia"
                width={80}
                height={80}
                className="rounded-lg bg-white p-1"
              />
            </a>
            <a
              href="https://lazada.co.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/padi.png"
                alt="Lazada"
                width={150}
                height={150}
                className="rounded-lg bg-white p-1"
              />
            </a>
            <a
              href="https://lazada.co.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/prolog.jpg"
                alt="Lazada"
                width={150}
                height={150}
                className="rounded-lg bg-white p-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <p className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()}{" "}
        <strong className="text-white">Ataya Agung Pratama</strong>. All rights
        reserved.
      </p>
    </footer>
  );
}
