"use client";
import React from "react";

export default function BonusRewardUtama() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-6">
      {/* Header Merah */}
      <div className="bg-red-600 p-6 rounded-xl text-white shadow-lg">
        <h1 className="text-xl font-bold">Bonus Reward Utama</h1>
        <p className="text-sm mt-1">Lacak progres Anda untuk mendapatkan reward impian.</p>
        <p className="text-3xl font-bold mt-3">Poin Anda Saat Ini:<br />0 Poin</p>
      </div>

      {/* Daftar Hadiah */}
      <div className="space-y-6">

        {/* Card */}
        <RewardCard title="Uang Tunai" amount="Rp 350.000" points={50} current={0} />
        <RewardCard title="Uang Tunai" amount="Rp 700.000" points={100} current={0} />
        <RewardCard title="Uang Tunai" amount="Rp 2.100.000" points={300} current={0} />
        <RewardCard title="Uang Tunai" amount="Rp 3.500.000" points={500} current={0} />
        <RewardCard title="Trip Domestik" amount="Perjalanan Wisata" points={1000} current={0} />
        <RewardCard title="HP Iphone" amount="Smartphone Flagship" points={4000} current={0} />
        <RewardCard title="2 Unit NMAX" amount="Sepeda Motor" points={13000} current={0} />
        <RewardCard title="1 Unit Pajero" amount="Mobil SUV" points={100000} current={0} />

      </div>
    </div>
  );
}

// Komponen kartu reward
function RewardCard({ title, amount, points, current }: { title: string, amount: string, points: number, current: number }) {
  const progress = Math.min((current / points) * 100, 100);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded-full">
          {points.toLocaleString()} Poin
        </span>
      </div>
      <p className="text-base text-gray-900 font-medium mb-2">{amount}</p>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-red-500 h-3 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{current.toLocaleString()} / {points.toLocaleString()} Poin</p>
    </div>
  );
}
