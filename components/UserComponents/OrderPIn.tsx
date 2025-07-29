'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ShoppingCart } from 'lucide-react'; // pastikan lucide-react sudah diinstal

export default function OrderPIN() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState<'aktivasi' | 'ro' | null>(null);
  const [proof, setProof] = useState<File | null>(null);
  const [quantity, setQuantity] = useState({
    aktivasi: 1,
    ro: 1,
  });

  const openConfirmation = (type: 'aktivasi' | 'ro') => {
    setSelectedType(type);
    setOpenModal(true);
  };

  const handleUpload = () => {
    if (!proof || !selectedType || quantity[selectedType] < 1) {
      alert('Lengkapi data dengan benar.');
      return;
    }

    console.log('PIN dibeli:', selectedType);
    console.log('Jumlah:', quantity[selectedType]);
    console.log('Bukti transfer:', proof);

    // TODO: kirim ke Firestore / Firebase Storage
    setOpenModal(false);
    setProof(null);
    setSelectedType(null);
    alert("Pembelian berhasil dikonfirmasi (dummy)");
  };

  const handleQuantityChange = (type: 'aktivasi' | 'ro', value: number) => {
    setQuantity((prev) => ({
      ...prev,
      [type]: value < 1 ? 1 : value,
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Order PIN</h1>

      {/* PIN Card */}
      {['aktivasi', 'ro'].map((type) => (
        <div
          key={type}
          className="border p-4 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between bg-white gap-4"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <div>
              <h2 className="text-lg font-semibold">
                {type === 'aktivasi' ? 'PIN Aktivasi' : 'PIN RO'}
              </h2>
              <p className="text-sm text-gray-600">
                Harga: {type === 'aktivasi' ? 'Rp250.000' : 'Rp50.000'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={quantity[type as 'aktivasi' | 'ro']}
              onChange={(e) =>
                handleQuantityChange(
                  type as 'aktivasi' | 'ro',
                  parseInt(e.target.value) || 1
                )
              }
              className="w-16 border rounded px-2 py-1 text-center"
            />
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => openConfirmation(type as 'aktivasi' | 'ro')}
            >
              Beli
            </button>
          </div>
        </div>
      ))}

      {/* Modal Konfirmasi */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-4">Konfirmasi Pembelian</Dialog.Title>
            <p className="mb-2">
              Jenis PIN: <strong>{selectedType === 'aktivasi' ? 'Aktivasi' : 'Repeat Order (RO)'}</strong>
            </p>
            <p className="mb-4">
              Jumlah: <strong>{selectedType && quantity[selectedType]}</strong>
            </p>

            {/* Upload bukti */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Upload Bukti Transfer:</label>
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
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleUpload}
              >
                Konfirmasi
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
