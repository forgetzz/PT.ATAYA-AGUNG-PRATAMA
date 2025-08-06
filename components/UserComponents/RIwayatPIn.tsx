"use client";
import { db } from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Pin {
  Pin: number;
  used: boolean;
  createdAt: string;
  waktuPakai?: string | null;
}

export default function RiwayatPin() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) return;

      const userData = userSnap.data();
      const myUsername = userData.username;
      const myPins: Pin[] = userData.pins || [];

      // Cari semua user yang sponsorUsername === username saya
      const q = query(
        collection(db, "users"),
        where("sponsorUsername", "==", myUsername)
      );
      const downlineSnaps = await getDocs(q);

      const allRiwayat: { PinRO: number; waktuPakai: { seconds: number } }[] =
        [];

      await Promise.all(
        downlineSnaps.docs.map(async (docSnap) => {
          const riwayatDoc = await getDoc(doc(db, "users", docSnap.id));
          if (riwayatDoc.exists()) {
            const data = riwayatDoc.data();
            const list = data.riwayat || [];
            allRiwayat.push(...list);
          }
        })
      );

      // Hubungkan waktuPakai ke pin yang cocok
      const pinsWithDate: Pin[] = myPins.map((pin) => {
        if (!pin.used) return { ...pin, waktuPakai: null };

        const matched = allRiwayat.find(
          (entry) => Number(entry.PinRO) === Number(pin.Pin)
        );

        return {
          ...pin,
          waktuPakai: matched?.waktuPakai
            ? new Date(matched.waktuPakai.seconds * 1000).toISOString()
            : null,
        };
      });

      setPins(pinsWithDate);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mt-12 w-full mx-auto mb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Status PIN</h1>
        <p className="text-sm text-gray-500 mt-1">
          Daftar detail semua PIN aktifasi Anda
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="border-8 rounded-lg overflow-auto">
          <table className="w-full table-auto text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border-b">No</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Tanggal Beli</th>
                <th className="px-4 py-3 border-b">Tanggal Pakai</th>
              </tr>
            </thead>
            <tbody>
              {pins
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((pin, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 border-b">{index + 1}</td>
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          pin.used
                            ? "text-gray-700 bg-gray-200"
                            : "text-green-700 bg-green-100"
                        }`}
                      >
                        {pin.used ? "Terpakai" : "Aktif"}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b">
                      {new Date(pin.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {pin.waktuPakai
                        ? new Date(pin.waktuPakai).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
