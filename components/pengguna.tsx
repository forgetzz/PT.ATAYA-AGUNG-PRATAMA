"use client";
import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaCheckCircle, FaSmileBeam } from "react-icons/fa";

function Pengguna() {
  const stats = [
    {
      label: "Customer Kami",
      value: 1230,
      icon: <FaUsers size={30} className="text-blue-500 mr-2" />,
      suffix: "",
    },
    {
      label: "Layanan Selesai",
      value: 890,
      icon: <FaCheckCircle size={30} className="text-blue-500 mr-2" />,
      suffix: "",
    },
    {
      label: "Kepuasan Pelanggan",
      value: 98,
      icon: <FaSmileBeam size={30} className="text-blue-500 mr-2" />,
      suffix: "%",
    },
  ];

  return (
    <div
      id="pengguna"
      className="w-full py-20 px-4 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-5">
        {/* Bisa ditambahkan SVG subtle pattern biru atau shape */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-16 tracking-tight leading-tight">
          Pencapaian <span className="text-blue-500">Inovasi Kami</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center border border-gray-100"
            >
              <div className="flex items-center justify-center mb-4">
                {stat.icon}
                <h3 className="text-5xl font-extrabold text-gray-900 leading-none">
                  <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                  {stat.suffix}
                </h3>
              </div>
              <p className="mt-2 text-lg font-semibold text-gray-700 uppercase tracking-wide text-center">
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
