"use client";
import { db } from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, doc, getDoc } from "firebase/firestore";
import { Heading1 } from "lucide-react";
import React, { useEffect, useState } from "react";
interface Pin {
  pins: { Pin: number; used: boolean; createdAt: string }[];
  pinsRO: { Pin_RO: number; used: boolean; createdAt: string }[];
}
export default function StockPin() {
  const [datasPin, setDatasPin] = useState<Pin>();
  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return;
      const snapDb = doc(db, "users", user.uid);
      const snapRef = await getDoc(snapDb);
      if (snapRef.exists()) {
        const data = snapRef.data() as Pin;
        console.log("ini pin ro", data.pinsRO);
        setDatasPin(data);
      }
      if (!snapRef.exists()) {
      }
    });
    return () => unsub();
  }, []);
  const allPins = [
    ...(datasPin?.pins ?? []).map((pin) => ({ ...pin, type: "PIN" })),
    ...(datasPin?.pinsRO ?? []).map((pin) => ({ ...pin, type: "RO" })),
  ];

  return (
    <div>
      {/* inin judul */}
      <div className="p-5 space-y-4 ">
        <p className="text-2xl font-semibold">Stok PIN Anda</p>
        <h1>Ringkasan Jumlah PIN yang Anda Miliki</h1>
      </div>
      {/* ini card */}
      <div className="rounded-lg shadow-md flex flex-wrap justify-center items-center gap-4 p-4 mb-36">
        {/* ini div pi ro */}
        <div className="w-full border-2 ">
          <div className="bg-blue-500 text-white p-4">
            <h1 className="text-lg font-semibold">Stok PIN Aktifasi</h1>
          </div>
          <div className="bg-white text-gray-800 p-4">
            <h1 className="text-3xl font-bold">
              {datasPin?.pins
                ? datasPin.pins.filter((pin) => !pin.used).length
                : 0}
            </h1>
            <h1 className="text-sm mt-1">PIN Tersedia</h1>

   
          </div>
        </div>
        {/* ini pi div aktivasi */}
        <div className="w-full">
          <div className="bg-green-500 text-white p-4">
            <h1 className="text-lg font-semibold">Stok PIN Aktifasi</h1>
          </div>
          <div className="bg-white text-gray-800 p-4">
            <h1 className="text-3xl font-bold">
              {datasPin?.pinsRO
                ? datasPin.pinsRO.filter((pin) => !pin.used).length
                : 0}
            </h1>
            <h1 className="text-sm mt-1">PIN Tersedia</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
