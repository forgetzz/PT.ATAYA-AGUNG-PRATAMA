"use client";

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface StockPin {
  type: string;
  status: string;
  createdAt?: any;
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
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil stok PIN:", err);
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Stok PIN Tersedia</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-1">
          <li>PIN Aktivasi: <strong>{stock["aktivasi"] || 0}</strong></li>
          <li>PIN RO: <strong>{stock["ro"] || 0}</strong></li>
        </ul>
      )}
    </div>
  );
}
