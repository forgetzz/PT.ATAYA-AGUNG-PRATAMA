"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  Globe,
  Info,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface DataProfil {
  name: string;
  email: string;
  uid: string;
  rekening: string;
  sponsorId: string;
}

export default function AccountSettingsList() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<DataProfil | null>(null);
  const [sponsorName, setSponsorName] = useState<string>("");
  const [language, setLanguage] = useState("id");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [confirmLogoutModal, setConfirmLogoutModal] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const fetchProfile = async () => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data() as DataProfil;
      setProfileData(data);

      const sponsorId = Array.isArray(data.sponsorId)
        ? data.sponsorId[0]
        : data.sponsorId;

      if (sponsorId) {
        const sponsorDoc = await getDoc(doc(db, "users", sponsorId));
        if (sponsorDoc.exists()) {
          const sponsorData = sponsorDoc.data();
          setSponsorName(sponsorData.name);
        }
      }
    }
  };

  useEffect(() => {
    if (openModal === "profile") {
      fetchProfile();
    }
  }, [openModal]);

  const settings = [
    { key: "profile", icon: <User className="w-5 h-5 text-red-500" />, label: "Profil" },
    { key: "notifications", icon: <Bell className="w-5 h-5 text-red-500" />, label: "Notifikasi" },
    { key: "language", icon: <Globe className="w-5 h-5 text-red-500" />, label: "Bahasa" },
    { key: "about", icon: <Info className="w-5 h-5 text-red-500" />, label: "Tentang Kami" },
  ];

  return (
    <div className="max-w-md mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Pengaturan</h2>

      <div className="bg-white rounded-2xl shadow divide-y">
        {settings.map((item) => (
          <div
            key={item.key}
            onClick={() => setOpenModal(item.key)}
            className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">{item.icon}</div>
              <span className="text-gray-800">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}

        <div
          onClick={() => setConfirmLogoutModal(true)}
          className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer transition"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-gray-800">Keluar</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setOpenModal(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {openModal === "profile" && (
              <>
                <h3 className="text-lg font-bold text-red-600 mb-2">Profil</h3>
                {profileData ? (
                  <div className="text-sm text-gray-700 space-y-2">
                    <div><span className="font-medium">Nama:</span> {profileData.name}</div>
                    <div><span className="font-medium">Email:</span> {profileData.email}</div>
                    <div><span className="font-medium">Rekening:</span> {profileData.rekening}</div>
                    <div><span className="font-medium">Sponsor:</span> {sponsorName || "Tidak ada"}</div>
                  </div>
                ) : (
                  <p>Memuat data...</p>
                )}
              </>
            )}

            {openModal === "notifications" && (
              <>
                <h3 className="text-lg font-bold text-red-600 mb-2">Notifikasi</h3>
                <div className="flex items-center gap-3">
                  <label className="text-gray-700">Aktifkan Notifikasi</label>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    className="accent-red-500"
                  />
                </div>
              </>
            )}

            {openModal === "language" && (
              <>
                <h3 className="text-lg font-bold text-red-600 mb-2">Bahasa</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="language"
                      value="id"
                      checked={language === "id"}
                      onChange={() => setLanguage("id")}
                      className="accent-red-500"
                    />
                    Bahasa Indonesia
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="language"
                      value="en"
                      checked={language === "en"}
                      onChange={() => setLanguage("en")}
                      className="accent-red-500"
                    />
                    English
                  </label>
                </div>
              </>
            )}

            {openModal === "about" && (
              <>
                <h3 className="text-lg font-bold text-red-600 mb-2">Tentang Kami</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Kami adalah komunitas ASBFAMILY yang berfokus pada kesehatan, olahraga, dan kebersamaan keluarga.
                  Tujuan kami adalah membangun generasi sehat dan aktif melalui kegiatan bersama dan edukasi positif.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal Logout */}
      {confirmLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm relative">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Konfirmasi Keluar
            </h3>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin keluar?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
