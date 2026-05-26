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
    comparePrice: 49.99, 
    img: "/Ashwagandha1.jpeg", 
    badge: "BEST SELLER", 
    active: true,
    images: ["/Ashwagandha1.jpeg", "/ZenFuel 1.webp", "/ZenFuel 2.webp", "/ZenFuel 3.webp", "/ZenFuel 4.webp", "/sup1.jpeg"]
  },
  { 
    id: "neurofuel-lions-mane", 
    title: "NeuroFuel Lion's Mane", 
    price: 44.99, 
    comparePrice: 64.27, 
    img: "/Lion.jpeg", 
    badge: "FOCUS", 
    savings: "SAVE $19.28", 
    active: false,
    images: ["/Lion.jpeg", "/NeuroFuel 1.webp", "/NeuroFuel 2.webp", "/NeuroFuel 3.webp", "/NeuroFuel 4.webp"]
  },
  { 
    id: "gutfuel-gut-health", 
    title: "GutFuel Gut Health", 
    price: 39.99, 
    comparePrice: 57.13, 
    img: "/Gut Health.jpeg", 
    badge: "DIGESTION", 
    savings: "SAVE $17.14", 
    active: false,
    images: ["/Gut Health.jpeg", "/GutFuel 1.webp", "/GutFuel 2.webp", "/GutFuel 3.webp", "/GutFuel 4.webp"]
  },
  { 
    id: "fury-isolate-vanilla", 
    title: "FURY Isolate Vanilla", 
    price: 79.99, 
    comparePrice: 114.27, 
    img: "/FURY Isolate.jpeg", 
    badge: "PROTEIN", 
    savings: "SAVE $34.28", 
    active: false,
    images: ["/FURY Isolate.jpeg", "/Protein 1.webp", "/Protein 2.webp", "/Protein 3.webp", "/Protein 4.webp"]
  },
  { 
    id: "fury-hydrate-creatine", 
    title: "FURY Hydrate Creatine", 
    price: 44.99, 
    comparePrice: 64.27, 
    img: "/Creatine Formula.jpeg", 
    badge: "POWER", 
    savings: "SAVE $19.28", 
    active: false,
    images: ["/Creatine Formula.jpeg", "/Creatine 1.webp", "/Creatine 2.webp", "/Creatine 3.webp", "/Creatine 4.webp"]
  }
];

const REVIEWS = [
  {
    name: "Marcus T.",
    result: "Slept 8h solid for the first time in 2 years",
    text: "Week 1 I was skeptical. Week 3 I threw out my melatonin. ZenFuel cut my cortisol, I wake up sharp and I'm hitting PRs in the gym. Zero side effects, just results."
  },
  {
    name: "David L.",
    result: "Closed $40K in sales the week I started",
    text: "NeuroFuel is the real deal. I'm processing information 2x faster. My reading comprehension, my deal flow, my recall — all upgraded. It's like putting jet fuel in a Ferrari."
  },
  {
    name: "Sarah M.",
    result: "Lost 8 lbs of bloat in 3 weeks",
    text: "I had chronic bloating for 4 years. Tried everything. GutFuel fixed it in 11 days. My digestion is clockwork now. My skin cleared up too — didn't expect that bonus."
  },
  {
    name: "Chris F.",
    result: "Added 15 lbs of lean muscle in 60 days",
    text: "FURY Isolate is the cleanest protein I've ever put in my body. Mixes in seconds, zero bloat, and my recovery between sessions dropped from 48h to under 24h."
  },
  {
    name: "Alex K.",
    result: "Bench went from 185 to 225 in 6 weeks",
    text: "I stacked FURY Creatine with the Ashwagandha and the strength gains were insane. My endurance in HIIT doubled. I'm genuinely stronger than I was at 22."
  }
];

function ShipsByCountdown() {
  const now = new Date();
  // Ship same day if before 15:00 EST
  const cutoff = new Date();
  cutoff.setHours(15, 0, 0, 0); // 3 PM today
  if (now >= cutoff) cutoff.setDate(cutoff.getDate() + 1);
  const diff = cutoff.getTime() - now.getTime();
  const hrs = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const [t, setT] = useState({ hrs, mins, secs });

  useEffect(() => {
    const interval = setInterval(() => {
      setT(prev => {
        let { hrs, mins, secs } = prev;
        if (secs > 0) return { hrs, mins, secs: secs - 1 };
        if (mins > 0) return { hrs, mins: mins - 1, secs: 59 };
        if (hrs > 0) return { hrs: hrs - 1, mins: 59, secs: 59 };
        return { hrs: 0, mins: 0, secs: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-black text-[#4ca735]">
      {String(t.hrs).padStart(2,'0')}:{String(t.mins).padStart(2,'0')}:{String(t.secs).padStart(2,'0')}
    </span>
  );
}

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
  const discountPct1 = Math.round((currentVariantInfo.comparePrice - pricing1.totalPrice) / currentVariantInfo.comparePrice * 100);

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
          
          {/* Live viewers + sold count */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-red-50 text-red-600 border border-red-200 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">● LIVE</span>
            <span className="text-xs text-gray-500"><LiveViewers /> people viewing right now</span>
            <span className="text-xs font-bold text-[#4ca735] bg-[#4ca735]/8 px-2 py-0.5 rounded-full">✓ 2,847 sold this week</span>
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

          {/* Mini Review Card — specific result headline */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gray-200/50 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{REVIEWS[activeVariant].name}</h3>
                <CheckCircle className="text-[#4ca735]" size={14} />
                <span className="text-[10px] text-gray-400 font-medium">Verified Purchase</span>
              </div>
              <div className="flex gap-0.5 text-amber-500">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
              </div>
            </div>
            <p className="text-[11px] font-black text-[#4ca735] uppercase tracking-wide mb-1">✓ {REVIEWS[activeVariant].result}</p>
            <p className="text-sm text-gray-600">&ldquo;{REVIEWS[activeVariant].text}&rdquo;</p>
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
                  <div className="text-xs font-bold text-[#4ca735]">SAVE {discountPct1}% (${(currentVariantInfo.comparePrice - pricing1.totalPrice).toFixed(2)})</div>
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
              <div className={`absolute top-0 left-0 w-full text-center py-1 text-[11px] font-bold uppercase rounded-t-[7px] text-white bg-[#1a2f1c]`}>SAVE ANOTHER 10%</div>
              <div className="flex items-center gap-3">
                <input type="radio" checked={quantity === 3} onChange={() => setQuantity(3)} className="w-5 h-5 accent-[#4ca735]" />
                <div className="flex flex-col">
                  <div className="font-bold text-sm md:text-base">3 Bottles</div>
                  <div className="text-xs font-bold text-[#4ca735]">SAVE ANOTHER 10% (${pricing3.savings.toFixed(2)})</div>
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
              <div className={`absolute top-0 left-0 w-full text-center py-1 text-[11px] font-bold uppercase rounded-t-[7px] text-white bg-red-600`}>SAVE ANOTHER 15%</div>
              <div className="flex items-center gap-3">
                <input type="radio" checked={quantity === 6} onChange={() => setQuantity(6)} className="w-5 h-5 accent-[#4ca735]" />
                <div className="flex flex-col">
                  <div className="font-bold text-sm md:text-base">6 Bottles</div>
                  <div className="text-xs font-bold text-[#4ca735]">SAVE ANOTHER 15% (${pricing6.savings.toFixed(2)})</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-400 line-through">${pricing6.originalTotalPrice.toFixed(2)}</div>
                <div className="font-bold text-lg md:text-xl">${pricing6.totalPrice.toFixed(2)}</div>
                <div className="text-[10px] text-gray-500">${(pricing6.totalPrice / 6).toFixed(2)} /ea</div>
              </div>
            </label>
          </div>

          {/* Stock bar + shipping deadline */}
          <div className="mt-6 space-y-3">
            {/* Stock scarcity bar */}
            <div className="bg-red-50 border border-red-100 rounded-md px-4 py-3">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse inline-block"></span>
                  ⚠️ Only 14 units left at this price
                </span>
                <span className="text-[11px] text-gray-500 font-bold">14 / 80 remaining</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: '17.5%' }}></div>
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5">Over <strong className="text-red-600">230 people</strong> viewed this in the last 24h — bundles move fast.</p>
            </div>

            {/* Ship by countdown */}
            <div className="bg-[#4ca735]/6 border border-[#4ca735]/20 rounded-md px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#4ca735] shrink-0" />
                <span className="text-xs font-bold text-gray-700">Order in <ShipsByCountdown /> → Ships <strong>Today</strong></span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold">FREE SHIPPING</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-[#4ca735] hover:bg-[#3d862a] text-white rounded-md py-4 mt-4 text-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
            <span className="uppercase tracking-wide relative z-10">⚡ Claim My 30% Discount Now</span>
          </button>

          {/* Social proof below button */}
          <div className="mt-3 flex flex-col items-center gap-2">
            <p className="text-[11px] text-gray-400 text-center font-medium">
              🔒 Secure checkout &nbsp;·&nbsp; 60-Day Money-Back Guarantee &nbsp;·&nbsp; No questions asked
            </p>
            <p className="text-[11px] text-center text-gray-500 font-bold">
              Join <span className="text-[#4ca735] font-black">14,200+ elite performers</span> already on the IronFuel protocol
            </p>
          </div>

          {/* Delivery & Badges */}
          <div className="mt-4 flex flex-col items-center">
            <div className="flex items-center justify-center gap-6 text-xs mb-4 font-bold text-gray-600">
               <div className="flex items-center gap-1"><Truck size={14} className="text-[#4ca735]" /> FAST SHIPPING</div>
               <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-[#4ca735]" /> 60 DAY GUARANTEE</div>
            </div>
            
            <div className="flex gap-2 justify-center flex-wrap items-center">
              <CreditCard size={24} className="text-gray-600" />
              <img src="/visa.png" alt="Visa" className="h-[14px]" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-5" />
              <img src="/paypal.svg" alt="PayPal" className="h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

