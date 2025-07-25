'use client';

import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
  getFirestore,
  increment,
} from 'firebase/firestore';
import { auth , db} from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link untuk navigasi ke halaman login
import Image from 'next/image';
interface FormData {
  name: string;
  email: string;
  password: string;
  sponsorId: string[];
  pin: string;
  rekening: string;
}

interface PinType {
  Pin: string;
  used: boolean;
}

export default function MitraRegisterPage() {
  const db2 = db;
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk pesan error
  const [success, setSuccess] = useState<string | null>(null); // State untuk pesan sukses
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    sponsorId: [],
    pin: '',
    rekening: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'sponsorId') {
      const sponsors = value.split(',').map((id) => id.trim());
      setForm({ ...form, sponsorId: sponsors });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Fungsi ini dipindahkan atau disesuaikan jika validasi PIN dilakukan di backend
  // Untuk saat ini, kita fokus ke UI dan proses register secara umum.
  // const verifyAndMarkPinUsed = async (sponsorUid: string, inputPin: string) => {
  //   const sponsorRef = doc(db2, 'users', sponsorUid);
  //   const sponsorSnap = await getDoc(sponsorRef);

  //   if (!sponsorSnap.exists()) {
  //     throw new Error('Sponsor tidak ditemukan');
  //   }

  //   const sponsorData = sponsorSnap.data();
  //   const pins = sponsorData.pins || [];

  //   const pinIndex = pins.findIndex(
  //     (pin: PinType) => pin.Pin === inputPin && !pin.used
  //   );

  //   if (pinIndex === -1) {
  //     throw new Error('PIN tidak valid atau sudah digunakan');
  //   }

  //   // Tandai pin sebagai sudah digunakan
  //   pins[pinIndex].used = true;
  //   await updateDoc(sponsorRef, { pins });

  //   return true;
  // };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const authInstance = getAuth(); // Menggunakan instance auth lokal

    try {
      // 1. Buat akun baru dengan Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        authInstance, // Gunakan instance auth lokal
        form.email,
        form.password
      );

      const user = userCredential.user;

      // 2. Ambil ID token dari user yang baru login
      const token = await user.getIdToken();

      // 3. Kirim data user ke backend Express via POST
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ID token dari Firebase
        },
        body: JSON.stringify({
          uid: user.uid,
          name: form.name,
          email: form.email,
          sponsorId: form.sponsorId.length > 0 ? form.sponsorId : null, // array atau null
          rekening: form.rekening,
          pin: form.pin, // ✅ Tambahkan ini
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Asumsi backend mengirim JSON error
        const errMsg = errorData.message || 'Terjadi kesalahan saat menyimpan data ke backend.';
        console.error('Gagal menyimpan ke backend:', errMsg);
        // Jika ada akun Firebase yang terbuat tapi gagal di backend, pertimbangkan untuk menghapusnya
        // await user.delete(); // Ini mungkin perlu penanganan khusus
        setError('Registrasi gagal: ' + errMsg);
        return;
      }

      setSuccess('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
      setTimeout(() => {
        router.push('/login'); // Redirect ke halaman login setelah sukses
      }, 2000); // Tunggu 2 detik sebelum redirect
    } catch (error: unknown) {
      console.error('Registration error:');
      let errorMessage = 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.';
     
      setError('Registrasi error: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-500 to-yellow-500">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6 transform transition-all duration-300 hover:scale-105">
        <div className="flex flex-col items-center justify-center mb-6">
              <Image
                  src="/images/loading.jpeg" 
                  alt="ASB Family Logo"
                  width={100} 
                  height={100} 
                  className="rounded-full object-cover mb-4 shadow-md" 
                />
                <h2 className="text-3xl font-extrabold text-center text-red-700">
                  Daftar Mitra ASB Family
                </h2>
                <p className="text-gray-600 text-center mt-1">Gabung menjadi bagian dari keluarga kami</p>
              </div>

        {/* Input Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Nama Lengkap</label>
          <input
            id="name"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
            name="name"
            placeholder="Masukkan nama lengkap Anda"
            onChange={handleChange}
            value={form.name}
            aria-label="Nama Lengkap"
          />
        </div>

        {/* Input Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            id="email"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
            name="email"
            type="email"
            placeholder="Masukkan email aktif Anda"
            onChange={handleChange}
            value={form.email}
            aria-label="Email"
          />
        </div>

        {/* Input Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
          <input
            id="password"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
            name="password"
            type="password"
            placeholder="Minimal 6 karakter"
            onChange={handleChange}
            value={form.password}
            aria-label="Password"
          />
        </div>

        {/* Input Rekening */}
        <div>
          <label htmlFor="rekening" className="block text-gray-700 text-sm font-semibold mb-2">Nomor Rekening</label>
          <input
            id="rekening"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
            name="rekening"
            placeholder="Contoh: BCA 1234567890"
            onChange={handleChange}
            value={form.rekening}
            aria-label="Nomor Rekening"
          />
        </div>

        {/* Input Sponsor ID */}
        <div>
          <label htmlFor="sponsorId" className="block text-gray-700 text-sm font-semibold mb-2">ID Sponsor</label>
          <input
            id="sponsorId"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
            name="sponsorId"
            placeholder="Jika ada, pisahkan dengan koma jika lebih dari satu"
            onChange={handleChange}
            value={form.sponsorId.join(', ')} // Tampilkan array sebagai string di input
            aria-label="ID Sponsor"
          />
          <p className="text-xs text-gray-500 mt-1">
            Masukkan ID unik sponsor Anda, jika berlaku.
          </p>
        </div>

        {/* Input PIN */}
        <div>
          <label htmlFor="pin" className="block text-gray-700 text-sm font-semibold mb-2">PIN Sponsor</label>
          <input
            id="pin"
            className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
            name="pin"
            placeholder="PIN yang diberikan oleh sponsor Anda"
            onChange={handleChange}
            value={form.pin}
            aria-label="PIN Sponsor"
          />
          <p className="text-xs text-gray-500 mt-1">
            Digunakan untuk verifikasi oleh sponsor Anda.
          </p>
        </div>

        {/* Pesan Status (Error/Success) */}
        {error && (
          <p className="text-red-700 text-sm bg-red-100 p-3 rounded-lg border border-red-300 text-center font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-700 text-sm bg-green-100 p-3 rounded-lg border border-green-300 text-center font-medium">
            {success}
          </p>
        )}

        {/* Tombol Daftar */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {loading ? "Mendaftar..." : "Daftar Sekarang"}
        </button>

        {/* Link ke Halaman Login */}
        <div className="text-center text-gray-700 text-sm mt-6">
          Sudah punya akun?{" "}
          <Link href={"/login"} className="text-red-600 hover:text-red-800 font-semibold hover:underline transition-colors duration-200">
            Login di sini
          </Link>
        </div>
      </div>
    </div>
  );
}