"use client"
import React from "react";

export default function Rewardreseller() {
  return (
    <div className="space-y-6 p-10 mb-10">
      {/* Kartu Utama Reward */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-lg space-y-3">
        <h1 className="text-xl font-semibold">Bonus Reward Utama Reseller</h1>
        <p className="text-sm">Raih reward luar biasa dengan mengumpulkan poin dari setiap penjualan.</p>
        <p className="text-sm mt-4">Total Poin Anda Saat Ini:</p>
        <p className="text-4xl font-bold">0</p>
      </div>

      {/* Target 25 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-600 space-y-2">
        <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
        <p className="text-xl font-bold">25 Pcs</p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full w-0 transition-all duration-500 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <p className="text-green-700 font-semibold">Rp 125.000</p>
          <p className="text-gray-500">0 / 25</p>
        </div>
      </div>

      {/* Target 50 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-600 space-y-2">
        <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
        <p className="text-xl font-bold">50 Pcs</p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full w-0 transition-all duration-500 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <p className="text-green-700 font-semibold">Rp 250.000</p>
          <p className="text-gray-500">0 / 50</p>
        </div>
      </div>

      {/* Target 100 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-600 space-y-2">
        <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
        <p className="text-xl font-bold">100 Pcs</p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full w-0 transition-all duration-500 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <p className="text-green-700 font-semibold">Rp 500.000</p>
          <p className="text-gray-500">0 / 100</p>
        </div>
      </div>

      {/* Target 300 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-600 space-y-2">
        <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
        <p className="text-xl font-bold">300 Pcs</p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full w-0 transition-all duration-500 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <p className="text-green-700 font-semibold">Rp 1.500.000</p>
          <p className="text-gray-500">0 / 300</p>
        </div>
      </div>

      {/* Target 500 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-600 space-y-2">
        <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
        <p className="text-xl font-bold">500 Pcs</p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full w-0 transition-all duration-500 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <p className="text-green-700 font-semibold">Rp 2.500.000</p>
          <p className="text-gray-500">0 / 500</p>
        </div>
      </div>

      {/* Target 1000 */}
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-600 space-y-2">
        <p className="text-xs text-yellow-600 font-semibold uppercase">Target Poin</p>
        <p className="text-xl font-bold">1000 Pcs</p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full w-0 transition-all duration-500 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <p className="text-green-700 font-semibold">Rp 5.000.000</p>
          <p className="text-gray-500">0 / 1000</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-yellow-100 p-5 rounded-xl shadow space-y-2">
        <h1 className="text-lg font-bold text-yellow-900">Informasi Reward</h1>
        <p className="text-sm text-gray-800">
          Mekanisme: setiap penjualan 1 Pcs produk (ASB OIL/ASB BOOSTER) akan mendapatkan 1 poin.
        </p>
        <p className="text-sm text-gray-700 italic">
          NOTE: Reward utama reseller dibagikan setiap 6 bulan secara bersamaan dan dibayar oleh stokis masing-masing. Reward berlaku turunan.
        </p>
      </div>
    </div>
  );
}
