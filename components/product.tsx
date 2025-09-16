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
  {
    kategori: "FLOOR STANDING",
    jenis: "GVC-48STS (ECO) 5 PK",
    harga: "23,880,000",
  },
  {
    kategori: "FLOOR STANDING",
    jenis: "GVC-48 JOYWIND 5 PK INVERTER 1 PHASE",
    harga: "30,350,000",
  },
  {
    kategori: "FLOOR STANDING",
    jenis: "RF28WPd/NaA-M 10PK INVERTER 3 PHASE",
    harga: "64,430,000",
  },

  {
    kategori: "CASETE NON INVERTER",
    jenis: "GUD50T/A-K 2 PK - 1 PHASE",
    harga: "11,930,000",
  },
  {
    kategori: "CASETE NON INVERTER",
    jenis: "GU71T/A-K 3PK - 1 PHASE",
    harga: "15,940,000",
  },
  {
    kategori: "CASETE NON INVERTER",
    jenis: "GU100T/A-K 4PK - 3 PHASE",
    harga: "20,840,000",
  },
  {
    kategori: "CASETE NON INVERTER",
    jenis: "GU125T/A-K - 4,5PK",
    harga: "23,000,000",
  },
  {
    kategori: "CASETE NON INVERTER",
    jenis: "GU140T/A-K - 5PK",
    harga: "27,620,000",
  },
  {
    kategori: "CASETE NON INVERTER",
    jenis: "GU160T/A-K - 6PK",
    harga: "30,350,000",
  },

  {
    kategori: "CASETE INVERTER",
    jenis: "GULD50T1/A-S - 2PK",
    harga: "16,050,000",
  },
  {
    kategori: "CASETE INVERTER",
    jenis: "GULD71T1/A-S - 3PK",
    harga: "19,720,000",
  },
  {
    kategori: "CASETE INVERTER",
    jenis: "GULD85T1/A-S - 3,5PK",
    harga: "22,310,000",
  },
  {
    kategori: "CASETE INVERTER",
    jenis: "GULD100T1/A-S - 4PK",
    harga: "26,320,000",
  },
  {
    kategori: "CASETE INVERTER",
    jenis: "GULD125T1/A-S - 4,5PK",
    harga: "29,970,000",
  },
  {
    kategori: "CASETE INVERTER",
    jenis: "GULD140T1/A-S - 5PK",
    harga: "31,990,000",
  },
  {
    kategori: "CASETE INVERTER",
    jenis: "GULD160T1/A-S - 6PK",
    harga: "35,380,000",
  },

  { kategori: "STANDART", jenis: "GWC-05MOO5S - 0,5PK", harga: "3,239,000" },
  { kategori: "STANDART", jenis: "GWC-05N1A - 0,5PK", harga: "3,299,000" },
  { kategori: "STANDART", jenis: "GWC-07N1A - 0,7PK", harga: "3,789,000" },
  { kategori: "STANDART DELUXE", jenis: "GWC-09N1A - 1PK", harga: "3,929,000" },
  {
    kategori: "STANDART DELUXE",
    jenis: "GWC-12N1A - 1,5PK",
    harga: "5,109,000",
  },
  { kategori: "STANDART DELUXE", jenis: "GWC-18N1A - 2PK", harga: "6,829,000" },

  { kategori: "LOW WATT", jenis: "GWC-05C3ES - 0,5PK", harga: "3,769,000" },
  { kategori: "LOW WATT", jenis: "GWC-07C3ES - 0,7PK", harga: "3,999,000" },
  { kategori: "LOW WATT", jenis: "GWC-09C3ES - 1PK", harga: "4,249,000" },

  {
    kategori: "INVERTER SERIES",
    jenis: "GWC-05F5S - 0,5PK",
    harga: "4,579,000",
  },
  { kategori: "INVERTER SERIES", jenis: "GWC-09F5S - 1PK", harga: "4,899,000" },
  {
    kategori: "INVERTER SERIES",
    jenis: "GWC-12F5S - 1,5PK",
    harga: "5,859,000",
  },
  { kategori: "INVERTER SERIES", jenis: "GWC-18F5S - 2PK", harga: "8,199,000" },
  {
    kategori: "INVERTER SERIES",
    jenis: "GWC-24F5S - 2,5PK",
    harga: "10,299,000",
  },

  { kategori: "COMBO SPLIT", jenis: "GWC-0505CSS", harga: "8,609,000" },
  { kategori: "COMBO SPLIT", jenis: "GWC-0507CSS", harga: "8,869,000" },
  { kategori: "COMBO SPLIT", jenis: "GWC-0707CSS", harga: "9,119,000" },
];

const mideaProducts: Product[] = [
  { kategori: "Split Standart", jenis: "MSFC/CE-05CRN2X - 0,5 PK", harga: "2,550,000" },
  { kategori: "Split Standart", jenis: "MSFC-09CRN2X - 0,9 PK", harga: "2,950,000" },
  { kategori: "Split Standart", jenis: "MSFC-12CRN2X - 1,5 PK", harga: "4,050,000" },

  { kategori: "Split Standart Premium", jenis: "MSAF/FE-05CRN2 - 0,5 PK", harga: "2,650,000" },
  { kategori: "Split Standart Premium", jenis: "MSAF-07CRN2 - 0,7 PK", harga: "2,850,000" },
  { kategori: "Split Standart Premium", jenis: "MSAF-09CRN2X - 1 PK", harga: "3,050,000" },
  { kategori: "Split Standart Premium", jenis: "MSAF-12CRN2X - 1,5 PK", harga: "4,250,000" },
  { kategori: "Split Standart Premium", jenis: "MSAF-18CRN2 - 2 PK", harga: "5,750,000" },
  { kategori: "Split Standart Premium", jenis: "MSAF-24CRN2 - 2,5 PK", harga: "7,420,000" },

  { kategori: "Split Inverter", jenis: "MSIAF-05CRDN2X - 0,5 PK", harga: "3,550,000" },
  { kategori: "Split Inverter", jenis: "MSIAF-09CRDN2X - 1 PK", harga: "3,650,000" },
  { kategori: "Split Inverter", jenis: "MSIAF-12CRDN2X - 1,5 PK", harga: "4,950,000" },
  { kategori: "Split Inverter", jenis: "MSIAF-18CRDN2X - 2 PK", harga: "5,900,000" },

  { kategori: "Portable", jenis: "MPF2-09CRN1 - 1 PK", harga: "4,100,000" },
  { kategori: "Portable", jenis: "MPF2-12CRN1 - 1,5 PK", harga: "4,725,000" },
  { kategori: "Portable", jenis: "MPHA-05CRN7 - 0,5 PK", harga: "2,900,000" },
  { kategori: "Portable", jenis: "MPHA-09CRN7 - 1 PK", harga: "3,400,000" },

  // Floor Standing
  { kategori: "Floor Standing", jenis: "MFGB2 18CRN2 - 2 PK", harga: "9,426,000" },
  { kategori: "Floor Standing", jenis: "MFGB2 24CRN2 - 2,5 PK", harga: "11,573,000" },
  { kategori: "Floor Standing", jenis: "MFGB2 48CRN2 - 5 PK", harga: "19,233,000" },
  { kategori: "Floor Standing", jenis: "MFGB 60CRN2 - 7 PK", harga: "20,496,000" },

  // AC Cassette
  { kategori: "AC Cassette", jenis: "MCD-18CRN2 - 2 PK", harga: "9,939,000" },
  { kategori: "AC Cassette", jenis: "MCD-18CRDN2 - 2 PK", harga: "10,435,000" },
  { kategori: "AC Cassette", jenis: "MCD-24CRN2 - 2,5 PK", harga: "12,903,000" },
  { kategori: "AC Cassette", jenis: "MCD-24CRDN2 - 2,5 PK", harga: "13,599,000" },
  { kategori: "AC Cassette", jenis: "MCD-36CRN2 - 4 PK", harga: "17,937,000" },
  { kategori: "AC Cassette", jenis: "MCD-36CRDN2 - 4 PK", harga: "18,833,000" },
  { kategori: "AC Cassette", jenis: "MCD-48CRN2 - 5 PK", harga: "22,958,500" },
  { kategori: "AC Cassette", jenis: "MCD-48CRDN2 - 5 PK", harga: "24,107,000" },
  { kategori: "AC Cassette", jenis: "MCD-60HRN1 - 7 PK", harga: "26,304,500" },
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
      {[...data]
        .sort(
          (a, b) =>
            parseInt(a.harga.replace(/[^0-9]/g, ""), 10) -
            parseInt(b.harga.replace(/[^0-9]/g, ""), 10)
        )
        .map((item, idx) => {
          const waNumber = "+6281356649191";
          const message = encodeURIComponent(
            `Saya ingin pesan ${item.jenis} ${title} ${item.harga}`
          );
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
      <CardGrid
        title="Merek Gree"
        desc="Produk AC Gree: Floor Standing, Cassette, Standart, Deluxe, Inverter Series, Combo Split."
        data={greeProducts}
      />

      <CardGrid
        title="Merek Midea"
        desc="Produk AC Midea: Flife Standart, Low Watt, Portable Series, dan Air Curtain."
        data={mideaProducts}
      />
    </div>
  );
}
