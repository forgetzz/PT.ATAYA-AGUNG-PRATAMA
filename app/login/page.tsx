"use client";
import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "@/lib/firebase"; // pastikan ini benar
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [lihatPassword, setLihatPassword] = useState(false); // toggle password
  const handleLogin = async () => {
    setLoading(true);
    setError("");
if (!username || !password) {
  setError("Username dan password harus diisi.");
  setLoading(false);
  return;
}

    try {
      // 1. Ambil dokumen user dengan username
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error("Username tidak ditemukan.");
      }

      const userData = snapshot.docs[0].data();
      const email = userData.email;

      // 2. Login dengan email yang ditemukan
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      let errorMessage = "Terjadi kesalahan saat login.";

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            errorMessage = "Username atau password salah.";
            break;
          case "auth/invalid-email":
            errorMessage = "Email tidak valid.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Terlalu banyak percobaan login. Coba lagi nanti.";
            break;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-500 to-yellow-500">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-7">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/loading.jpeg"
            alt="ASB Family Logo"
            width={100}
            height={100}
            className="rounded-full object-cover mb-4 shadow-md"
          />
          <h2 className="text-3xl font-extrabold text-red-700">ASB Family</h2>
          <p className="text-gray-600 mt-1">Masuk untuk melanjutkan</p>
        </div>

        <div>
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
          <input
            id="username"
            type="text"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none bg-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username Anda"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
        <div className="relative w-full">
      <input
        id="password"
        type={lihatPassword ? "text" : "password"}
        className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none bg-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan password Anda"
      />
  <button
        type="button"
        onClick={() => setLihatPassword(!lihatPassword)}
        className="absolute right-4 top-5 mt-2 -translate-y-1/2 text-gray-500"
      >
        {lihatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
        </div>

        {error && (
          <p className="text-red-700 text-sm bg-red-100 p-3 rounded-lg border border-red-300 text-center font-medium">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Memuat..." : "Login"}
        </button>

        <div className="text-center text-gray-700 text-sm mt-6">
          Belum punya akun?{" "}
          <Link href="/singup" className="text-red-600 font-semibold hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
