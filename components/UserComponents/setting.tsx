"use client";

import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Camera } from "lucide-react";
import { signOut } from "firebase/auth";

const SUPABASE_PROJECT_URL = "https://yredbkgnngcgzfagnwah.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZWRia2dubmdjZ3pmYWdud2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MDU2NjEsImV4cCI6MjA2NjM4MTY2MX0.72ogqDzn1QPTqiYkhbb4PLe7PRpZcFmzqJ9IL6203Fs"; // sebaiknya jangan hardcode
const SUPABASE_BUCKET = "foto";

interface UserData {
  name: string;
  username: string;
  email: string;
  bank: string;
  rekening: string;
  whatsapp: string;
  imageUrl: string;
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    bank: "",
    rekening: "",
    whatsapp: "",
    imageUrl: "",
  });

  // Ambil data user dari Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    };

    fetchUserData();
  }, []);

  // Upload ke Supabase (tanpa SDK)
  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;

    const fileName = `foto/${user.uid}/${Date.now()}-${file.name}`;
    const uploadUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/${SUPABASE_BUCKET}/${fileName}`;

    try {
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": file.type,
          "x-upsert": "true",
        },
        body: file,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Upload gagal:", errText);
        return null;
      }

      return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${fileName}`;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  // Handle upload image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToSupabase(file);
    if (!url) return alert("Upload gagal");

    const user = auth.currentUser;
    if (!user) return;

    const updated = { ...userData, imageUrl: url };
    await setDoc(doc(db, "users", user.uid), updated, { merge: true });
    setUserData(updated);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch {
      alert("gagal login");
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 lg:px-16 mb-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-red-400 shadow-md">
            {userData.imageUrl ? (
              <img
                src={userData.imageUrl}
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100">
                Tidak ada foto
              </div>
            )}

            {/* Tombol Kamera */}
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 z-50 right-5 bg-white p-1.5 rounded-full shadow -mb-2 -mr-2 hover:bg-gray-100"
              aria-label="Upload Foto"
            >
              <Camera className="w-10 h-10 text-red-500" />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Klik ikon kamera untuk unggah dari galeri
          </p>
        </div>

        <div className="space-y-4 text-gray-700 text-left">
          <div>
            <span className="font-semibold">Nama:</span> {userData.name}
          </div>
          <div>
            <span className="font-semibold">Username:</span> {userData.username}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {userData.email}
          </div>
          <div>
            <span className="font-semibold">Bank:</span> {userData.bank}
          </div>
          <div>
            <span className="font-semibold">No Rekening:</span>{" "}
            {userData.rekening}
          </div>
          <div>
            <span className="font-semibold">Nomor WhatsApp:</span>{" "}
            {userData.whatsapp}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
