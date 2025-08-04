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

interface UserNode {
  username: string;
  name: string;
  children: UserNode[];
  // dan field lainnya...
}

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
  downlineNode: number;
  dataMitra : number;

}

export default function NetworkPage() {
  const [tree, setTree] = useState<UserNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchUsername, setSearchUsername] = useState("");
  const [dataMitra, setDataMitra] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      // Cek apakah ada cache yang masih valid (<10 menit)
      const cachedTree = localStorage.getItem("cachedTree");
      const cachedUsername = localStorage.getItem("cachedUsername");
      const cachedTime = localStorage.getItem("cachedTime");

      if (cachedTree && cachedUsername && cachedTime) {
        const age = Date.now() - parseInt(cachedTime);
        if (age < 10 * 60 * 100000) {
          setTree(JSON.parse(cachedTree));
          setLoading(false);
          return;
        }
      }

      // Jika tidak ada cache, fetch dari Firestore
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        if (!userData) return;

        const rootNode = await buildTree(userData.username);
        setTree(rootNode);

        // Simpan ke cache
        localStorage.setItem("cachedTree", JSON.stringify(rootNode));
        localStorage.setItem("cachedUsername", userData.username);
        localStorage.setItem("cachedTime", Date.now().toString());

        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchData();
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

        for (const child of node.children || []) {
          const found = findNode(child);
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
  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const username = userData.username;

          const q = query(
            collection(db, "users"),
            where("sponsorUsername", "==", username)
          );
          const querySnapshot = await getDocs(q);

          // Simpan jumlah anak ke state
          setDataMitra(querySnapshot.size); // .size langsung ambil jumlah dokumen
        } else {
          console.log("User data not found in Firestore");
        }
      }
    });

    return () => unsub();
  }, []);

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
        <div className="flex justify-center items-center max-h-full mt-56">
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
    <UserCard user={user} isRoot={index === 0} dataMitra={dataMitra} />
  </div>
))}

        </>
      ) : (
        <div className="text-center text-gray-500">User tidak ditemukan.</div>
      )}
    </div>
  );
}

// function UserTree({ node, isRoot }: { node: UserNode; isRoot?: boolean }) {
//   return (
//     <div className="flex flex-col items-center">
//       <UserCard user={node} isRoot={isRoot} />

//       {node.children.length > 0 && (
//         <div className="mt-4 flex flex-col items-center gap-4">
//           {[...node.children]
//             .sort(
//               (a, b) =>
//                 new Date(a.createdAt).getTime() -
//                 new Date(b.createdAt).getTime()
//             )
//             .map((child) => (
//               <UserTree key={child.id} node={child} />
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }

function UserCard({ user, isRoot, dataMitra }: { user: UserNode; isRoot?: boolean, dataMitra: number  }) {
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
              value={Number(dataMitra)}
              small
            />
            <InfoItem
              label="Jumlah Downline"
              icon={<Users size={12} />}
              value={user.downlineNode}
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
export async function buildTree(
  username: string,
  depth = 0,
  maxDepth = 5
): Promise<UserNode | null> {
  if (depth >= maxDepth) return null;

  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const rootDoc = snapshot.docs[0];
  const rootData = rootDoc.data();
  console.log(rootData);

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
    downlineNode: 0,
    dataMitra:0,
    createdAt:
      typeof rootData.createdAt === "string"
        ? rootData.createdAt
        : rootData.createdAt?.toDate().toISOString() ??
          new Date().toISOString(),
  };

  const childQuery = query(
    collection(db, "users"),
    where("sponsorUsername", "==", username)
  );
  const childSnapshot = await getDocs(childQuery);

  const sortedChildren = childSnapshot.docs.sort((a, b) => {
    const aDate = a.data().createdAt?.toDate?.() ?? new Date(0);
    const bDate = b.data().createdAt?.toDate?.() ?? new Date(0);
    return aDate.getTime() - bDate.getTime();
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
      downlineNode: 0,
      dataMitra: 0,
      createdAt:
        typeof data.createdAt === "string"
          ? data.createdAt
          : data.createdAt?.toDate().toISOString() ?? new Date().toISOString(),
    };

    const deeper = await buildTree(childNode.username, depth + 1, maxDepth);
    if (deeper) {
      childNode.children = deeper.children;
      childNode.downlineCount = deeper.downlineCount;
      childNode.downlineNode = deeper.downlineNode;
    }

    node.children.push(childNode);
    node.downlineCount += 1 + childNode.downlineCount;

    // Tambah 1 karena anak ini adalah 1 card visual, dan total dari bawah juga ditambahkan
    node.downlineNode += 1 + childNode.downlineNode;
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
// 🔢 Hitung total anak ke bawah dari 1 node
function countAllDescendants(node: UserNode): number {
  let count = node.children.length;
  for (const child of node.children) {
    count += countAllDescendants(child);
  }
  return count;
}
