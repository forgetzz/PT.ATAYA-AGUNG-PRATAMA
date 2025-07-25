"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import PinProducer from "@/components/pin";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [sales, setSales] = useState<DocumentData[]>([]);
  const [withdrawsData, setWithdrawsData] = useState<DocumentData[]>([]);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const userSnap = await getDocs(collection(db, "users"));
      const salesSnap = await getDocs(collection(db, "sales"));
      setUsers(userSnap.docs.map((docw) => docw.data()));
      setSales(salesSnap.docs.map((docw) => docw.data()));
    };
    fetchData();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("https://backend-asb-production.up.railway.app//WithdrawAdmin");
    const data = await res.json();
    console.log(data);
    setWithdrawsData(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => router.replace("/admin/login"));
  };

  const handleUpdateStatus = async (id: string) => {
    const user = getAuth().currentUser;
    if (!user) return alert("Pengguna belum login.");

    const token = await user.getIdToken();
    try {
      const res = await fetch("https://backend-asb-production.up.railway.app/WithdrawAdminUpdate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: "Selesai" }),
      });

      const result = await res.json();
      alert(result.message);
      fetchProfile();
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-red-600">🛠 Admin Panel - ASB Family</h1>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-gray-400">
            Logout
          </button>
        </div>

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

        <section className="bg-white p-6 rounded-2xl shadow-lg text-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-red-600">Pin Order</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-red-100 rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-red-100 via-red-200 to-red-300 text-red-800">
                <tr>
                  <th className="p-4 font-semibold">Nama</th>
                  <th className="p-4 font-semibold">Total Input</th>
                  <th className="p-4 font-semibold">Total Output</th>
                  <th className="p-4 font-semibold">Tanggal</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {sales.map((item, i) => (
                  <tr key={i} className="border-t border-red-100 hover:bg-red-50 transition duration-150">
                    <td className="p-4">{item.name}</td>
                    <td className="p-4 text-green-600 font-medium">Rp {item.price?.toLocaleString()}</td>
                    <td className="p-4 text-red-600 font-medium">
                      {item.output ? `Rp ${item.output.toLocaleString()}` : "-"}
                    </td>
                    <td className="p-4 text-gray-600">
                      {item.soldAt
                        ? new Date(item.soldAt.seconds * 1000).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                            timeZone: "Asia/Makassar",
                          })
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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
                    <td className="p-3">{item.nama}</td>
                    <td className="p-3">Rp {item.jumlah?.toLocaleString()}</td>
                    <td className="p-3">{item.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Withdraw Member</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Nama Member</th>
                  <th className="p-3">Total WD</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Admin</th>
                </tr>
              </thead>
              <tbody>
                {withdrawsData.map((item, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.nama}</td>
                    <td className="p-3">Rp {item.jumlah?.toLocaleString()}</td>
                    <td className="p-3 text-bold text-red-500">{item.status}</td>
                    <td className="p-3">
                      {item.createdAt?._seconds
                        ? new Date(item.createdAt._seconds * 1000).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                            timeZone: "Asia/Makassar",
                          })
                        : "-"}
                    </td>
                    <td>
                      {item.status === "Menunggu" ? (
                        <button
                          onClick={() => handleUpdateStatus(item.id)}
                          className="px-4 py-2 mt-2 text-white font-semibold rounded-lg bg-gradient-to-r from-red-500 via-pink-500 to-red-600 shadow-md hover:brightness-110 hover:-translate-y-1 active:scale-95 transition-all duration-200 ease-in-out"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-gray-500">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

        <section className="bg-white p-6 rounded-xl shadow text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">🔐 Generate PIN</h2>
          <PinProducer />
        </section>
      </div>
    </div>
  );
}