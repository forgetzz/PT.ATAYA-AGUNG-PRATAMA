import React from "react";

type Testimonial = {
  logo: string;
  name: string;
  desc: string;
};

const Customer: Testimonial[] = [
  {
    logo: "/images/ICONNET.png",
    name: "Iconnect",
    desc: "Pelayanan cepat dan sangat memuaskan.",
  },
  {
    logo: "/images/bpjs.png",
    name: "Bpjs Kesehatan",
    desc: "Harga terjangkau dengan kualitas terbaik.",
  },
  {
    logo: "/images/ALMAZ.png",
    name: "Almaz Fried Chicken",
    desc: "Sangat membantu, respon admin ramah.",
  },
];

const CardGrid: React.FC<{
  title: string;
  desc: string;
  data: Testimonial[];
}> = ({ title, desc, data }) => (
  <div className="mb-16">
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 rounded-t-2xl shadow-lg text-white">
      <h2 className="text-2xl font-extrabold tracking-wide">{title}</h2>
      <p className="text-sm opacity-90">{desc}</p>
    </div>

    {/* Grid */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6 bg-white/60 backdrop-blur-md rounded-b-2xl shadow-lg border border-blue-100">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 
          flex flex-col justify-between items-center rounded-xl border border-blue-200 
          shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out p-6"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md ring-2 ring-blue-200 mb-4 bg-white">
            <img
              className="w-full h-full object-contain p-2"
              src={item.logo}
              alt={item.name}
            />
          </div>
          <p className="text-lg font-bold text-blue-700 tracking-wide">
            {item.name}
          </p>
          <p className="mt-3 text-sm text-gray-600 text-center leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function Testimonial() {
  return (
    <div
      id="product"
      className="max-w-6xl mx-auto p-8 space-y-12"
    >
      <CardGrid
        title="Testimonial"
        desc="Testimoni Layanan Kami"
        data={Customer}
      />
    </div>
  );
}
