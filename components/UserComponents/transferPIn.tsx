"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { ArrowRight, Info, Send } from "lucide-react";
export default function TransferPinForm() {
  const [toUsername, setToUsername] = useState("");
  const [type, setType] = useState("pins"); // harus "pins" atau "pinRO"
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    try {
      setLoading(true);
      const user = getAuth().currentUser;
      if (!user) {
        setMessage("Kamu belum login");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch("https://backend-asb-production.up.railway.app/tfPIN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // sesuai dengan middleware `verifyToken`
        },
        body: JSON.stringify({
          username: toUsername,
          type, // "pins" atau "pinRO"
        }),
      });

      const data = await res.json();
      setMessage(res.ok ? data.message : `❌ ${data.message}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Gagal melakukan transfer PIN");
    } finally {
      setLoading(false);
    }
  };


return (
  <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg border-t-4 border-red-600 p-6 space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2 mb-1">
        <Send size={20} /> Transfer PIN
      </h2>
      <p className="text-sm text-gray-600">
        Kirim PIN aktivasi atau repeat order ke mitra lain.
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Username Tujuan
      </label>
      <input
        type="text"
        className="border border-gray-300 rounded px-4 py-2 w-full focus:ring-2 focus:ring-red-500 focus:outline-none"
        value={toUsername}
        onChange={(e) => setToUsername(e.target.value)}
        placeholder="Contoh: andi123"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tipe PIN
      </label>
      <select
        className="border border-gray-300 rounded px-4 py-2 w-full bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="pins">Aktivasi (pins)</option>
        <option value="pinsRO">Repeat Order (pinsRO)</option>
      </select>
    </div>

    <button
      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
      onClick={handleTransfer}
      disabled={loading}
    >
      {loading ? "Mengirim..." : (
        <span className="flex items-center justify-center gap-2">
          <ArrowRight size={16} /> Transfer PIN
        </span>
      )}
    </button>

    {message && (
      <div className="text-green-600 text-sm text-center border border-green-200 bg-green-50 rounded px-4 py-2">
        {message}
      </div>
    )}

    <div className="text-xs text-gray-500 border-t pt-4 mt-2 flex items-start gap-2">
      <Info size={14} className="mt-0.5 text-red-500" />
      <div>
        <p><strong>Catatan:</strong> Pastikan username tujuan sudah benar. PIN yang sudah dikirim <span className="font-semibold text-red-500">tidak bisa dikembalikan</span>.</p>
        <p>Transfer ini hanya bisa dilakukan jika saldo PIN mencukupi.</p>
      </div>
    </div>
  </div>
);

}
