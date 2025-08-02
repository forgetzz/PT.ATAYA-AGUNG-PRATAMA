"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ClipboardCopy, Check } from "lucide-react";

interface PinData {
  Pin?: string;
  Pin_RO?: string;
  used: boolean;
  createdAt?: string;
}

interface DataPin {
  pins: PinData[];
  pinRO: PinData[];
  CreatedAt?: string;
}

export default function StockPin() {
  const [data, setData] = useState<DataPin | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return console.warn("Belum login!");

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setData(snap.data() as DataPin);
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getPinValue = (pinObj: PinData) =>
    pinObj.Pin ?? pinObj.Pin_RO ?? "PIN tidak ditemukan";

  const copyToClipboard = (pin: string, key: string) => {
    navigator.clipboard.writeText(pin).then(() => {
      setCopiedIndex(key);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  if (loading) {
    return <div className="p-6 text-gray-500 animate-pulse">Memuat data...</div>;
  }

  if (!data) {
    return <p className="text-gray-500 p-6">Tidak ada data ditemukan.</p>;
  }

  const total = (data.pins?.length ?? 0) + (data.pinRO?.length ?? 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Stok PIN & Aktivasi</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card label="Jumlah RO" value={`${data.pinRO?.length ?? 0} PIN`} />
          <Card label="Jumlah Aktivasi" value={`${data.pins?.length ?? 0} PIN`} />
          <Card
            label="Terakhir Diperbarui"
            value={
              data.CreatedAt && !isNaN(new Date(data.CreatedAt).getTime())
                ? new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(data.CreatedAt))
                : "Tidak diketahui"
            }
          />
        </div>

        <PinList title="Daftar PIN Aktivasi" pins={data.pins} copiedIndex={copiedIndex} onCopy={copyToClipboard} />
        <PinList title="Daftar PIN RO" pins={data.pinRO} copiedIndex={copiedIndex} onCopy={copyToClipboard} />
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

function PinList({
  title,
  pins,
  copiedIndex,
  onCopy,
}: {
  title: string;
  pins: PinData[];
  copiedIndex: string | null;
  onCopy: (pin: string, key: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {pins?.map((pinObj, idx) => {
          const pin = pinObj.Pin ?? pinObj.Pin_RO ?? "PIN tidak ditemukan";
          const key = `${title}-${idx}`;
          return (
            <div
              key={key}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow transition"
            >
              <span className="font-mono text-sm break-all text-gray-800">{pin}</span>
              <button
                onClick={() => onCopy(pin, key)}
                className="ml-3 text-gray-400 hover:text-blue-500"
                title="Salin PIN"
              >
                {copiedIndex === key ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <ClipboardCopy size={18} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
