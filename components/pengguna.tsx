"use client";
import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaUserCheck, FaUserPlus } from "react-icons/fa";

function Pengguna() {
  const stats = [
    {
      label: "Mitra berbgabung",
      value: 1230,
      icon: <FaUsers size={32} className="text-red-500" />,
    },
    {
      label: "produk terjual",
      value: 890,
      icon: <FaUserCheck size={32} className="text-red-500" />,
    },
    {
      label: "kepuasan pelanggan",
      value: 98,
      icon: <FaUserPlus size={32} className="text-red-500" />,
    },
  ];

  return (
    <div id="pengguna" className=" text-white w-full py-10 px-4 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white text-red-600 rounded-xl p-6 shadow-lg flex flex-col items-center"
          >
            <div className="mb-3">{stat.icon}</div>
            <h2 className="text-4xl font-bold">
              <CountUp end={stat.value} duration={9.5} />
            </h2>
            <p className="mt-2 text-sm font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pengguna;
