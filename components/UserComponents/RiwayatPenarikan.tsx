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
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Dialog } from "@headlessui/react";

export default function RiwayatPenarikan() {
  const [userData, setUserData] = useState<UserData | null>(null);
  
  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  const [tipeWithdraw, setTipeWithdraw] = useState<"bonus" | "bonusRO">(
    "bonus"
  );

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
  interface UserData {
    uid: string;
    email: string;
    balance: number;
    bonus: number;
    bonusRO: number;
    nama?: string;
  }

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
    tipe: "bonus" | "bonusRO"; // <-- tambahkan ini
  }

  useEffect(() => {
    if (!userData?.uid) return;

    const fetchWithdraws = async () => {
      try {
        const q = query(
          collection(db, "withdraws"),
          where("uid", "==", userData.uid)
        );
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
          console.log(userData);
          setUserData({
            uid: userData.uid,
            email: userData.email,
            balance: userData.balance,
            bonus: userData.bonus,
            bonusRO: userData.bonusRO || 0,
            nama: userData.nama,
          });
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

      const res = await fetch(
        "https://backend-asb-production.up.railway.app/withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jumlah: parseInt(amount),
            rekening: rekening,
            tipe: tipeWithdraw, // <-- tambahkan tipe
          }),
        }
      );

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
      {/* <h1 className="text-2xl font-bold text-red-700 mb-6">
        Finance Dashboard
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-100 p-4 rounded-xl shadow-md">
          <p className="text-gray-700">Bonus</p>
          <p className="text-2xl font-bold text-red-700">
            Rp {userData.bonus?.toLocaleString() || "0"}
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow-md">
          <p className="text-gray-700">Bonus RO</p>
          <p className="text-2xl font-bold text-red-700">
            Rp {userData.bonusRO?.toLocaleString() || "0"}
          </p>
        </div>
      </div> */}

      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Riwayat Withdraw
        </h2>
        {withdraws.length === 0 ? (
          <p className="text-gray-500">Belum ada withdraw</p>
        ) : (
          <ul className="space-y-2">
            {withdraws.map((w, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-medium">
                    Rp {w.jumlah?.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      ({w.tipe === "bonusRO" ? "Bonus RO" : "Bonus Aktivasi"})
                    </span>
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    w.status === "Selesai"
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
    </div>
  );
}
