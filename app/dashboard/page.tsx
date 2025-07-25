"use client"

import {
  Home,
  Network,
  Wallet,
  Package,
  Settings,
} from "lucide-react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Home2 from "@/components/UserComponents/home"
import Jaringan from "@/components/UserComponents/jaringan"
import FinanceDashboard from "@/components/UserComponents/finance"
import ProductList from "@/components/UserComponents/produk"
import AccountSettings from "@/components/UserComponents/setting"
import { useTabStore } from "@/store/tabStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function BottomNav() {
  const { activeTab, setActiveTab } = useTabStore()
  const router = useRouter()

  // ✅ Gunakan useEffect untuk redirect jika user belum login
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home2 />
      case "jaringan":
        return <Jaringan />
      case "finance":
        return <FinanceDashboard />
      case "produk":
        return <ProductList />
      case "settings":
        return <AccountSettings />
      default:
        return null
    }
  }

  const navItems = [
    { key: "home", icon: <Home size={22} /> },
    { key: "jaringan", icon: <Network size={22} /> },
    { key: "finance", icon: <Wallet size={22} /> },
    { key: "produk", icon: <Package size={22} /> },
    { key: "settings", icon: <Settings size={22} /> },
  ] as const

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">{renderContent()}</main>

      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg px-6 py-2 flex justify-between gap-4 w-[90%] max-w-md z-50">
        {navItems.map(({ key, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`p-2 rounded-full transition-all duration-200 hover:bg-red-500 ${
              activeTab === key ? "bg-red-500 text-white" : "text-gray-500"
            }`}
          >
            {icon}
          </button>
        ))}
      </nav>
    </div>
  )
}
