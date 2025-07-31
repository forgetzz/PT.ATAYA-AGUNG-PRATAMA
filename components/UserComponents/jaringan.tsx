"use client";
import {
  Users,
  Star,
  UserCheck,
  ShieldCheck,
  ArrowRightLeft,
  Mail,
  User,
} from "lucide-react";

import React, { useEffect, useState } from "react";
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

interface UserData {
  id: string;
  name: string;
  email: string;
  roStatus: boolean;
  roPribadi: number;
  roTeam: number;
  username: string;
}

export default function NetworkPage() {
  const [downlines, setDownlines] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLogin, setUserLogin] = useState<UserData>();
  const [totalDownline, setTotalDownline] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (!userData) return;

      const currentUsername = userData.username;
      setUserLogin({
        id: user.uid,
        name: userData.name || "",
        email: userData.email || "",
        roStatus: userData.roStatus || false,
        roPribadi: userData.roPribadi || 0,
        roTeam: userData.roTeam || 0,
        username: userData.username || "",
      });

      // Ambil downlines berdasarkan sponsorUsername
      const q = query(
        collection(db, "users"),
        where("sponsorUsername", "==", currentUsername)
      );
      const snapshot = await getDocs(q);
      const children: UserData[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.name || "",
          email: d.email || "",
          roStatus: d.roStatus || false,
          roPribadi: d.roPribadi || 0,
          roTeam: d.roTeam || 0,
          username: d.username || "",
        };
      });

      setDownlines(children);
      setTotalDownline(children.length);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-xl text-center text-gray-600">
        Loading jaringan...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800 min-h-screen mb-28">
      {/* Root user */}
      {userLogin && (
        <div className="flex justify-center mt-6">
          <div className="w-80 border-t-4 border-red-500 bg-white shadow-lg hover:shadow-xl transition-all rounded-xl overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4">
                <img
                  src={`https://i.pravatar.cc/100?u=${userLogin.email}`}
                  alt={userLogin.name}
                  className="w-full h-full rounded-full border-4 border-white shadow object-cover"
                />
              </div>
              <div className="mb-3">
                <h2 className="text-xl font-bold text-gray-800">
                  {userLogin.name}
                </h2>
                <p className="text-sm text-gray-400">@{userLogin.username}</p>
              </div>
              <div className="text-sm text-left mt-6 space-y-3">
                <InfoItem label="Total Downline" icon={<Users size={16} />} value={totalDownline} />
                <InfoItem label="RO Team" icon={<ArrowRightLeft size={16} />} value={userLogin.roTeam} />
                <InfoItem label="RO Pribadi" icon={<Star size={16} />} value={userLogin.roPribadi} />
                <StatusBadge active={userLogin.roStatus} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-1 h-6 bg-red-400 mt-4 mx-auto" />

      {/* Downlines */}
      {downlines.length === 0 ? (
        <div className="text-gray-500 text-sm text-center mt-6">
          Belum ada mitra langsung.
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {downlines.map((child, index) => (
            <div key={child.id} className="flex flex-col items-center">
              <div className={`w-1 h-4 ${connectorColors[index % connectorColors.length]} border-l-2`} />
              <Card className="w-56 border-t-4 shadow-md hover:shadow-lg transition border-red-500 bg-white">
                <CardContent className="p-4 text-center space-y-2">
                  <div className="w-16 h-16 mx-auto">
                    <img
                      src={`https://i.pravatar.cc/100?u=${child.id}`}
                      alt={child.name}
                      className="w-full h-full rounded-full border-2 border-white shadow-sm object-cover"
                    />
                  </div>
                  <div className="text-sm font-semibold text-gray-800 truncate flex items-center justify-center gap-1">
                    <User size={14} /> {child.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Mail size={12} /> {child.email}
                  </div>
                  <div className="text-sm text-left mt-3 space-y-2">
                    <InfoItem label="RO Team" icon={<ArrowRightLeft size={12} />} value={child.roTeam} small />
                    <InfoItem label="RO Pribadi" icon={<Star size={12} />} value={child.roPribadi} small />
                    <StatusBadge active={child.roStatus} small />
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

function InfoItem({
  label,
  icon,
  value,
  small = false,
}: {
  label: string;
  icon: React.ReactNode;
value: string | number;
  small?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between ${small ? "text-xs" : "text-sm"} text-gray-600`}>
      <div className="flex items-center gap-2">{icon} {label}:</div>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function StatusBadge({ active, small = false }: { active: boolean; small?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${small ? "text-xs" : "text-sm"} text-gray-600`}>
      <div className="flex items-center gap-2">
        <ShieldCheck size={12} />
        RO Status:
      </div>
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full ${
          active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
        }`}
      >
        {active ? "Aktif" : "Tidak Aktif"}
      </span>
    </div>
  );
}
