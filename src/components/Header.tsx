import { ShoppingBag, Globe, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { openCart, count } = useCart();
  const { language, setLanguage } = useLanguage();
  
  return (
    <header className="relative w-full px-4 md:px-8 pb-4 pt-2 z-50 bg-[#1a2318]">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 px-5 md:px-6 py-4 rounded-[2rem] flex items-center justify-between shadow-2xl mx-auto max-w-7xl">
        {/* Left: Nav Links */}
        <nav className="hidden lg:flex flex-1 gap-8 lg:gap-10 text-[11px] lg:text-[13px] text-white font-bold uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-white transition-colors duration-200 text-gray-300 whitespace-nowrap">Home</a>
          <a href="#products-section" className="hover:text-white transition-colors duration-200 text-gray-300 whitespace-nowrap">Our Products</a>
          <a href="#about-section" className="hover:text-white transition-colors duration-200 text-gray-300 whitespace-nowrap">Product Specs</a>
        </nav>

        {/* Center: Brand */}
        <div className="flex items-center justify-center shrink-0 flex-1 lg:flex-none">
          <a href="/" className="flex items-center gap-3">
            <span className="text-[14px] md:text-[16px] lg:text-xl font-black tracking-[0.35em] font-display text-white whitespace-nowrap uppercase leading-none">
              IRON FUEL LAB
            </span>
          </a>
        </div>
        
        {/* Right: Actions */}
        <div className="flex gap-2 md:gap-3 items-center flex-1 justify-end ml-auto">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="flex px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer font-display"
          >
            {language === "en" ? "FR" : "EN"}
          </button>
          
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-white/10 text-white rounded-full transition-colors duration-200 cursor-pointer border border-white/10"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-[#4ca735] rounded-full text-[9px] font-black flex items-center justify-center text-white px-1 pointer-events-none"
                >
                  {count > 9 ? "9+" : count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <button
            className="md:hidden p-2 hover:bg-white/10 text-white rounded-full transition-colors duration-200 cursor-pointer border border-white/10"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
