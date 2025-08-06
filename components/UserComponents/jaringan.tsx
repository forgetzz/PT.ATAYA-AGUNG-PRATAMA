"use client";

import React, { useEffect, useState } from 'react';
import NetworkPage from './nodePt';
import Membernode from './MemberNode';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Jaringan() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userEmail === "autosuksesberjamaah@gmail.com" ? <NetworkPage /> : <Membernode />}
    </div>
  );
}
