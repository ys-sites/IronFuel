import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface StickyActionBarProps {
  isVisible: boolean;
}

export default function StickyActionBar({ isVisible }: StickyActionBarProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const { openCart, count } = useCart();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[45] w-[95%] max-w-lg"
        >
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-full p-2 pr-3 flex items-center justify-between">
            <div className="flex items-center gap-3 pl-2 sm:pl-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#e2eadc] to-[#c1ddcb] rounded-full overflow-hidden border border-white/50 shrink-0 shadow-inner">
                <img
                  src="/Ashwagandha1.jpeg"
                  alt="ZenFuel Ashwagandha"
                  className="w-full h-full object-cover mix-blend-multiply scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#111811] leading-tight">
                  ZenFuel Ashwagandha
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#4ca735]">
                  {t.products.bestSeller}
                </span>
              </div>
            </div>

            <button
              onClick={openCart}
              className="relative bg-[#1a2f1c] hover:bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:block">{t.products.addtoCart}</span>
              <span className="sm:hidden">{language === 'en' ? 'Add' : 'Ajout'}</span>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#4ca735] rounded-full text-[10px] font-black flex items-center justify-center text-white px-1">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
