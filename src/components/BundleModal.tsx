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
  
  // Calculate bundle pricing
  const bundles = [
    { qty: 1, title: language === 'en' ? '1 Bottle' : '1 Bouteille', discount: 0, tag: null },
    { qty: 3, title: language === 'en' ? '3 Bottles' : '3 Bouteilles', discount: 0.15, tag: language === 'en' ? 'MOST POPULAR' : 'LE PLUS POPULAIRE' },
    { qty: 6, title: language === 'en' ? '6 Bottles' : '6 Bouteilles', discount: 0.25, tag: language === 'en' ? 'BEST VALUE' : 'MEILLEUR PRIX' },
  ];

  const handleAddToCart = () => {
    const bundle = bundles.find(b => b.qty === selectedBundle) || bundles[0];
    const discountedPrice = basePrice * (1 - bundle.discount);
    
    // Add multiple items to match the bundle quantity
    for (let i = 0; i < selectedBundle; i++) {
      addItem({
        id: product.id,
        name: product.name,
        description: product.description,
        price: discountedPrice,
        image: product.image,
        colorBg: product.colorBg,
      });
    }
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
          className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left side: Product Image */}
            <div className={`md:w-2/5 p-6 md:p-8 flex flex-col items-center justify-center ${product.colorBg}`}>
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover mix-blend-multiply scale-110 drop-shadow-xl" />
              <div className="mt-6 flex justify-center gap-1 text-amber-400">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-center font-bold text-gray-800 mt-2 opacity-70">
                {language === 'en' ? '1,000+ 5-Star Reviews' : 'Plus de 1000 avis 5 étoiles'}
              </p>
            </div>

            {/* Right side: Bundles */}
            <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
              <h2 className="text-2xl font-black text-[#1a2f1c] leading-tight mb-1">{product.name}</h2>
              <p className="text-gray-500 font-medium text-sm mb-6">{product.description}</p>

              <div className="space-y-3 flex-1">
                {bundles.map((bundle) => {
                  const itemPrice = basePrice * (1 - bundle.discount);
                  const totalPrice = itemPrice * bundle.qty;
                  const originalTotal = basePrice * bundle.qty;
                  const savings = originalTotal - totalPrice;
                  const isSelected = selectedBundle === bundle.qty;

                  return (
                    <div
                      key={bundle.qty}
                      onClick={() => setSelectedBundle(bundle.qty)}
                      className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected ? 'border-[#4ca735] bg-[#4ca735]/5 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {bundle.tag && (
                        <div className={`absolute -top-3.5 left-4 px-3 py-1 rounded-full text-xs font-black tracking-widest text-white shadow-md ${
                          bundle.qty === 6 ? 'bg-red-600' : 'bg-[#2b4224]'
                        }`}>
                          {bundle.tag}
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#4ca735]' : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#4ca735] rounded-full" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1a2f1c] text-lg">{bundle.title}</h4>
                          {bundle.discount > 0 && (
                            <p className="text-sm font-black text-[#4ca735] mt-0.5">
                              {language === 'en' ? 'SAVE' : 'ÉCONOMISEZ'} ${savings.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end">
                        {bundle.discount > 0 && (
                          <div className="text-sm font-bold text-gray-400 line-through mb-0.5">${originalTotal.toFixed(2)}</div>
                        )}
                        <div className="font-black text-2xl text-[#1a2f1c] leading-none">${totalPrice.toFixed(2)}</div>
                        <div className="text-xs text-gray-500 font-bold mt-1">
                          ${itemPrice.toFixed(2)} {language === 'en' ? '/ea' : '/ch'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-500 bg-red-50 py-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {language === 'en' ? 'HIGH DEMAND: ORDER NOW TO SHIP TODAY' : 'FORTE DEMANDE : COMMANDEZ MAINTENANT'}
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-xl bg-[#1a2f1c] hover:bg-black text-white font-black tracking-wide text-lg transition-transform active:scale-95 shadow-xl flex items-center justify-center gap-2"
                >
                  {language === 'en' ? 'ADD TO CART' : 'AJOUTER AU PANIER'}
                </button>
                
                <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 uppercase">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-[#4ca735]" />
                    {language === 'en' ? 'FAST SHIPPING' : 'EXPÉDITION RAPIDE'}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#4ca735]" />
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
