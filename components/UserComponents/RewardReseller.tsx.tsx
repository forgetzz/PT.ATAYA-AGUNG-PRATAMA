"use client"
import React from 'react'

export default function Rewardreseller() {
  return (
    <div className="space-y-4">
  {/* Kartu Utama Reward */}
  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-5 rounded-xl shadow space-y-2">
    <h1 className="text-lg font-semibold">Bonus Reward Utama Reseller</h1>
    <p className="text-sm">Raih reward luar biasa dengan mengumpulkan poin dari setiap penjualan.</p>
    <p className="text-sm mt-4">Total Poin Anda Saat Ini:</p>
    <p className="text-3xl font-bold">0</p>
  </div>

  {/* Target 25 Pcs */}
  <div className="bg-white p-4 rounded-xl shadow space-y-2">
    <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
    <p className="text-xl font-bold">25 Pcs</p>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="bg-gray-400 h-full w-0 rounded-full"></div> {/* 0% progress */}
    </div>
    <div className="flex justify-between text-sm mt-1">
      <p className="text-green-600 font-medium">Rp 125.000</p>
      <p className="text-gray-500">0 / 25</p>
    </div>
  </div>

  {/* Target 50 Pcs */}
  <div className="bg-white p-4 rounded-xl shadow space-y-2">
    <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
    <p className="text-xl font-bold">50 Pcs</p>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="bg-gray-400 h-full w-0 rounded-full"></div> {/* 0% progress */}
    </div>
    <div className="flex justify-between text-sm mt-1">
      <p className="text-green-600 font-medium">Rp 250.000</p>
      <p className="text-gray-500">0 / 50</p>
    </div>
  </div>


   <div className="bg-white p-4 rounded-xl shadow space-y-2">
    <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
    <p className="text-xl font-bold">100 Pcs</p>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="bg-gray-400 h-full w-0 rounded-full"></div> {/* 0% progress */}
    </div>
    <div className="flex justify-between text-sm mt-1">
      <p className="text-green-600 font-medium">Rp 500.000</p>
      <p className="text-gray-500">0 / 100</p>
    </div>
  </div>


   <div className="bg-white p-4 rounded-xl shadow space-y-2">
    <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
    <p className="text-xl font-bold">300 Pcs</p>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="bg-gray-400 h-full w-0 rounded-full"></div> {/* 0% progress */}
    </div>
    <div className="flex justify-between text-sm mt-1">
      <p className="text-green-600 font-medium">Rp 1.500.000</p>
      <p className="text-gray-500">0 / 300</p>
    </div>
  </div>


   <div className="bg-white p-4 rounded-xl shadow space-y-2">
    <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
    <p className="text-xl font-bold">500 Pcs</p>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="bg-gray-400 h-full w-0 rounded-full"></div> {/* 0% progress */}
    </div>
    <div className="flex justify-between text-sm mt-1">
      <p className="text-green-600 font-medium">Rp 2.500.000</p>
      <p className="text-gray-500">0 / 50</p>
    </div>
  </div>


   <div className="bg-white p-4 rounded-xl shadow space-y-2">
    <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
    <p className="text-xl font-bold">1000 Pcs</p>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="bg-gray-400 h-full w-0 rounded-full"></div> {/* 0% progress */}
    </div>
    <div className="flex justify-between text-sm mt-1">
      <p className="text-green-600 font-medium">Rp 5.000.000</p>
      <p className="text-gray-500">0 / 1000</p>
    </div>
  </div>
  <div className='bg-red-100 p-4 rounded-xl shadow space-y-2'>
    <h1 className='text-lg font-bold'>Informasi Reward</h1>
    <p>Mekanisme: setiap penjualan 1 Pcs produk (ASB OIL/ASB BOOSTER) akan mendapatkan 1 poin.</p>

    <p>NOTE:Reward utama reseller dibagikan setiap 6 bulan secara bersamaan dan di bayar oleh stokis masing-masing. Reward berlaku turunan.</p>
  </div>
</div>

  )
}
