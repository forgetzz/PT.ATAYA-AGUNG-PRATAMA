import React from "react";
import { FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const admins = [
    { name: "Desain", phone: "082212345678" },
    { name: "Fachira", phone: "085298765432" },
    { name: "Beby (Pengiriman)", phone: "081345678910" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-[#002B5B] to-[#001F3F] text-white py-12 px-6 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-wide">Hubungi Admin Kami</h2>
          <p className="text-gray-300 text-sm mt-2">Kami siap membantu Anda dengan sepenuh hati 💙</p>
        </div>

        {/* Admin List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {admins.map((admin, index) => (
            <div
              key={index}
              className="bg-[#003366] p-6 rounded-2xl shadow-md hover:bg-[#004080] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{admin.name}</h3>
              <a
                href={`https://wa.me/62${admin.phone.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-green-400 hover:underline"
              >
                <FaWhatsapp className="mr-2" />
                {admin.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center text-gray-400 space-y-1 text-sm">
          <div className="flex justify-center items-center gap-2">
            <FaMapMarkerAlt />
            <span>Jl. Sehat No. 88, Kota Bahagia, Indonesia</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <FaEnvelope />
            <span>info@asbfamily.id</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} ASB Family. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
