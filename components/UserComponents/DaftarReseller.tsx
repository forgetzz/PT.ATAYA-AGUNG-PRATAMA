"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Daftarreseller() {
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [daftarReseller, setDaftarReseller] = useState<any[]>([]);

  // Cek login dan ambil data user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        const fullUser = {
          uid: user.uid,
          email: user.email,
          username: userData?.username || "",
        };

        setUser(fullUser);
        fetchResellerData(fullUser.uid);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Ambil data reseller dari Firestore
  const fetchResellerData = async (uid: string) => {
    try {
      const docRef = doc(db, "Reseller", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDaftarReseller(data.resellers || []);
      } else {
        setDaftarReseller([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data reseller:", err);
    }
  };

  // Tambah reseller
  const handleSubmit = async () => {
    if (!nama || !wa || !alamat) {
      alert("Semua data harus diisi!");
      return;
    }

    if (!user) {
      alert("User belum login.");
      return;
    }

    const resellerData = {
      nama,
      whatsapp: wa,
      alamat,
      produk: 2,
      poin: 2,
      hargaPendaftaran: 180000,
      createdAt: new Date(),
    };

    try {
      const resellerRef = doc(db, "Reseller", user.uid);
      const resellerSnap = await getDoc(resellerRef);

      if (resellerSnap.exists()) {
        await updateDoc(resellerRef, {
          resellers: arrayUnion(resellerData),
        });
      } else {
        await setDoc(resellerRef, {
          uid: user.uid,
          username: user.username,
          email: user.email,
          resellers: [resellerData],
          createdAt: new Date(),
        });
      }

      alert("✅ Reseller berhasil ditambahkan!");
      setNama("");
      setWa("");
      setAlamat("");

      // Refresh tabel
      fetchResellerData(user.uid);
    } catch (err) {
      console.error("❌ Gagal menambahkan reseller:", err);
      alert("Gagal menyimpan data reseller.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 my-32">
      {/* Form Tambah Reseller */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-800">Tambah Reseller Baru</h1>
          <p className="text-sm text-gray-600">
            Daftarkan reseller baru Anda di sini. Setiap reseller baru otomatis mendapatkan 2 produk dan 2 poin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">No. WhatsApp</label>
            <input
              type="text"
              placeholder="Contoh: 081234567890"
              value={wa}
              onChange={(e) => setWa(e.target.value)}
              className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Alamat</label>
            <input
              type="text"
              placeholder="Contoh: Jl. Merdeka No. 10"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="bg-gray-50 border p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="text-sm font-semibold text-gray-700">Paket Pendaftaran</p>
            <p className="text-sm text-gray-600">
              Jumlah Produk: <span className="font-semibold">2 pcs</span>
            </p>
          </div>
          <p className="text-green-600 font-bold text-lg mt-2 sm:mt-0">Rp 180.000</p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold text-sm transition-all duration-200"
        >
          + Tambah Reseller
        </button>
      </div>

      {/* Tabel Daftar Reseller */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Daftar Reseller Anda</h2>

        {daftarReseller.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada reseller yang ditambahkan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">#</th>
                  <th className="border px-4 py-2 text-left">Nama</th>
                  <th className="border px-4 py-2 text-left">WhatsApp</th>
                  <th className="border px-4 py-2 text-left">Alamat</th>
                  <th className="border px-4 py-2 text-left">Produk</th>
                  <th className="border px-4 py-2 text-left">Poin</th>
                </tr>
              </thead>
              <tbody>
                {daftarReseller.map((reseller, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{reseller.nama}</td>
                    <td className="border px-4 py-2">{reseller.whatsapp}</td>
                    <td className="border px-4 py-2">{reseller.alamat}</td>
                    <td className="border px-4 py-2">{reseller.produk}</td>
                    <td className="border px-4 py-2">{reseller.poin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
