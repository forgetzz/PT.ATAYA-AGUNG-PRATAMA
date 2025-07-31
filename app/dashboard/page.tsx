"use client";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  ListCollapse,
  Network,
  Home,
  NotebookPen,
  User,
  UserRound,
  UserRoundPlus,
  Gem,
  LayoutDashboard,
  AlignCenterIcon,
  AlignJustify,
  Wallet,
  Bell,
  Award,
  Users,
  NotebookIcon,
} from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home2 from "@/components/UserComponents/home";
import Jaringan from "@/components/UserComponents/jaringan";
import ProductList from "@/components/UserComponents/produk";
import AccountSettings from "@/components/UserComponents/setting";
import { useTabStore } from "@/store/tabStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import DaftarMitra from "@/components/UserComponents/DaftarMitra";
import Image from "next/image";

import { getDoc, getFirestore, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import OrderPIN from "@/components/UserComponents/OrderPIn";
import StockPin from "@/components/UserComponents/StockPin";
import AktivasiRO from "@/components/UserComponents/aktivasiRo";
import Footer from "@/components/footer";
import TransferPin from "@/components/UserComponents/transferPIn";
interface dataProfile {
  name: string;
  email: string;
  uid: string;
}
export default function BottomNav() {
  const { activeTab, setActiveTab } = useTabStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [openNested, setOpenNested] = useState(false);
  const [openNested2, setOpenNested2] = useState(false);
  const [openNested3, setOpenNested3] = useState(false);
  const [openNested4, setOpenNested4] = useState(false);
  const [openNested5, setOpenNested5] = useState(false);
  const [profile, setProfile] = useState<dataProfile>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) {
        alert("Anda belum login");
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          // alert("Data anda tidak ada");
          return;
        }

        const data = docSnap.data() as dataProfile;
        setProfile(data);
        console.log("Data berhasil diambil:", data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Terjadi kesalahan saat mengambil data.");
      }
    });

    return () => unsubscribe(); // Cleanup listener saat komponen unmount
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home2 />;
      case "jaringan":
        return <Jaringan />;
      case "produk":
        return <DaftarMitra />;
      case "settings":
        return <AccountSettings />;
      case "OrderPIN":
        return <OrderPIN />;
      case "StockPIN":
        return <StockPin />;
      case "aktivasiRO":
        return <AktivasiRO />;
      case "TransferPin":
        return <TransferPin />;

      default:
        return null;
    }
  };

  const navItems = [
    { key: "jaringan", icon: <Network size={22} /> },
    { key: "home", icon: <Home size={22} /> },
    { key: "produk", icon: <UserRoundPlus size={22} /> },
    { key: "settings", icon: <User size={22} /> },
  ] as const;
  const now = new Date();
  const hariSekarang = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col min-h-fit bg-gray-50">
      <div className="flex justify-between items-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-b-lg px-4 py-3 text-white shadow-md">
        {/* Kiri: Hari + Halo */}
        <div>
          <p className="text-xs capitalize opacity-90">{hariSekarang}</p>
          {profile ? (
            <h1 className=" font-semibold">{profile?.name}</h1>
          ) : (
            <p>loading...</p>
          )}
        </div>

        {/* Kanan: Bell + Avatar */}
        <div className="flex items-center gap-3">
          {/* Icon Notifikasi */}
          <div className="p-2 bg-white/10 rounded-full">
            <Bell size={20} />
          </div>

          {/* Avatar / Logo */}
          <Image
            src="/images/loading.png" // Pastikan file ada di /public/images/
            alt="Avatar"
            width={28} // Sama dengan w-7
            height={28} // Sama dengan h-7
            className="object-cover"
          />
        </div>
      </div>
      <main className="flex-1">{renderContent()}</main>

      {/* Side menu with Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-[#800000] text-white p-0 h-screen overflow-y-auto  scrollbar-none"
        >
          <div className="p-4 ">
            <SheetTitle className="text-lg flex justify-center border-b-2 pb-4 border-white text-white items-center font-bold mb-4">
              Menu Utama
            </SheetTitle>
            <button
              className="w-full flex items-center gap-2 px-2 py-2 hover:bg-white/10 rounded mt-2"
              onClick={() => {
                setActiveTab("home");
                setOpen(false);
              }}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
            <button
              className="w-full flex items-center gap-2 px-2 py-2 hover:bg-white/10 rounded mt-2"
              onClick={() => {
                setActiveTab("home");
                setOpen(false);
              }}
            >
              <Wallet size={18} />
              Manajemen Bonus
            </button>

            {/* MAnajamene pin */}
            <div>
              {/* Menu lainnya */}

              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <Gem size={18} />
                  <span>Manajemen PIN </span>
                </span>
                {openNested ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("OrderPIN");
                      setOpen(false);
                    }}
                  >
                    Order PIN
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      alert("Bisa tambahkan lainnya juga");
                    }}
                  >
                    Stock PIN
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("TransferPin")
 
                    }}
                  >
                    Transfer PIN
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                                            setActiveTab("aktivasiRO")
   
                    }}
                  >
                    Aktivasi PIN RO
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {

                      alert("Bisa tambahkan lainnya juga");
                    }}
                  >
                    Riwayat PIN
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      alert("Bisa tambahkan lainnya juga");
                    }}
                  >
                    Riwayat RO pribadi
                  </button>
                </div>
              )}
            </div>
            {/* penakan bonsu section  */}
            <div>
              {/* Menu lainnya */}

              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested2((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <Wallet size={18} />
                  <span>Penarikan Bonus </span>
                </span>
                {openNested ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested2 && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      // setActiveTab("jaringan")
                      setOpen(false);
                    }}
                  >
                    Bonus Belum Ditarik
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      alert("Bisa tambahkan lainnya juga");
                    }}
                  >
                    Formulir Penarikan
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      alert("Bisa tambahkan lainnya juga");
                    }}
                  >
                    Status Penarikan
                  </button>
                </div>
              )}
            </div>
            {/* Nested Menu Example */}
            <div>
              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested3((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <Network size={18} />
                  <span>Jaringan</span>
                </span>
                {openNested ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested3 && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("jaringan");
                      setOpen(false);
                    }}
                  >
                    Diagram Jaringan
                  </button>
                </div>
              )}
            </div>
            {/* Reward */}
            <div>
              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested4((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <Award size={18} />
                  <span>Reward</span>
                </span>
                {openNested4 ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested4 && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("jaringan");
                      setOpen(false);
                    }}
                  >
                    Bonus Reward Utama
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("jaringan");
                      setOpen(false);
                    }}
                  >
                    Bonus Reward Peringkat
                  </button>
                </div>
              )}
            </div>
            {/* Daftar Mitra baru */}
            <div>
              <button className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded">
                <span className="flex items-center gap-2">
                  <UserRoundPlus size={18} />
                  <span>Daftra Mitra Baru</span>
                </span>
              </button>
            </div>
            <div>
              {/* Menu lainnya */}

              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested5((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <Users size={18} />
                  <span>Reseller </span>
                </span>
                {openNested5 ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested5 && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      // setActiveTab("jaringan")
                      setOpen(false);
                    }}
                  >
                    Daftar Reseller
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      alert("Bisa tambahkan lainnya juga");
                    }}
                  >
                    Input Penjualan
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      alert("Bisa tambahkan lainnya juga");
                    }}
                  >
                    Reward Reseller
                  </button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg px-6 py-2 flex justify-between gap-4 w-[90%] max-w-md z-50">
          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-full transition-all duration-200 hover:bg-red-500 text-gray-500"
          >
            <AlignJustify size={22} />
          </button>

          {/* Tab Items */}
          {navItems.map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`p-2 rounded-full transition-all duration-200 hover:bg-red-500 ${
                activeTab === key ? "bg-red-500 text-white" : "text-gray-500"
              }`}
            >
              {icon}
            </button>
          ))}
        </nav>
      </Sheet>
      {/* <Footer/> */}
    </div>
  );
}
