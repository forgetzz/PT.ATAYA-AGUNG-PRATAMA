"use client";

import React, { useEffect, useState } from "react";
import {
  Gift,
  Coins,
  TrendingUp,
  Award,
  Star,
  Eye,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function Manajemenbonus() {
  const [bonus, setBonus] = useState({
    referal: 0,
    ro: 0,
    utama: 0,
    peringkat: 0,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.uid === auth.currentUser?.uid) {
            setBonus({
              referal: data.bonusReferal || 0,
              ro: data.bonusRO || 0,
              utama: data.bonusUtama || 0,
              peringkat: data.bonusPeringkat || 0,
            });
          }
        });
      }
    );
    return () => unsubscribe();
  }, []);

  const cardClass = "bg-white p-4 rounded-xl shadow flex items-center justify-between";

  return (
    <div className="p-6 space-y-6">
      <div className="px-4">
        <p className="text-3xl font-bold">Manajemen Bonus</p>
        <p className="text-sm text-gray-500 mt-1">Lacak semua perolehan bonus Anda di sini</p>
      </div>

      <div className="bg-red-500 text-white p-6 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Bonus Hari Ini</h2>
          <p className="text-sm mt-1">Lihat rincian dan bonus referal hari ini dan RO yang Anda dapatkan.</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-white text-red-500 font-semibold px-4 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
          <Eye size={18} />
          Lihat Rincian
        </button>
      </div>

      <div className={cardClass}>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Bonus Referal</p>
          <p className="text-2xl font-bold">Rp {bonus.referal.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Bonus dari mereferensikan mitra baru</p>
        </div>
        <Gift size={32} className="text-red-500" />
      </div>

      <div className={cardClass}>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Bonus RO</p>
          <p className="text-2xl font-bold">Rp {bonus.ro.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Bonus dari repeat order tim Anda</p>
        </div>
        <Coins size={32} className="text-yellow-500" />
      </div>

      <div className={cardClass}>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Bonus Reward Utama</p>
          <p className="text-2xl font-bold">Rp {bonus.utama.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Reward pencapaian target utama</p>
        </div>
        <Award size={32} className="text-blue-500" />
      </div>

      <div className={cardClass}>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Bonus Reward Peringkat</p>
          <p className="text-2xl font-bold">Rp {bonus.peringkat.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Bonus kenaikan peringkat Anda</p>
        </div>
        <TrendingUp size={32} className="text-green-500" />
      </div>
    </div>
  );
}
