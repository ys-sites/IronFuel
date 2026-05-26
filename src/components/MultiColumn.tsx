import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function MultiColumn() {
  const { language } = useLanguage();
  const t = translations[language].multicolumn;

  const columns = [
    {
      img: "/Ashwagandha1.jpeg",
      title: t.col1Title,
      text: t.col1Text
    },
    {
      img: "/Lion.jpeg",
      title: t.col2Title,
      text: t.col2Text
    },
    {
      img: "/Gut Health.jpeg",
      title: t.col3Title,
      text: t.col3Text
    },
    {
      img: "/Creatine Formula.jpeg",
      title: t.col4Title,
      text: t.col4Text
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 text-black text-center border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 md:px-20">
        <h2 className="text-3xl md:text-[42px] font-bold leading-tight mb-4 font-display tracking-tight uppercase flex justify-center gap-2">
          <ShinyText text={t.heading} disabled={false} speed={2} color="#000000" shineColor="#4ca735" />
        </h2>
        <BlurText 
          as="p" 
          text={t.description} 
          className="text-sm md:text-base max-w-[700px] mx-auto mb-16 text-gray-600 font-medium" 
          delay={50} 
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-left">
          {columns.map((c, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              key={i} 
              className="flex flex-col items-center md:items-start gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50 hover:border-[#4ca735]/50 transition-colors shadow-sm cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-white mb-2">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover filter hover:scale-105 transition-all duration-700" />
              </div>
              <h3 className="font-bold text-lg text-center md:text-left tracking-wide uppercase text-black">{c.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed text-center md:text-left">{c.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center flex justify-center"
        >
          <button onClick={() => {
              document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
           }} className="bg-[#4ca735] hover:bg-[#3d862a] px-8 py-4 rounded-full font-bold text-white uppercase tracking-wider flex items-center gap-3 shadow-[0_4px_14px_0_rgba(76,167,53,0.39)] transition-all active:scale-95">
            {t.button} <span className="text-xl">➔</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

