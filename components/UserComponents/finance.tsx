"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
   query,where
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { Dialog } from "@headlessui/react";

export default function FinanceDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [withdraws, setWithdraws] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(""); // nilai mentah (tanpa titik)
  const [formattedAmount, setFormattedAmount] = useState(""); // tampilan dengan titik
  const [rekening, setRekening] = useState("");
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, ""); // hapus titik
    if (!/^\d*$/.test(rawValue)) return; // hanya angka

    const number = parseInt(rawValue || "0");
    const formatted = new Intl.NumberFormat("id-ID").format(number);

    setAmount(rawValue); // disimpan dalam bentuk angka mentah
    setFormattedAmount(formatted); // ditampilkan sebagai angka dengan titik
  };

interface Withdraw {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  email: string;
  jumlah: number;
  nama: string;
  rekening: string;
  status: "Menunggu" | "Diproses" | "Selesai" | "Ditolak"; // Bisa kamu sesuaikan enum-nya
  uid: string;
}


useEffect(() => {
  if (!userData?.uid) return;

  const fetchWithdraws = async () => {
    try {
      const q = query(collection(db, "withdraws"), where("uid", "==", userData.uid));
      const snapshot = await getDocs(q);
      const withdrawList: Withdraw[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data() as Withdraw;
        withdrawList.push(data);
      });

      withdrawList.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setWithdraws(withdrawList);
    } catch (error) {
      console.error("❌ Gagal mengambil data withdraw:", error);
    }
  };

  fetchWithdraws();
}, [userData?.uid]);




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
        
          setUserData({ ...userData, uid: user.uid });
        } else {
          console.log("⚠️ Dokumen user tidak ditemukan di Firestore");
        }
      } else {
        console.log("⚠️ Tidak ada user yang login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleWithdrawSubmit = async () => {
    setSubmitting(true);
    try {
      const user = getAuth().currentUser;

      if (!user) {
        alert("Pengguna belum login.");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch("http://localhost:5000/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jumlah: parseInt(amount),
          rekening: rekening,
        }),
      });

      const data = await res.json(); 

      if (!res.ok) {
        alert(`Gagal withdraw: ${data.message || "Terjadi kesalahan"}`);
        return; 
      }

      alert(`Berhasil withdraw: ${data.message}`);


      setAmount("");
      setRekening("");
      setIsModalOpen(false);
    } catch (err) {
      alert("Terjadi kesalahan saat mengirim withdraw");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!userData)
    return (
      <div className="text-center mt-10 text-red-600">User tidak ditemukan</div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold text-red-700 mb-6">
        Finance Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-100 p-4 rounded-xl shadow-md">
          <p className="text-gray-700">Saldo Aktif</p>
          <p className="text-2xl font-bold text-red-700">
            Rp {userData.balance?.toLocaleString() || "0"}
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow-md">
          <p className="text-gray-700">Total Bonus</p>
          <p className="text-2xl font-bold text-red-700">
            Rp {userData.bonus?.toLocaleString() || "0"}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Riwayat Withdraw
        </h2>
        {withdraws.length === 0 ? (
          <p className="text-gray-500">Belum ada withdraw</p>
        ) : (
          <ul className="space-y-2">
  {withdraws.map((w, index) => (
    <li key={index} className="flex justify-between items-center border-b py-2">
      <div>
        <p className="font-medium">Rp {w.jumlah?.toLocaleString()}</p>
        <p className="text-xs text-gray-500">
          {new Date(w.createdAt?.seconds * 1000).toLocaleString("id-ID")}
        </p>
      </div>
      <span
        className={`text-sm font-semibold px-2 py-1 rounded-full ${
          w.status === "Disetujui"
            ? "bg-green-100 text-green-700"
            : w.status === "Ditolak"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {w.status}
      </span>
    </li>
  ))}
</ul>

        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        disabled={submitting}
        className="bg-red-700 text-white px-4 py-2 rounded-xl w-full hover:bg-red-800 transition disabled:opacity-50"
      >
        {submitting ? "Mengajukan..." : "Ajukan Withdraw"}
      </button>

      {/* Modal Ajukan Withdraw */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-700">
              Ajukan Withdraw
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Jumlah (Rp)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className="w-full px-3 py-2 border rounded-lg"
                value={formattedAmount}
                onChange={handleAmountChange}
                placeholder="Contoh: 100.000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                No Rekening
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={rekening}
                onChange={(e) => setRekening(e.target.value)}
                placeholder="Contoh: 1234567890"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleWithdrawSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-red-700 text-white rounded-lg"
              >
                {submitting ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
