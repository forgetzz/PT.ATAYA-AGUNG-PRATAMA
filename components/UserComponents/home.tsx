import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
interface datas {
  name: string;
  email: string;
  username: string;
  bonus: number;
  bonusRO: number;
  Pin: string[];
  Pin_RO: string[];
}
interface datasRef {
  bonus: number;
  bonusRO: number;
}
export default function Home2() {
  const [profile, setProfile] = useState<datas>();
  const [jumlahAnak, setJumlahAnak] = useState<number>(0);
  const [jumlahMitra, setJumlahMitra] = useState(0);
  const [jumlahRo, setJumlahRo] = useState(0);
  const [jumlahBonus, setJumlahBonus] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return alert("login dulu");

      try {
        const dbRef = await getDoc(doc(db, "users", user.uid));
        if (!dbRef.exists()) {
          return alert("data anda belum ada");
        }
        const dataDb = dbRef.data() as datas;
        setProfile(dataDb);
      } catch {
        console.error("Kesalahan pada data anda");
      }
    });
    return () => unsub();
  }, []);

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
          const b = query(
            collection(db, "users"),
            where("sponsorUsername", "==", username),
            where("roStatus", "==", true)
          );
          const querydata = await getDocs(b);
          setJumlahMitra(querydata.size);
          // Simpan jumlah anak ke state
          setJumlahAnak(querySnapshot.size); // .size langsung ambil jumlah dokumen
          setJumlahRo(querydata.size);

          const dataBonusRef = doc(db, "users", user.uid);
          const dataBonus = await getDoc(dataBonusRef);
          if (dataBonus.exists()) {
            const datas = dataBonus.data() as datasRef;
            const result = datas.bonus + datas.bonusRO;
            setJumlahBonus(result);
          }
        } else {
          console.error("erorr");
        }
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className="p-6 space-y-6 text-gray-800 mb-36 ">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Selamat Datang, {profile?.name}!</h1>
        <p className="text-sm text-gray-600">
          Ini adalah ringkasan aktivitas dan pencapaian Anda.
        </p>
      </div>

      {/* Total Mitra */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
        <div className="bg-blue-500 p-4 rounded-full mb-4">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-base font-semibold">Total Referensi</h2>
        <p className="text-4xl font-bold mt-1">{jumlahAnak}</p>
        <p className="text-sm text-gray-500 mt-1">
          Jumlah Referensi di jaringan Anda
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardStat
          judul="Mitra Aktivasi"
          angka={`${jumlahMitra}`}
          keterangan="Mitra dengan status aktif"
        />
        <CardStat
          judul="Mitra RO"
          angka={`${jumlahRo}`}
          keterangan="Mitra yang sudah melakukan RO"
        />
        <CardStat
          judul="Omset Aktivasi"
          angka={`Rp ${profile?.bonus?.toLocaleString("id-ID")}`}
          keterangan="Total omset dari pendaftaran"
        />
        <CardStat
          judul="Omset RO"
          angka={`Rp ${
            profile?.bonusRO ? profile.bonusRO.toLocaleString("id-ID") : 0
          }`}
          keterangan="Total omset dari RO tim"
        />
      </div>

      {/* Rincian Bonus */}
      <div>
        <h2 className="text-xl font-bold mb-3">Rincian Total Bonus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardStat
            judul="Total Bonus Referal"
            angka={`Rp ${
              profile?.bonus ? profile.bonus.toLocaleString("id-ID") : "0"
            }`}
            keterangan="Dari pendaftaran mitra baru"
          />
          <CardStat
            judul="Total Bonus RO"
            angka={`Rp ${
              profile?.bonusRO ? profile.bonusRO.toLocaleString("id-ID") : 0
            }`}
            keterangan="Dari repeat order tim"
          />
          <CardStat
            judul="Bonus Reward Utama"
            angka="Rp 0"
            keterangan="Pencapaian reward utama"
          />
          <CardStat
            judul="Bonus Reward Peringkat"
            angka="Rp 0"
            keterangan="Pencapaian peringkat"
          />
        </div>
      </div>
    </div>
  );
}

// Komponen kartu statistik
function CardStat({
  judul,
  angka,
  keterangan,
}: {
  judul: string;
  angka: string;
  keterangan: string;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-sm font-medium">{judul}</p>
      <p className="text-2xl font-bold text-black mt-1">{angka}</p>
      <p className="text-sm text-gray-500">{keterangan}</p>
    </div>
  );
}
