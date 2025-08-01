"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OrderPIN() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState<"aktivasi" | "RO" | null>(
    null
  );
  const [proof, setProof] = useState<File | null>(null);
  const [quantity, setQuantity] = useState({
    aktivasi: 1,
    RO: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const openConfirmation = (type: "aktivasi" | "RO") => {
    setSelectedType(type);
    setOpenModal(true);
  };
  const handleUpload = async () => {
    if (!proof || !selectedType || quantity[selectedType] < 1) {
      alert("Lengkapi data dengan benar.");
      return;
    }

    setIsLoading(true); // Mulai loading

    const bucket = "transfer";
    const projectUrl = "https://yredbkgnngcgzfagnwah.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZWRia2dubmdjZ3pmYWdud2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MDU2NjEsImV4cCI6MjA2NjM4MTY2MX0.72ogqDzn1QPTqiYkhbb4PLe7PRpZcFmzqJ9IL6203Fs"; // sebaiknya jangan hardcode
    const fileName = `${Date.now()}-${proof.name}`;
    const uploadUrl = `${projectUrl}/storage/v1/object/${bucket}/${fileName}`;

    try {
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": proof.type,
          "x-upsert": "false",
        },
        body: proof,
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Upload gagal:", error);
        alert("Upload gagal.");
        return;
      }

      const fileUrl = `${projectUrl}/storage/v1/object/public/${bucket}/${fileName}`;

      const user = getAuth().currentUser;
      if (!user) {
        alert("User belum login.");
        return;
      }

      const firebaseToken = await user.getIdToken();
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        alert("Data user tidak ditemukan.");
        return;
      }

      const { name = "Tanpa Nama", username = "Tanpa Username", email = "tanpa email" } =
        userDoc.data();

      const saveRes = await fetch(
        "https://backend-asb-production.up.railway.app/Transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
          body: JSON.stringify({
            name,
            email,
            username,
            jenis: selectedType,
            jumlah: quantity[selectedType],
            buktiTransferUrl: fileUrl,
          }),
        }
      );

      const result = await saveRes.json();

      if (!saveRes.ok) {
        alert(result.error || "Gagal menyimpan data.");
        return;
      }

      alert("Pembelian berhasil dikonfirmasi.");
      setOpenModal(false);
      setProof(null);
      setSelectedType(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengupload.");
    } finally {
      setIsLoading(false); // Hentikan loading setelah semua selesai
    }
  };

  const adjustQuantity = (type: "aktivasi" | "RO", delta: number) => {
    setQuantity((prev) => {
      const updated = Math.max(1, prev[type] + delta);
      return { ...prev, [type]: updated };
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Order PIN</h1>

      {["aktivasi", "RO"].map((type) => (
        <div
          key={type}
          className="border p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between bg-white gap-4"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <div>
              <h2 className="text-lg font-semibold">
                {type === "aktivasi" ? "PIN Aktivasi" : "PIN RO"}
              </h2>
              <p className="text-sm text-gray-600">
                Harga: {type === "aktivasi" ? "Rp3.750.000" : "Rp3.500.000"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustQuantity(type as "aktivasi" | "RO", -1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">
              {quantity[type as "aktivasi" | "RO"]}
            </span>
            <button
              onClick={() => adjustQuantity(type as "aktivasi" | "RO", 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-green-700"
              onClick={() => openConfirmation(type as "aktivasi" | "RO")}
            >
              Beli
            </button>
          </div>
        </div>
      ))}

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-4">
              Konfirmasi Pembelian
            </Dialog.Title>
            <p className="mb-2 text-sm text-gray-700">
              Silakan transfer ke salah satu rekening berikut sebelum mengupload
              bukti:
            </p>

            <div className="mb-4 text-sm bg-gray-100 p-3 rounded-lg border border-gray-300 space-y-3">
              <div>
                <p>
                  <strong>Bank:</strong> BCA
                </p>
                <p>
                  <strong>No Rek:</strong> 1234567890
                </p>
                <p>
                  <strong>Atas Nama:</strong> ASB FAMILY
                </p>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <p>
                  <strong>Bank:</strong> Mandiri
                </p>
                <p>
                  <strong>No Rek:</strong> 9876543210
                </p>
                <p>
                  <strong>Atas Nama:</strong> ASB FAMILY
                </p>
              </div>
            </div>

            <p className="mb-2">
              Jenis PIN:{" "}
              <strong>
                {selectedType === "aktivasi" ? "Aktivasi" : "Repeat Order (RO)"}
              </strong>
            </p>
            <p className="mb-4">
              Jumlah: <strong>{selectedType && quantity[selectedType]}</strong>
            </p>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Upload Bukti Transfer:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProof(e.target.files?.[0] || null)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setOpenModal(false)}
              >
                Batal
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-green-700"
                }`}
                onClick={handleUpload}
                disabled={isLoading}
              >
                {isLoading ? "Mengupload..." : "Konfirmasi"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div>

      </div>
    </div>
  );
}
