"use client";

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface StockPin {
  type: string;
  status: string;
  createdAt?: Timestamp;
}

export default function StockPin() {
  const [stock, setStock] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const types = ["aktivasi", "ro"];
        const stockResult: Record<string, number> = {};

        for (const type of types) {
          const q = query(
            collection(db, "pin"),
            where("type", "==", type),
            where("status", "==", "available")
          );

          const querySnapshot = await getDocs(q);
          stockResult[type] = querySnapshot.size;
        }

        setStock(stockResult);
      } catch (err) {
        console.error("Gagal mengambil stok PIN:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-blue-100 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
        📦 Stok PIN Tersedia
      </h2>
      {loading ? (
        <div className="text-center text-sm text-gray-500">Memuat data...</div>
      ) : (
        <ul className="space-y-3 text-gray-800 text-sm">
          <li className="flex justify-between items-center bg-blue-100 px-4 py-2 rounded-lg">
            <span>PIN Aktivasi</span>
            <span className="font-bold text-blue-700">{stock["aktivasi"] || 0}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 px-4 py-2 rounded-lg">
            <span>PIN RO</span>
            <span className="font-bold text-green-700">{stock["ro"] || 0}</span>
          </li>
        </ul>
      )}
    </div>
  );
}
