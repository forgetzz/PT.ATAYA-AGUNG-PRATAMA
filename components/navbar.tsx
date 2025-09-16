"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import clsx from "clsx";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaVoicemail, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const menuLinks = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "#tentangKami" },
    { label: "Produk", href: "#product" },
    { label: "Price List", href: "#price" },
    { label: "Galery", href: "/galery" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm dark:bg-black/90 dark:border-red-400">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600 p-2">
          Ataya Agung Pratama
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "text-gray-700 hover:text-blue-600 font-medium transition",
                pathname === link.href && "text-blue-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-2">
          <Button asChild className="bg-blue-600 hover:bg-red-700 text-white">
            <Link href="https://wa.me/+6281356649191">
              Pesan sekarang <FaWhatsapp className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-blue-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[300px]">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <SheetDescription className="sr-only">
                Menu untuk navigasi situs.
              </SheetDescription>

              <div className="flex flex-col gap-4 mt-6">
                {menuLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-gray-700 hover:text-red-600 font-medium"
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 text-white w-full"
                >
                  <Link href="/login">
                    Pesan Jasa Service <FaWhatsapp className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                {/* Sosmed Icons */}
                {/* <div className="flex items-center justify-center gap-4 mt-6 text-gray-600">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="w-6 h-6 hover:text-blue-600 transition" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-6 h-6 hover:text-pink-500 transition" />
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="w-6 h-6 hover:text-black transition" />
                  </a>
                  <a href="mailto:ptatayaagungpratamaesp@gmail.com" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope className="w-6 h-6 hover:text-red-600 transition" />
                  </a>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
