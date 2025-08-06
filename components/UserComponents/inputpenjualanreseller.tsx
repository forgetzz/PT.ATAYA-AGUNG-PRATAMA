"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const PRODUK_LIST = [
  { nama: "ASB Oil", harga: 75000 },
  { nama: "ASB Booster Anak", harga: 75000 },
];

interface Penjualan {
  produk: string;
  jumlah: number;
  totalHarga: number;
  tanggal: Date;
}

interface Reseller {
  nama: string;
  whatsapp: string;
  alamat: string;
  hargaPendaftaran: number;
  produk: number;
  poin: number;
  createdAt: string;
  penjualan?: Penjualan[]; // optional, bisa belum ada
}
interface ResellerDoc {
  resellers: Reseller[];
  
}


export default function Inputpenjualanreseller() {
  const [user, setUser] = useState<any>(null);
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [selectedReseller, setSelectedReseller] = useState("");
  const [selectedProduk, setSelectedProduk] = useState("");
  const [jumlah, setJumlah] = useState(0);
  const [hargaProduk, setHargaProduk] = useState(0);
  const [loading, setLoading] = useState(true);
  const [poin, setPoin] = useState <{poin:number}>()

  // Ambil user login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const resellerRef = doc(db, "Reseller", u.uid);
        const resellerSnap = await getDoc(resellerRef);
        if (resellerSnap.exists()) {
          const data = resellerSnap.data();
          setResellers(data.resellers || []);
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Update harga ketika produk berubah
  useEffect(() => {
    const produk = PRODUK_LIST.find((p) => p.nama === selectedProduk);
    setHargaProduk(produk?.harga || 0);
  }, [selectedProduk]);

  const totalHarga = jumlah * hargaProduk;

const handleSimpan = async () => {
  if (!selectedReseller || !selectedProduk || jumlah <= 0) {
    alert("Lengkapi semua data terlebih dahulu!");
    return;
  }

  const resellerRef = doc(db, "Reseller", user.uid);
  const resellerSnap = await getDoc(resellerRef);

  if (!resellerSnap.exists()) {
    alert("Data reseller tidak ditemukan!");
    return;
  }

  const data = resellerSnap.data() as ResellerDoc;

const updatedResellerList = data.resellers.map((r) => {
  if (r.nama === selectedReseller) {
    const penjualanBaru: Penjualan = {
      produk: selectedProduk,
      jumlah,
      totalHarga,
      tanggal: new Date(),
    };

 return {
  ...r,
  poin: (r.poin ?? 0) + jumlah, // ✅ tambah poin sebanyak jumlah produk
  penjualan: Array.isArray(r.penjualan)
    ? [...r.penjualan, penjualanBaru]
    : [penjualanBaru],
};

  }
  return r;
});

try {
  await updateDoc(resellerRef, {
    resellers: updatedResellerList,
  });


  setSelectedReseller("");
  setSelectedProduk("");
  setJumlah(0);
} catch (err) {
  console.error("Gagal simpan penjualan:", err);
  alert("❌ Gagal menyimpan data.");
}


  try {
    await updateDoc(resellerRef, {
      resellers: updatedResellerList,
    });

    alert("✅ Penjualan berhasil dicatat dan poin ditambahkan!");
    setSelectedReseller("");
    setSelectedProduk("");
    setJumlah(0);
  } catch (err) {
    console.error("Gagal simpan penjualan:", err);
    alert("❌ Gagal menyimpan data.");
  }
};


  if (loading) return <div>Loading...</div>;

  return (
 <div className="bg-white p-6 rounded-2xl shadow-md space-y-8 mb-20">
  {/* Judul dan Deskripsi */}
  <div className="space-y-2">
    <h1 className="text-xl font-bold text-gray-800">Input Penjualan Reseller</h1>
    <p className="text-sm text-gray-500">
      Catat penjualan yang dilakukan oleh reseller Anda dengan mudah dan rapi.
    </p>
  </div>

  {/* Formulir */}
  <div className="space-y-6 text-sm">
    {/* Pilih Reseller */}
    <div>
      <label className="block font-medium text-gray-700 mb-1">Pilih Reseller</label>
      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        value={selectedReseller}
        onChange={(e) => setSelectedReseller(e.target.value)}
      >
        <option value="">Pilih reseller...</option>
        {resellers.map((r) => (
          <option key={r.nama} value={r.nama}>
            {r.nama} - {r.penjualan?.length ?? 0} penjualan
          </option>
        ))}
      </select>
    </div>

    {/* Pilih Produk */}
    <div>
      <label className="block font-medium text-gray-700 mb-1">Pilih Produk</label>
      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        value={selectedProduk}
        onChange={(e) => setSelectedProduk(e.target.value)}
      >
        <option value="">Pilih produk...</option>
        {PRODUK_LIST.map((p, idx) => (
          <option key={idx} value={p.nama}>
            {p.nama} - Rp {p.harga.toLocaleString()}
          </option>
        ))}
      </select>
    </div>

    {/* Jumlah */}
    <div>
      <label className="block font-medium text-gray-700 mb-1">Jumlah</label>
      <input
        type="number"
        min={1}
        inputMode="numeric"
        value={jumlah === 0 ? "" : jumlah}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setJumlah(isNaN(value) ? 0 : value);
        }}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Masukkan jumlah produk"
      />
    </div>

    {/* Total Harga */}
    <div>
      <label className="block font-medium text-gray-700 mb-1">Total Harga</label>
      <input
        type="text"
        disabled
        value={`Rp ${totalHarga.toLocaleString()}`}
        className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-2 text-gray-600"
      />
    </div>
  </div>

  {/* Tombol Simpan */}
  <button
    onClick={handleSimpan}
    className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition duration-150"
  >
    + Simpan Penjualan
  </button>
</div>

  );
}
