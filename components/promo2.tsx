"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PromoPopup2({ onClose }: { onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  const [deadline] = useState(
    () => new Date().getTime() + 15 * 24 * 60 * 60 * 1000
  );

  const images = ["/images/promo.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
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
  }, [deadline]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl relative max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Gambar */}
        <div className="relative w-full h-60 sm:h-96">
          <Image
            src={images[currentIndex]}
            alt="Promo"
            fill
            className="object-contain rounded-t-xl bg-blue-400"
            priority
          />

          {/* Prev & Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Konten */}
        <div className="p-4 sm:p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
            🎉 Promo Spesial 🎉
          </h2>
          <p className="text-gray-600 mb-4">
            Nikmati diskon besar sebelum waktunya habis!
          </p>

          {/* Harga */}
          <div className="mb-4">
            <p className="text-gray-400 line-through text-lg">Rp400.000</p>
            <p className="text-2xl font-bold text-green-600">Rp350.000</p>
          </div>

          {timeLeft.expired ? (
            <p className="text-lg font-semibold text-gray-500">
              ⏰ Promo Telah Berakhir
            </p>
          ) : (
            <div className="flex justify-center gap-2 sm:gap-3 mb-4">
              <TimeBox label="Hari" value={timeLeft.days} />
              <TimeBox label="Jam" value={timeLeft.hours} />
              <TimeBox label="Menit" value={timeLeft.minutes} />
              <TimeBox label="Detik" value={timeLeft.seconds} />
            </div>
          )}

          {!timeLeft.expired && (
            <a
              href="https://wa.me/+6285930900693"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white font-bold px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow hover:bg-red-700 transition"
            >
              Pesan Sekarang
            </a>
          )}
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
