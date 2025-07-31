// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#800000] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Logo dan Deskripsi */}
        <div>
          <h2 className="text-2xl font-bold mb-2">ASB Network</h2>
          <p className="text-sm text-gray-200">
            Platform komunitas berbasis jaringan untuk membangun masa depan finansial bersama.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:underline">Beranda</Link></li>
            <li><Link href="/tentang" className="hover:underline">Tentang Kami</Link></li>
            <li><Link href="/kontak" className="hover:underline">Kontak</Link></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Bantuan</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/panduan" className="hover:underline">Panduan</Link></li>
            <li><Link href="/syarat-ketentuan" className="hover:underline">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Ikuti Kami</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="https://t.me/asb_official" target="_blank" className="hover:underline">Telegram</a></li>
            <li><a href="https://instagram.com/asbnetwork" target="_blank" className="hover:underline">Instagram</a></li>
            <li><a href="https://youtube.com/@asbnetwork" target="_blank" className="hover:underline">YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} ASB Network. All rights reserved.
      </div>
    </footer>
  );
}
