/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode, useState, useEffect } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import ProductSection from "./components/ProductSection";
import Testimonials from "./components/Testimonials";
import StatBar from "./components/StatBar";
import ProductCarousel from "./components/ProductCarousel";
import ComparisonTable from "./components/ComparisonTable";
import AnimatedProgress from "./components/AnimatedProgress";
import FaqAccordion from "./components/FaqAccordion";
import Footer from "./components/Footer";
import SlideOutCart from "./components/SlideOutCart";
import StickyActionBar from "./components/StickyActionBar";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky action bar after scrolling down 600px
      setShowSticky(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-white text-black font-sans antialiased overflow-x-hidden selection:bg-[#4ca735] selection:text-white">
          <AnnouncementBar />
          <Header />
          
          <main>
            <ProductSection />
            <Testimonials />
            <StatBar />
            <ProductCarousel />
            <ComparisonTable />
            <AnimatedProgress />
            <FaqAccordion />
          </main>

          <Footer />
          <SlideOutCart />
          <StickyActionBar isVisible={showSticky} />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
