"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const menuLinks = [
    { label: "Beranda", href: "#features" },
    { label: "Tentang Kami", href: "#features" },
    { label: "Produk", href: "#produk" },
    { label: "Kemitraan", href: "#halo" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm dark:bg-black/90 dark:border-red-400">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-red-600">
          ASBFamily
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "text-gray-700 hover:text-red-600 font-medium transition",
                pathname === link.href && "text-red-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-2">
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/singup">Daftar Mitra</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-red-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[300px]">
              {/* --- BAGIAN YANG DIPERBAIKI --- */}
              {/* Tambahkan SheetTitle dan SheetDescription di sini */}
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk navigasi situs.</SheetDescription>
              {/* --- AKHIR BAGIAN YANG DIPERBAIKI --- */}

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
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 text-white w-full"
                >
                  <Link href="/signup">Daftar Mitra</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}