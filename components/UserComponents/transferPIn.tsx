"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "@/lib/firebase"; // pastikan firebase app-mu diinisialisasi

export default function TransferPinForm() {
  const [toUsername, setToUsername] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [type, setType] = useState("PIN"); // bisa "PIN" atau "PIN_RO"
  const [message, setMessage] = useState("");

  const handleTransfer = async () => {
    try {
      const user = getAuth().currentUser;
      const token = await user?.getIdToken();

      const res = await fetch("https://backend-asb-production.up.railway.app/transfer-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ toUsername, jumlah, type }),
      });

      const data = await res.json();
      setMessage(data.message || "Berhasil");
    } catch (err) {
      console.error(err);
      setMessage("Gagal melakukan transfer");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Transfer PIN</h2>
      <label className="block mb-2">Username Tujuan</label>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={toUsername}
        onChange={(e) => setToUsername(e.target.value)}
      />

      <label className="block mb-2">Jumlah PIN</label>
      <input
        type="number"
        className="border p-2 w-full mb-4"
        value={jumlah}
        onChange={(e) => setJumlah(Number(e.target.value))}
      />

      <label className="block mb-2">Tipe PIN</label>
      <select
        className="border p-2 w-full mb-4"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="PIN">Aktivasi (PIN)</option>
        <option value="PIN_RO">RO (PIN_RO)</option>
      </select>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleTransfer}
      >
        Transfer
      </button>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
