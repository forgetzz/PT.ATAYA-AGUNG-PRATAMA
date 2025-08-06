"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // sesuaikan path jika beda
import { collectMeta } from "next/dist/build/utils";
interface datasProfile {
  username: string;
}
export default function Bonusrewardperingkat() {
  const [data, setData] = useState({
    roPribadi: 0,
    roTeam: 0,
    bonusRO: 0,
    poin: 0,
  });
  const [dataProfile, setDataProfile] = useState<datasProfile>();
  const [claimedRanks, setClaimedRanks] = useState<string[]>([]);

  const rankOrder = ["RUBY", "DIAMOND", "CROWN", "ROYAL CROWN"];

  function isHigherOrEqualRank(claimed: string, current: string) {
    return rankOrder.indexOf(claimed) >= rankOrder.indexOf(current);
  }
  const handleClaim = async (rank: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) return;

    const userData = docSnap.data();
    const currentRank = userData.bonusPeringkat || ""; // bisa string kosong jika belum ada

  const rankOrder = ["RUBY", "DIAMOND", "CROWN", "ROYAL CROWN"];

    const selectedIndex = rankOrder.indexOf(rank);
    const currentIndex = rankOrder.indexOf(currentRank);

  if (selectedIndex > currentIndex) {
  await setDoc(userRef, { bonusPeringkat: rank }, { merge: true });
  setClaimedRanks([rank]); // rank baru yang diklaim
}

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const profileData = userData as datasProfile;

        setDataProfile(profileData);
        setClaimedRanks(
          userData.bonusPeringkat ? [userData.bonusPeringkat] : []
        );

        const q = query(
          collection(db, "users"),
          where("sponsorUsername", "==", profileData.username)
        );
        const querySnapshot = await getDocs(q);

        const totalSponsor = querySnapshot.size;

        setData({
          roPribadi: userData.roPribadi ?? 0,
          roTeam: userData.roTeam ?? 0,
          bonusRO: totalSponsor + 100,
          poin: userData.poin ?? 0,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Fungsi bantu buat progress bar
  const getPercent = (current: number, target: number) =>
    Math.min((current / target) * 100, 100);

  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-4 mb-16">
      {/* Card Bonus Reward */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-lg text-white shadow">
        <h1 className="text-base font-bold mb-1">Bonus Reward Peringkat</h1>
        <p className="text-sm mb-4">
          Raih peringkat lebih tinggi untuk membuka reward eksklusif.
        </p>

        <div className="grid grid-cols-2 gap-y-2 text-center text-sm font-medium">
          <div>
            <p className="text-gray-300">Poin RO Tim</p>
            <p className="text-lg text-white font-bold">{data.roTeam}</p>
          </div>
          <div>
            <p className="text-gray-300">Poin RO Pribadi</p>
            <p className="text-lg text-white font-bold">{data.roPribadi}</p>
          </div>
          <div>
            <p className="text-gray-300">Stokis Baru</p>
            <p className="text-lg text-white font-bold">{data.bonusRO}</p>
          </div>
          <div>
            <p className="text-gray-300">Poin Peringkat</p>
            <p className="text-lg text-white font-bold">{data.poin}</p>
          </div>
        </div>
      </div>

      {/* Komponen untuk setiap peringkat */}
      {[
        {
          rank: "RUBY",
          color: "bg-red-600",
          reward: "Trip 2 Negara",
          target: { team: 40, personal: 15, stokis: 2, rank: 20 },
        },
        {
          rank: "DIAMOND",
          color: "bg-blue-600",
          reward: "Rp 115.000.000",
          target: { team: 500, personal: 100, stokis: 4, rank: 100 },
        },
        {
          rank: "CROWN",
          color: "bg-purple-800",
          reward: "Rp. 450.000.000",
          target: { team: 3140, personal: 500, stokis: 8, rank: 500 },
        },
        {
          rank: "ROYAL CROWN",
          color: "bg-[#FF8800]",
          reward: "Rp. 1.000.000.000",
          target: { team: 20000, personal: 3140, stokis: 20, rank: 2000 },
        },
      ].map((r, i) => (
        <div key={i}>
          <div className={`${r.color} text-white rounded-t-lg px-4 pt-4 pb-2`}>
            <h1 className="text-lg font-bold">{r.rank}</h1>
            <p className="text-sm">{r.reward}</p>
          </div>
          <div className="bg-white rounded-b-lg px-4 pb-4 pt-2 text-sm space-y-3 shadow">
            {/* Team RO */}
            <div>
              <div className="flex justify-between text-gray-800">
                <span>Poin RO Tim</span>
                <span className="font-semibold">
                  {data.roTeam} / {r.target.team}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${getPercent(data.roTeam, r.target.team)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Personal RO */}
            <div>
              <div className="flex justify-between text-gray-800">
                <span>Poin RO Pribadi</span>
                <span className="font-semibold">
                  {data.roPribadi} / {r.target.personal}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: `${getPercent(data.roPribadi, r.target.personal)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Stokis */}
            <div className="flex justify-between text-gray-800">
              <span>Stokis Baru</span>
              <span className="font-semibold">
                {data.bonusRO} / {r.target.stokis}
              </span>
            </div>
            {/* Tombol Klaim Reward */}

            {/* Indikator jika reward sudah diklaim */}
  {claimedRanks.includes(r.rank) ? (
      <p className="text-green-600 font-semibold">✅ Kamu telah klaim {r.rank}</p>
    ) : (
      <button
        onClick={() => handleClaim(r.rank)}
        disabled={
          claimedRanks.includes(r.rank) ||
          isHigherOrEqualRank(claimedRanks[0], r.rank) ||
          data.roTeam < r.target.team ||
          data.roPribadi < r.target.personal ||
          data.bonusRO < r.target.stokis ||
          data.poin < r.target.rank
        }
        className={`w-full mt-2 px-4 py-2 rounded text-white font-semibold
          ${
            claimedRanks.includes(r.rank) ||
            isHigherOrEqualRank(claimedRanks[0], r.rank) ||
            data.roTeam < r.target.team ||
            data.roPribadi < r.target.personal ||
            data.bonusRO < r.target.stokis ||
            data.poin < r.target.rank
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }
        `}
      >
        Klaim {r.rank}
      </button>
    )}
            {/* Poin Peringkat */}
            <div className="flex justify-between text-gray-800">
              <span>Poin Peringkat</span>
              <span className="font-semibold">
                {data.poin} / {r.target.rank}
              </span>
            </div>
          </div>
   
        </div>
      ))}

      <div className="bg-red-500/80 p-4 rounded-lg shadow-md mt-6">
        <h1 className="font-serif text-lg">Catatan Penting</h1>
        <p className="font-serif text-sm">
          Bonus reward dipotong pajak senilai 10%
        </p>
        <p className="font-serif text-sm">
          Reward bersifat akumulasi tanpa batas waktu
        </p>
        <p className="font-serif text-sm">
          Proses pencairan reward akan diproses dalam waktu 1 minggu setelah
          klaim berhasil dilakukan
        </p>
      </div>
    </div>
  );
}
