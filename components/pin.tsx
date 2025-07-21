"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  setDoc,
  where,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ADMIN_EMAILS = ["admin1@gmail.com", "admin2@gmail.com"];

export default function PinProducer() {
  const db = getFirestore();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [pins, setPins] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [newPins, setNewPins] = useState<string[]>([]);
  const [owner, setOwner] = useState("");
  const [jumlahPin, setJumlahPin] = useState<number>(1);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user && ADMIN_EMAILS.includes(user.email || "")) {
        setUserEmail(user.email);
        const querySnapshot = await getDocs(collection(db, "pinCollection"));
        const existingPins = querySnapshot.docs.map((doc) => doc.data().pin);
        setPins(existingPins);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsub();
  }, []);

  const generateId = () => Math.random().toString(36).substring(2, 10);
  const generateRandomPin = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const levenshtein = (a: string, b: string): number => {
    const dp = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        dp[i][j] =
          a[i - 1] === b[j - 1]
            ? dp[i - 1][j - 1]
            : Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
      }
    }
    return dp[a.length][b.length];
  };

  const isSimilar = (pin: string) =>
    pins.some(
      (existing) =>
        existing.includes(pin) ||
        pin.includes(existing) ||
        levenshtein(existing, pin) <= 2
    );

  const handleGeneratePin = async () => {
    if (!owner.trim()) return alert("⚠️ Masukkan email stokis.");

    const createdPins: string[] = [];
    let attempts = 0;

    while (createdPins.length < jumlahPin && attempts < jumlahPin * 10) {
      const pin = generateRandomPin();
      if (!isSimilar(pin) && !createdPins.some((p) => isSimilar(pin))) {
        createdPins.push(pin);
      }
      attempts++;
    }

    if (createdPins.length < jumlahPin) {
      setMessage("❌ Gagal menghasilkan PIN unik. Coba lagi.");
      return;
    }

    // Simpan ke pinCollection
    for (const pin of createdPins) {
      const id = generateId();
      await setDoc(doc(db, "pinCollection", id), {
        id,
        pin,
        owner,
        used: false,
        createdAt: new Date().toISOString(),
      });
    }

    // Tambahkan ke dokumen user jika ditemukan
    const q = query(collection(db, "users"), where("email", "==", owner));
    const qSnap = await getDocs(q);
    if (!qSnap.empty) {
      const userRef = qSnap.docs[0].ref;

      await updateDoc(userRef, {
        pins: arrayUnion(
          ...createdPins.map((pin) => ({
            Pin: pin,
            used: false,
            createdAt: new Date().toISOString(),
          }))
        ),
      });
    }

    setPins((prev) => [...prev, ...createdPins]);
    setNewPins(createdPins);
    setMessage(
      `✅ ${createdPins.length} PIN berhasil disimpan ${
        qSnap.empty
          ? "(user tidak ditemukan)."
          : "dan ditambahkan ke akun user."
      }`
    );
  };

  if (userEmail === null)
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        ❌ Akses ditolak. Hanya admin.
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Stokis (pemilik PIN):
        </label>
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-black"
          placeholder="user@email.com"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Jumlah PIN:
        </label>
        <input
          type="number"
          min={1}
          max={10}
          value={jumlahPin}
          onChange={(e) => setJumlahPin(parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-md text-black"
        />
      </div>

      <button
        onClick={handleGeneratePin}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md"
      >
        ➕ Generate PIN
      </button>

      {newPins.length > 0 && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md text-sm">
          <div className="font-semibold mb-1">PIN Baru:</div>
          <div className="font-mono text-lg">{newPins.join(", ")}</div>
        </div>
      )}

      {message && (
        <div className="mt-2 text-sm text-center text-gray-700 italic">
          {message}
        </div>
      )}
    </div>
  );
}
