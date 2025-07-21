"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false); // auto close saat ganti halaman
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-red-300 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-32 h-10">
            <Image
              src="/images/logo123.png"
              alt="Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6">
          <li>
            <Link href="#features" className="text-gray-700 hover:text-red-600 font-medium transition">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="#features" className="text-gray-700 hover:text-red-600 font-medium transition">
            Tentang Kami  
            </Link>
          </li>
          <li>
            <Link href="#produk" className="text-gray-700 hover:text-red-600 font-medium transition">
              Produk
            </Link>
          </li>
          <li>
            <Link href="#halo" className="text-gray-700 hover:text-red-600 font-medium transition">
              Kemitraan
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-700 hover:text-red-600 font-medium transition">
              Kontak
            </Link>
          </li>
        </ul>

        {/* Desktop Login Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Login
          </Link>
        </div>
    

        {/* Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden focus:outline-none transition duration-300"
        >
          <div className="w-6 h-6 relative">
            <span
              className={clsx(
                "block absolute h-[2px] w-full bg-red-600 transform transition duration-300 ease-in-out",
                menuOpen ? "rotate-45 top-2.5" : "top-1"
              )}
            />
            <span
              className={clsx(
                "block absolute h-[2px] w-full bg-red-600 transform transition duration-300 ease-in-out",
                menuOpen ? "opacity-0" : "top-3"
              )}
            />
            <span
              className={clsx(
                "block absolute h-[2px] w-full bg-red-600 transform transition duration-300 ease-in-out",
                menuOpen ? "-rotate-45 bottom-2.5" : "bottom-1"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white px-6 py-4 border-t border-red-200 shadow-md">
          <ul className="flex flex-col gap-4">
            <li>
            <Link href="#features" className="text-gray-700 hover:text-red-600 font-medium transition">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="#features" className="text-gray-700 hover:text-red-600 font-medium transition">
            Tentang Kami  
            </Link>
          </li>
          <li>
            <Link href="#produk" className="text-gray-700 hover:text-red-600 font-medium transition">
              Produk
            </Link>
          </li>
          <li>
            <Link href="#halo" className="text-gray-700 hover:text-red-600 font-medium transition">
              Kemitraan
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-700 hover:text-red-600 font-medium transition">
              Kontak
            </Link>
          </li>
            <li>
              <Link
                href="/login"
                className="block text-white bg-red-600 px-4 py-2 rounded-md text-center hover:bg-red-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/singup"
                className="block text-white bg-red-600 px-4 py-2 rounded-md text-center hover:bg-red-700"
                onClick={() => setMenuOpen(false)}
              >
                Daftar mitra
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
