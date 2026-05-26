import { useState, useEffect } from "react";
import { Star, CheckCircle, ShieldCheck, Zap, Lock, Truck, CreditCard, ShoppingBag } from "lucide-react";
import { useCart, getItemPricing } from "../context/CartContext";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import { motion } from "framer-motion";

const VARIANTS = [
  { 
    id: "zenfuel-ashwagandha", 
    title: "ZenFuel Ashwagandha", 
    price: 34.99, 
    comparePrice: 54.99, 
    img: "/Ashwagandha.jpeg", 
    badge: "BEST SELLER", 
    active: true,
    images: ["/Ashwagandha.jpeg", "/ZenFuel 1.webp", "/ZenFuel 2.webp", "/ZenFuel 3.webp", "/ZenFuel 4.webp", "/sup1.jpeg"]
  },
  { 
    id: "neurofuel-lions-mane", 
    title: "NeuroFuel Lion's Mane", 
    price: 39.99, 
    comparePrice: 59.99, 
    img: "/Lion.jpeg", 
    badge: "FOCUS", 
    savings: "SAVE $20", 
    active: false,
    images: ["/Lion.jpeg", "/NeuroFuel 1.webp", "/NeuroFuel 2.webp", "/NeuroFuel 3.webp", "/NeuroFuel 4.webp"]
  },
  { 
    id: "gutfuel-gut-health", 
    title: "GutFuel Gut Health", 
    price: 29.99, 
    comparePrice: 49.99, 
    img: "/Gut Health.jpeg", 
    badge: "DIGESTION", 
    savings: "SAVE $20", 
    active: false,
    images: ["/Gut Health.jpeg", "/GutFuel 1.webp", "/GutFuel 2.webp", "/GutFuel 3.webp", "/GutFuel 4.webp"]
  },
  { 
    id: "fury-isolate-vanilla", 
    title: "FURY Isolate Vanilla", 
    price: 79.99, 
    comparePrice: 109.99, 
    img: "/FURY Isolate.jpeg", 
    badge: "PROTEIN", 
    savings: "SAVE $30", 
    active: false,
    images: ["/FURY Isolate.jpeg", "/Protein 1.webp", "/Protein 2.webp", "/Protein 3.webp", "/Protein 4.webp"]
  },
  { 
    id: "fury-hydrate-creatine", 
    title: "FURY Hydrate Creatine", 
    price: 44.99, 
    comparePrice: 64.99, 
    img: "/Creatine Formula.jpeg", 
    badge: "POWER", 
    savings: "SAVE $20", 
    active: false,
    images: ["/Creatine Formula.jpeg", "/Creatine 1.webp", "/Creatine 2.webp", "/Creatine 3.webp", "/Creatine 4.webp"]
  }
];

function LiveViewers() {
  const [viewers, setViewers] = useState(108);

  useEffect(() => {
    // Random updates every 3 to 7 seconds
    const interval = setInterval(() => {
      setViewers(prev => {
        // change by -3 to +5
        const change = Math.floor(Math.random() * 9) - 3;
        let next = prev + change;
        if (next < 85) next = 85;
        if (next > 230) next = 230;
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return <strong className="text-black transition-all duration-300">{viewers}</strong>;
}

export default function ProductSection() {
  const [activeVariant, setActiveVariant] = useState(0); // Default to Ashwagandha
  const [quantity, setQuantity] = useState(3); // Default to 3 bottles
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [activeVariant]);

  const currentVariantInfo = VARIANTS[activeVariant];
  
  // Calculate pricing based on quantity using Shopify prices
  const pricing = getItemPricing(currentVariantInfo.id, quantity);
  const finalPrice = pricing.totalPrice;
  const originalTotalPrice = pricing.originalTotalPrice;
  const totalSavings = (currentVariantInfo.comparePrice * quantity) - finalPrice; // vs retail
  const cartPricePerItem = finalPrice / quantity;
  const packageSavings = pricing.savings; // vs single bottle

  const pricing1 = getItemPricing(currentVariantInfo.id, 1);
  const pricing3 = getItemPricing(currentVariantInfo.id, 3);
  const pricing6 = getItemPricing(currentVariantInfo.id, 6);

  // Set the images for the gallery based on variant
  const currentImages = currentVariantInfo.images;

  const handleAddToCart = () => {
    addItem({
      id: currentVariantInfo.id,
      name: currentVariantInfo.title,
      price: currentVariantInfo.price,
      image: currentVariantInfo.img,
      quantity: quantity
    } as any);
    openCart();
  };

  return (
    <section id="products-section" className="bg-white w-full py-6 md:py-10 border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <img src={currentImages[selectedImageIndex]} alt="Product" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {currentImages.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedImageIndex(i)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${selectedImageIndex === i ? "border-[#4ca735]" : "border-transparent opacity-50 hover:opacity-100"}`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col text-black"
        >
          {/* Reviews & Title */}
          <div className="flex items-center gap-2 mb-2 text-gray-500 text-xs">
            <div className="flex gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span>4.9/5 | (12,108 Reviews)</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display uppercase tracking-tight">
            <ShinyText text={currentVariantInfo.title} disabled={false} speed={2} color="#000000" shineColor="#4ca735" />
          </h1>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-red-50 text-red-600 border border-red-200 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">● LIVE</span>
            <span className="text-xs text-gray-500"><LiveViewers /> people are currently viewing this product</span>
          </div>

          {/* Icons list */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-8 mt-4">
            {[
              { icon: ShieldCheck, text: "Science Backed" },
              { icon: Zap, text: "Peak Performance" },
              { icon: CheckCircle, text: "Purity Verified" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-gray-200 text-[#4ca735]">
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-medium text-gray-600 leading-tight">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Custom Mini Review Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gray-200/50 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Marcus T.</h3>
                <CheckCircle className="text-[#4ca735]" size={16} />
              </div>
              <div className="flex gap-0.5 text-amber-500">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
            </div>
            <p className="text-sm text-gray-600">"The quality of Iron Fuel is unmatched. Clean ingredients, no fillers, and I actually feel the difference in my recovery."</p>
          </div>

          {/* Formula Selection */}
          <h3 className="font-bold mb-3 mt-2 text-[15px] uppercase tracking-wide text-slate-500">Select Formula</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {VARIANTS.map((v, i) => (
              <button 
                key={v.id}
                onClick={() => setActiveVariant(i)}
                className={`relative flex flex-col items-center justify-center p-3 border rounded-md transition-all pt-10 outline-none focus:outline-none ${activeVariant === i ? "bg-white border-[#4ca735] border-2 shadow-[0_2px_10px_rgba(76,167,53,0.15)]" : "bg-white border-gray-200 border-x border-b hover:border-gray-300"}`}
              >
                <div className={`absolute top-0 left-0 w-full text-center py-1.5 text-[11px] font-bold uppercase rounded-t-sm ${activeVariant === i ? "bg-[#4ca735] text-white" : "bg-[#e2e8f0] text-slate-600 border-none"}`}>{v.badge}</div>
                <img src={v.img} alt={v.title} className="w-14 h-14 rounded-md mb-3 object-cover border border-gray-100 shadow-sm" />
                <div className="font-bold text-[13px] leading-tight text-center px-1 mb-2 text-black">{v.title.replace("ZenFuel ", "").replace("NeuroFuel ", "").replace("GutFuel ", "").replace("FURY ", "")}</div>
                
                <div className="flex flex-col items-center mt-auto w-full border-t border-gray-100 pt-2.5">
                  <div className="text-[15px] font-bold text-black leading-none mb-1">${v.price.toFixed(2)}</div>
                  <div className="text-[11px] text-gray-400 line-through leading-none">${v.comparePrice}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Quantity Widget */}
          <div className="mt-8 flex flex-col gap-3">
            {/* 1 Bottle */}
            <label className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all ${quantity === 1 ? "border-[#4ca735] bg-[#4ca735]/5 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`}>
              <div className="flex items-center gap-3">
                <input type="radio" checked={quantity === 1} onChange={() => setQuantity(1)} className="w-5 h-5 accent-[#4ca735]" />
                <div className="flex flex-col">
                  <div className="font-bold text-sm md:text-base">1 Bottle</div>
                  <div className="text-xs font-bold text-[#4ca735]">SAVE ${(currentVariantInfo.comparePrice - pricing1.totalPrice).toFixed(2)}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-400 line-through">${currentVariantInfo.comparePrice.toFixed(2)}</div>
                <div className="font-bold text-lg md:text-xl">${pricing1.totalPrice.toFixed(2)}</div>
                <div className="text-[10px] text-gray-500">${pricing1.totalPrice.toFixed(2)} /ea</div>
              </div>
            </label>

            {/* 3 Bottles */}
            <label className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all relative pt-6 ${quantity === 3 ? "border-[#4ca735] bg-[#4ca735]/5 shadow-sm" : "border-[#4ca735] bg-white border-opacity-50 hover:border-opacity-100"}`}>
              <div className={`absolute top-0 left-0 w-full text-center py-1 text-[11px] font-bold uppercase rounded-t-[7px] text-white bg-[#1a2f1c]`}>SAVE 10%</div>
              <div className="flex items-center gap-3">
                <input type="radio" checked={quantity === 3} onChange={() => setQuantity(3)} className="w-5 h-5 accent-[#4ca735]" />
                <div className="flex flex-col">
                  <div className="font-bold text-sm md:text-base">3 Bottles</div>
                  <div className="text-xs font-bold text-[#4ca735]">SAVE 10% (${pricing3.savings.toFixed(2)})</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-400 line-through">${pricing3.originalTotalPrice.toFixed(2)}</div>
                <div className="font-bold text-lg md:text-xl">${pricing3.totalPrice.toFixed(2)}</div>
                <div className="text-[10px] text-gray-500">${(pricing3.totalPrice / 3).toFixed(2)} /ea</div>
              </div>
            </label>

            {/* 6 Bottles */}
            <label className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all relative pt-6 ${quantity === 6 ? "border-[#4ca735] bg-[#4ca735]/5 shadow-sm" : "border-gray-200 bg-white hover:border-[#4ca735]/50"}`}>
              <div className={`absolute top-0 left-0 w-full text-center py-1 text-[11px] font-bold uppercase rounded-t-[7px] text-white bg-red-600`}>SAVE 15%</div>
              <div className="flex items-center gap-3">
                <input type="radio" checked={quantity === 6} onChange={() => setQuantity(6)} className="w-5 h-5 accent-[#4ca735]" />
                <div className="flex flex-col">
                  <div className="font-bold text-sm md:text-base">6 Bottles</div>
                  <div className="text-xs font-bold text-[#4ca735]">SAVE 15% (${pricing6.savings.toFixed(2)})</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-400 line-through">${pricing6.originalTotalPrice.toFixed(2)}</div>
                <div className="font-bold text-lg md:text-xl">${pricing6.totalPrice.toFixed(2)}</div>
                <div className="text-[10px] text-gray-500">${(pricing6.totalPrice / 6).toFixed(2)} /ea</div>
              </div>
            </label>
          </div>

          <div className="w-full bg-red-50 text-red-600 py-2 rounded-md font-bold text-xs text-center mt-6 flex justify-center items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.8)] animate-pulse"></div>
            HIGH DEMAND: ORDER NOW
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-[#1a2f1c] hover:bg-black text-white rounded-md py-4 mt-3 text-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
          >
            <span className="uppercase tracking-wide">Add To Cart</span>
          </button>

          {/* Delivery & Badges */}
          <div className="mt-4 flex flex-col items-center">
            <div className="flex items-center justify-center gap-6 text-xs mb-4 font-bold text-gray-600">
               <div className="flex items-center gap-1"><Truck size={14} className="text-[#4ca735]" /> FAST SHIPPING</div>
               <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-[#4ca735]" /> 60 DAY GUARANTEE</div>
            </div>
            
            <div className="flex gap-2 justify-center flex-wrap items-center">
              <CreditCard size={24} className="text-gray-600" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo_2014.svg" alt="Visa" className="h-[14px]" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

