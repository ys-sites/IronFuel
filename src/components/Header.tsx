import { useState } from "react";
import { ShoppingBag, Globe, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { openCart, count } = useCart();
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: language === "en" ? "Home" : "Accueil", href: "#" },
    { label: language === "en" ? "Our Products" : "Nos Produits", href: "#products-section" },
    { label: language === "en" ? "Product Specs" : "Spécifications", href: "#about-section" },
    { label: language === "en" ? "FAQ" : "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header className="relative w-full px-4 md:px-8 pb-4 pt-2 z-50 bg-[#1a2318]">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 px-5 md:px-6 py-4 rounded-[2rem] flex items-center justify-between shadow-2xl mx-auto max-w-7xl">
          {/* Left: Nav Links (desktop) */}
          <nav className="hidden lg:flex flex-1 gap-8 lg:gap-10 text-[11px] lg:text-[13px] text-white font-bold uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors duration-200 text-gray-300 whitespace-nowrap">
                {link.label}
              </a>
            ))}
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

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 text-white rounded-full transition-colors duration-200 cursor-pointer border border-white/10"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[80vw] max-w-[320px] bg-[#1a2318] z-[201] flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="text-white font-black tracking-widest uppercase text-sm">IRON FUEL LAB</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-300 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-sm px-4 py-4 rounded-xl transition-all"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="px-6 pb-8">
                <button
                  onClick={() => { setMobileOpen(false); document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full bg-[#4ca735] hover:bg-[#3d862a] text-white font-black uppercase tracking-widest py-4 rounded-full text-sm transition-all shadow-lg"
                >
                  {language === "en" ? "Shop Now" : "Commander"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
