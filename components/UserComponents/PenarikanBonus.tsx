"use client"
import { User } from 'lucide-react'
import React from 'react'

export default function Formulirpenarikan() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 bg-gray-100 min-h-screen">
  <div className="bg-white w-full max-w-md rounded-xl shadow-md p-5">
    <div className="mb-4">
      <h1 className="text-xl font-bold text-gray-900">Formulir Penarikan Bonus</h1>
      <p className="text-sm text-gray-500">Ajukan penarikan bonus Anda ke rekening bank terdaftar.</p>
    </div>
    <div className="flex justify-between items-center bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">
      <span className="text-sm font-semibold">Saldo Tersedia</span>
      <span className="text-base font-bold">Rp 0</span>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Penarikan (IDR)</label>
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-100 justify-between">
        <span className="text-gray-400 text-sm">e.g. 500000</span>
        <span className="text-red-500 text-xs font-semibold">Max</span>
      </div>
    </div>
    <div className="bg-gray-100 rounded-lg p-4 mb-4">
      <h2 className="text-sm font-semibold text-gray-800 mb-2">Informasi Rekening</h2>
      <p className="text-sm text-gray-600 mb-1">Belum diatur</p>
      <p className="text-sm text-gray-600 mb-1">Belum diatur</p>
      <p className="text-sm text-gray-600 mb-2">a.n. Belum diatur</p>
      <p className="text-xs text-gray-400">
        Pastikan data rekening Anda sudah benar sebelum melakukan penarikan.
      </p>
    </div>
    <button className="w-full py-2 rounded-lg bg-red-300 text-white font-semibold text-sm">
      Kirim Permintaan
    </button>
  </div>
</div>

  )
}
