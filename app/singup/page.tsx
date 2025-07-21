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
} from 'firebase/firestore';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
  sponsorId: string[];
  pin: string;
}

export default function MitraRegisterPage() {
  const db = getFirestore();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    sponsorId: [],
    pin: '',
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

  const verifyAndMarkPinUsed = async (sponsorUid: string, inputPin: string) => {
    const sponsorRef = doc(db, 'users', sponsorUid);
    const sponsorSnap = await getDoc(sponsorRef);

    if (!sponsorSnap.exists()) {
      throw new Error('Sponsor tidak ditemukan');
    }

    const sponsorData = sponsorSnap.data();
    const pins = sponsorData.pins || [];

    const pinIndex = pins.findIndex(
      (pin: any) => pin.Pin === inputPin && !pin.used
    );

    if (pinIndex === -1) {
      throw new Error('PIN tidak valid atau sudah digunakan');
    }

    pins[pinIndex].used = true;

    await updateDoc(sponsorRef, { pins });

    return true;
  };
const handleRegister = async () => {
  try {
    const sponsorUid = form.sponsorId[0];
    if (!sponsorUid || !form.pin) {
      alert('Mohon isi sponsor UID dan PIN');
      return;
    }

    // ✅ Verifikasi PIN sponsor dulu
    await verifyAndMarkPinUsed(sponsorUid, form.pin);

    // ✅ Buat akun baru
    const { user } = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    // ✅ Tunggu benar-benar login dan refresh token Auth → Firestore
    await new Promise<void>((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser?.uid === user.uid) {
          unsubscribe();

          // ⏳ Paksa refresh ID token supaya Firestore bisa baca request.auth.uid
          await firebaseUser.getIdToken(true);

          // ⏳ Delay pendek untuk memberi waktu Firestore mengenali login
          setTimeout(() => resolve(), 500); // 500ms
        }
      });
    });

    // ✅ Sekarang tulis ke Firestore (UID cocok)
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: form.name,
      email: form.email,
      sponsorId: form.sponsorId,
      createdAt: serverTimestamp(),
    });

    alert('✅ Pendaftaran berhasil!');
    router.refresh();
  } catch (error: any) {
    console.error('❌ ERROR:', error);
    alert('❌ Gagal daftar: ' + error.message);
  }
};

  return (
    <div className="min-h-screen bg-red-100 flex flex-col items-center justify-center px-4 py-12 text-black">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">Daftar Mitra</h1>
        <input
          className="border mb-3 p-2 rounded w-full"
          name="name"
          placeholder="Nama"
          onChange={handleChange}
        />
        <input
          className="border mb-3 p-2 rounded w-full"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="border mb-3 p-2 rounded w-full"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          className="border mb-3 p-2 rounded w-full"
          name="sponsorId"
          placeholder="Sponsor UID"
          onChange={handleChange}
        />
        <input
          className="border mb-5 p-2 rounded w-full"
          name="pin"
          placeholder="PIN dari sponsor"
          onChange={handleChange}
        />
        <button
          onClick={handleRegister}
          className="bg-red-700 hover:bg-red-800 transition text-white font-semibold px-4 py-2 rounded w-full"
        >
          Daftar
        </button>
      </div>
    </div>
  );
}
