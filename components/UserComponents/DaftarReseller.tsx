import React from 'react'

export default function Daftarreseller() {
  return (
    <div className="bg-white p-5 space-y-6 rounded-lg shadow">
  {/* Judul dan Deskripsi */}
  <div className="space-y-2">
    <h1 className="text-lg font-semibold">Tambah Reseller Baru</h1>
    <p className="text-sm text-gray-600">
      Daftarkan reseller baru Anda di sini. Setiap reseller baru otomatis mendapatkan 2 produk dan 2 poin.
    </p>
  </div>

  {/* Formulir Input */}
  <div className="space-y-4 text-sm">
    {/* Nama Lengkap */}
    <div>
      <label className="block font-medium mb-1">Nama Lengkap</label>
      <input
        type="text"
        placeholder="Contoh: Budi Santoso"
        className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm"
      />
    </div>

    {/* Nomor WhatsApp */}
    <div>
      <label className="block font-medium mb-1">No. WhatsApp</label>
      <input
        type="text"
        placeholder="Contoh: 081234567890"
        className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm"
      />
    </div>

    {/* Alamat */}
    <div>
      <label className="block font-medium mb-1">Alamat</label>
      <input
        type="text"
        placeholder="Contoh: Jl. Merdeka No. 10"
        className="w-full px-4 py-2 border rounded-md placeholder-gray-400 text-sm"
      />
    </div>
  </div>

  {/* Paket Pendaftaran */}
  <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
    <div>
      <p className="text-sm font-medium">Paket Pendaftaran</p>
      <p className="text-sm text-gray-600">Jumlah Produk: <span className="font-semibold">2 pcs</span></p>
    </div>
    <p className="text-green-600 font-bold">Rp 180.000</p>
  </div>

  {/* Tombol */}
  <button className="w-full bg-red-600 text-white py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2">
    + Tambah Reseller
  </button>
  <div className="bg-white p-5 rounded-lg shadow space-y-4 mt-6">
  <div>
    <h1 className="text-lg font-semibold">Daftar Reseller Anda</h1>
    <p className="text-sm text-gray-600">Berikut adalah semua reseller yang telah Anda daftarkan.</p>
  </div>

  {/* Tabel Reseller Kosong */}
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-600 font-medium">
        <tr>
          <th className="px-4 py-2 text-left">Nama Lengkap</th>
          <th className="px-4 py-2 text-left">Jumlah Poin</th>
          <th className="px-4 py-2 text-left">Reward Tercapai</th>
          <th className="px-4 py-2 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td  className="px-4 py-6 text-center text-gray-500 col-span-4">
            {/* Gambar ikon waktu bisa diganti nanti jika ingin */}
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

  )
}
