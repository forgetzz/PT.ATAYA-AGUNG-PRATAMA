import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";

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
      setError("Terjadi kesalahan saat aktivasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-2xl border border-red-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/bg-pattern.svg')] bg-cover bg-center pointer-events-none" />

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <KeyRound className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-red-700 mb-2">Aktivasi PIN RO</h1>
        <p className="text-sm text-gray-600">
          Silakan masukkan PIN RO Anda untuk mengaktifkan fitur RO dan menikmati bonus jaringan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Contoh: 524547"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 bg-gray-50 shadow-inner"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition duration-200 disabled:bg-red-300"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <KeyRound className="h-5 w-5" />
              Aktifkan Sekarang
            </>
          )}
        </button>
      </form>

      {message && (
        <div className="mt-6 bg-green-100 text-green-800 px-4 py-3 rounded-xl text-center font-medium border border-green-300 shadow-sm">
          ✅ {message}
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-100 text-red-800 px-4 py-3 rounded-xl text-center font-medium border border-red-300 shadow-sm">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
