import ShinyText from "./ShinyText";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function AnimatedProgress() {
  const { language } = useLanguage();
  const t = translations[language].progress;

  return (
    <section className="bg-black py-12 md:py-20 px-4 md:px-10 border-b border-white/5 overflow-hidden">
      <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl md:text-[42px] font-bold text-white mb-8 leading-tight text-center md:text-left font-display tracking-tight uppercase">
            <ShinyText text={t.headingPart1} disabled={false} speed={2} color="#ffffff" shineColor="#4ca735" /> <span className="text-[#4ca735]"><ShinyText text={t.headingPart2} disabled={false} speed={2} color="#4ca735" shineColor="#ffffff" /></span>
          </h2>
          <div className="w-full h-[300px] md:h-[400px] bg-black/20 rounded-xl overflow-hidden shadow-xl border border-white/10 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1100&auto=format&fit=crop" alt="Training" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col gap-8"
        >
          <div className="flex gap-4 relative pl-4">
            <div className="w-8 h-8 rounded-full border-2 border-[#4ca735] bg-[#4ca735] text-white flex items-center justify-center font-bold relative z-10 shrink-0">1</div>
            <div className="absolute top-8 left-8 bottom-[-40px] w-1 bg-white/10 z-0"></div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.step1Title}</h3>
              <p className="text-gray-400 font-medium tracking-wide">{t.step1Text}</p>
            </div>
          </div>

          <div className="flex gap-4 relative pl-4">
            <div className="w-8 h-8 rounded-full border-2 border-gray-600 bg-transparent text-gray-400 flex items-center justify-center font-bold relative z-10 shrink-0">2</div>
            <div className="absolute top-8 left-8 bottom-[-40px] w-1 bg-white/10 z-0"></div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.step2Title}</h3>
              <p className="text-gray-400 font-medium tracking-wide">{t.step2Text}</p>
            </div>
          </div>

          <div className="flex gap-4 relative pl-4 border-l-0">
            <div className="w-8 h-8 rounded-full border-2 border-gray-600 bg-transparent text-gray-400 flex items-center justify-center font-bold relative z-10 shrink-0">3</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.step3Title}</h3>
              <p className="text-gray-400 font-medium tracking-wide">{t.step3Text}</p>
            </div>
          </div>

          <div className="mt-4">
            <button onClick={() => {
              document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
           }} className="bg-[#131514] border border-[#4ca735] text-[#4ca735] hover:bg-[#4ca735] hover:text-white w-full md:w-auto px-8 py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(76,167,53,0.3)] active:scale-95">
              {t.button} <span>➔</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
