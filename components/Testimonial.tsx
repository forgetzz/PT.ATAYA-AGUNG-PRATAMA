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
    logo: "/images/BPJS.png",
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
  <div className="mb-10">
    <div className=" text-blue-600 px-5 py-3 rounded-t-xl shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-blue-600">{desc}</p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 p-4  rounded-b-xl shadow-md">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="bg-white flex flex-col justify-between items-center rounded-xl border border-blue-200 shadow hover:shadow-lg transition-transform hover:-translate-y-1 p-4"
        >
          <img
            className="w-20 h-20 object-contain mb-3"
            src={item.logo}
            alt={item.name}
          />
          <p className="text-base font-semibold text-blue-600">{item.name}</p>
          <p className="mt-2 text-sm text-gray-600 text-center">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function Testimonial() {
  return (
    <div id="product" className="max-w-6xl mx-auto p-6 space-y-10">
      <CardGrid
        title="Testimonial"
        desc="Testimoni Layanan Kami"
        data={Customer}
      />
    </div>
  );
}
