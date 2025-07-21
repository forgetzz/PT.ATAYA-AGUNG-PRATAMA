"use client"

import React from "react"
import { BadgePercent, Users, ShoppingCart, Wallet } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-400 text-white px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">👋 Selamat Datang di ASB Family</h1>
      <p className="text-md mb-8 text-white/80">
        Kelola akunmu, pantau jaringan, dan lihat perkembangan finansialmu di sini.
      </p>

      {/* Fitur Cards */}
      <div className="grid grid-cols-2 gap-4">
        <FeatureCard icon={<Users className="w-6 h-6" />} label="Jaringan" />
        <FeatureCard icon={<ShoppingCart className="w-6 h-6" />} label="Produk" />
        <FeatureCard icon={<Wallet className="w-6 h-6" />} label="Finance" />
        <FeatureCard icon={<BadgePercent className="w-6 h-6" />} label="Komisi" />
      </div>

      {/* Promo / Info */}
      <div className="mt-10 bg-white text-red-700 rounded-xl shadow p-4">
        <h2 className="font-semibold text-lg mb-1">📢 Informasi Terbaru</h2>
        <p className="text-sm">
          Jangan lewatkan promo bulan ini! Dapatkan 10% tambahan komisi untuk setiap rekrutmen baru.
        </p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white rounded-xl text-red-600 shadow flex flex-col items-center justify-center py-6 hover:scale-105 transition-transform">
      <div className="mb-2">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  )
}
