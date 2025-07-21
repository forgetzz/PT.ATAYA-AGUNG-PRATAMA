"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // pastikan ini benar
import { useRouter } from "next/navigation"; // ✅ App Router
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Berhasil login!");
      router.push("/dashboard"); // ✅ GUNAKAN URL PATH
      // bisa redirect di sini pakai router.push('/dashboard') jika mau
    } catch (err: unknown) {
      console.log("erorr");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-red-300">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-red-600">
          Login ke ASB Family
        </h2>

        <div>
          <label className="block text-black">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="masukkan email"
          />
        </div>

        <div>
          <label className="block text-black">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="masukkan password"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Link href={"/singup"}>
          <h1 className=" text-black"> belum punya akun? <span className="text-red-500">Daftar dulu</span></h1>
        </Link>
      </div>
    </div>
  );
}
