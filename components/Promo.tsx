"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function PromoPopup() {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  // simpan deadline di state, hanya dihitung sekali
  const [deadline] = useState(
    () => new Date().getTime() + 3 * 24 * 60 * 60 * 1000
  );

  useEffect(() => {
    if (!visible) return; // kalau popup ditutup, jangan jalan interval

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft((prev) => ({ ...prev, expired: true }));
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, visible]); // tambahkan visible di depedency

  if (!visible) return null; // kalau di-close, hilang total

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl relative max-w-md w-full overflow-hidden">
        {/* Tombol close */}

        {/* Gambar */}
        <div className="relative w-full h-80">
          <Image
            src="/images/promo.jpeg"
            alt="Promo"
            fill
            className="object-cover rounded-t-2xl"
            priority
          />
        </div>

        {/* Konten */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            🎉 Promo Spesial 3 Hari 🎉
          </h2>
          <p className="text-gray-600 mb-4">
            Nikmati diskon besar sebelum waktunya habis!
          </p>

          {timeLeft.expired ? (
            <p className="text-lg font-semibold text-gray-500">
              ⏰ Promo Telah Berakhir
            </p>
          ) : (
            <div className="flex justify-center gap-3 mb-4">
              <TimeBox label="Hari" value={timeLeft.days} />
              <TimeBox label="Jam" value={timeLeft.hours} />
              <TimeBox label="Menit" value={timeLeft.minutes} />
              <TimeBox label="Detik" value={timeLeft.seconds} />
            </div>
          )}

          {!timeLeft.expired && (
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white font-bold px-5 py-3 rounded-lg shadow hover:bg-red-700 transition"
            >
              Pesan Sekarang
            </a>
          )}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-3 right-3 z-100 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
          >
            <X className="w-5 h-5 z-50 " />
          </button>
        </div>
      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-red-100 text-red-700 rounded-lg px-3 py-2 w-16">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}
