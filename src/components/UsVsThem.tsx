import { CheckCircle2, XCircle } from "lucide-react";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function UsVsThem() {
  const { language } = useLanguage();
  const t = translations[language].usVsThem;

  const features = [
    t.feat1,
    t.feat2,
    t.feat3,
    t.feat4,
    t.feat5
  ];

  return (
    <section className="bg-black py-16 md:py-24 text-center border-b border-white/5">
      <div className="max-w-[1000px] mx-auto px-4">
        <h2 className="text-3xl md:text-[42px] font-bold text-white mb-4 font-display tracking-tight uppercase flex justify-center gap-2">
          <ShinyText text={t.heading} disabled={false} speed={2} color="#ffffff" shineColor="#4ca735" />
        </h2>
        <BlurText 
          as="p" 
          text={t.description} 
          className="text-gray-400 mb-10 font-medium" 
          delay={50} 
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full bg-[#131514] rounded-xl overflow-hidden shadow-2xl border border-white/10 hidden md:block"
        >
          <div className="grid grid-cols-3 bg-[#1a2318] border-b border-white/10">
            <div className="p-4"></div>
            <div className="p-4 font-bold text-white flex flex-col items-center justify-center">
              <span className="text-xl tracking-widest text-[#4ca735]">{t.ironFuel}</span>
            </div>
            <div className="p-4 font-bold text-red-500 bg-black/40 flex flex-col items-center justify-center text-center tracking-widest">
              {t.industry}
            </div>
          </div>
          
          {features.map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i + 0.4 }}
              key={i} 
              className={`grid grid-cols-3 ${i < features.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className="p-6 font-bold text-gray-300 text-left flex items-center bg-black/40 uppercase tracking-wide text-xs">{f}</div>
              <div className="p-6 flex items-center justify-center bg-[#4ca735]/10">
                <CheckCircle2 color="#4ca735" size={32} />
              </div>
              <div className="p-6 flex items-center justify-center bg-black/40 text-gray-500 font-bold">
                 <XCircle color="#ef4444" size={32} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:hidden bg-[#131514] rounded-xl overflow-hidden border border-white/10"
        >
          <div className="grid grid-cols-2 bg-[#1a2318] text-sm items-center h-full">
            <div className="p-3 font-bold text-[#4ca735] flex flex-col items-center h-full justify-center text-center">
              {t.ironFuel}
            </div>
            <div className="p-3 font-bold text-red-500 bg-black/40 flex flex-col items-center h-full justify-center text-center">
              {t.industry}
            </div>
          </div>
          
          {features.map((f, i) => (
            <div key={i} className="flex flex-col">
              <div className="bg-black/60 p-2 text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase border-b border-white/5">{f}</div>
              <div className="grid grid-cols-2 border-b border-white/5">
                <div className="p-4 flex items-center justify-center bg-[#4ca735]/10">
                  <CheckCircle2 color="#4ca735" size={28} />
                </div>
                <div className="p-4 flex items-center justify-center bg-black/40 text-gray-500 font-bold text-sm">
                  <XCircle color="#ef4444" size={28} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
