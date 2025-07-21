'use client'

import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '@/lib/firebase'

const connectorColors = [
  'border-red-500',
  'border-blue-500',
  'border-green-500',
  'border-yellow-500',
  'border-purple-500',
  'border-pink-500',
]

export default function NetworkPage() {
  const [downlines, setDownlines] = useState<{
    id: string
    name: string
    email: string
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, 'users'),
          where('sponsorId', 'array-contains', user.uid)
        )

        const snapshot = await getDocs(q)

        const children = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || '',
          email: doc.data().email || '',
        }))

        setDownlines(children)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <div className="p-10 text-xl text-center">Loading jaringan...</div>

  return (
    <div className="p-6 max-w-2xl mx-auto text-gray-800 bg-red-300 min-h-screen ">
      <h1 className="text-2xl font-bold text-center text-red-600 mb-6">Jaringan Saya</h1>

      {/* Root user (Anda) */}
      <div className="flex flex-col items-center mb-4">
        <div className="bg-white text-center border rounded-full px-4 py-2 shadow text-sm font-bold">
          🧍 Anda
        </div>
        <div className="w-1 h-6 border-l-2 border-gray-400" />
      </div>

      {/* Downlines */}
      <div className="flex flex-col items-center space-y-4">
        {downlines.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada mitra langsung.</p>
        ) : (
          downlines.map((child, index) => (
            <div key={child.id} className="flex flex-col items-center">
              {/* garis ke bawah warna-warni */}
              <div
                className={`w-1 h-4 ${
                  connectorColors[index % connectorColors.length]
                } border-l-2`}
              />
              <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-xs shadow-md text-center min-w-[120px]">
                <div className="font-semibold">👤 {child.name}</div>
                <div className="text-[10px] text-gray-600">{child.email}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
