"use client";
 import { FirebaseError } from "firebase/app"; 
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // pastikan ini benar
import { useRouter } from "next/navigation"; // ✅ App Router
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"; // Contoh ikon, Anda bisa ganti dengan logo asli
import Image from "next/image";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

// Tambahkan import ini

const handleLogin = async () => {
  setLoading(true);
  setError(""); // Bersihkan error sebelumnya
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.replace("/dashboard");
  } catch (err) {
    console.error("Login error:", err);

    let errorMessage = "Terjadi kesalahan saat login. Silakan coba lagi.";

    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "Email atau password salah.";
          break;
        case "auth/invalid-email":
          errorMessage = "Format email tidak valid.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Terlalu banyak percobaan login. Coba lagi nanti.";
          break;
      }
    }

    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-500 to-yellow-500">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-7 transform transition-all duration-300 hover:scale-105">
        <div className="flex flex-col items-center justify-center mb-6">
        <Image
            src="/images/loading.jpeg" 
            alt="ASB Family Logo"
            width={100} 
            height={100} 
            className="rounded-full object-cover mb-4 shadow-md" 
          />
          <h2 className="text-3xl font-extrabold text-center text-red-700">
            ASB Family
          </h2>
          <p className="text-gray-600 text-center mt-1">Masuk untuk melanjutkan</p>
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="masukkan email Anda"
            aria-label="Email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="masukkan password Anda"
            aria-label="Password"
          />
        </div>

        {error && (
          <p className="text-red-700 text-sm bg-red-100 p-3 rounded-lg border border-red-300 text-center font-medium">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {loading ? "Memuat..." : "Login"}
        </button>

        <div className="text-center text-gray-700 text-sm mt-6">
          Belum punya akun?{" "}
          <Link href={"/singup"} className="text-red-600 hover:text-red-800 font-semibold hover:underline transition-colors duration-200">
            Daftar sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}