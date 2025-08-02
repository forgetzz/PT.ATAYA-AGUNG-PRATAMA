import React from 'react'

export default function Statuspenarikan() {
  return (
    <div className="bg-white p-6 rounded-lg md-9 shadow-md max-w-2xl mx-auto space-y-4">
  {/* Header */}
  <div>
    <h1 className="text-xl font-bold text-gray-800">Status Penarikan</h1>
    <p className="text-sm text-gray-600">Riwayat permintaan penarikan bonus Anda.</p>
  </div>

  {/* Konten jika belum ada riwayat */}
  <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-gray-600">
    {/* Ikon sengaja tidak dimasukkan sesuai permintaan */}
    <p className="text-base font-semibold text-gray-700 mt-2">Tidak ada riwayat</p>
    <p className="text-sm">Anda belum pernah melakukan penarikan bonus.</p>
  </div>
</div>

  )
}
