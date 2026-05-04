import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BlurText from './BlurText';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function CTASection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden bg-black">
      {/* Full-section background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Ashwagandha.jpeg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-20">
        <div className="w-full max-w-4xl h-[400px] bg-gradient-to-r from-[#4ca735]/20 via-transparent to-[#06b6d4]/20 blur-[60px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-center overflow-hidden"
        >
          {/* Dark overlay to keep text legible */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          {/* Subtle noise/texture overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="flex justify-center mb-8 relative z-10">
            <img src="/logo.png" alt="Iron Fuel Lab" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
          </div>

          <BlurText
            text={t.cta.heading}
            direction="bottom"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-4 justify-center"
          />
          <BlurText
            text={t.cta.description}
            direction="bottom"
            delay={300}
            className="text-base md:text-xl text-[#9faaa2] mb-10 max-w-2xl mx-auto font-medium justify-center"
          />

          <div className="flex justify-center">
            <button
              onClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-4 md:py-5 bg-white hover:bg-gray-100 text-black rounded-2xl font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 text-lg"
            >
              {t.cta.button}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
