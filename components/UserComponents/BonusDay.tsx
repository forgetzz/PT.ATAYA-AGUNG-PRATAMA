"use client";

import { useEffect, useState } from "react";
import { Coins, Database, Users } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
interface Datas {
  bonus: number;
  bonusRO: number;
}
export default function BonusDay() {
  const [bonusDay, setBonusDay] = useState<Datas | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return;

      try {
        const snap = doc(db, "users", user.uid);
        const snapRef = await getDoc(snap);

        if (snapRef.exists()) {
          const data = snapRef.data() as Datas;

          const today = new Date().toISOString().split("T")[0];
          const lastUpdateDate = localStorage.getItem("bonusDate");
          const cachedBonus = localStorage.getItem("bonusValue");
          const cachedBonusRO = localStorage.getItem("bonusROValue");

          // ✅ Gunakan cache jika masih berlaku hari ini
          if (lastUpdateDate === today && cachedBonus && cachedBonusRO) {
            setBonusDay({
              bonus: parseFloat(cachedBonus),
              bonusRO: parseFloat(cachedBonusRO),
            });
            setLoading(false);
            return;
          }

          // ✅ Jika bonus ada dari Firestore, update localStorage
          if (data.bonus && data.bonus > 0) {
            setBonusDay(data);
            localStorage.setItem("bonusValue", data.bonus.toString());
            localStorage.setItem("bonusROValue", data.bonusRO.toString());

            localStorage.setItem("bonusDate", today);
          } else {
            setBonusDay(data); // tetap simpan data meski bonus kosong
          }

          setLoading(false);
        }
      } catch (err) {
        console.error("❌ Gagal ambil data bonus:", err);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-800 tracking-tight">
        Bonus Hari ini
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* Card Bonus RO */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl border border-yellow-400 ">
          <div className="flex items-center gap-3 mb-12 bg-red-500 rounded-lg p-5">
            <Coins className="w-8 h-8 text-gray-50" />
            <h3 className="text-xl font-semibold text-gray-50">Bonus RO</h3>
          </div>
          <div className="text-2xl text-blue-600 font-bold text-center mb-4">
         {bonusDay ? formatRupiah(bonusDay.bonusRO) : "Rp0"}

          </div>
          <p className="text-sm text-gray-600 text-center p-8">
            Bonus dari pembelanjaan ulang anggota Anda.
          </p>
        </div>

        {/* Card Bonus Referal */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl border border-blue-400 ">
          <div className="flex items-center gap-3 mb-12 bg-red-600 p-5 rounded-lg w-full">
            <Users className="w-8 h-8 text-white" />
            <h3 className="text-xl font-semibold text-gray-50">
              Bonus Referal
            </h3>
          </div>
          <div className="text-2xl text-red-600 font-bold text-center "> {bonusDay ? formatRupiah(bonusDay.bonus) : "Rp0"}</div>
          <p className="text-sm text-gray-600 text-center p-8">
            Bonus dari anggota baru yang Anda sponsori.
          </p>
        </div>
      </div>
    </section>
  );
}
