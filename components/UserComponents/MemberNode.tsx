"use client";
import {
  Users,
  Star,
  ShieldCheck,
  ArrowRightLeft,
  User,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalLoading from "../loadingPage";

interface UserData {
  id: string;
  name: string;
  email: string;
  roStatus: boolean;
  roPribadi: number;
  roTeam: number;
  username: string;
  createdAt: string; // <- ini wajib ada
}

interface UserNode extends UserData {
  children: UserNode[];
  downlineCount: number;
}

export default function NetworkPage() {
  const [tree, setTree] = useState<UserNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (!userData) return;

      const rootNode = await buildTree(userData.username);
      setTree(rootNode);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    const trimmed = searchUsername.trim();
    let usernameToSearch = trimmed;

    if (!trimmed) {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser && currentUser.displayName) {
        usernameToSearch = currentUser.displayName;
      } else {
        console.error("Tidak bisa mendapatkan user login");
        setLoading(false);
        return;
      }
    }

    try {
      const rootNode = await buildTree(usernameToSearch);
      setTree(rootNode);
    } catch (error) {
      console.error("Gagal membangun tree:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800 min-h-screen mb-28">
      <div className="mb-6 flex gap-2 items-center">
        <Input
          placeholder="Cari berdasarkan username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          className="w-72"
        />
        <Button onClick={handleSearch}>
          <Search size={16} className="mr-1" /> Cari
        </Button>
      </div>

    {loading ? (
  <div className="flex justify-center items-center max-h-full mt-10">
    <div className="">
      <h1 className="text-red-500 flex justify-center mt-16 w-[120px] h-[120px] animate-spin-slow">
        <img src="images/loading.png" alt="" className="rounded-full" />
      </h1>
    </div>
  </div>
) : tree ? (
  <>
    {flattenTreeSortedByDate(tree).map((user, index) => (
      <div key={user.id} className="my-2">
        <UserCard user={user} isRoot={index === 0} />
      </div>
    ))}
  </>
) : (
  <div className="text-center text-gray-500">User tidak ditemukan.</div>
)}

    </div>
  );
}

function UserTree({ node, isRoot }: { node: UserNode; isRoot?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <UserCard user={node} isRoot={isRoot} />

  {node.children.length > 0 && (
  <div className="mt-4 flex flex-col items-center gap-4">
    {[...node.children]
      .sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((child) => (
        <UserTree key={child.id} node={child} />
      ))}
  </div>
)}

    </div>
  );
}

function UserCard({ user, isRoot }: { user: UserNode; isRoot?: boolean }) {
  return (
    <div className="flex  justify-center items-center">
      <Card className="w-60 border-t-4 border-red-500 bg-white shadow-md hover:shadow-lg transition shrink-0">
        <CardContent className="p-4 text-center space-y-2">
          <div className="w-16 h-16 mx-auto relative">
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
            @{user.username}
          </div>
          <div className="text-sm text-left mt-3 space-y-2">
            <InfoItem
              label="RO Team"
              icon={<ArrowRightLeft size={12} />}
              value={user.roTeam}
              small
            />
            <InfoItem
              label="RO Pribadi"
              icon={<Star size={12} />}
              value={user.roPribadi}
              small
            />
            <StatusBadge active={user.roStatus} small />
            <InfoItem
              label="Jumlah Mitra"
              icon={<Users size={12} />}
              value={user.downlineCount}
              small
            />
          </div>
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
    <div
      className={`flex items-center justify-between ${
        small ? "text-xs" : "text-sm"
      } text-gray-600`}
    >
      <div className="flex items-center gap-2">
        {icon} {label}:
      </div>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function StatusBadge({
  active,
  small = false,
}: {
  active: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${
        small ? "text-xs" : "text-sm"
      } text-gray-600`}
    >
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
async function buildTree(
  username: string,
  depth = 0,
  maxDepth = 5
): Promise<UserNode | null> {
  if (depth >= maxDepth) return null;

  // Ambil user sebagai root
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const rootDoc = snapshot.docs[0];
  const rootData = rootDoc.data();

  const node: UserNode = {
    id: rootDoc.id,
    name: rootData.name || "",
    email: rootData.email || "",
    roStatus: rootData.roStatus || false,
    roPribadi: rootData.roPribadi || 0,
    roTeam: rootData.roTeam || 0,
    username: rootData.username || "",
    children: [],
    downlineCount: 0,
    createdAt:
      typeof rootData.createdAt === "string"
        ? rootData.createdAt
        : rootData.createdAt?.toDate().toISOString() ??
          new Date().toISOString(),
  };

  // Ambil anak-anak dari user ini (downline langsung)
  const childQuery = query(
    collection(db, "users"),
    where("sponsorUsername", "==", username)
  );
  const childSnapshot = await getDocs(childQuery);

  // Sort berdasarkan tanggal pembuatan (lama ke baru)
  const sortedChildren = childSnapshot.docs.sort((a, b) => {
    const aDate = a.data().createdAt?.toDate?.() ?? new Date(0);
    const bDate = b.data().createdAt?.toDate?.() ?? new Date(0);
    return aDate.getTime() - bDate.getTime(); // ASC
  });

  for (const doc of sortedChildren) {
    const data = doc.data();

    const childNode: UserNode = {
      id: doc.id,
      name: data.name || "",
      email: data.email || "",
      roStatus: data.roStatus || false,
      roPribadi: data.roPribadi || 0,
      roTeam: data.roTeam || 0,
      username: data.username || "",
      children: [],
      downlineCount: 0,
      createdAt:
        typeof data.createdAt === "string"
          ? data.createdAt
          : data.createdAt?.toDate().toISOString() ??
            new Date().toISOString(),
    };

    console.log("Anak ditemukan:", {
      username: childNode.username,
      createdAt: childNode.createdAt,
    });

    const deeper = await buildTree(childNode.username, depth + 1, maxDepth);
    if (deeper) {
      childNode.children = deeper.children;
      childNode.downlineCount = deeper.downlineCount;
    }

    node.children.push(childNode);
    node.downlineCount += 1 + childNode.downlineCount;
  }

  return node;
}
function flattenTreeSortedByDate(node: UserNode): UserNode[] {
  let result: UserNode[] = [node];

  for (const child of node.children) {
    result = result.concat(flattenTreeSortedByDate(child));
  }

  return result.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}
