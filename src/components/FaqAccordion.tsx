import { useState } from "react";
import { ChevronDown } from "lucide-react";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLanguage();
  const t = translations[language].faq;

  const faqs = [
    {
      q: t.q1,
      a: t.a1
    },
    {
      q: t.q2,
      a: t.a2
    },
    {
      q: t.q3,
      a: t.a3
    },
    {
      q: t.q4,
      a: t.a4
    }
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24 border-t border-b border-gray-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#4ca735]/10 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row gap-10 lg:gap-16 items-start relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[45%] md:sticky md:top-24 mb-8 md:mb-0"
        >
          <div className="rounded-2xl shadow-xl p-4 bg-white border border-gray-200">
            <img src="/guy.jpg" alt="FAQ" className="w-full rounded-xl object-cover max-h-[280px] md:max-h-none object-top" />
          </div>
        </motion.div>
        
        <div className="w-full md:w-[55%]">
          <h2 className="text-3xl md:text-[42px] font-bold text-black mb-2 leading-tight font-display tracking-tight uppercase">
            <ShinyText text={t.headingPart1} disabled={false} speed={2} color="#000000" shineColor="#4ca735" />
          </h2>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-[42px] font-bold leading-tight font-display tracking-tight uppercase text-[#4ca735] mb-4"
          >
            <ShinyText text={t.headingPart2} disabled={false} speed={2} color="#4ca735" shineColor="#000000" />
          </motion.div>
          <BlurText 
            as="p" 
            text={t.description} 
            className="text-gray-600 mb-8 font-medium" 
            delay={50} 
          />

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                key={i} 
                className={`border rounded-lg overflow-hidden transition-colors duration-300 ${openIndex === i ? 'border-[#4ca735]/50 bg-white shadow-sm' : 'border-gray-200 bg-gray-50'}`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`w-full text-left p-5 flex justify-between items-center transition-colors ${openIndex === i ? "text-[#4ca735]" : "text-black hover:bg-white"}`}
                >
                  <span className="font-bold tracking-wide">{faq.q}</span>
                  <ChevronDown className={`shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-[#4ca735]" : "text-gray-500"}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="p-5 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100 font-medium">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10"
          >
            <button onClick={() => {
              document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
           }} className="bg-[#4ca735] hover:bg-[#3d862a] w-full md:w-auto px-10 py-4 rounded-full font-bold text-white uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(76,167,53,0.39)] active:scale-95 transition-all">
              {t.button} <span>➔</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

