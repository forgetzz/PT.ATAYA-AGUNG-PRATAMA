import React from "react";
import { FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const admins = [
    { name: "Desain", phone: "082212345678" },
    { name: "Fachira", phone: "085298765432" },
    { name: "Beby (Pengiriman)", phone: "081345678910" },
  ];

  return (
 <footer className="w-full mb-96  text-white py-6 px-4 shadow-inner">
  <p className="text-center text-sm text-red-400">
    © {new Date().getFullYear()} ASB Family. All rights reserved.
  </p>
</footer>

  );
}
