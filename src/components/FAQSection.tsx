import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import BlurText from './BlurText';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const FAQS_EN = [
  {
    question: "Do you use independent 3rd-party testing?",
    answer: "Yes. Every single batch is independently tested by ISO-certified third-party laboratories for heavy metals, microbial contaminants, and active compound verification. You can scan the QR code on any product to view its specific Certificate of Analysis (CoA)."
  },
  {
    question: "When will I start feeling the effects?",
    answer: "This depends on the product. Our NeuroFuel (Lion's Mane) and Creatine formulas often present noticeable cognitive and physical endurance benefits within the first 3-5 days. Adaptogens like ZenFuel (Ashwagandha) build cumulatively in your system; peak cortisol regulation and deep sleep benefits typically manifest around days 14-21 of consistent use."
  },
  {
    question: "Are your formulas Prop-Blend free?",
    answer: "100%. We despise proprietary blends. Every ingredient we use is explicitly listed with its exact milligram dosage and extraction method. You deserve to know exactly what is fueling your body."
  },
  {
    question: "What is your return policy and guarantee?",
    answer: "We stand behind our medical-grade formulas with an ironclad 60-Day Output Guarantee. If you use our product consistently for 30 days and do not see a measurable increase in your performance or recovery, we will refund 100% of your purchase. No questions asked."
  },
  {
    question: "How does Subscribe & Save work?",
    answer: "Subscribe & Save locks in a permanent 15% discount and grants you free expedited shipping. You control the frequency (every 30, 45, or 60 days) via our customer portal. You can pause, skip a delivery, or cancel instantly with two clicks. Zero hidden fees."
  }
];

const FAQS_FR = [
  {
    question: "Utilisez-vous des tests tiers indépendants ?",
    answer: "Oui. Chaque lot est testé indépendamment par des laboratoires tiers certifiés ISO pour les métaux lourds, les contaminants microbiens et la vérification des composés actifs. Vous pouvez scanner le code QR sur n'importe quel produit pour consulter son certificat d'analyse (CoA) spécifique."
  },
  {
    question: "Quand commencerai-je à ressentir les effets ?",
    answer: "Cela dépend du produit. Nos formules NeuroFuel (Lion's Mane) et Créatine présentent souvent des avantages cognitifs et d'endurance physique notables dès les 3-5 premiers jours. Les adaptogènes comme ZenFuel (Ashwagandha) s'accumulent dans votre système ; la régulation du cortisol et les bienfaits du sommeil profond se manifestent généralement vers les jours 14-21 d'utilisation constante."
  },
  {
    question: "Vos formules sont-elles sans mélanges propriétaires ?",
    answer: "100 %. Nous détestons les mélanges propriétaires. Chaque ingrédient que nous utilisons est explicitement répertorié avec son dosage exact en milligrammes et sa méthode d'extraction. Vous méritez de savoir exactement ce qui alimente votre corps."
  },
  {
    question: "Quelle est votre politique de retour et votre garantie ?",
    answer: "Nous soutenons nos formules de qualité médicale avec une garantie de performance de 60 jours. Si vous utilisez notre produit de manière constante pendant 30 jours et ne constatez pas d'augmentation mesurable de votre performance ou de votre récupération, nous vous rembourserons 100 % de votre achat. Sans poser de questions."
  },
  {
    question: "Comment fonctionne l'abonnement ?",
    answer: "L'abonnement verrouille une remise permanente de 15 % et vous offre la livraison express gratuite. Vous contrôlez la fréquence (tous les 30, 45 ou 60 jours) via notre portail client. Vous pouvez mettre en pause, sauter une livraison ou annuler instantanément en deux clics. Zéro frais cachés."
  }
];

export default function FAQSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const currentFaqs = language === 'en' ? FAQS_EN : FAQS_FR;

  return (
    <section id="faq" className="bg-white py-24 md:py-40 px-4 md:px-8 border-t border-[#eaf0ec] overflow-hidden">
      <div className="max-w-[85rem] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Image with Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative shrink-0"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] aspect-[4/5] md:aspect-square lg:aspect-video border border-gray-100">
               <img 
                 src="/guy.jpg" 
                 alt="Athlete performing" 
                 className="w-full h-full object-cover object-center"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative background aura */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#4ca735]/15 rounded-full blur-[100px] -z-10"
            />
          </motion.div>

          {/* Right Side: FAQs */}
          <div className="w-full lg:w-1/2 pt-4 md:pt-0">
            <div className="mb-14 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-5 py-2 rounded-full border border-[#4ca735]/20 text-[10px] md:text-xs font-black mb-8 text-[#4ca735] tracking-[0.2em] uppercase bg-[#4ca735]/5">
                  {language === 'en' ? "Performance Knowledge Base" : "Base de Connaissances Performance"}
                </div>
                <BlurText 
                   text={t.faq.heading}
                   direction="bottom"
                   className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-[#1a2f1c] mb-6 leading-[0.95]"
                />
                <BlurText 
                   text={t.faq.description}
                   direction="bottom"
                   delay={300}
                   className="text-[#59685e] font-serif italic text-lg lg:text-xl"
                />
              </motion.div>
            </div>

            <div className="space-y-5">
              {currentFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-[#eaf0ec] rounded-[1.5rem] md:rounded-[2rem] bg-[#f4f7f4] overflow-hidden transition-all duration-500"
                    style={{
                      backgroundColor: isOpen ? '#ffffff' : '#f4f7f4',
                      boxShadow: isOpen ? '0 20px 60px -10px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-7 md:p-9 text-left cursor-pointer group"
                    >
                      <span className={`font-bold text-xl md:text-2xl pr-12 transition-colors duration-300 leading-tight ${isOpen ? 'text-[#1a2f1c]' : 'text-[#2b4224] group-hover:text-[#4ca735]'}`}>
                        {faq.question}
                      </span>
                      <div className={`shrink-0 transition-all duration-500 ${isOpen ? 'rotate-180 text-[#4ca735] scale-125' : 'text-[#9faaa2] group-hover:text-[#4ca735]'}`}>
                        {isOpen ? <Minus className="w-6 h-6 md:w-7 md:h-7" /> : <Plus className="w-6 h-6 md:w-7 md:h-7" />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-7 md:px-9 pb-9 md:pb-10 text-[#59685e] font-medium leading-relaxed md:text-xl border-t border-gray-100/50 mt-2 pt-8">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
