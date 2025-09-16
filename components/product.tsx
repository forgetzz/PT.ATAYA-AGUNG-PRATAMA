"use client";
import React from "react";

interface Product {
  kategori: string;
  jenis: string;
  harga: string;
}

const greeProducts: Product[] = [
  { kategori: "FLOOR STANDING", jenis: "GVC-18STS 2PK", harga: "11,080,000" },
  { kategori: "FLOOR STANDING", jenis: "GVC-24STS 3PK", harga: "13,610,000" },
  { kategori: "FLOOR STANDING", jenis: "GVC-48STS (ECO) 5 PK", harga: "23,880,000" },
  { kategori: "FLOOR STANDING", jenis: "GVC-48 JOYWIND 5 PK INVERTER 1 PHASE", harga: "30,350,000" },
  { kategori: "FLOOR STANDING", jenis: "RF28WPd/NaA-M 10PK INVERTER 3 PHASE", harga: "64,430,000" },

  { kategori: "CASETE NON INVERTER", jenis: "GUD50T/A-K 2 PK - 1 PHASE", harga: "11,930,000" },
  { kategori: "CASETE NON INVERTER", jenis: "GU71T/A-K 3PK - 1 PHASE", harga: "15,940,000" },
  { kategori: "CASETE NON INVERTER", jenis: "GU100T/A-K 4PK - 3 PHASE", harga: "20,840,000" },
  { kategori: "CASETE NON INVERTER", jenis: "GU125T/A-K - 4,5PK", harga: "23,000,000" },
  { kategori: "CASETE NON INVERTER", jenis: "GU140T/A-K - 5PK", harga: "27,620,000" },
  { kategori: "CASETE NON INVERTER", jenis: "GU160T/A-K - 6PK", harga: "30,350,000" },

  { kategori: "CASETE INVERTER", jenis: "GULD50T1/A-S - 2PK", harga: "16,050,000" },
  { kategori: "CASETE INVERTER", jenis: "GULD71T1/A-S - 3PK", harga: "19,720,000" },
  { kategori: "CASETE INVERTER", jenis: "GULD85T1/A-S - 3,5PK", harga: "22,310,000" },
  { kategori: "CASETE INVERTER", jenis: "GULD100T1/A-S - 4PK", harga: "26,320,000" },
  { kategori: "CASETE INVERTER", jenis: "GULD125T1/A-S - 4,5PK", harga: "29,970,000" },
  { kategori: "CASETE INVERTER", jenis: "GULD140T1/A-S - 5PK", harga: "31,990,000" },
  { kategori: "CASETE INVERTER", jenis: "GULD160T1/A-S - 6PK", harga: "35,380,000" },

  { kategori: "STANDART", jenis: "GWC-05MOO5S - 0,5PK", harga: "3,239,000" },
  { kategori: "STANDART", jenis: "GWC-05N1A - 0,5PK", harga: "3,299,000" },
  { kategori: "STANDART", jenis: "GWC-07N1A - 0,7PK", harga: "3,789,000" },
  { kategori: "STANDART DELUXE", jenis: "GWC-09N1A - 1PK", harga: "3,929,000" },
  { kategori: "STANDART DELUXE", jenis: "GWC-12N1A - 1,5PK", harga: "5,109,000" },
  { kategori: "STANDART DELUXE", jenis: "GWC-18N1A - 2PK", harga: "6,829,000" },

  { kategori: "LOW WATT", jenis: "GWC-05C3ES - 0,5PK", harga: "3,769,000" },
  { kategori: "LOW WATT", jenis: "GWC-07C3ES - 0,7PK", harga: "3,999,000" },
  { kategori: "LOW WATT", jenis: "GWC-09C3ES - 1PK", harga: "4,249,000" },

  { kategori: "INVERTER SERIES", jenis: "GWC-05F5S - 0,5PK", harga: "4,579,000" },
  { kategori: "INVERTER SERIES", jenis: "GWC-09F5S - 1PK", harga: "4,899,000" },
  { kategori: "INVERTER SERIES", jenis: "GWC-12F5S - 1,5PK", harga: "5,859,000" },
  { kategori: "INVERTER SERIES", jenis: "GWC-18F5S - 2PK", harga: "8,199,000" },
  { kategori: "INVERTER SERIES", jenis: "GWC-24F5S - 2,5PK", harga: "10,299,000" },

  { kategori: "COMBO SPLIT", jenis: "GWC-0505CSS", harga: "8,609,000" },
  { kategori: "COMBO SPLIT", jenis: "GWC-0507CSS", harga: "8,869,000" },
  { kategori: "COMBO SPLIT", jenis: "GWC-0707CSS", harga: "9,119,000" },
];


const mideaProducts: Product[] = [
  { kategori: "FLIFE STANDART", jenis: "FAC-05FMOO2 - 0,5 PK", harga: "2,769,000" },
  { kategori: "FLIFE STANDART", jenis: "FAC-07FMOO2 - 0,7 PK", harga: "3,179,000" },
  { kategori: "FLIFE STANDART", jenis: "FAC-09FMOO2 - 1 PK", harga: "3,279,000" },
  { kategori: "FLIFE STANDART", jenis: "FAC-12FMOO2 - 1,5PK", harga: "4,309,000" },
  { kategori: "FLIFE STANDART", jenis: "FAC-18FMOO2 - 2PK", harga: "5,739,000" },

  { kategori: "FLIFE LOW WATT", jenis: "FAC-05FC0O - 0,5 PK", harga: "2,999,000" },
  { kategori: "FLIFE LOW WATT", jenis: "FAC-09FC0O - 1 PK", harga: "3,399,000" },
  { kategori: "FLIFE LOW WATT", jenis: "FAC-12FC0O - 1,5PK", harga: "4,619,000" },

  { kategori: "PORTABLE SERIES", jenis: "GPC-05P2 PORTABLE 0,5PK", harga: "3,589,000" },
  { kategori: "PORTABLE SERIES", jenis: "GPC-09P1 PORTABLE 1 PK", harga: "4,479,000" },
  { kategori: "PORTABLE SERIES", jenis: "GPC-12P1 PORTABLE 1,5PK", harga: "5,639,000" },

  { kategori: "AIR CURTAIN", jenis: "FM 1.25 9 K - 90cm", harga: "2,949,000" },
  { kategori: "AIR CURTAIN", jenis: "FM 1.25 12 K - 120cm", harga: "3,329,000" },
];



const CardGrid: React.FC<{ title: string; desc: string; data: Product[] }> = ({
  title,
  desc,
  data,
}) => (
  <div className="mb-10">
    <div className="bg-blue-700 text-white px-5 py-3 rounded-t-xl shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-blue-100">{desc}</p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 p-4 bg-blue-50 rounded-b-xl shadow-md">
  {data.map((item, idx) => {
  const waNumber = "+6281356649191";
  const message = encodeURIComponent(`Saya ingin pesan ${item.jenis} ${title}`);
  const waLink = `https://wa.me/${waNumber}?text=${message}`;

  return (
    <div
      key={idx}
      className="bg-white rounded-xl border border-blue-200 shadow hover:shadow-lg transition-transform hover:-translate-y-1"
    >
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-bold text-blue-700">{item.jenis}</h3>
          <p className="text-xs text-gray-500">{item.kategori}</p>
          <p className="mt-3 text-lg font-semibold text-blue-600">
            Rp {item.harga}
          </p>
        </div>

        {/* Tombol WhatsApp */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Pesan via WhatsApp
        </a>
      </div>
    </div>
  );
})}

    </div>
  </div>
);

export default function PriceList() {
  return (
    <div id="product" className="max-w-6xl mx-auto p-6 space-y-10">
      <a href="https://wa.me/+6281356649191"><CardGrid
        title="Merek Gree"
        desc="Produk AC Gree: Floor Standing, Cassette, Standart, Deluxe, Inverter Series, Combo Split."
        data={greeProducts}
      /></a>
      <a href="https://wa.me/+6281356649191">
        <CardGrid
        title="Merek Midea"
        desc="Produk AC Midea: Flife Standart, Low Watt, Portable Series, dan Air Curtain."
        data={mideaProducts}
      /></a>
    
    </div>
  );
}