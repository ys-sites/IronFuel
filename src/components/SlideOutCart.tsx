import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const UPSELL = {
  id: 'neurofuel-lions-mane',
  name: "NeuroFuel – Lion's Mane",
  description: 'Cognitive Focus',
  price: 39.99,
  salePrice: 14.99,
  image: '/NeuroFuel.png',
  colorBg: 'bg-[#f5ebd7]',
};

export default function SlideOutCart() {
  const { language } = useLanguage();
  const t = translations[language];
  const {
    items, removeItem, updateQuantity,
    subtotal, savings, total,
    isSubscribed, toggleSubscribe,
    isOpen, closeCart, addItem, count,
  } = useCart();

  const hasUpsell = !items.find((i) => i.id === UPSELL.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-black italic tracking-tighter text-[#1a2f1c] flex items-center gap-2 uppercase">
                <ShoppingBag className="w-5 h-5" />
                {t.cart.title}
                {count > 0 && (
                  <span className="text-sm font-bold not-italic bg-[#1a2f1c] text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* ── Empty state ── */
                <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#f4f7f4] flex items-center justify-center">
                    <ShoppingCart className="w-9 h-9 text-[#c1ddcb]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a2f1c] mb-2">{t.cart.empty}</h3>
                    <p className="text-sm text-[#59685e] font-medium leading-relaxed">
                      {t.cart.emptyDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      closeCart();
                      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-2 bg-[#1a2f1c] hover:bg-black text-white px-7 py-3 rounded-full font-bold text-sm tracking-wide transition-colors"
                  >
                    {language === 'en' ? 'Shop Products' : 'Acheter nos Produits'}
                  </button>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  {/* ── Cart items ── */}
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, transition: { duration: 0.22 } }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 p-4 bg-[#f4f7f4] rounded-2xl border border-[#eaf0ec]"
                      >
                        <div className={`w-20 h-24 ${item.colorBg} rounded-xl overflow-hidden shrink-0`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <h4 className="font-bold text-[#1a2f1c] leading-tight text-sm truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-[#59685e] font-medium mt-0.5">{item.description}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-gray-100">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-gray-400 hover:text-black transition-colors p-0.5"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-400 hover:text-black transition-colors p-0.5"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-[#1a2f1c] text-sm">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              {item.quantity > 1 && (
                                <p className="text-[10px] text-[#9faaa2]">${item.price.toFixed(2)} {language === 'en' ? 'each' : 'chacun'}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* ── Subscribe & Save ── */}
                  <div className="relative border border-[#4ca735]/30 bg-[#4ca735]/5 rounded-2xl p-4 overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#4ca735] text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-bl-xl tracking-wide">
                      {language === 'en' ? 'Recommended' : 'Recommandé'}
                    </div>
                    <h5 className="font-bold text-[#2b4224] flex items-center gap-1.5 text-sm mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#4ca735]" /> {language === 'en' ? 'Subscribe & Save 15%' : 'S\'abonner et Économiser 15%'}
                    </h5>
                    <p className="text-xs text-[#59685e] mb-3 leading-relaxed">
                      {language === 'en' ? 'Lock in a permanent 15% discount with free shipping. Cancel anytime.' : 'Bénéficiez d\'une remise permanente de 15% avec livraison gratuite. Annulez à tout moment.'}
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div
                        onClick={toggleSubscribe}
                        className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${
                          isSubscribed ? 'bg-[#4ca735]' : 'bg-gray-200'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                            isSubscribed ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </div>
                      <span className="text-sm font-semibold text-[#1a2f1c]">
                        {isSubscribed
                          ? `${language === 'en' ? 'Subscribe Monthly' : 'S\'abonner mensuellement'} ($${(subtotal * 0.85).toFixed(2)}/mo)`
                          : (language === 'en' ? 'One-time purchase' : 'Achat unique')}
                      </span>
                    </label>
                  </div>

                  {/* ── Upsell ── */}
                  {hasUpsell && (
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        {language === 'en' ? 'Complete Your Stack' : 'Complétez votre protocole'}
                      </h4>
                      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:border-[#eab300]/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 relative">
                          <div className="absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full bg-[#eab300] shadow-[0_0_6px_#eab300]" />
                          <div className="w-12 h-12 bg-[#f5ebd7] rounded-lg overflow-hidden shrink-0">
                            <img
                              src={UPSELL.image}
                              alt={UPSELL.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover mix-blend-multiply scale-110"
                            />
                          </div>
                          <div>
                            <h5 className="font-bold text-[#1a2f1c] text-sm leading-tight">{UPSELL.name}</h5>
                            <span className="text-[#eab300] font-bold text-xs">
                              + ${UPSELL.salePrice.toFixed(2)}{' '}
                              <span className="line-through text-gray-300 font-normal ml-0.5">
                                ${UPSELL.price.toFixed(2)}
                              </span>
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            addItem({
                              id: UPSELL.id,
                              name: UPSELL.name,
                              description: UPSELL.description,
                              price: UPSELL.salePrice,
                              image: UPSELL.image,
                              colorBg: UPSELL.colorBg,
                            })
                          }
                          className="bg-gray-100 group-hover:bg-[#eab300] text-gray-600 group-hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0"
                        >
                          {language === 'en' ? 'Add' : 'Ajouter'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer — only when cart has items */}
            {items.length > 0 && (
              <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] space-y-3">
                {/* Order summary */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#59685e]">
                    <span>{language === 'en' ? 'Subtotal' : 'Sous-total'} ({count} {count === 1 ? (language === 'en' ? 'item' : 'article') : (language === 'en' ? 'items' : 'articles')})</span>
                    <span className="font-semibold text-[#1a2f1c]">${subtotal.toFixed(2)}</span>
                  </div>
                  {isSubscribed && (
                    <div className="flex justify-between text-[#4ca735] font-semibold">
                      <span>{language === 'en' ? 'Subscribe & Save (15%)' : 'S\'abonner et Économiser (15%)'}</span>
                      <span>−${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base text-[#1a2f1c] pt-1.5 border-t border-gray-100">
                    <span>{t.cart.total}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {isSubscribed && (
                  <p className="text-xs text-[#4ca735] font-semibold text-center bg-[#4ca735]/8 py-1.5 rounded-full">
                    {language === 'en' ? `You're saving $${savings.toFixed(2)} with Subscribe & Save!` : `Vous économisez $${savings.toFixed(2)} avec l'abonnement !`}
                  </p>
                )}

                <button className="w-full bg-[#1a2f1c] hover:bg-black text-white py-4 rounded-2xl font-bold tracking-wide flex justify-center items-center gap-2 transition-all duration-200 shadow-xl active:scale-[0.98] cursor-pointer">
                  {t.cart.checkout} <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex justify-center items-center gap-5 pt-1 text-[10px] font-bold text-gray-300 select-none">
                  <span className="flex items-center gap-1 uppercase"><ShieldCheck className="w-3 h-3" /> {language === 'en' ? 'SSL SECURE' : 'SÉCURISÉ SSL'}</span>
                  <span className="flex items-center gap-1 uppercase"><ShieldCheck className="w-3 h-3" /> {language === 'en' ? '60-DAY GUARANTEE' : 'GARANTIE 60 JOURS'}</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
