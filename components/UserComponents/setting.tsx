"use client";

import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Camera, Pencil, Save, X } from "lucide-react";
import { signOut } from "firebase/auth";

const SUPABASE_PROJECT_URL = "https://yredbkgnngcgzfagnwah.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZWRia2dubmdjZ3pmYWdud2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MDU2NjEsImV4cCI6MjA2NjM4MTY2MX0.72ogqDzn1QPTqiYkhbb4PLe7PRpZcFmzqJ9IL6203Fs"; // Pindahkan ini ke env jika production
const SUPABASE_BUCKET = "assets";

interface UserData {
  name: string;
  sponsorUsername: string;
  email: string;
  bank: string;
  rekening: string;
  whatsapp: string;
  imageProfile: string;
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    sponsorUsername: "",
    email: "",
    bank: "",
    rekening: "",
    whatsapp: "",
    imageProfile: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        setUserData(data);
        setFormData(data);
      }
    };

    fetchUserData();
  }, []);

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;

    const fileName = `${user.uid}/${Date.now()}-${file.name}`;
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToSupabase(file);
    if (!url) return alert("Upload gagal");

    const user = auth.currentUser;
    if (!user) return;

    const updated = { ...userData, imageProfile: url };
    await setDoc(doc(db, "users", user.uid), updated, { merge: true });
    setUserData(updated);
    setFormData(updated);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch {
      alert("gagal logout");
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, "users", user.uid), formData, { merge: true });
    setUserData(formData);
    setIsEditing(false);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 lg:px-16 mb-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-red-400 shadow-md">
            {userData.imageProfile ? (
              <img
                src={userData.imageProfile}
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100">
                Tidak ada foto
              </div>
            )}

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
          {[
            { label: "Nama", key: "name" },
            { label: "Referensi", key: "sponsorUsername" },

            { label: "Bank", key: "bank" },
            { label: "No Rekening", key: "rekening" },
            { label: "Nomor WhatsApp", key: "whatsapp" },
          ].map((field) => (
            <div key={field.key}>
              <span className="font-semibold">{field.label}:</span>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={formData[field.key as keyof UserData]}
                  onChange={(e) =>
                    handleInputChange(field.key as keyof UserData, e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1 ml-2"
                />
              ) : (
                <span className="ml-1">
                  {userData[field.key as keyof UserData]}
                </span>
              )}
            </div>
          ))}

          <div className="text-center mt-8 flex justify-center gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
                >
                  <Save className="inline mr-2" size={18} />
                  Simpan
                </button>
                <button
                  onClick={() => {
                    setFormData(userData);
                    setIsEditing(false);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl shadow-md transition"
                >
                  <X className="inline mr-2" size={18} />
                  Batal
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
                >
                  <Pencil className="inline mr-2" size={18} />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
