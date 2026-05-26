import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function StatBar() {
  const { language } = useLanguage();
  const t = translations[language].stats;

  const stats = [
    { label: t.stat1, value: 89, color: "text-[#1a2318]" },
    { label: t.stat2, value: 34, color: "text-[#1a2318]" },
    { label: t.stat3, value: 92, color: "text-[#1a2318]" }
  ];

  return (
    <section className="py-16 md:py-20 bg-black border-b border-white/5">
      <div className="max-w-[1240px] mx-auto px-4 md:px-20">
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl md:text-[42px] font-bold leading-tight font-display tracking-tight uppercase">
            <ShinyText text={t.headingPart1} disabled={false} speed={2} color="#ffffff" shineColor="#4ca735" /><br/>
            <span className="text-[#4ca735] block mt-2"><ShinyText text={t.headingPart2} disabled={false} speed={2} color="#4ca735" shineColor="#ffffff" /></span>
          </h2>
          <BlurText 
            as="p" 
            text={t.description} 
            className="text-gray-400 mt-4 text-base font-medium" 
            delay={50} 
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 mt-10">
          <div className="w-full md:w-[45%] flex-shrink-0 relative">
            <img src="https://raw.githubusercontent.com/ys-sites/IronFuel/main/public/Lion.jpeg" alt="Stats" className="w-full rounded-2xl object-cover border border-white/10 shadow-lg filter brightness-90 hover:brightness-100 transition-all duration-500" />
          </div>
          
          <div className="w-full flex-grow flex flex-col gap-6">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-white font-semibold text-sm tracking-wide uppercase">{s.label}</span>
                <div className="relative w-full h-[52px] bg-[#131514] border border-white/20 rounded-md overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-[#4ca735] flex items-center pl-4"
                  >
                    <span className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">{s.value}%</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
