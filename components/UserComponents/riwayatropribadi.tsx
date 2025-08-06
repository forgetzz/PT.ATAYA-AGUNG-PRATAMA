import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface RoEntry {
  PinRO: string;
  waktuPakai: string; // Firestore Timestamp
}

export default function RiwayatROPribadi() {
  const [roList, setRoList] = useState<RoEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRO = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const userDocRef = doc(db, "RiwayatRO", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const riwayat: RoEntry[] = data.riwayat || [];
        setRoList(riwayat);
      }

      setLoading(false);
    };

    fetchRO();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-8">
      <h1 className="text-lg font-semibold text-gray-800 mb-2">
        Riwayat RO Pribadi
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Daftar aktivasi Repeat Order Anda akan tampil di bawah ini.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : roList.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
          Tidak ada riwayat Repeat Order.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">No</th>
                <th className="px-4 py-2 border-b">PIN RO</th>
                <th className="px-4 py-2 border-b">Tanggal Aktivasi</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {roList.map((ro, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{ro.PinRO}</td>
                  <td className="px-4 py-2 border-b">
                    {ro.waktuPakai
                      ? new Date(ro.waktuPakai).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Tidak tersedia"}
                  </td>
                  <td className="px-4 py-2 border-b text-green-600 font-medium">
                    Aktif
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
