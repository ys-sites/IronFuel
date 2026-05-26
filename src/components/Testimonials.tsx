import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import BlurText from './BlurText';
import ShinyText from './ShinyText';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const TESTIMONIALS_EN = [
  {
    name: "Alex M.",
    role: "Professional Athlete",
    quote: "The Creatine Hydration formula completely changed my recovery window. I'm bouncing back faster and pushing harder.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Sarah K.",
    role: "Software Engineer",
    quote: "NeuroFuel is exactly what I needed for deep focus blocks. Clean energy, no crash, pure mental clarity.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "James T.",
    role: "Marathon Runner",
    quote: "I've tried everything for gut health, but Digestive Equilibrium is the first thing that actually settled my stomach during high-volume weeks.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=13"
  },
  {
    name: "Elena R.",
    role: "Entrepreneur",
    quote: "ZenFuel is my evening ritual. Dropping the cortisol and actually getting deep REM sleep makes all the difference the next day.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=14"
  },
  {
    name: "Marcus W.",
    role: "Fitness Coach",
    quote: "The Isolate Protein mixes perfectly and delivers pure fuel. No bloating, just high-quality aminos driving real results.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=15"
  },
  {
    name: "David C.",
    role: "Triathlete",
    quote: "Absolutely phenomenal lineup of products. No proprietary blends, just transparent dosages that work exactly as advertised.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=16"
  }
];

const TESTIMONIALS_FR = [
  {
    name: "Alex M.",
    role: "Athlète Professionnel",
    quote: "La formule Créatine Hydratation a complètement changé ma fenêtre de récupération. Je récupère plus vite et je m'entraîne plus dur.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Sarah K.",
    role: "Ingénieure Logiciel",
    quote: "NeuroFuel est exactement ce dont j'avais besoin pour mes blocs de concentration profonde. Énergie propre, pas de crash, clarté mentale pure.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "James T.",
    role: "Marathonien",
    quote: "J'ai tout essayé pour la santé intestinale, mais Digestive Equilibrium est la première chose qui a vraiment apaisé mon estomac pendant les semaines à gros volume.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=13"
  },
  {
    name: "Elena R.",
    role: "Entrepreneuse",
    quote: "ZenFuel est mon rituel du soir. Faire baisser le cortisol et obtenir enfin un sommeil paradoxal profond fait toute la différence le lendemain.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=14"
  },
  {
    name: "Marcus W.",
    role: "Coach Sportif",
    quote: "La protéine Isolate se mélange parfaitement et fournit un carburant pur. Pas de ballonnements, juste des acides aminés de haute qualité pour de vrais résultats.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=15"
  },
  {
    name: "David C.",
    role: "Triathlète",
    quote: "Gamme de produits absolument phénoménale. Pas de mélanges propriétaires, juste des dosages transparents qui fonctionnent exactement comme annoncé.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=16"
  }
];

const SCROLL_DURATION = 40;

export default function Testimonials() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const currentTestimonials = language === 'en' ? TESTIMONIALS_EN : TESTIMONIALS_FR;

  return (
    <section id="testimonials" className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ca735] rounded-full blur-[150px] opacity-[0.05]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#eab300] rounded-full blur-[150px] opacity-[0.05]" />
      </div>

      <div className="max-w-[85rem] mx-auto w-full relative z-10 px-4 md:px-12 mb-16 md:mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-xs font-semibold mb-6 text-black tracking-wider uppercase backdrop-blur-sm">
            {language === 'en' ? "Community Verified" : "Vérifié par la Communauté"}
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-4xl lg:text-7xl font-extrabold tracking-tighter text-black mb-6 flex justify-center text-center">
            <ShinyText text={t.nav.testimonials} disabled={false} speed={2} color="#000000" shineColor="#4ca735" />
          </h2>
        </motion.div>
      </div>

      {/* Scrolling track — pauses on hover */}
      <div
        className="relative w-full flex overflow-x-hidden pt-8 pb-12 cursor-default hover-pause"
      >
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <div
          className="flex gap-6 md:gap-8 pr-6 md:pr-8 w-max animate-marquee"
        >
          {[...currentTestimonials, ...currentTestimonials].map((test, index) => (
            <div
              key={index}
              className="w-[240px] sm:w-[300px] md:w-[380px] shrink-0 bg-gray-50 border border-gray-200 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#eab300] fill-current" />
                  ))}
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium tracking-tight mb-7">
                  "{test.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.name}
                  loading="lazy"
                  decoding="async"
                  className="w-11 h-11 rounded-full border-2 border-gray-200 object-cover"
                />
                <div>
                  <h4 className="text-black font-bold tracking-tight text-sm">{test.name}</h4>
                  <p className="text-gray-500 text-xs">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
