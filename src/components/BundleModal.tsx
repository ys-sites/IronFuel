import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Truck, Star, CheckCircle2 } from "lucide-react";
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface BundleModalProps {
  product: any | null;
  onClose: () => void;
}

export default function BundleModal({ product, onClose }: BundleModalProps) {
  const { addItem, openCart } = useCart();
  const { language } = useLanguage();
  // Pre-select the most popular (3 bottles)
  const [selectedBundle, setSelectedBundle] = useState(3);

  if (!product) return null;

  const basePrice = parseFloat(product.price);
  const singleOriginalPrice = parseFloat(product.originalPrice || product.compareAtPrice || product.price);
  
  // Calculate bundle pricing
  const bundles = [
    { qty: 1, title: language === 'en' ? '1 Bottle' : '1 Bouteille', discount: 0, tag: null },
    { qty: 3, title: language === 'en' ? '3 Bottles' : '3 Bouteilles', discount: 0.10, tag: language === 'en' ? 'SAVE 10%' : 'ÉCONOMISEZ 10%' },
    { qty: 6, title: language === 'en' ? '6 Bottles' : '6 Bouteilles', discount: 0.15, tag: language === 'en' ? 'SAVE 15%' : 'ÉCONOMISEZ 15%' },
  ];

  const bundleHandleMap: Record<string, Record<number, string>> = {
    'zenfuel-ashwagandha':           { 3: 'zenfuel-ashwagandha-for-deep-recovery-and-balance', 6: 'zenfuel-ashwagandha-bundle-6' },
    'neurofuel-lions-mane-mushroom': { 3: 'neurofuel-lions-mane-for-peak-mental-clarity',       6: 'neurofuel-lions-mane-bundel-6' },
    'gutfuel-gut-health':            { 3: 'gutfuel-for-daily-digestive-balance-and-comfort',    6: 'gutfuel-bundel-6' },
    'fury-isolate-vanilla':          { 3: 'fury-isolate-vanilla-for-rapid-muscle-growth',       6: 'fury-isolate-bundel-6' },
    'fury-hydrate-creatine-formula': { 3: 'fury-hydrate-creatine-for-maximum-power-and-endurance', 6: 'fury-hydrate-creatine-bundel-6' },
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: basePrice,
      image: product.image,
      colorBg: product.colorBg,
      quantity: selectedBundle,
    });
    onClose();
    openCart();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left side: Product Image — hidden on mobile */}
            <div className={`hidden md:flex md:w-2/5 p-8 flex-col items-center justify-center ${product.colorBg}`}>
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover mix-blend-multiply scale-110 drop-shadow-xl" />
              <div className="mt-6 flex justify-center gap-1 text-amber-400">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-center font-bold text-gray-800 mt-2 opacity-70">
                {language === 'en' ? '1,000+ 5-Star Reviews' : 'Plus de 1000 avis 5 étoiles'}
              </p>
            </div>

            {/* Right side: Bundles */}
            <div className="w-full md:w-3/5 p-5 md:p-8 flex flex-col">
              {/* Mobile-only compact header with thumbnail */}
              <div className={`flex md:hidden items-center gap-3 -mx-5 -mt-5 px-5 pt-4 pb-3 mb-3 ${product.colorBg}`}>
                <img src={product.image} alt={product.name} className="w-14 h-14 object-cover mix-blend-multiply rounded-xl shrink-0" />
                <div>
                  <h2 className="text-base font-black text-[#1a2f1c] leading-tight">{product.marketingName || product.name}</h2>
                  <div className="flex gap-0.5 mt-0.5 text-amber-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
              </div>

              <h2 className="hidden md:block text-2xl font-black text-[#1a2f1c] leading-tight mb-1">{product.marketingName || product.name}</h2>
              <p className="hidden md:block text-gray-500 font-medium text-sm mb-6">{product.description}</p>

              <div className="space-y-2.5 md:space-y-3 flex-1">
                {bundles.map((bundle) => {
                  const originalTotal = basePrice * bundle.qty;
                  const totalPrice = Math.round(originalTotal * (1 - bundle.discount) * 100) / 100;
                  const savings = Math.round((originalTotal - totalPrice) * 100) / 100;
                  const itemPrice = totalPrice / bundle.qty;
                  const isSelected = selectedBundle === bundle.qty;
                  const isSingleWithDiscount = bundle.qty === 1 && singleOriginalPrice > basePrice;

                  return (
                    <div
                      key={bundle.qty}
                      onClick={() => setSelectedBundle(bundle.qty)}
                      className={`relative flex items-center justify-between p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected ? 'border-[#4ca735] bg-[#4ca735]/5 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {bundle.tag && (
                        <div className={`absolute -top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest text-white shadow-md ${
                          bundle.qty === 6 ? 'bg-red-600' : 'bg-[#2b4224]'
                        }`}>
                          {bundle.tag}
                        </div>
                      )}

                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#4ca735]' : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#4ca735] rounded-full" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1a2f1c] text-sm md:text-lg">{bundle.title}</h4>
                          {(bundle.discount > 0 || isSingleWithDiscount) && (
                            <p className="text-xs md:text-sm font-black text-[#4ca735] mt-0.5">
                              {isSingleWithDiscount
                                ? `${language === 'en' ? 'SAVE' : 'ÉCONOMISEZ'} $${(singleOriginalPrice - basePrice).toFixed(2)}`
                                : `${language === 'en' ? 'SAVE' : 'ÉCONOMISEZ'} ${(bundle.discount * 100).toFixed(0)}% ($${savings.toFixed(2)})`}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end">
                        {(bundle.discount > 0 || isSingleWithDiscount) && (
                          <div className="text-xs font-bold text-gray-400 line-through mb-0.5">
                            ${isSingleWithDiscount ? singleOriginalPrice.toFixed(2) : originalTotal.toFixed(2)}
                          </div>
                        )}
                        <div className="font-black text-lg md:text-2xl text-[#1a2f1c] leading-none">${totalPrice.toFixed(2)}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 font-bold mt-0.5">
                          ${itemPrice.toFixed(2)} {language === 'en' ? '/ea' : '/ch'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 md:mt-6 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-500 bg-red-50 py-1.5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {language === 'en' ? 'HIGH DEMAND: ORDER NOW TO SHIP TODAY' : 'FORTE DEMANDE : COMMANDEZ MAINTENANT'}
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 md:py-4 rounded-xl bg-[#1a2f1c] hover:bg-black text-white font-black tracking-wide text-base md:text-lg transition-transform active:scale-95 shadow-xl flex items-center justify-center gap-2"
                >
                  {language === 'en' ? 'ADD TO CART' : 'AJOUTER AU PANIER'}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 uppercase">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4ca735]" />
                    {language === 'en' ? 'FAST SHIPPING' : 'EXPÉDITION RAPIDE'}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4ca735]" />
                    {language === 'en' ? '60-DAY GUARANTEE' : 'GARANTIE 60 JOURS'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
