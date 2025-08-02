import React from 'react'

export default function Inputpenjualanreseller() {
  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-6 mb-20">
      {/* Judul dan Deskripsi */}
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">Input Penjualan Reseller</h1>
        <p className="text-sm text-gray-600">
          Catat penjualan yang dilakukan oleh reseller Anda.
        </p>
      </div>

      {/* Formulir */}
      <div className="space-y-4 text-sm">
        {/* Pilih Reseller */}
        <div>
          <label className="block font-medium mb-1">Pilih Reseller</label>
          <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>Pilih reseller...</option>
          </select>
        </div>

        {/* Pilih Produk */}
        <div>
          <label className="block font-medium mb-1">Pilih Produk</label>
          <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>Pilih produk...</option>
          </select>
        </div>

        {/* Jumlah */}
        <div>
          <label className="block font-medium mb-1">Jumlah</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">#</span>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md px-8 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Total Harga */}
        <div>
          <label className="block font-medium mb-1">Total Harga</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-8 py-2 text-gray-700 bg-gray-100"
              value="0"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Tombol Simpan */}
      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition duration-150">
        + Simpan Penjualan
      </button>
    </div>
  )
}
