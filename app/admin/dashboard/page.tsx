'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import PinProducer from '@/components/pin'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<DocumentData[]>([])
  const [sales, setSales] = useState<DocumentData[]>([])
  const [pin, setPin] = useState<number | null>(null)

  const router = useRouter()

  // Cek login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/admin/login')
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  // Ambil data dari Firestore
  useEffect(() => {
    const fetchData = async () => {
      const userSnap = await getDocs(collection(db, 'users'))
      const salesSnap = await getDocs(collection(db, 'sales'))
      setUsers(userSnap.docs.map((docw) => docw.data()))
      setSales(salesSnap.docs.map((docw) => docw.data()))
    }
    fetchData()
  }, [])


  const handleLogout = () => {
    signOut(auth).then(() => router.replace('/admin/login'))
  }

if (loading) return (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-16 h-16 border-8 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
      <p className="text-2xl text-gray-700 font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  </div>
)


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-red-600">
            🛠 Admin Panel - ASB Family
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-gray-400"
          >
            Logout
          </button>
        </div>

        {/* Section: User List */}
        <section className="bg-white p-6 rounded-xl shadow text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">👥 Daftar User</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Produk Terjual */}
        <section className="bg-white p-6 rounded-xl shadow text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">📦 Produk Terjual</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Nama Produk</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((item, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">Rp {item.price?.toLocaleString()}</td>
                    <td className="p-3">{item.soldAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Witdrawmember */}
        <section className="bg-white p-6 rounded-xl shadow text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Witdraw member</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Nama Member</th>
                  <th className="p-3">Total wd</th>
                  <th className="p-3">fee wd</th>
                  <th className="p-3">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((item, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">Rp {item.price?.toLocaleString()}</td>
                    <td className="p-3">{item.soldAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Section: cashflow */}
        <section className="bg-white p-6 rounded-xl shadow text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Chasflow</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Total Input</th>
                  <th className="p-3">Total Output</th>
                  <th className="p-3">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((item, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">Rp {item.price?.toLocaleString()}</td>
                    <td className="p-3">{item.soldAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: PIN Generator */}
        <section className="bg-white p-6 rounded-xl shadow text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">🔐 Generate PIN</h2>
        <PinProducer/>
        </section>
      </div>
    </div>
  )
}
