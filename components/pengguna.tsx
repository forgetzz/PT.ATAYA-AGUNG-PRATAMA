"use client";
import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaCheckCircle, FaSmileBeam } from "react-icons/fa"; // Changed icons for better semantic meaning

function Pengguna() {
  const stats = [
    {
      label: "Mitra Bergabung",
      value: 1230,
      icon: <FaUsers size={30} className="text-red-600 mr-2" />, // Icon next to text
      suffix: "", // No suffix for this stat
    },
    {
      label: "Produk Terjual",
      value: 890,
      icon: <FaCheckCircle size={30} className="text-red-600 mr-2" />, // Icon next to text
      suffix: "", // No suffix for this stat
    },
    {
      label: "Kepuasan Pelanggan",
      value: 98,
      icon: <FaSmileBeam size={30} className="text-red-600 mr-2" />, // Icon next to text
      suffix: "%", // Added percentage suffix
    },
  ];

  return (
    <div
      id="pengguna"
      className="w-full py-20 px-4 bg-gradient-to-br from-red-50 to-white relative overflow-hidden" // Enhanced background and overflow-hidden
    >
      {/* Optional: Add a subtle background pattern or shape */}
      <div className="absolute inset-0 z-0 opacity-5">
        {/* You can add an SVG pattern or an image here for subtle texture */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10"> {/* Ensure content is above background elements */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-16 tracking-tight leading-tight">
          Pencapaian <span className="text-red-600">Terbaik Kami</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center border border-gray-100" // Enhanced card styling
            >
              <div className="flex items-center justify-center mb-4"> {/* Container for icon and number */}
                {stat.icon}
                <h3 className="text-5xl font-extrabold text-gray-900 leading-none"> {/* Larger number */}
                  <CountUp end={stat.value} duration={30} enableScrollSpy scrollSpyOnce /> {/* Faster animation, scroll spy */}
                  {stat.suffix}
                </h3>
              </div>
              <p className="mt-2 text-lg font-semibold text-gray-700 uppercase tracking-wide"> {/* Larger label */}
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pengguna;