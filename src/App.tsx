/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, ArrowUpRight, Star, ChevronLeft, ChevronRight, ArrowRight, Brain, Leaf, Droplet, Sparkles, ShieldCheck, Zap, CheckCircle2, Menu, X, Instagram } from "lucide-react";
import { useState, useEffect, useMemo, memo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlurText from "./components/BlurText";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import SlideOutCart from "./components/SlideOutCart";
import StickyActionBar from "./components/StickyActionBar";
import FAQSection from "./components/FAQSection";
import TrustScienceSection from "./components/TrustScienceSection";
import CTASection from "./components/CTASection";
import { CartProvider, useCart } from "./context/CartContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { translations } from "./translations";

const PRODUCTS = [
  {
    id: "zenfuel-ashwagandha",
    name: "ZenFuel – Ashwagandha",
    description: "Relax. Recover. Stay Balanced.",
    price: "34.99",
    image: "/Ashwagandha1.jpeg",
    colorBg: "bg-[#e2eadc]",
    buttonBg: "bg-[#4ca735]",
    buttonHover: "hover:bg-[#3d862a]",
    buttonText: "text-white"
  },
  {
    id: "neurofuel-lions-mane",
    name: "NeuroFuel – Lion's Mane",
    description: "Focus. Clarity. Mental Performance.",
    price: "39.99",
    image: "/Lion.jpeg",
    colorBg: "bg-[#f5ebd7]",
    buttonBg: "bg-amber-400",
    buttonHover: "hover:bg-amber-500",
    buttonText: "text-black"
  },
  {
    id: "gutfuel",
    name: "GutFuel",
    description: "Support Your Gut. Feel Better Daily.",
    price: "29.99",
    image: "/Gut Health.jpeg",
    colorBg: "bg-[#fff7ed]",
    buttonBg: "bg-[#f97316]",
    buttonHover: "hover:bg-[#ea580c]",
    buttonText: "text-white"
  },
  {
    id: "fury-isolate",
    name: "FURY Isolate – Vanilla",
    description: "Premium fast-absorbing recovery",
    price: "79.99",
    image: "/FURY Isolate.jpeg",
    colorBg: "bg-[#e2d5d5]",
    buttonBg: "bg-red-700",
    buttonHover: "hover:bg-red-800",
    buttonText: "text-white"
  },
  {
    id: "fury-hydrate",
    name: "FURY Hydrate",
    description: "Power. Hydration. Performance.",
    price: "44.99",
    image: "/Creatine Formula.jpeg",
    colorBg: "bg-[#d5dfe2]",
    buttonBg: "bg-slate-700",
    buttonHover: "hover:bg-slate-800",
    buttonText: "text-white"
  }
];

const HERO_SLIDES = [
  {
    id: "ashwagandha",
    tag: "Ashwagandha",
    titleWords: ["RELAX", "RECOVER", "SLEEP", "BALANCE"],
    highlightWord: "RECOVER",
    highlightColor: "text-[#4ca735]",
    buttonBg: "bg-[#4ca735]",
    buttonHover: "hover:bg-[#3d862a]",
    buttonText: "text-white",
    badge: { title: "Stress Support", icon: "Leaf", desc: "100% Vegan Friendly" },
    bg: "/Ashwagandha1.jpeg",
    productImg: null,
    review: {
      en: "My sleep quality has skyrocketed. I wake up feeling deeply recovered and ready to tackle whatever comes.",
      fr: "La qualité de mon sommeil a explosé. Je me réveille avec une sensation de récupération profonde et prête à tout affronter."
    },
    reviewer: "Sarah K."
  },
  {
    id: "lions-mane",
    tag: "Lion's Mane Mushroom",
    titleWords: ["DRIVE", "CLARITY", "FOCUS"],
    highlightWord: "DRIVE",
    highlightColor: "text-amber-400",
    buttonBg: "bg-amber-400",
    buttonHover: "hover:bg-amber-500",
    buttonText: "text-black",
    badge: { title: "Cognitive Focus", icon: "Brain", desc: "Clinically Researched" },
    bg: "/Lion.jpeg",
    productImg: null,
    review: {
      en: "The mental clarity is unmatched. No jitters, just clean, sharp focus that lasts throughout the entire day.",
      fr: "La clarté mentale est inégalée. Pas de nervosité, juste une concentration nette et précise qui dure toute la journée."
    },
    reviewer: "Marcus T."
  },
  {
    id: "gut-health",
    tag: "Gut Health",
    titleWords: ["CORE", "RESTORE", "BALANCE"],
    highlightWord: "RESTORE",
    highlightColor: "text-[#f97316]",
    buttonBg: "bg-[#f97316]",
    buttonHover: "hover:bg-[#ea580c]",
    buttonText: "text-white",
    badge: { title: "Digestive Balance", icon: "ShieldCheck", desc: "Potent Prebiotics" },
    bg: "/Gut Health.jpeg",
    productImg: null,
    review: {
      en: "I noticed a visible difference in my digestion within just a week. I feel lighter, energized, and balanced.",
      fr: "J'ai remarqué une différence visible dans ma digestion en seulement une semaine. Je me sens plus léger, énergisé et équilibré."
    },
    reviewer: "Amanda R."
  }
];

const NAV_ITEMS = [
  { label: "Home", id: null },
  { label: "Our Products", id: "products-section" },
  { label: "Product Specs", id: "about-section" },
  { label: "Testimonials", id: "testimonials" },
  { label: "FAQ", id: "faq" },
];

const scrollToSection = (id: string | null) => {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
};

const HeroSection = memo(function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, count } = useCart();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-black font-sans m-0 p-3 md:p-4 lg:p-5">
      {/* Atmospheric background — reuses cached image URLs from the inner frame */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={`atm-${slide.id}`}
            className={`absolute transition-opacity duration-[1500ms] ease-in-out ${
              currentSlide === index ? "opacity-70" : "opacity-0"
            }`}
            style={{
              top: "-8%", left: "-8%", right: "-8%", bottom: "-8%",
              backgroundImage: `url(${slide.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(32px)",
            }}
          />
        ))}
      </div>

      {/* Inner Framed Container */}
      <div className="relative z-10 w-full h-full rounded-[2rem] md:rounded-[2.5rem] border-[2px] md:border-[3px] border-white/90 overflow-hidden shadow-2xl bg-black">
        {/* Background images inside frame */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          {HERO_SLIDES.map((slide, index) => (
            <img
              key={`inner-${slide.id}`}
              src={slide.bg}
              alt=""
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding={index === 0 ? "sync" : "async"}
              className={`absolute -top-3 -left-3 md:-top-4 md:-left-4 lg:-top-5 lg:-left-5 w-[100vw] h-[100dvh] max-w-none object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Product jar crossfade */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
          {HERO_SLIDES.map((slide, index) =>
            slide.productImg ? (
              <img
                key={`jar-${slide.id}`}
                src={slide.productImg}
                alt={slide.tag}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-all duration-1000 ${
                  currentSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              />
            ) : null
          )}
        </div>

        {/* ── Top Nav ────────────────────────────────────────── */}
        <header className="absolute top-0 w-full px-4 md:px-8 pt-4 md:pt-6 z-20">
          <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-5 md:px-6 py-4 rounded-b-[2rem] flex items-center justify-between shadow-2xl">
            {/* Brand - Desktop: Logo + Text, Mobile: Text only on Left */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <img 
                src="/logo.png" 
                alt="Iron Fuel Lab" 
                className="hidden md:block h-8 lg:h-10 w-auto object-contain shrink-0" 
              />
              <span className="text-[11px] md:text-[15px] lg:text-lg font-black tracking-tighter font-display text-white whitespace-nowrap">
                IRON FUEL LAB
              </span>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex gap-8 lg:gap-10 text-[11px] lg:text-[13px] text-white/70 font-bold uppercase tracking-[0.2em] ml-10">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  {item.id ? (t.nav[item.id.replace("-section", "") as keyof typeof t.nav] || item.label) : item.label}
                </button>
              ))}
            </nav>



            {/* Right actions */}
            <div className="flex gap-2 md:gap-3 items-center ml-auto md:ml-0">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "fr" : "en")}
                className="flex px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer font-display"
              >
                {language === "en" ? "FR" : "EN"}
              </button>
              <button className="hidden sm:flex px-5 py-1.5 rounded-full border border-white/20 bg-white/5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer font-display">
                {t.nav.signin}
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
              {/* Hamburger — mobile only */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 hover:bg-white/10 text-white rounded-full transition-colors duration-200 cursor-pointer border border-white/10"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* ── Bottom Right Badge (hidden on mobile to avoid overlap) ── */}
        <div className="absolute bottom-16 md:bottom-20 lg:bottom-16 right-4 md:right-8 lg:right-12 z-30 max-w-[220px] sm:max-w-[260px] hidden sm:flex flex-col gap-3">
          {HERO_SLIDES.map((slide, index) => {
            const IconComponent =
              slide.badge.icon === "Leaf"
                ? Leaf
                : slide.badge.icon === "Brain"
                ? Brain
                : ShieldCheck;

            return (
              <div
                key={`badge-${slide.id}`}
                className={`w-full transition-all duration-700 transform ${
                  currentSlide === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8 absolute inset-0 pointer-events-none"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                  <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-white shadow-inner">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-base sm:text-lg tracking-tight mb-1 font-display">
                    {t.hero[slide.badge.title.toLowerCase().replace(" ", "") as keyof typeof t.hero] || slide.badge.title}
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">
                    {t.hero[slide.badge.desc.toLowerCase().replace(" ", "").replace("100%veganfriendly", "vegan") as keyof typeof t.hero] || slide.badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Hero Title ────────────────────────────────────────── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={`title-${slide.id}`}
              className={`absolute top-[22%] sm:top-[32%] md:top-[38%] left-4 sm:left-4 md:left-8 w-full md:w-auto flex flex-col z-0 transition-opacity duration-700 items-start ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <BlurText
                text={slide.titleWords.map(w => t.hero[w.toLowerCase() as keyof typeof t.hero] || w).join(" ")}
                direction="bottom"
                delay={50}
                animateBy="words"
                highlightWord={t.hero[slide.highlightWord.toLowerCase() as keyof typeof t.hero] || slide.highlightWord}
                highlightColor={slide.highlightColor}
                className="text-[2.4rem] sm:text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-black font-display leading-[0.9] tracking-tighter drop-shadow-xl text-left text-white flex flex-col"
              />
            </div>
          ))}
        </div>

        {/* ── Slide Control Tags ─────────────────────────────────── */}
        <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 z-30 flex flex-row flex-nowrap gap-1.5 md:gap-2.5 max-w-[calc(100vw-2rem)] md:max-w-3xl overflow-x-auto no-scrollbar pb-2">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`px-3 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-md text-[10px] md:text-sm font-semibold transition-all duration-500 cursor-pointer text-center whitespace-nowrap ${
                currentSlide === index
                  ? "bg-white text-black border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-[#1a1a1a]/70 text-white hover:bg-white/10 border border-white/30"
              }`}
            >
              {t.hero[slide.tag.toLowerCase().split(" ")[0] as keyof typeof t.hero] || slide.tag}
            </button>
          ))}
        </div>

        {/* ── Review / Brand Card ───────────────────────────────── */}
        <div className="hidden sm:block absolute top-[14%] sm:top-[12%] md:top-[22%] xl:top-[16%] right-4 md:right-8 xl:right-8 z-30 max-w-[180px] sm:max-w-[180px] md:max-w-[280px] lg:max-w-[300px] xl:max-w-[340px] bg-white/5 backdrop-blur-xl border border-white/20 p-3.5 sm:p-3 md:p-6 xl:p-7 rounded-2xl sm:rounded-[2rem] md:rounded-[1.5rem] xl:rounded-[2.5rem] shadow-[0_8px_48px_0_rgba(0,0,0,0.4)] space-y-1.5 sm:space-y-1.5 md:space-y-3 xl:space-y-4">
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 xl:gap-5">
            <div className="flex -space-x-2 sm:-space-x-2.5 md:-space-x-2 xl:-space-x-4">
              <img src="https://i.pravatar.cc/100?img=11" alt="" loading="lazy" decoding="async" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 xl:w-14 xl:h-14 rounded-full border-[1.5px] md:border-[2px] xl:border-[3px] border-[#131514] object-cover shadow-md" />
              <img src="https://i.pravatar.cc/100?img=12" alt="" loading="lazy" decoding="async" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 xl:w-14 xl:h-14 rounded-full border-[1.5px] md:border-[2px] xl:border-[3px] border-[#131514] object-cover shadow-md" />
              <img src="https://i.pravatar.cc/100?img=13" alt="" loading="lazy" decoding="async" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 xl:w-14 xl:h-14 rounded-full border-[1.5px] md:border-[2px] xl:border-[3px] border-[#131514] object-cover shadow-md" />
            </div>
            <div>
              <div className="flex gap-0.5 sm:gap-1 md:gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-4 md:h-4 xl:w-6 xl:h-6 text-amber-400 fill-current" />
                ))}
              </div>
              <div className="text-[10px] sm:text-[11px] md:text-[14px] xl:text-lg text-white mt-0.5 md:mt-1 font-bold font-display leading-tight">
                {t.hero.reviews}
              </div>
            </div>
          </div>
          <p className="text-[9px] sm:text-[10px] md:text-sm lg:text-[1rem] xl:text-[1.1rem] text-white/85 leading-tight sm:leading-relaxed md:leading-snug xl:leading-snug font-semibold">
            {HERO_SLIDES[currentSlide].review[language as keyof typeof HERO_SLIDES[0]["review"]]}
          </p>
        </div>


        {/* ── Order Now Button ──────────────────────────────────── */}
        <div className="absolute bottom-[13%] sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center">
          <button
            onClick={() => scrollToSection("products-section")}
            className={`flex items-center justify-between ${
              HERO_SLIDES[currentSlide].buttonText || "text-white"
            } rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 w-40 sm:w-48 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl group cursor-pointer ${
              HERO_SLIDES[currentSlide].buttonBg
            } ${HERO_SLIDES[currentSlide].buttonHover}`}
          >
            <span className="font-bold text-xs sm:text-sm tracking-wide">{t.nav.ordernow}</span>
            <div className="bg-black/20 text-current p-2 sm:p-2.5 rounded-full transition-colors">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
          <AnimatePresence>
            {count > 0 && (
              <motion.button
                key="cart-pill"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                onClick={openCart}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white rounded-full pl-4 pr-1.5 py-1.5 transition-colors duration-200 cursor-pointer shadow-lg"
              >
                <span className="font-bold text-xs sm:text-sm tracking-wide">{t.nav.cart}</span>
                <span className="bg-white text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile Slide-Out Navigation ───────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-[min(340px,85vw)] bg-[#080e09] border-l border-white/10 z-[110] flex flex-col p-7 pt-9 shadow-2xl"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex flex-col items-center gap-4 w-full">
                  <img src="/logo.png" alt="Iron Fuel Lab" className="h-24 w-auto object-contain shrink-0" />
                  <span className="text-white text-2xl font-black tracking-tighter font-display">
                    IRON FUEL LAB
                  </span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item, i) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055 + 0.1, duration: 0.35 }}
                      onClick={() => { scrollToSection(item.id); closeMobileMenu(); }}
                      className="text-left text-xl font-bold text-white/55 hover:text-white py-4 border-b border-white/8 transition-colors duration-200 font-display"
                    >
                      {item.id ? (t.nav[item.id.replace("-section", "") as keyof typeof t.nav] || item.label) : item.label}
                    </motion.button>
                ))}
              </div>

              {/* Bottom actions */}
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <button className="w-full py-3.5 rounded-full bg-white text-black font-bold tracking-wide text-sm hover:bg-white/90 active:scale-[0.98] transition-all font-display">
                  {t.nav.signin}
                </button>
                <div className="flex justify-center gap-5 pt-2">
                  <Instagram className="w-5 h-5 text-white/30 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
});

const ProductsSection = memo(function ProductsSection() {
  const { addItem, openCart } = useCart();
  const { language } = useLanguage();
  const t = translations[language];
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 1]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const nextSlide = useCallback(() => setCurrentIndex(([idx]) => [idx + 1, 1]), []);
  const prevSlide = useCallback(() => setCurrentIndex(([idx]) => [idx - 1, -1]), []);

  const visibleProducts = useMemo(() => {
    const count = isMobile ? 1 : (typeof window !== "undefined" && window.innerWidth < 1024 ? 2 : 3);
    return Array.from({ length: count }, (_, i) => {
      const index = ((currentIndex + i) % PRODUCTS.length + PRODUCTS.length) % PRODUCTS.length;
      return PRODUCTS[index];
    });
  }, [currentIndex, isMobile]);

  const slidingVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.96 }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, type: "spring", bounce: 0.15 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.35 },
    }),
  };

  return (
    <section
      id="products-section"
      className="bg-[#f4f7f4] py-24 md:py-32 px-4 md:px-8 text-[#111811] relative overflow-hidden"
    >
      <div className="max-w-[85rem] mx-auto w-full relative z-10 px-0 md:px-12">
        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 md:mb-20 space-y-8 xl:space-y-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#2b4224]/30 text-xs font-semibold mb-6 text-[#2b4224] tracking-wider uppercase">
              {t.products.title}
            </div>
            <BlurText
              text={t.products.heading}
              delay={50}
              className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#1a2318]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md flex flex-col items-start xl:items-end xl:text-right"
          >
            <p className="text-[#3a4d35] mb-6 text-sm lg:text-base leading-relaxed">
              {t.products.description}
            </p>
            <button
              onClick={() => scrollToSection("about-section")}
              className="flex items-center gap-2 bg-[#1a2318] hover:bg-[#2b4224] text-white px-5 py-2.5 rounded-full font-medium transition-colors duration-200 cursor-pointer group shadow-lg"
            >
              {t.products.viewMore}
              <div className="bg-white text-[#1a2318] rounded-full p-1 group-hover:scale-110 transition-transform duration-200">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative w-full py-4">
          <button
            onClick={prevSlide}
            aria-label="Previous products"
            className="absolute left-0 md:left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#dca853] text-[#1a2318] hover:text-white rounded-full transition-all duration-200 cursor-pointer border border-[#2b4224]/10"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="w-full overflow-hidden px-2 md:px-4 py-8 -my-8">
            <div className="flex flex-row gap-6 mx-auto justify-center sm:justify-start">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                {visibleProducts.map((product) => (
                  <motion.div
                    layout
                    custom={direction}
                    variants={slidingVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    key={product.id}
                    className="relative z-10 group h-[400px] sm:h-[440px] md:h-[480px] w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] shrink-0"
                  >
                    <div className="absolute inset-0 md:group-hover:-inset-5 transition-all duration-500 rounded-[2.5rem] p-0 md:group-hover:bg-white md:group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] flex flex-col md:group-hover:p-5 z-10 md:group-hover:z-50 cursor-pointer">
                      <div className={`relative ${product.colorBg} rounded-[2rem] overflow-hidden flex-1 mb-5`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain p-4 mix-blend-multiply md:group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex justify-between items-end px-1 md:group-hover:px-2 transition-all duration-500">
                        <div className="flex flex-col pr-2">
                          <h3 className="text-lg md:text-xl font-bold text-[#111811] leading-tight mb-2 min-h-[3rem]">
                            {product.name}
                          </h3>
                          <div className="flex items-start">
                            <span className="text-[#3a4d35] text-xs font-semibold mr-0.5 mt-1">$</span>
                            <span className="text-xl md:text-2xl font-bold text-[#111811]">{product.price}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem({
                              id: product.id,
                              name: product.name,
                              description: product.description,
                              price: parseFloat(product.price),
                              image: product.image,
                              colorBg: product.colorBg,
                            });
                            openCart();
                          }}
                          className={`${product.buttonBg} ${product.buttonHover} ${product.buttonText} px-4 md:px-5 py-2.5 rounded-[1.25rem] text-xs md:text-sm font-semibold transition-colors duration-200 shadow-sm whitespace-nowrap mb-1 cursor-pointer active:scale-95`}
                        >
                          {t.products.addtoCart}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next products"
            className="absolute right-0 md:right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#dca853] text-[#1a2318] hover:text-white rounded-full transition-all duration-200 cursor-pointer border border-[#2b4224]/10"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
});

const PRODUCT_SPECS_EN = [
    {
      name: "Organic Ashwagandha",
      icon: Leaf,
      color: "#4ca735",
      middle: {
        tagline: "😌 Relax. Recover. Stay Balanced.",
        intro: "ZenFuel is a powerful adaptogen formula designed to help reduce stress, support recovery, and promote overall mental balance.\n\nFormulated with premium ashwagandha and black pepper extract, it helps your body better manage stress while supporting focus, mood, and daily performance.",
        bullets: ["Helps Reduce Stress & Cortisol", "Supports Relaxation & Recovery", "Enhances Mood & Focus", "Daily Balance & Wellness"],
        closing: "Stay calm. Stay focused. Stay in control.",
      },
      leftInfo: {
        ingredients: ["Organic Ashwagandha (Withania somnifera) (Root)", "Organic Black Pepper (Piper nigrum) (Fruit)", "Pullulan Capsules"],
        details: ["Capsules: 60", "Gross Weight: 113 g (0.25 lb)", "Made in: USA"],
      },
      rightInfo: {
        specs: [
          { label: "Extraction", value: "Aqueous / Full Spectrum" },
          { label: "Active Compounds", value: "≥ 5% Withanolides" },
          { label: "Third-Party Tested", value: "Yes (Heavy Metals, Microbes)" },
          { label: "Bioavailability", value: "+2000% via Piperine" },
        ],
        use: "Take 1 capsule twice daily, preferably 20–30 minutes before a meal, with a glass of water.",
        disclaimer: "*These statements have not been evaluated by the FDA.",
      },
    },
    {
      name: "Lion's Mane Mushroom",
      icon: Brain,
      color: "#eab300",
      middle: {
        tagline: "🧠 Focus. Clarity. Mental Performance.",
        intro: "NeuroFuel is a premium nootropic formula designed to support focus, memory, and overall brain performance.\n\nPowered by Lion's Mane mushroom, it helps support cognitive function, mental clarity, and daily productivity—so you can stay sharp and perform at your best.",
        bullets: ["Supports Focus & Concentration", "Enhances Mental Clarity", "Promotes Cognitive Function", "Daily Brain Support"],
        closing: "Stay sharp. Stay focused. Perform better.",
      },
      leftInfo: {
        ingredients: ["Organic Lion's Mane Mushroom (Hericium erinaceus)", "Fruiting Body & Mycelium Powder (400 mg)", "Pullulan (Capsule)", "Organic Pea Starch"],
        details: ["Capsules: 60 (Vegan)", "Gross Weight: 90 g (0.2 lb)", "Made in: USA"],
      },
      rightInfo: {
        specs: [
          { label: "Extraction", value: "Hot Water & Alcohol Dual Extract" },
          { label: "Active Compounds", value: "≥ 40% Polysaccharides" },
          { label: "Source", value: "Fruiting Body + Mycelium" },
          { label: "Primary Action", value: "NGF (Nerve Growth Factor) synthesis" },
        ],
        use: "Take 2 capsules daily, with or without food, or as directed.",
        disclaimer: "*These statements have not been evaluated by the FDA.",
      },
    },
    {
      name: "Creatine Hydration",
      icon: Zap,
      color: "#06b6d4",
      middle: {
        tagline: "⚡ Power. Hydration. Performance.",
        intro: "FURY Hydrate is an advanced creatine formula designed to boost strength, endurance, and hydration at the same time.\n\nCombining 5g of creatine monohydrate with a powerful electrolyte blend, it helps fuel your muscles, improve performance, and maintain optimal hydration during intense training.",
        bullets: ["Increases Strength & Power", "Supports Hydration & Endurance", "Enhances Muscle Performance", "Fast Absorption & Easy Mix"],
        closing: "Train harder. Stay hydrated. Perform at your peak.",
      },
      leftInfo: {
        ingredients: ["Creatine Monohydrate – 5,000 mg", "Magnesium (as Magnesium Malate) – 60 mg", "Sodium (as Sea Salt) – 1,000 mg", "Potassium (as Potassium Chloride) – 200 mg"],
        flavor: "Lemon",
        details: ["Net Weight: 300 g (10.6 oz)", "Gross Weight: 350 g (12.4 oz)", "Made in: USA"],
      },
      rightInfo: {
        specs: [
          { label: "Purity", value: "99.9% Pure Micronized Creatine" },
          { label: "Electrolyte Balance", value: "Optimized 5:1 Na to K ratio" },
          { label: "Mesh Size", value: "Ultra-fine (200 mesh) for mixing" },
          { label: "Sweetener", value: "Natural Stevia Leaf Extract" },
        ],
        use: "Mix 1 scoop (10g) with 6–8 oz of water or your favorite beverage daily.",
        disclaimer: "*These statements have not been evaluated by the FDA.",
      },
    },
    {
      name: "Digestive Equilibrium",
      icon: Droplet,
      color: "#eab300",
      middle: {
        tagline: "🧬 Support Your Gut. Feel Better Daily.",
        intro: "GutFuel is a complete digestive support formula designed to improve gut health, digestion, and overall well-being.\n\nPowered by a blend of probiotics, prebiotics, and enzymes, it helps balance your gut, support nutrient absorption, and keep your system running smoothly.",
        bullets: ["Supports Healthy Digestion", "Promotes Gut Balance", "Helps Nutrient Absorption", "Daily Wellness Support"],
        closing: "",
      },
      leftInfo: {
        ingredients: ["Organic Apple Cider Vinegar Powder", "Inulin (Jerusalem Artichoke Root)", "Lactobacillus Acidophilus (Probiotic)", "DigeZyme® (Multi-Enzyme Complex)"],
        details: ["Capsules: 60", "Net Weight: 76 g (2.7 oz)", "Made in: USA"],
      },
      rightInfo: {
        specs: [
          { label: "Probiotic CFU", value: "10 Billion CFU at manufacture" },
          { label: "Enzymes", value: "Amylase, Protease, Lipase, Cellulase" },
          { label: "Prebiotic Type", value: "Fructo-oligosaccharides (FOS)" },
          { label: "Co-factors", value: "Acetic Acid (from ACV)" },
        ],
        use: "Take 2 capsules daily with 6–8 oz of water.",
        disclaimer: "*These statements have not been evaluated by the FDA.",
      },
    },
    {
      name: "Pure Isolate Protein",
      icon: Sparkles,
      color: "#ef4444",
      middle: {
        tagline: "💪 Build. Repair. Recover Faster.",
        intro: "Ultra-pure grass-fed whey isolate designed to maximize muscle protein synthesis and accelerate recovery.\n\nCold-processed for maximum bioavailability, it delivers essential amino acids exactly when your body needs them without bloating or digestive stress.",
        bullets: ["25g Pure Isolate Protein", "Rapid Absorption & Digestion", "Supports Lean Muscle Growth", "Zero Sugar or Artificial Fillers"],
        closing: "Fuel your recovery. Build lasting strength.",
      },
      leftInfo: {
        ingredients: ["Grass-Fed Whey Protein Isolate", "Digestive Enzyme Blend (Protease)", "Organic Cocoa Powder", "Sunflower Lecithin (<1%)"],
        flavor: "Rich Chocolate",
        details: ["Servings: 30 per container", "Net Weight: 900 g (2 lbs)", "Made in: USA"],
      },
      rightInfo: {
        specs: [
          { label: "Protein Yield", value: "90% by weight" },
          { label: "BCAA Content", value: "5.5g per serving" },
          { label: "Lactose Content", value: "< 1% (Ultra-filtered)" },
          { label: "Sourcing", value: "New Zealand Pasture-Raised" },
        ],
        use: "Mix 1 scoop with 8–10 oz of water or almond milk post-workout.",
        disclaimer: "*These statements have not been evaluated by the FDA.",
      },
    },
  ];

const PRODUCT_SPECS_FR = [
    {
      name: "Ashwagandha Bio",
      icon: Leaf,
      color: "#4ca735",
      middle: {
        tagline: "😌 Relaxer. Récupérer. Rester Équilibré.",
        intro: "ZenFuel est une formule adaptogène puissante conçue pour aider à réduire le stress, soutenir la récupération et favoriser un équilibre mental global.\n\nFormulé avec de l'ashwagandha de qualité supérieure et de l'extrait de poivre noir, il aide votre corps à mieux gérer le stress tout en soutenant la concentration, l'humeur et la performance quotidienne.",
        bullets: ["Aide à Réduire le Stress et le Cortisol", "Soutient la Relaxation et la Récupération", "Améliore l'Humeur et la Concentration", "Équilibre et Bien-être Quotidiens"],
        closing: "Restez calme. Restez concentré. Restez en contrôle.",
      },
      leftInfo: {
        ingredients: ["Ashwagandha Bio (Withania somnifera) (Racine)", "Poivre Noir Bio (Piper nigrum) (Fruit)", "Capsules de Pullulane"],
        details: ["Capsules : 60", "Poids Brut : 113 g (0,25 lb)", "Fabriqué aux : USA"],
      },
      rightInfo: {
        specs: [
          { label: "Extraction", value: "Aqueuse / Spectre Complet" },
          { label: "Composés Actifs", value: "≥ 5% Withanolides" },
          { label: "Testé par des Tiers", value: "Oui (Métaux Lourds, Microbes)" },
          { label: "Biodisponibilité", value: "+2000% via la Pipérine" },
        ],
        use: "Prendre 1 capsule deux fois par jour, de préférence 20 à 30 minutes avant un repas, avec un verre d'eau.",
        disclaimer: "*Ces déclarations n'ont pas été évaluées par la FDA.",
      },
    },
    {
      name: "Mushroom Lion's Mane",
      icon: Brain,
      color: "#eab300",
      middle: {
        tagline: "🧠 Concentration. Clarté. Performance Mentale.",
        intro: "NeuroFuel est une formule nootropique de qualité supérieure conçue pour soutenir la concentration, la mémoire et la performance cérébrale globale.\n\nPropulsé par le champignon Lion's Mane, il aide à soutenir la fonction cognitive, la clarté mentale et la productivité quotidienne — pour que vous puissiez rester affûté et performer au mieux.",
        bullets: ["Soutient la Concentration et l'Attention", "Améliore la Clarté Mentale", "Favorise la Fonction Cognitive", "Soutien Cérébral Quotidien"],
        closing: "Restez affûté. Restez concentré. Performez mieux.",
      },
      leftInfo: {
        ingredients: ["Lion's Mane Bio (Hericium erinaceus)", "Poudre de Corps Fructifère et de Mycélium (400 mg)", "Pullulane (Capsule)", "Amidon de Pois Bio"],
        details: ["Capsules : 60 (Végane)", "Poids Brut : 90 g (0,2 lb)", "Fabriqué aux : USA"],
      },
      rightInfo: {
        specs: [
          { label: "Extraction", value: "Double Extrait Eau Chaude et Alcool" },
          { label: "Composés Actifs", value: "≥ 40% Polysaccharides" },
          { label: "Source", value: "Corps Fructifère + Mycélium" },
          { label: "Action Primaire", value: "Synthèse du NGF (Nerve Growth Factor)" },
        ],
        use: "Prendre 2 capsules par jour, avec ou sans nourriture, ou selon les directives.",
        disclaimer: "*Ces déclarations n'ont pas été évaluées par la FDA.",
      },
    },
    {
      name: "Hydratation Créatine",
      icon: Zap,
      color: "#06b6d4",
      middle: {
        tagline: "⚡ Puissance. Hydratation. Performance.",
        intro: "FURY Hydrate est une formule de créatine avancée conçue pour augmenter la force, l'endurance et l'hydratation en même temps.\n\nCombinant 5g de monohydrate de créatine avec un mélange d'électrolytes puissant, il aide à alimenter vos muscles, améliorer la performance et maintenir une hydratation optimale pendant l'entraînement intense.",
        bullets: ["Augmente la Force et la Puissance", "Soutient l'Hydratation et l'Endurance", "Améliore la Performance Musculaire", "Absorption Rapide et Mélange Facile"],
        closing: "Entraînez-vous plus dur. Restez hydraté. Performez à votre apogée.",
      },
      leftInfo: {
        ingredients: ["Monohydrate de Créatine – 5 000 mg", "Magnésium (sous forme de Malate de Magnésium) – 60 mg", "Sodium (sous forme de Sel de Mer) – 1 000 mg", "Potassium (sous forme de Chlorure de Potassium) – 200 mg"],
        flavor: "Citron",
        details: ["Poids Net : 300 g (10,6 oz)", "Poids Brut : 350 g (12,4 oz)", "Fabriqué aux : USA"],
      },
      rightInfo: {
        specs: [
          { label: "Pureté", value: "99,9% Créatine Micronisée Pure" },
          { label: "Équilibre Électrolytique", value: "Ratio Na/K optimisé de 5:1" },
          { label: "Taille de Maille", value: "Ultra-fine (200 mesh) pour le mélange" },
          { label: "Édulcorant", value: "Extrait Naturel de Feuille de Stévia" },
        ],
        use: "Mélanger 1 cuillère (10g) avec 180 à 240 ml d'eau ou votre boisson préférée quotidiennement.",
        disclaimer: "*Ces déclarations n'ont pas été évaluées par la FDA.",
      },
    },
    {
      name: "Équilibre Digestif",
      icon: Droplet,
      color: "#eab300",
      middle: {
        tagline: "🧬 Soutenez votre intestin. Sentez-vous mieux chaque jour.",
        intro: "GutFuel est une formule complète de soutien digestif conçue pour améliorer la santé intestinale, la digestion et le bien-être général.\n\nPropulsé par un mélange de probiotiques, de prébiotiques et d'enzymes, il aide à équilibrer votre intestin, à soutenir l'absorption des nutriments et à maintenir le bon fonctionnement de votre système.",
        bullets: ["Soutient une Digestion Saine", "Favorise l'Équilibre Intestinal", "Aide à l'Absorption des Nutriments", "Soutien au Bien-être Quotidien"],
        closing: "",
      },
      leftInfo: {
        ingredients: ["Poudre de Vinaigre de Cidre de Pomme Bio", "Inuline (Racine de Topinambour)", "Lactobacillus Acidophilus (Probiotique)", "DigeZyme® (Complexe Multi-Enzymatique)"],
        details: ["Capsules : 60", "Poids Net : 76 g (2,7 oz)", "Fabriqué aux : USA"],
      },
      rightInfo: {
        specs: [
          { label: "UFC Probiotiques", value: "10 Milliards d'UFC à la fabrication" },
          { label: "Enzymes", value: "Amylase, Protéase, Lipase, Cellulase" },
          { label: "Type de Prébiotique", value: "Fructo-oligosaccharides (FOS)" },
          { label: "Co-facteurs", value: "Acide Acétique (provenant du VCP)" },
        ],
        use: "Prendre 2 capsules par jour avec 180 à 240 ml d'eau.",
        disclaimer: "*Ces déclarations n'ont pas été évaluées par la FDA.",
      },
    },
    {
      name: "Protéine Isolate Pure",
      icon: Sparkles,
      color: "#ef4444",
      middle: {
        tagline: "💪 Construire. Réparer. Récupérer Plus Vite.",
        intro: "Isolat de lactosérum pur nourri à l'herbe conçu pour maximiser la synthèse des protéines musculaires et accélérer la récupération.\n\nTraité à froid pour une biodisponibilité maximale, il fournit les acides aminés essentiels exactement quand votre corps en a besoin, sans ballonnements ni stress digestif.",
        bullets: ["25g de Protéine Isolat Pure", "Absorption et Digestion Rapides", "Soutient la Croissance Musculaire Maigre", "Zéro Sucre ou Charges Artificielles"],
        closing: "Alimentez votre récupération. Construisez une force durable.",
      },
      leftInfo: {
        ingredients: ["Isolat de Protéine de Lactosérum Nourri à l'Herbe", "Mélange d'Enzymes Digestives (Protéase)", "Poudre de Cacao Bio", "Lécithine de Tournesol (<1%)"],
        flavor: "Chocolat Riche",
        details: ["Portions : 30 par contenant", "Poids Net : 900 g (2 lbs)", "Fabriqué aux : USA"],
      },
      rightInfo: {
        specs: [
          { label: "Rendement en Protéines", value: "90% en poids" },
          { label: "Teneur en BCAA", value: "5,5g par portion" },
          { label: "Teneur en Lactose", value: "< 1% (Ultra-filtré)" },
          { label: "Sourcing", value: "Élevé au pâturage en Nouvelle-Zélande" },
        ],
        use: "Mélanger 1 cuillère avec 240 à 300 ml d'eau ou de lait d'amande après l'entraînement.",
        disclaimer: "*Ces déclarations n'ont pas été évaluées par la FDA.",
      },
    },
  ];

const AboutSection = memo(function AboutSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const elements = language === 'en' ? PRODUCT_SPECS_EN : PRODUCT_SPECS_FR;
  const [expandedId, setExpandedId] = useState<string | null>(elements[0].name);
  const [itemOrder, setItemOrder] = useState<string[]>(elements.map(e => e.name));

  const IMAGE_MAP: Record<string, string> = {
    "Organic Ashwagandha": "/ashwagandha.png",
    "Ashwagandha Bio": "/ashwagandha.png",
    "Lion's Mane Mushroom": "/NeuroFuel.png",
    "Mushroom Lion's Mane": "/NeuroFuel.png",
    "Creatine Hydration": "/FURY Hydrate.png",
    "Hydratation Créatine": "/FURY Hydrate.png",
    "Digestive Equilibrium": "/GutFuel.png",
    "Équilibre Digestif": "/GutFuel.png",
    "Pure Isolate Protein": "/FURY Isolate.png",
    "Protéine Isolate Pure": "/FURY Isolate.png",
  };

  const ELEMENT_NAMES = elements.map(e => e.name);

  const handleItemClick = useCallback((name: string) => {
    if (expandedId === name) {
      setExpandedId(null);
    } else {
      setItemOrder((prev) => {
        const next = [...prev].filter((id) => id !== name);
        if (expandedId) {
          const withPrev = next.filter((id) => id !== expandedId);
          withPrev.push(expandedId);
          withPrev.unshift(name);
          return withPrev;
        }
        next.unshift(name);
        return next;
      });
      setExpandedId(name);
    }
  }, [expandedId]);

  const navigateItem = useCallback((dir: number) => {
    const current = expandedId ?? ELEMENT_NAMES[0];
    const idx = ELEMENT_NAMES.indexOf(current);
    const next = ELEMENT_NAMES[(idx + dir + ELEMENT_NAMES.length) % ELEMENT_NAMES.length];
    handleItemClick(next);
  }, [expandedId, handleItemClick]);

  const elementsData = elements;

  const sortedElements = useMemo(
    () => [...elements].sort((a, b) => itemOrder.indexOf(a.name) - itemOrder.indexOf(b.name)),
    [itemOrder, elements]
  );

  return (
    <section ref={sectionRef} id="about-section" className="font-sans flex flex-col relative w-full">
      <div className="bg-[#eff3f0] py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-20 w-full text-center mt-0 md:-mt-8 mb-4">
          <BlurText
            text={t.specs.title}
            direction="bottom"
            className="text-2xl md:text-3xl lg:text-[2.75rem] font-bold mb-2 tracking-tight leading-tight justify-center text-[#1a2f1c]"
          />
          <BlurText
            text={t.specs.description}
            direction="bottom"
            delay={300}
            className="text-lg md:text-2xl lg:text-[2.25rem] font-medium text-[#9faaa2] tracking-tight leading-relaxed max-w-4xl mx-auto mt-4 mb-0 relative z-20 justify-center"
          />
        </div>

        <div className="relative w-full max-w-[85rem] mx-auto flex flex-col items-center">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[420px] md:max-w-[550px] lg:max-w-[600px] mx-auto relative z-10 flex flex-col items-center justify-center mt-4 mb-2 md:mb-4"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={expandedId || itemOrder[0]}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                src={IMAGE_MAP[expandedId || itemOrder[0]]}
                alt={expandedId || itemOrder[0]}
                loading="lazy"
                decoding="async"
                className="w-full h-auto relative z-10"
              />
            </AnimatePresence>
          </motion.div>

          {/* Accordion items */}
          <div className="relative z-30 w-full max-w-[80rem] flex flex-col gap-5 px-4 md:px-12 pb-24 mt-6 md:mt-10">

            {/* Up / Down nav — fixed to right side */}
            <div className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"}`}>
              <button
                onClick={() => navigateItem(-1)}
                aria-label="Previous product"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#c1ddcb] shadow-lg flex items-center justify-center text-[#2b4224] hover:bg-[#4ca735] hover:text-white hover:border-[#4ca735] hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 rotate-90" />
              </button>
              {/* Dot indicators */}
              <div className="flex flex-col items-center gap-1.5 py-1">
                {ELEMENT_NAMES.map((name) => (
                  <button
                    key={name}
                    onClick={() => handleItemClick(name)}
                    aria-label={name}
                    className={`rounded-full transition-all duration-300 ${
                      expandedId === name
                        ? 'w-2 h-5 bg-[#4ca735]'
                        : 'w-1.5 h-1.5 bg-[#c1ddcb] hover:bg-[#4ca735]/60'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => navigateItem(1)}
                aria-label="Next product"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#c1ddcb] shadow-lg flex items-center justify-center text-[#2b4224] hover:bg-[#4ca735] hover:text-white hover:border-[#4ca735] hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 rotate-90" />
              </button>
            </div>
            <AnimatePresence mode="popLayout">
              {sortedElements.map((item) => {
                const isExpanded = expandedId === item.name;
                const isAnotherExpanded = expandedId !== null && !isExpanded;
                const Icon = item.icon;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ layout: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 } }}
                    key={item.name}
                    className="relative w-full mx-auto max-w-[42rem] z-20"
                  >
                    {/* Desktop floating left panel — only on 2xl to avoid viewport overflow */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          className="hidden 2xl:block absolute right-[calc(100%+2.5rem)] top-0 w-[300px] pointer-events-auto text-left z-30 h-full"
                        >
                          <div className="bg-white/90 backdrop-blur-md rounded-[1.5rem] p-7 shadow-xl border border-white/60 sticky top-[180px]">
                            <h4 className="text-lg font-bold text-[#1a2f1c] mb-6 uppercase tracking-wider flex items-center gap-2">
                              <Sparkles className="w-5 h-5" style={{ color: item.color }} /> {t.specs.specifications}
                            </h4>
                            <div className="space-y-5">
                              <div>
                                <h6 className="font-bold text-[#2b4224] mb-3 text-sm">{t.specs.ingredients}</h6>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-[#59685e] font-medium leading-relaxed">
                                  {item.leftInfo.ingredients.map((ing, iidx) => <li key={iidx}>{ing}</li>)}
                                </ul>
                              </div>
                              <div className="pt-1">
                                <h6 className="font-bold text-[#2b4224] mb-3 text-sm">{t.specs.productDetails}</h6>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-[#59685e] font-medium leading-relaxed">
                                  {item.leftInfo.details.map((d, didx) => <li key={didx}>{d}</li>)}
                                </ul>
                              </div>
                              {"flavor" in item.leftInfo && item.leftInfo.flavor && (
                                <div className="pt-1">
                                  <h6 className="font-bold text-[#2b4224] mb-2 text-sm">{t.specs.flavor}</h6>
                                  <p className="text-sm text-[#59685e] font-medium">{item.leftInfo.flavor}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Desktop floating right panel — only on 2xl */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.3 }}
                          className="hidden 2xl:block absolute left-[calc(100%+2.5rem)] top-0 w-[300px] pointer-events-auto text-left z-30 h-full"
                        >
                          <div className="bg-white/90 backdrop-blur-md rounded-[1.5rem] p-7 shadow-xl border border-white/60 sticky top-[180px]">
                            <h4 className="text-lg font-bold text-[#1a2f1c] mb-6 uppercase tracking-wider flex items-center gap-2">
                              <ShieldCheck className="w-5 h-5" style={{ color: item.color }} /> {t.specs.extendedProfile}
                            </h4>
                            <div className="space-y-5">
                              <ul className="space-y-4">
                                {item.rightInfo.specs.map((spec, sidx) => (
                                  <li key={sidx} className="flex flex-col border-b border-[#eaf0ec] pb-3 last:border-0 last:pb-0">
                                    <span className="text-xs uppercase font-bold tracking-wider mb-1" style={{ color: item.color }}>{spec.label}</span>
                                    <span className="text-sm font-medium text-[#1a2f1c]">{spec.value}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="bg-[#f4f7f4] border border-[#eaf0ec] p-4 rounded-xl">
                                <h6 className="font-bold text-[#2b4224] mb-2 text-sm">{t.specs.suggestedUse}</h6>
                                <p className="text-sm text-[#59685e] font-medium leading-relaxed">{item.rightInfo.use}</p>
                              </div>
                              <p className="text-xs text-[#9faaa2] italic leading-tight pt-4 border-t border-[#eaf0ec]/80">
                                {t.specs.disclaimer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Accordion card */}
                    <motion.div
                      layout="position"
                      transition={{ layout: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 } }}
                      onClick={() => handleItemClick(item.name)}
                      className={`w-full rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 backdrop-blur-md border border-t-[1.5px]
                        ${isExpanded ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]" : "bg-white/60 border-[#c1ddcb]/60 hover:bg-white/90"}
                        ${isAnotherExpanded ? "opacity-70 hover:opacity-100 scale-[0.98]" : "opacity-100"}`}
                      style={{ borderColor: isExpanded ? item.color : undefined }}
                    >
                      <div className="flex items-center justify-between p-6 md:p-8 select-none">
                        <span className={`text-lg md:text-2xl font-medium tracking-tight transition-colors duration-300 ${isExpanded ? "text-[#1a2a1c] font-bold" : "text-[#2a4020]"}`}>
                          {item.name}
                        </span>
                        <div
                          className={`transition-all duration-500 ${isExpanded ? "rotate-180 scale-110" : "opacity-80"}`}
                          style={{ color: isExpanded ? item.color : "#597a48" }}
                        >
                          <Icon strokeWidth={isExpanded ? 2.5 : 1.5} className="w-8 h-8 md:w-10 md:h-10 drop-shadow-sm" />
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-8 md:px-14 lg:px-16 pb-12 lg:pb-16 text-[#59685e] text-base md:text-lg leading-relaxed border-t border-[#eaf0ec]/80 flex flex-col pt-10 md:pt-12 mt-4 cursor-default text-left bg-white">
                              <div className="space-y-8 md:space-y-10">
                                <div>
                                  <h5 className="font-bold text-[#1a2f1c] text-xl md:text-2xl lg:text-[1.75rem] leading-tight tracking-tight mb-4">
                                    {item.middle.tagline}
                                  </h5>
                                  <div className="space-y-4 text-[#59685e] leading-relaxed max-w-3xl">
                                    {item.middle.intro.split("\n\n").map((p, pidx) => <p key={pidx}>{p}</p>)}
                                  </div>
                                </div>

                                <ul className="space-y-3 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0 text-base font-medium">
                                  {item.middle.bullets.map((b, bidx) => (
                                    <li key={bidx} className="flex items-start gap-3 mb-3 md:mb-4">
                                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 relative top-0.5" style={{ color: item.color }} />
                                      <span className="text-[#1f2f16]">{b}</span>
                                    </li>
                                  ))}
                                </ul>

                                {item.middle.closing && (
                                  <p className="font-bold text-lg md:text-xl mt-4 max-w-2xl" style={{ color: item.color }}>
                                    {item.middle.closing}
                                  </p>
                                )}
                              </div>

                              {/* Mobile inline specs panels */}
                              <div className="flex 2xl:hidden flex-col gap-6 mt-10 pt-8 border-t border-[#eaf0ec]">
                                <div className="bg-[#f4f7f4] rounded-2xl p-6 border border-[#eaf0ec]">
                                  <h4 className="text-sm font-bold text-[#1a2f1c] mb-4 uppercase tracking-wider flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-[#4ca735]" /> {t.specs.specifications}
                                  </h4>
                                  <div className="space-y-5">
                                    <div>
                                      <h6 className="font-bold text-[#2b4224] mb-2 text-sm">{t.specs.ingredients}</h6>
                                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#59685e] font-medium leading-relaxed">
                                        {item.leftInfo.ingredients.map((ing, iidx) => <li key={iidx}>{ing}</li>)}
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-bold text-[#2b4224] mb-2 text-sm">{t.specs.productDetails}</h6>
                                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#59685e] font-medium leading-relaxed">
                                        {item.leftInfo.details.map((d, didx) => <li key={didx}>{d}</li>)}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-[#f4f7f4] rounded-2xl p-6 border border-[#eaf0ec]">
                                  <h4 className="text-sm font-bold text-[#1a2f1c] mb-4 uppercase tracking-wider flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-[#4ca735]" /> {t.specs.extendedProfile}
                                  </h4>
                                  <div className="space-y-4">
                                    <ul className="space-y-3">
                                      {item.rightInfo.specs.map((spec, sidx) => (
                                        <li key={sidx} className="flex flex-col border-b border-[#eaf0ec] pb-2 last:border-0 last:pb-0">
                                          <span className="text-[10px] uppercase font-bold tracking-wider mb-1" style={{ color: item.color }}>{spec.label}</span>
                                          <span className="text-sm font-medium text-[#1a2f1c]">{spec.value}</span>
                                        </li>
                                      ))}
                                    </ul>
                                    <div className="bg-white border border-[#eaf0ec] p-4 rounded-xl">
                                      <h6 className="font-bold text-[#2b4224] mb-2 text-xs">{t.specs.suggestedUse}</h6>
                                      <p className="text-xs text-[#59685e] font-medium leading-relaxed">{item.rightInfo.use}</p>
                                    </div>
                                    <p className="text-[10px] text-[#9faaa2] italic leading-tight">{t.specs.disclaimer}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

function AppInner() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { isOpen: isCartOpen } = useCart();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 800;
          setShowStickyBar((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-black min-h-screen relative">
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <TrustScienceSection />
      <Testimonials />
      <CTASection />
      <FAQSection />
      <Footer />

      <SlideOutCart />
      <StickyActionBar isVisible={showStickyBar && !isCartOpen} />
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </LanguageProvider>
  );
}
