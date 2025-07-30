import { getAuth, getIdToken } from "firebase/auth";
import React, { useState } from "react";

export default function AktivasiRO() {
  const [pinCode, setPinCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const user = getAuth().currentUser;
      if (!user) {
        setError("Anda belum login.");
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch("https://backend-asb-production.up.railway.app/aktivasi-ro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pinCode }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Aktivasi gagal");

      setMessage(data.message || "Aktivasi berhasil");
      setPinCode("");
    } catch (err: unknown) {
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-red-100 rounded-2xl shadow-lg border border-red-300">
      <h1 className="text-3xl font-bold text-red-700 text-center mb-6">
        Aktivasi PIN RO
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Masukkan PIN RO"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          className="w-full px-4 py-3 border-2 border-red-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 text-red-800 bg-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:bg-red-300"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Aktifkan Sekarang"}
        </button>
      </form>

      {message && (
        <div className="mt-6 bg-green-100 text-green-800 px-4 py-3 rounded-lg text-center font-semibold shadow-sm">
          ✅ {message}
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-200 text-red-900 px-4 py-3 rounded-lg text-center font-semibold shadow-sm">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
