'use client';

import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import AboutUs from "@/components/AboutUs";
import Product from "@/components/Product";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <AboutUs />
      <Product />
      <Team />
      <Footer />
    </>
  );
}
