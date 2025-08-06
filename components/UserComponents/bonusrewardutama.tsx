"use client";
import React, { useEffect, useState } from "react";
import { Star, Trophy } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "../ui/button";

interface Reward {
  title: string;
  amount: string;
  points: number;
}

export default function BonusRewardUtama() {
  const [poin, setPoin] = useState(0);
  const [claimedReward, setClaimedReward] = useState<string | null>(null);

  const rewards: Reward[] = [
    { title: "Uang Tunai", amount: "Rp 350.000", points: 50 },
    { title: "Uang Tunai", amount: "Rp 700.000", points: 100 },
    { title: "Uang Tunai", amount: "Rp 2.100.000", points: 300 },
    { title: "Uang Tunai", amount: "Rp 3.500.000", points: 500 },
    { title: "Trip Domestik", amount: "Perjalanan Wisata", points: 1000 },
    { title: "HP Iphone", amount: "Smartphone Flagship", points: 4000 },
    { title: "2 Unit NMAX", amount: "Sepeda Motor", points: 13000 },
    { title: "1 Unit Pajero", amount: "Mobil SUV", points: 100000 },
  ];

  // Ambil data user dan poin
  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return;
      const dbRef = doc(db, "users", user.uid);
      const dbSnap = await getDoc(dbRef);
      if (dbSnap.exists()) {
        const data = dbSnap.data() as {
          poin: number;
          rewardClaimed?: { title: string };
        };
        setPoin(data.poin);
        setClaimedReward(data.rewardClaimed?.title || null);
      }
    });

    return () => unsub();
  }, []);

  const handleClaim = async (reward: Reward) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      rewardUtama: {
        title: reward.title,
        amount: reward.amount,
      },
    });

    setClaimedReward(reward.title);
  };

  // Cari reward tertinggi yang bisa di-claim
  const maxClaimableIndex = rewards
    .map((r, i) => (poin >= r.points ? i : -1))
    .filter((i) => i !== -1)
    .pop();

  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-6">
      {/* Header Merah */}
      <div className="bg-red-600 p-6 rounded-xl text-white shadow-lg">
        <h1 className="text-xl font-bold flex gap-1 items-center">
          <Trophy className="size-12" />
          Bonus Reward Utama
        </h1>
        <p className="text-sm mt-1">
          Lacak progres Anda untuk mendapatkan reward impian.
        </p>
        <p className="text-3xl font-bold mt-3">
          Poin Anda Saat Ini:
          <br />
          <span className="flex gap-1 items-center">
            <Star className="size-9 text-yellow-400" />
            {poin} poin
          </span>
        </p>
      </div>

      {/* Daftar Hadiah */}
      <div className="space-y-6">
        {rewards.map((reward, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-5">
            <RewardCard
              title={reward.title}
              amount={reward.amount}
              points={reward.points}
              current={poin}
            />
            {index === maxClaimableIndex && (
              <Button
                disabled={claimedReward === reward.title}
                onClick={() => handleClaim(reward)}
                className="w-full mt-4 py-2 px-4 text-white rounded-lg font-semibold transition-all duration-300
      flex items-center justify-center gap-2
      disabled:bg-gray-400 disabled:cursor-not-allowed
      bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
              >
                {claimedReward === reward.title ? (
                  <>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Sudah Di-claim</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 text-white animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <span>Klaim Sekarang</span>
                  </>
                )}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Komponen kartu reward
function RewardCard({
  title,
  amount,
  points,
  current,
}: {
  title: string;
  amount: string;
  points: number;
  current: number;
}) {
  const progress = Math.min((current / points) * 100, 100);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded-full">
          {points.toLocaleString()} Poin
        </span>
      </div>
      <p className="text-base text-gray-900 font-medium mb-2">{amount}</p>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-red-500 h-3 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {current.toLocaleString()} / {points.toLocaleString()} Poin
      </p>
    </div>
  );
}
