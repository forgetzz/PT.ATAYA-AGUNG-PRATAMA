"use client";

import { useEffect, useState } from "react";
import { Coins, Users } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function BonusBelumDitarik() {
  const [bonusRO, setBonusRO] = useState<number>(0);
  const [bonusReferal, setBonusReferal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBonus = async () => {
      setLoading(true);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const bonusRef = doc(db, "users", user.uid);
          const bonusSnap = await getDoc(bonusRef);

          if (bonusSnap.exists()) {
            const data = bonusSnap.data();
            setBonusRO(data.bonusRO || 0);
            setBonusReferal(data.bonus || 0);
          }
        }
        setLoading(false);
      });
    };

    fetchBonus();
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
        Bonus Belum Ditarik
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* Card Bonus RO */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl border border-yellow-400 ">
          <div className="flex items-center gap-3 mb-12 bg-red-500 rounded-lg p-5">
            <Coins className="w-8 h-8 text-gray-50" />
            <h3 className="text-xl font-semibold text-gray-50">Bonus RO</h3>
          </div>
          <div className="text-2xl text-blue-600 font-bold text-center mb-4">
            {loading ? "Loading..." : formatRupiah(bonusRO)}
          </div>
          <p className="text-sm text-gray-600 text-center p-8">
            Bonus dari pembelanjaan ulang anggota Anda.
          </p>
        </div>

        {/* Card Bonus Referal */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl border border-blue-400 ">
          <div className="flex items-center gap-3 mb-12 bg-red-600 p-5 rounded-lg w-full">
            <Users className="w-8 h-8 text-white" />
            <h3 className="text-xl font-semibold text-gray-50">Bonus Referal</h3>
          </div>
          <div className="text-2xl text-red-600 font-bold text-center ">
            {loading ? "Loading..." : formatRupiah(bonusReferal)}
          </div>
          <p className="text-sm text-gray-600 text-center p-8">
            Bonus dari anggota baru yang Anda sponsori.
          </p>
        </div>
      </div>
    </section>
  );
}
