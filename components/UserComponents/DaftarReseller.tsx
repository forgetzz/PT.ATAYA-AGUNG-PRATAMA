"use client";
import React from "react";

export default function Daftarreseller() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Form Tambah Reseller */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-800">Tambah Reseller Baru</h1>
          <p className="text-sm text-gray-600">
            Daftarkan reseller baru Anda di sini. Setiap reseller baru otomatis mendapatkan 2 produk dan 2 poin.
          </p>
        </div>

        {/* Formulir */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {/* Nama */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Contoh: Budi Santoso"
              className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">No. WhatsApp</label>
            <input
              type="text"
              placeholder="Contoh: 081234567890"
              className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Alamat */}
          <div className="sm:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Alamat</label>
            <input
              type="text"
              placeholder="Contoh: Jl. Merdeka No. 10"
              className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Paket */}
        <div className="bg-gray-50 border p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="text-sm font-semibold text-gray-700">Paket Pendaftaran</p>
            <p className="text-sm text-gray-600">
              Jumlah Produk: <span className="font-semibold">2 pcs</span>
            </p>
          </div>
          <p className="text-green-600 font-bold text-lg mt-2 sm:mt-0">Rp 180.000</p>
        </div>

        {/* Tombol */}
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold text-sm transition-all duration-200">
          + Tambah Reseller
        </button>
      </div>

      {/* Tabel Daftar Reseller */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Daftar Reseller Anda</h1>
          <p className="text-sm text-gray-600">Berikut adalah semua reseller yang telah Anda daftarkan.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-2 text-left">Nama Lengkap</th>
                <th className="px-4 py-2 text-left">Jumlah Poin</th>
                <th className="px-4 py-2 text-left">Reward Tercapai</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-3xl">⏳</div>
                    <p className="text-sm font-medium">Anda belum memiliki reseller.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
