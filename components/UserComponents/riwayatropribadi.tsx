import React from 'react'

export default function Riwayatropribadi() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
  {/* Judul dan Deskripsi */}
  <div>
    <div className="flex items-center space-x-2">
      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A8 8 0 1112 20v1m0-1a8 8 0 01-6.879-3.804z" />
      </svg>
      <h1 className="text-lg font-semibold text-gray-800">Riwayat RO Pribadi</h1>
    </div>
    <p className="text-sm text-gray-600 mt-1">Daftar aktivasi Repeat Order yang telah Anda lakukan.</p>
  </div>

  {/* Kotak Tidak Ada Riwayat */}
  <div className="border border-dashed border-gray-300 rounded-lg p-6 mt-6 text-center text-gray-500">
    <svg className="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p className="font-medium text-gray-700">Tidak ada riwayat</p>
    <p className="text-sm text-gray-500">Anda belum pernah melakukan RO pribadi.</p>
  </div>
</div>

  )
}
