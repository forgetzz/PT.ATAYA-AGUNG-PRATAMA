"use client";
import {
  Users,
  Star,
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
  const [downlines, setDownlines] = useState<UserData[][]>([]);
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
      const currentUser: UserData = {
        id: user.uid,
        name: userData.name || "",
        email: userData.email || "",
        roStatus: userData.roStatus || false,
        roPribadi: userData.roPribadi || 0,
        roTeam: userData.roTeam || 0,
        username: userData.username || "",
      };
      setUserLogin(currentUser);

      const tree = await buildTree(currentUsername);
      setDownlines(tree);
      setTotalDownline(tree.flat().length);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-10 text-xl text-center text-gray-600">Loading jaringan...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800 min-h-screen mb-28">
      {userLogin && (
        <div className="flex justify-center mt-6">
          <UserCard user={userLogin} totalDownline={totalDownline} isRoot />
        </div>
      )}

      {downlines.map((level, idx) => (
        <div key={idx} className="flex flex-nowrap overflow-x-auto gap-4 justify-center my-6">
          {level.map((user, i) => (
            <UserCard key={user.id} user={user} connectorColor={connectorColors[i % connectorColors.length]} />
          ))}
        </div>
      ))}
    </div>
  );
}

function UserCard({ user, totalDownline, connectorColor, isRoot }: {
  user: UserData;
  totalDownline?: number;
  connectorColor?: string;
  isRoot?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {!isRoot && <div className={`w-1 h-4 ${connectorColor} border-l-2`} />}
      <Card className="w-60 border-t-4 border-red-500 bg-white shadow-md hover:shadow-lg transition shrink-0">
        <CardContent className="p-4 text-center space-y-2">
          <div className="w-16 h-16 mx-auto">
            <img
              src={`https://i.pravatar.cc/100?u=${user.email}`}
              alt={user.name}
              className="w-full h-full rounded-full border-2 border-white shadow-sm object-cover"
            />
          </div>
          <div className="text-sm font-semibold text-gray-800 truncate flex items-center justify-center gap-1">
            <User size={14} /> {user.name}
          </div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <Mail size={12} /> {user.email}
          </div>
          <div className="text-sm text-left mt-3 space-y-2">
            <InfoItem label="RO Team" icon={<ArrowRightLeft size={12} />} value={user.roTeam} small />
            <InfoItem label="RO Pribadi" icon={<Star size={12} />} value={user.roPribadi} small />
            <StatusBadge active={user.roStatus} small />
          </div>
          {isRoot && totalDownline !== undefined && (
            <InfoItem label="Total Downline" icon={<Users size={12} />} value={totalDownline} small />
          )}
          {!isRoot && (
            <Badge className="text-[10px] bg-red-600 text-white px-2 py-0.5">
              Mitra
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({ label, icon, value, small = false }: {
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

async function buildTree(username: string, level = 0, maxDepth = 5): Promise<UserData[][]> {
  if (level >= maxDepth) return [];

  const q = query(collection(db, "users"), where("sponsorUsername", "==", username));
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

  const subTrees = await Promise.all(children.map((child) => buildTree(child.username, level + 1, maxDepth)));
  return [children, ...subTrees.flat()];
}
