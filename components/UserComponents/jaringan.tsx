"use client";
import {
  Users,
  Star,
  UserCheck,
  ShieldCheck,
  ArrowRightLeft,
  Mail, User,
} from "lucide-react";

import React, { use, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const connectorColors = [
  "border-red-500",
  "border-blue-500",
  "border-green-500",
  "border-yellow-500",
  "border-purple-500",
  "border-pink-500",
];
interface datas {
  id: string;
  name: string;
  email: string;
  roStatus: boolean;
  RoPribadi: string;
  RoTeam: string;
  username: string;
}

export default function NetworkPage() {
  const [downlines, setDownlines] = useState<datas[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLogin, setUserLogin] = useState<datas>();
  const [totalDownline, setTotalDownline] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Step 1: Ambil username dari dokumen user yang sedang login
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const currentUsername = userSnap.data()?.username;

        if (!currentUsername) return;

        // Step 2: Cari user lain yang `sponsorUsername` == currentUsername
        const q = query(
          collection(db, "users"),
          where("sponsorUsername", "==", currentUsername)
        );

        const snapshot = await getDocs(q);

        const children = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "",
          email: doc.data().email || "",
          RoTeam: doc.data().RoTeam || "",
          RoPribadi: doc.data().RoPribadi || "",
          roStatus: doc.data().roStatus || "",
          username: doc.data().username || "",
        }));

        setDownlines(children);
        setTotalDownline(children.length);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const userLogin = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return alert("login dulu");
      }
      try {
        const db2 = await getDoc(doc(db, "users", user.uid));
        const dbRef = db2.data() as datas;
        setUserLogin(dbRef);
        console.log("data dari jaringan", dbRef);
      } catch {
        console.error("erorr kanda");
      }
    });
    return () => userLogin();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-xl text-center text-gray-600">
        Loading jaringan...
      </div>
    );

  return (
    <div
      id="jaringan"
      className="p-6 max-w-4xl mx-auto text-gray-800 min-h-screen"
    >
      <div id="jaringan" className="p-6 max-w-4xl mx-auto text-gray-800 ">
        {/* Pencarian Mitra */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Masukkan nama atau username mitra..."
              className="flex-1 p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* Root user */}
      <div className="flex flex-col items-center mb-6">
      {userLogin ? (
        <div className="flex justify-center mt-6">
          <div className="w-80 border-t-4 border-red-500 bg-white shadow-lg hover:shadow-xl transition-all rounded-xl overflow-hidden">
            <div className="p-6 text-center">
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4">
                <img
                  src={`https://i.pravatar.cc/100?u=${userLogin.email}`}
                  alt={userLogin.name}
                  className="w-full h-full rounded-full border-4 border-white shadow object-cover"
                />
              </div>

              {/* Nama dan Username */}
              <div className="mb-3">
                <h2 className="text-xl font-bold text-gray-800">
                  {userLogin.name}
                </h2>
                <p className="text-sm text-gray-400">@{userLogin.username}</p>
              </div>

              {/* Informasi Lain */}
              <div className="text-sm text-left mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} /> Total Downline:
                  </div>
                  <span className="font-semibold text-gray-800">
                    {totalDownline}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ArrowRightLeft size={16} /> RO Team:
                  </div>
                  <span className="font-semibold text-gray-800">
                    {userLogin.RoTeam}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star size={16} /> RO Pribadi:
                  </div>
                  <span className="font-semibold text-gray-800">
                    {userLogin.RoPribadi}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ShieldCheck size={16} /> RO Status:
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      userLogin.roStatus
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {userLogin.roStatus ? "Aktif" : "Tidak Aktif"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-6 text-sm text-gray-500">Loading...</div>
      )}

      <div className="w-1 h-6 bg-red-400 mt-4" />
    </div>
      {/* Downlines */}
{downlines.length === 0 ? (
  <div className="text-gray-500 text-sm text-center">
    Belum ada mitra langsung.
  </div>
) : (
  <div className="flex flex-wrap justify-center gap-6">
    {downlines.map((child, index) => (
      <div key={child.id} className="flex flex-col items-center">
        {/* Garis konektor */}
        <div
          className={`w-1 h-4 ${
            connectorColors[index % connectorColors.length]
          } border-l-2`}
        />
        <Card className="w-56 border-t-4 shadow-md hover:shadow-lg transition border-red-500 bg-white">
          <CardContent className="p-4 text-center space-y-2">
            {/* Avatar */}
            <div className="w-16 h-16 mx-auto">
              <img
                src={`https://i.pravatar.cc/100?u=${child.id}`}
                alt={child.name}
                className="w-full h-full rounded-full border-2 border-white shadow-sm object-cover"
              />
            </div>

            {/* Nama */}
            <div className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-800 truncate">
              <User size={14} />
              {child.name}
            </div>

            {/* Email */}
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <Mail size={12} />
              {child.email}
            </div>

            {/* Status RO */}
            <div className="flex items-center justify-center gap-1 text-xs">
              <ShieldCheck size={12} />
              <span
                className={`font-semibold ${
                  child.roStatus ? "text-green-600" : "text-gray-400"
                }`}
              >
                {child.roStatus ? "RO Aktif" : "Tidak Aktif"}
              </span>
            </div>

            {/* Badge */}
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
function datas(arg0: never[]) {
  throw new Error("Function not implemented.");
}
