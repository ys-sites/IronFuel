import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const UPSELL_OPTIONS = [
  {
    id: 'neurofuel-lions-mane-mushroom',
    name: "NeuroFuel Lion's Mane",
    description: 'Cognitive Focus',
    price: 44.99,
    image: '/Lion.jpeg',
    colorBg: 'bg-[#f5ebd7]',
    accent: '#eab300'
  },
  {
    id: 'gutfuel-gut-health',
    name: "GutFuel Gut Health",
    description: 'Digestive Balance',
    price: 39.99,
    image: '/Gut Health.jpeg',
    colorBg: 'bg-[#fff7ed]',
    accent: '#f97316'
  },
  {
    id: 'fury-hydrate-creatine-formula',
    name: "FURY Hydrate Creatine",
    description: 'Power & Performance',
    price: 40.49,
    image: '/Creatine Formula.jpeg',
    colorBg: 'bg-[#d5dfe2]',
    accent: '#334155'
  }
];

function getBundleInfo(item: CartItem): { qty: number; label: string } | null {
  if (item.quantity >= 6) return { qty: item.quantity, label: `${item.quantity} Bottles` };
  if (item.quantity === 3) return { qty: 3, label: '3 Bottles' };
  return null;
}

export default function SlideOutCart() {
  const { language } = useLanguage();
  const t = translations[language];
  const {
    items, removeItem, updateQuantity,
    subtotal, savings, bundleSavings, total,
    isSubscribed, toggleSubscribe,
    isOpen, closeCart, addItem, count, checkout
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  // Reset checkout state whenever cart is opened/closed to prevent stuck "Processing" state
  React.useEffect(() => {
    setIsCheckingOut(false);
  }, [isOpen]);

  React.useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setIsCheckingOut(false); // reset when user comes back via browser back button
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const availableUpsells = UPSELL_OPTIONS.filter(
    (opt) => !items.find((i) => i.id === opt.id)
  ).slice(0, 2);

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
                    {items.map((item) => {
                      const bundleInfo = getBundleInfo(item);
                      return (
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
                              {bundleInfo ? (
                                <p className="text-xs font-black text-[#4ca735] mt-0.5">
                                  {language === 'en' ? bundleInfo.label : bundleInfo.label.replace('Bottles', 'Bouteilles')}
                                </p>
                              ) : (
                                <p className="text-xs text-[#59685e] font-medium mt-0.5">{item.description}</p>
                              )}
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
                      );
                    })}
                  </AnimatePresence>

                  {/* ── Subscribe & Save Removed ── */}


                  {/* ── Upsells ── */}
                  {availableUpsells.length > 0 && (
                    <div className="border-t border-gray-100 pt-5 space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {language === 'en' ? 'Complete Your Stack' : 'Complétez votre protocole'}
                      </h4>
                      
                      <div className="space-y-3">
                        {availableUpsells.map((upsell) => (
                          <div 
                            key={upsell.id}
                            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:border-gray-200 transition-all group"
                          >
                            <div className="flex items-center gap-3 relative">
                              <div 
                                className="absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.2)]" 
                                style={{ backgroundColor: upsell.accent }}
                              />
                              <div className={`w-12 h-12 ${upsell.colorBg} rounded-lg overflow-hidden shrink-0`}>
                                <img
                                  src={upsell.image}
                                  alt={upsell.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover mix-blend-multiply scale-110"
                                />
                              </div>
                              <div>
                                <h5 className="font-bold text-[#1a2f1c] text-sm leading-tight">{upsell.name}</h5>
                                <span className="text-gray-500 font-bold text-xs">
                                  ${upsell.price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                addItem({
                                  id: upsell.id,
                                  name: upsell.name,
                                  description: upsell.description,
                                  price: upsell.price,
                                  image: upsell.image,
                                  colorBg: upsell.colorBg,
                                })
                              }
                              className="bg-[#f4f7f4] hover:bg-[#1a2f1c] text-[#1a2f1c] hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer active:scale-95"
                            >
                              {language === 'en' ? 'Add' : 'Ajouter'}
                            </button>
                          </div>
                        ))}
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
                  {bundleSavings > 0 && (
                    <div className="flex justify-between text-[#4ca735] font-semibold">
                      <span>{language === 'en' ? 'Bundle Savings' : 'Rabais lot'}</span>
                      <span>−${bundleSavings.toFixed(2)}</span>
                    </div>
                  )}
                  {isSubscribed && savings > bundleSavings && (
                    <div className="flex justify-between text-[#4ca735] font-semibold">
                      <span>{language === 'en' ? 'Subscribe & Save' : 'S\'abonner et Économiser'}</span>
                      <span>−${(savings - bundleSavings).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base text-[#1a2f1c] pt-1.5 border-t border-gray-100">
                    <span>{t.cart.total}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {isSubscribed && savings > bundleSavings && (
                  <p className="text-xs text-[#4ca735] font-semibold text-center bg-[#4ca735]/8 py-1.5 rounded-full">
                    {language === 'en' ? `You're saving $${savings.toFixed(2)} with Subscribe & Save!` : `Vous économisez $${savings.toFixed(2)} avec l'abonnement !`}
                  </p>
                )}

                <button 
                  type="button"
                  onClick={() => {
                    setIsCheckingOut(true);
                    checkout(() => setIsCheckingOut(false));
                  }}
                  disabled={isCheckingOut}
                  className="w-full bg-[#1a2f1c] hover:bg-black text-white py-4 rounded-2xl font-bold tracking-wide flex justify-center items-center gap-2 transition-all duration-200 shadow-xl active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isCheckingOut ? (language === 'en' ? 'Processing...' : 'Traitement...') : t.cart.checkout} {!isCheckingOut && <ArrowRight className="w-5 h-5" />}
                </button>

                {/* Guarantee & Shipping Section */}
                <div className="bg-[#f4f7f4] rounded-xl p-4 border border-[#eaf0ec] space-y-3">
                  {total < 50 ? (
                    <div>
                      <p className="text-xs font-bold text-[#59685e] mb-1.5">
                        {language === 'en'
                          ? ("Add $" + (50 - total).toFixed(2) + " more for FREE shipping")
                          : ("Ajoutez $" + (50 - total).toFixed(2) + " pour la livraison GRATUITE")}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-[#4ca735] h-1.5 rounded-full transition-all duration-500" style={{ width: Math.min(100, (total / 50) * 100) + "%" }} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs font-bold text-[#4ca735] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      {language === 'en' ? "You qualify for FREE shipping!" : "Vous avez droit a la livraison GRATUITE!"}
                    </p>
                  )}
                  <div className="flex items-center gap-3 pt-1 border-t border-[#eaf0ec]">
                    <ShieldCheck className="w-6 h-6 text-[#4ca735] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#1a2f1c] text-sm leading-tight">
                        {language === 'en' ? '60-Day Money Back Guarantee' : 'Garantie de remboursement de 60 jours'}
                      </h4>
                      <p className="text-[11px] text-[#59685e] font-medium leading-tight mt-0.5">
                        {language === 'en' ? 'Not satisfied? Get a full refund, no questions asked.' : 'Pas satisfait? Obtenez un remboursement complet, sans poser de questions.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#eaf0ec]/80">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#59685e] uppercase tracking-wider"><ShieldCheck className="w-3.5 h-3.5" /> {language === 'en' ? 'SECURE CHECKOUT' : 'PAIEMENT SÉCURISÉ'}</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#59685e] uppercase tracking-wider"><Truck className="w-3.5 h-3.5" /> {language === 'en' ? 'SHIPS IN 24H' : 'EXPÉDIÉ EN 24H'}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
