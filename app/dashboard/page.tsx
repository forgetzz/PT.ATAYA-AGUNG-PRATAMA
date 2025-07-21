"use client"
import Home2 from "@/components/UserComponents/home"
import { useState } from "react"
import { Home, Settings, BanknoteArrowDown, Network, BottleWine } from "lucide-react"
import Jaringan from "@/components/UserComponents/jaringan"

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("home")

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home2/>
      case "Jaringan":
        return <Jaringan/>
      case "Finance":
        return <div className="p-6 text-xl">🙍‍♂️ Profil Pengguna</div>
      case "Produk":
        return <div className="p-6 text-xl">🙍‍♂️ Profil Pengguna</div>
      case "settings":
        return <div className="p-6 text-xl">⚙️ Pengaturan</div>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{renderContent()}</div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "home" ? "text-red-600" : "text-gray-500"
          }`}
        >
          <Home className="w-6 h-6" />
          Home
        </button>

        <button
          onClick={() => setActiveTab("Jaringan")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "Jaringan" ? "text-red-600" : "text-gray-500"
          }`}
        >
          <Network className="w-6 h-6" />
          Jaringan
        </button>
        <button
          onClick={() => setActiveTab("Finance")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "Finance" ? "text-red-600" : "text-gray-500"
          }`}
        >
          <BanknoteArrowDown className="w-6 h-6" />
          Finance
        </button>
        <button
          onClick={() => setActiveTab("Produk")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "Produk" ? "text-red-600" : "text-gray-500"
          }`}
        >
          <BottleWine className="w-6 h-6" />
          Produk
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "settings" ? "text-red-600" : "text-gray-500"
          }`}
        >
          <Settings className="w-6 h-6" />
          Settings
        </button>
      </nav>
    </div>
  )
}
