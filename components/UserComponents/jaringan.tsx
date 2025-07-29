'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTabStore } from "@/store/tabStore"
import Image from 'next/image';

const connectorColors = [
  'border-red-500',
  'border-blue-500',
  'border-green-500',
  'border-yellow-500',
  'border-purple-500',
  'border-pink-500',
];


export default function NetworkPage() {
  const [downlines, setDownlines] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, 'users'),
          where('sponsorId', 'array-contains', user.uid)
        );

        const snapshot = await getDocs(q);

        const children = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || '',
          email: doc.data().email || '',
        }));

        setDownlines(children);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-xl text-center text-gray-600">
        Loading jaringan...
      </div>
    );

  return (
    <div id="jaringan" className="p-6 max-w-4xl mx-auto text-gray-800 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-red-600 mb-8">
        Jaringan Saya
      </h1>

      {/* Root user */}
      <div className="flex flex-col items-center mb-6">
        <div className="rounded-full bg-white border-2 border-red-500 text-red-700 font-bold px-6 py-2 shadow-md">
          🧍 Anda
        </div>
        <div className="w-1 h-6 bg-red-400" />
      </div>

      {/* Downlines */}
      {downlines.length === 0 ? (
        <div className="text-gray-500 text-sm text-center">
          Belum ada mitra langsung.
        </div>
      ) : (
        <div className="flex flex-wrap min-h[500vh]  justify-center gap-6">
          {downlines.map((child, index) => (
            <div key={child.id} className="flex flex-col items-center">
              {/* garis konektor */}
              <div
                className={`w-1 h-4 ${connectorColors[index % connectorColors.length]} border-l-2`}
              />
              <Card className="w-48 border-t-4 shadow-md hover:shadow-lg transition border-red-500 bg-white">
                <CardContent className="p-4 text-center">
                  <div className="w-14 h-14 mx-auto mb-2">
                    <img
                      src={`https://i.pravatar.cc/100?u=${child.id}`}
                      alt={child.name}
                      className="w-full h-full rounded-full border-2 border-white shadow-sm object-cover"
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-800 truncate">
                    {child.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {child.email}
                  </div>
                  <Badge className="text-[10px] bg-red-600 text-white px-2 py-0.5">
                    Mitra Langsung
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
