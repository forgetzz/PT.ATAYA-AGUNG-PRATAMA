"use client";
import { onAuthStateChanged } from "firebase/auth";


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
  username: string
}

export default function Home() {
  const user = getAuth().currentUser;
  const dbRef = db;
  const [open, setOpen] = useState(false);
  const [profile, setProfil] = useState<DataProfil>();
  const [copied, setCopied] = useState(false);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const res = docSnap.data() as DataProfil;
        setProfil(res);
      } else {
        console.warn("Data pengguna tidak ditemukan di Firestore.");
      }
    } catch (err) {
      console.error("Gagal mengambil data user:", err);
    }
  });

  return () => unsubscribe(); // Bersihkan listener saat unmount
}, []);

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
    <div className="min-h-screen text-black px-4 py-6 font-sans sm:px-6 md:px-8 lg:px-12">
      {/* Header */}
      {/* Meningkatkan mb-4 menjadi mb-6 untuk jarak yang lebih lega */}
      <div className="flex items-center justify-between mb-6 text-black">
        <div className="flex items-center gap-3">
       
          <div>

            <h2 className="text-base sm:text-lg font-bold"> Selamat Datang,
              {profile?.name}
            </h2>
            <p className="text-sm text-black/50">ini adalah ringkasan akitvitas dan pencapaian anda</p>
          </div>
        </div>

        {/* Ganti Bell => Menu dengan Sheet */}
       
      </div>

      {/* Saldo ringkas */}
      {/* Menambahkan rounded-xl dan meningkatkan mb */}
      <Card className="bg-white/10 border border-white/10 backdrop-blur-sm mb-6 rounded-xl shadow-lg">
        <CardContent className="py-4">
          <p className="text-sm text-black">Username anda</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-black truncate max-w-[180px]">
              {profile?.username}
            </p>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopy}
              className="text-black "
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


    </div>
  );
}

