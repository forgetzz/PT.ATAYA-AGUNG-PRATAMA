"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function GlobalLoading() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    },1200); // delay-nya bisa kamu sesuaikan

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col-reverse items-center justify-center">
     <div className="w-[200px] h-[200px] ">

        <Image
         priority
          src="/images/logo.png" // Ganti ini dengan gambar kamu
          alt="Loading"
          width={500}
          height={500}
          className=" p-10 rounded-lg object-cover bg-white "
        />
        
      </div>

    </div>
  );
}
