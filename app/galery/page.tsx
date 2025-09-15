import { GalleryPerusahaan } from "@/components/Documnet";
import { Gallery } from "@/components/Galery";
import Navbar from "@/components/navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <Gallery />
      <GalleryPerusahaan />
    </div>
  );
}
