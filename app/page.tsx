import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import Pengguna from "@/components/pengguna";
import Pin from "@/components/pin";
import ProductCards from "@/components/produk";
import SejarahKami from "@/components/sejarahKami";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <Pengguna/>
      <SejarahKami/>
      <ProductCards/>
      <Footer/>

    </div>
  );
}
