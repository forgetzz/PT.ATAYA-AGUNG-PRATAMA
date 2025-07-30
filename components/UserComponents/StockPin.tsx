import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useEffect, useState } from "react";

interface dataPin {
  Pin: string[];
  CreatedAt: string;
}

export default function StockPin() {
  const [datas, setDatas] = useState<dataPin | null>(null);
  const newUser = onAuthStateChanged(getAuth(), async (user) => {
    if (!user) return alert("Belum login!");
    try {
      const dbRef = db;
      const snapRef = await getDoc(doc(dbRef, "users", user?.uid));
      if (snapRef.exists()) {
        const datas = snapRef.data() as dataPin
        setDatas(datas)
        console.log(datas)
      }
    } catch {
      console.log("periksa jaringan anda dahulu");
    }
  });
 useEffect (()=> {
    newUser() 
 }, [])
  return (
    <div>
      <div className="bg-red-500">
        <h1>Ini halaman baru </h1>
        {datas ? (
            <h1>datas.map(index,key)</h1>
        ): (
            <h1>hahahaha</h1>
        ) }
        <h1>{datas?.Pin}</h1>
      </div>
    </div>
  );
}
