import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import BundleModal from "./BundleModal";
import ShinyText from "./ShinyText";
import BlurText from "./BlurText";

const PRODUCTS = [
  {
    id: "zenfuel-ashwagandha",
    img: "/Ashwagandha.jpeg",
    title: "Sleep Deeper, Wake Renewed — Your Stress Relief Matrix",
    subtitle: "ZenFuel Ashwagandha for deep recovery and balance.",
    price: 34.99,
    comparePrice: 54.99,
    savingsText: "Économisez $20",
    buttonColor: "bg-[#4ca735] hover:bg-[#3d862a]",
    shippingText: "Expédié en 24h",
    marketingName: "ZenFuel Ashwagandha",
    description: "Deep recovery setup.",
    colorBg: "bg-[#e2eadc]",
  },
  {
    id: "neurofuel-lions-mane",
    img: "/Lion.jpeg",
    title: "Unlock Laser Focus — Your Cognitive Performance Stack",
    subtitle: "NeuroFuel Lion's Mane for peak mental clarity.",
    price: 39.99,
    comparePrice: 59.99,
    savingsText: "Économisez $20",
    buttonColor: "bg-[#eab308] hover:bg-[#ca8a04]",
    shippingText: "Expédié en 24h",
    marketingName: "NeuroFuel Lion's Mane",
    description: "Cognitive performance stack.",
    colorBg: "bg-[#f5ebd7]",
  },
  {
    id: "gutfuel-gut-health",
    img: "/Gut Health.jpeg",
    title: "Eliminate Bloat, Restore Digestion — Your Gut Protocol",
    subtitle: "GutFuel for daily digestive balance and comfort.",
    price: 29.99,
    comparePrice: 49.99,
    savingsText: "Économisez $20",
    buttonColor: "bg-[#f97316] hover:bg-[#ea580c]",
    shippingText: "Expédié en 24h",
    marketingName: "GutFuel Gut Health",
    description: "Digestive balance.",
    colorBg: "bg-[#fff7ed]",
  },
  {
    id: "fury-isolate-vanilla",
    img: "/FURY Isolate.jpeg",
    title: "Build Lean Muscle, Recover Faster — Premium Protein",
    subtitle: "FURY Isolate Vanilla for rapid muscle growth.",
    price: 79.99,
    comparePrice: 109.99,
    savingsText: "Économisez $30",
    buttonColor: "bg-[#dc2626] hover:bg-[#b91c1c]",
    shippingText: "Expédié en 24h",
    marketingName: "FURY Isolate Vanilla",
    description: "Premium protein complex.",
    colorBg: "bg-[#f8eef2]",
  },
  {
    id: "fury-hydrate-creatine",
    img: "/Creatine Formula.jpeg",
    title: "Explosive Power & Hydration — Your Peak Performance Stack",
    subtitle: "FURY Hydrate Creatine for maximum power and endurance.",
    price: 44.99,
    comparePrice: 64.99,
    savingsText: "Économisez $20",
    buttonColor: "bg-[#334155] hover:bg-[#1e293b]",
    shippingText: "Expédié en 24h",
    marketingName: "FURY Hydrate Creatine",
    description: "Power & performance blend.",
    colorBg: "bg-[#d5dfe2]",
  }
];

export default function ProductCarousel() {
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
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
      transition: { duration: 0.55, type: "spring" as const, bounce: 0.15 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.35 },
    }),
  };

  return (
    <section className="bg-[#f5f5f5] py-16 px-4 md:px-12 relative border-b border-gray-200">
      <div className="max-w-[85rem] mx-auto w-full relative z-10 px-0 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <div className="lg:w-[55%]">
            <div className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs font-bold text-slate-600 tracking-wider mb-6">
              NOS PRODUITS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-bold text-[#1a2f1c] tracking-tight">
              <ShinyText text={language === 'en' ? "Feel the Difference in 30 Days or Your Money Back" : "Ressentez la Différence en 30 Jours ou Remboursé"} disabled={false} speed={2} color="#1a2f1c" shineColor="#4ca735" />
            </h2>
          </div>
          
          <div className="lg:w-[40%] flex flex-col items-start lg:items-end text-left lg:text-right">
            <BlurText 
               text={language === 'en' ? "Each formula is crafted from pure adaptogens using an advanced extraction system, ensuring natural ingredients retain full efficacy and maximum absorption." : "Chaque formule est conçue à partir d'adaptogènes purs utilisant un système d'extraction avancé, garantissant que les ingrédients naturels conservent une efficacité totale et une absorption maximale."}
               direction="bottom"
               className="text-gray-600 text-[17px] leading-relaxed mb-6"
            />
            <button className="bg-[#1a2f1c] text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer shadow-lg">
              Voir Plus 
              <span className="bg-white text-[#1a2f1c] rounded-full w-6 h-6 flex items-center justify-center">
                <ChevronRight size={16} strokeWidth={3} />
              </span>
            </button>
          </div>
        </div>

        <div className="relative w-full py-4">
          <button
            onClick={prevSlide}
            aria-label="Previous products"
            className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#dca853] text-[#1a2f1c] hover:text-white rounded-full transition-all duration-200 cursor-pointer border border-[#2b4224]/10 hidden sm:flex"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="w-full overflow-hidden px-2 md:px-0 py-8 -my-8">
            <div className="flex flex-row gap-6 mx-auto justify-center sm:justify-start">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                {visibleProducts.map((prod) => (
                  <motion.div
                    layout
                    custom={direction}
                    variants={slidingVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    key={prod.id}
                    className="relative z-10 flex flex-col bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                  >
                    <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[16/10] bg-gray-200">
                      <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-[#1a2f1c] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {prod.savingsText.replace('Économisez', 'SAVE').replace('$', ' $')}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col px-2">
                      <h3 className="font-bold text-xl md:text-[22px] leading-tight mb-2 text-black pr-4 h-[3.5rem] md:h-[4rem]">
                        {prod.title}
                      </h3>
                      <p className="text-gray-500 text-[15px] mb-6 flex-1 pr-4">
                        {prod.subtitle}
                      </p>

                      <div className="flex items-end gap-2 mb-4">
                        <span className="text-[20px] font-bold text-gray-500 mb-1 leading-none">$</span>
                        <span className="text-[32px] font-bold text-black leading-none">{prod.price}</span>
                        <span className="text-sm font-bold text-gray-400 line-through mb-1.5 ml-1">${prod.comparePrice}</span>
                      </div>

                      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 mt-auto">
                        <div className="flex flex-col items-start gap-1.5">
                          <div className="bg-[#4ca735]/10 text-[#4ca735] text-[13px] font-bold px-3 py-1.5 rounded-md inline-block whitespace-nowrap">
                            {prod.savingsText}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-bold">
                            <Zap size={14} className="text-orange-500 fill-orange-500" /> {prod.shippingText}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedProduct({
                            id: prod.id,
                            name: prod.marketingName,
                            marketingName: prod.title,
                            description: prod.subtitle,
                            price: prod.price,
                            originalPrice: prod.comparePrice,
                            image: prod.img,
                            colorBg: prod.colorBg
                          })}
                          className={`${prod.buttonColor} text-white px-5 py-3 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-sm whitespace-nowrap w-full xl:w-auto h-[48px] cursor-pointer`}
                        >
                          Ajouter au Panier <CheckCircle2 size={18} className="text-white" />
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
            className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#dca853] text-[#1a2f1c] hover:text-white rounded-full transition-all duration-200 cursor-pointer border border-[#2b4224]/10 hidden sm:flex"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
      
      {selectedProduct && (
        <BundleModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
}

