"use client";

import {
  BadgePercent,
  Users,
  ShoppingCart,
  Wallet,
  Menu,
  ChevronRight,
  Settings,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useTabStore } from "@/store/tabStore";
import { getAuth } from "firebase/auth";
import { db } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";

interface DataProfil {
  name: string;
  bonus: string;
  uid: string;
}

export default function Home() {
  const user = getAuth().currentUser;
  const dbRef = db;
  const [open, setOpen] = useState(false);
  const [profile, setProfil] = useState<DataProfil>();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const datas = await getDoc(doc(dbRef, "users", user.uid));
      if (datas.exists()) {
        const res = datas.data() as DataProfil;
        console.log(res);
        setProfil(res);
      }
    };
    fetchData();
  }, [user]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile?.uid || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin UID:", err);
    }
  };
  const { setActiveTab } = useTabStore();

  const menuLinks = [
    { label: "Beranda", href: "#features" },
    { label: "Tentang Kami", href: "#features" },
    { label: "Produk", href: "#produk" },
    { label: "Kemitraan", href: "#halo" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-400 text-white px-4 py-6 font-sans sm:px-6 md:px-8 lg:px-12">
      {/* Header */}
      {/* Meningkatkan mb-4 menjadi mb-6 untuk jarak yang lebih lega */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-red-600 font-bold text-lg sm:text-xl shadow">
            ASB
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold">
              {profile?.name}
            </h2>
            <p className="text-sm text-white/80">Mitra Aktif</p>
          </div>
        </div>

        {/* Ganti Bell => Menu dengan Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-white dark:bg-black">
            <SheetTitle className="text-lg font-bold mb-4">Menu</SheetTitle>
            <SheetDescription className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Pilih menu di bawah
            </SheetDescription>
            <nav className="flex flex-col gap-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-800 dark:text-white font-medium hover:text-red-600"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Saldo ringkas */}
      {/* Menambahkan rounded-xl dan meningkatkan mb */}
      <Card className="bg-white/10 border border-white/10 backdrop-blur-sm mb-6 rounded-xl shadow-lg">
        <CardContent className="py-4">
          <p className="text-sm text-white/80">Kode Sponsor anda</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-white truncate max-w-[180px]">
              {profile?.uid}
            </p>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopy}
              className="text-white hover:bg-white/20"
              title="Salin UID"
            >
              <Copy size={16} />
            </Button>
            {copied && (
              <span className="text-xs text-green-400">Tersalin!</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistik Ringkas */}
      {/* Mengubah gap-3 menjadi gap-4 untuk jarak yang lebih baik */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <MiniStat
          label="Mitra"
          value="28 Orang"
          icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
        <MiniStat
          label="Transaksi"
          value="Rp 3.5jt"
          icon={<ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
        <MiniStat
          label="Bonus"
          value={`Rp ${Number(profile?.bonus).toLocaleString("id-ID")}`}
          icon={<BadgePercent className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
      </div>

      {/* Menu Utama */}
      {/* Mengubah gap-3 menjadi gap-4 */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Menambahkan flex-1 dan min/max-width untuk tata letak 2 kolom di mobile */}
        <div
          className="flex-1 min-w-[45%] max-w-[calc(50%-0.5rem)] sm:min-w-[unset] sm:max-w-[unset]"
          onClick={() => setActiveTab("jaringan")}
        >
          <MenuButton icon={<Users />} label="Jaringan" />
        </div>
        <div
          className="flex-1 min-w-[45%] max-w-[calc(50%-0.5rem)] sm:min-w-[unset] sm:max-w-[unset]"
          onClick={() => setActiveTab("produk")}
        >
          <MenuButton icon={<ShoppingCart />} label="Produk" />
        </div>
        <div
          className="flex-1 min-w-[45%] max-w-[calc(50%-0.5rem)] sm:min-w-[unset] sm:max-w-[unset]"
          onClick={() => setActiveTab("finance")}
        >
          <MenuButton icon={<Wallet />} label="Keuangan" />
        </div>
        <div
          className="flex-1 min-w-[45%] max-w-[calc(50%-0.5rem)] sm:min-w-[unset] sm:max-w-[unset]"
          onClick={() => setActiveTab("settings")}
        >
          <MenuButton icon={<Settings />} label="Setting" />
        </div>
      </div>

      {/* Promo */}
      {/* Menambahkan rounded-xl */}
      <Card className="bg-white/20 border-white/10 text-white backdrop-blur-lg rounded-xl">
        <CardContent className="py-3 px-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm sm:text-base">
              📢 Promo Bulan Ini
            </span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          </div>
          <p className="text-sm mt-1 text-white/90 sm:text-base">
            🎉 Bonus 10% setiap mitra baru selama bulan Juli!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function MiniStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <Card className="bg-white/15 border border-white/10 text-white backdrop-blur shadow rounded-lg">
        <CardContent className="p-3 flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-white/80 text-xs sm:text-sm">
            {icon}
            <span>{label}</span>
          </div>
          <div className="text-sm font-semibold sm:text-base">{value}</div>
        </CardContent>
      </Card>
    </div>
  );
}

function MenuButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="w-full bg-white/20 text-white rounded-xl py-3 px-2 flex flex-col items-center justify-center hover:scale-105 transition">
      <div className="mb-1">{icon}</div>
      <div className="text-xs sm:text-sm font-medium">{label}</div>
    </div>
  );
}
