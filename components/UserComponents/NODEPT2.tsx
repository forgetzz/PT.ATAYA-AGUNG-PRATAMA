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
    const fetchTree = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const username = userData.username;

          const tree = await buildTreeFast(username);
          if (tree) {
            tree.downlineCount = countTotalDownlines(tree); // <- hitung semua anak cucu
            setTree(tree); // <- simpan ke state untuk ditampilkan
          }
        }
      }
    };

    fetchTree();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const currentUid = user.uid;
      const cached = localStorage.getItem("cachedTree");
      const cachedUid = localStorage.getItem("cachedUid");
      const cachedTime = localStorage.getItem("cachedTime");
      const cachedUserCount = localStorage.getItem("cachedUserCount");

      const usersSnap = await getDocs(collection(db, "users"));
      const userCount = usersSnap.size.toString();

      // ✅ Log untuk debug

      const isCacheValid =
        cached &&
        cachedUid === currentUid &&
        Date.now() - Number(cachedTime) < 1000 * 60 * 10 && // valid 10 menit
        cachedUserCount === userCount;

      if (isCacheValid) {
        setTree(JSON.parse(cached));
        setLoading(false);

        return;
      }

      // 🔄 Fetch dari Firestore jika tidak valid
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (!userData) return;

      const rootNode = await buildTreeFast(userData.username);
      if (rootNode) {
        const sortedNode = sortChildrenByDate(rootNode);

        hitungDownlineSemuaNode(sortedNode); // 💡 hitung jumlah downline

        // Simpan ke cache
        localStorage.setItem("cachedTree", JSON.stringify(sortedNode));
        localStorage.setItem("cachedUid", currentUid);
        localStorage.setItem("cachedTime", Date.now().toString());
        localStorage.setItem("cachedUserCount", userCount);

        setTree(sortedNode);
      } else {
        console.warn("⚠️ Root node tidak ditemukan");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    const trimmed = searchUsername.trim().toLowerCase();

    if (!trimmed) {
      const cached = localStorage.getItem("cachedTree");
      if (cached) {
        const parsed = JSON.parse(cached);
        setTree(parsed);
      }
      return;
    }

    const cached = localStorage.getItem("cachedTree");
    if (cached) {
      const parsed: UserNode = JSON.parse(cached);

      // Fungsi pencarian sederhana: cari node dengan username cocok dan langsung tampilkan
      const findNode = (node: UserNode): UserNode | null => {
        if (node.username.toLowerCase().includes(trimmed)) {
          return node; // tampilkan node ini apa adanya (dengan semua children-nya)
        }
        let angka = node.children.length + 1;

        for (const child of node.children || []) {
          angka--;
          const found = findNode(child);

          console.log(angka);
          if (found) return found;
        }

        return null;
      };

      const result = findNode(parsed);
      if (result) {
        setTree(result);
      } else {
        setTree({ ...parsed, children: [] }); // Tidak ditemukan
      }
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto text-gray-800 min-h-screen mb-28">
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
        <div className="p-10 text-xl text-center text-gray-600">
          Loading jaringan...
        </div>
      ) : tree ? (
        <UserTree node={tree} isRoot />
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
        <div
          className={`mt-4 ${
            isRoot
              ? "flex overflow-x-auto space-x-4 px-4"
              : "flex flex-col items-center gap-4"
          }`}
          style={isRoot ? { maxWidth: "100%" } : {}}
        >
          {[...node.children]
            .sort((a, b) => {
              const timeA = new Date(a.createdAt).getTime() || 0;
              const timeB = new Date(b.createdAt).getTime() || 0;
              return timeA - timeB;
            })
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
            <InfoItem
              label="Jumlah Mitra"
              icon={<Users size={12} />}
              value={user.downlineCount}
              small
            />
            <StatusBadge active={user.roStatus} small />
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
async function buildTreeFast(rootUsername: string): Promise<UserNode | null> {
  const userSnap = await getDocs(collection(db, "users"));

  if (userSnap.empty) return null;

  // Buat map username => UserData
  const userMap = new Map<string, UserNode>();
  const sponsorMap = new Map<string, UserNode[]>();

  for (const doc of userSnap.docs) {
    const data = doc.data();


    const node: UserNode = {
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
          : data.createdAt?.toDate().toISOString() ?? new Date().toISOString(),
    };

    userMap.set(node.username, node);

    const sponsor = data.sponsorUsername;
    if (sponsor) {
      if (!sponsorMap.has(sponsor)) sponsorMap.set(sponsor, []);
      sponsorMap.get(sponsor)!.push(node);
    }
  }

  // Susun tree
  function attachChildren(node: UserNode): number {
    const children = sponsorMap.get(node.username) || [];
    node.children = children.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    let totalDownline = 0;
    for (const child of node.children) {
      totalDownline += 1 + attachChildren(child);
    }
    node.downlineCount = totalDownline;
    return totalDownline;
  }

  const root = userMap.get(rootUsername);
  if (!root) return null;

  attachChildren(root);
  return root;
}

function sortChildrenByDate(node: UserNode): UserNode {

  node.children = node.children
    .map(sortChildrenByDate)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return node;
}

// function flattenTreeSortedByDate(node: UserNode): UserNode[] {
//   let result: UserNode[] = [node];

//   for (const child of node.children) {
//     result = result.concat(flattenTreeSortedByDate(child));
//   }

//   return result.sort(
//     (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//   );
// }
function countTotalDownlines(node: UserNode): number {
  let total = node.children.length;
  for (const child of node.children) {
    total += countTotalDownlines(child);
  }
  return total;
}
function hitungDownlineSemuaNode(node: UserNode): number {
  let total = 0;

  for (const child of node.children) {
    const childTotal = hitungDownlineSemuaNode(child);
    child.downlineCount = childTotal;
    total += 1 + childTotal;
  }

  node.downlineCount = total; // <- inilah kunci: set count-nya di setiap node
  return total;
}
