import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Truck, Star, CheckCircle2 } from "lucide-react";
import { useCart, getItemPricing, BUNDLE_VARIANT_MAP } from '../context/CartContext';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  React.useEffect(() => {
    setSelectedImageIndex(0);
  }, [product?.id]);

  React.useEffect(() => {
    if (product) {
      const pricing = getItemPricing(product.id, selectedBundle);
      const value = pricing.totalPrice;
      
      const mapping = BUNDLE_VARIANT_MAP[product.id];
      const handle = mapping ? mapping.productHandle : product.id;

      if (window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_name: product.name,
          content_ids: [handle],
          content_type: 'product',
          value: value,
          currency: 'USD'
        });
      }
    }
  }, [product?.id, selectedBundle]);

  if (!product) return null;

  const basePrice = parseFloat(product.price);
  const singleOriginalPrice = parseFloat(product.originalPrice || product.compareAtPrice || product.price);
  
  // Calculate bundle pricing
  const bundles = [
    { qty: 1, title: language === 'en' ? '1 Bottle' : '1 Bouteille', discount: 0, tag: null },
    { qty: 3, title: language === 'en' ? '3 Bottles' : '3 Bouteilles', discount: 0.10, tag: language === 'en' ? 'SAVE ANOTHER 10%' : 'ÉCONOMISEZ 10% DE PLUS' },
    { qty: 6, title: language === 'en' ? '6 Bottles' : '6 Bouteilles', discount: 0.15, tag: language === 'en' ? 'SAVE ANOTHER 15%' : 'ÉCONOMISEZ 15% DE PLUS' },
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

  const images = product?.images && product.images.length > 0 ? product.images : [product.image];

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
            className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-colors z-20 shadow-sm border border-black/5"
          >
            <X className="w-4 h-4 text-black" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left side: Product Image Gallery */}
            <div className={`w-full md:w-2/5 p-6 md:p-8 flex flex-col items-center justify-center ${product.colorBg}`}>
              <div className="w-full max-w-[200px] md:max-w-none aspect-square flex items-center justify-center bg-transparent">
                <img 
                  src={images[selectedImageIndex]} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply scale-110 drop-shadow-xl transition-all duration-300" 
                />
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-1.5 mt-6 overflow-x-auto pb-1 max-w-full justify-center scrollbar-none">
                  {images.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-11 h-11 md:w-12 md:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-white shrink-0 ${
                        selectedImageIndex === i ? 'border-[#4ca735] shadow-sm' : 'border-transparent opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-5 flex justify-center gap-1 text-amber-400">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-center font-bold text-gray-800 mt-1 opacity-70">
                {language === 'en' ? '1,000+ 5-Star Reviews' : 'Plus de 1000 avis 5 étoiles'}
              </p>
            </div>

            {/* Right side: Bundles */}
            <div className="w-full md:w-3/5 p-5 md:p-8 flex flex-col">
              {/* Mobile-only compact header */}
              <div className="md:hidden pb-3 mb-2 border-b border-gray-100">
                <h2 className="text-xl font-black text-[#1a2f1c] leading-tight">{product.marketingName || product.name}</h2>
                <p className="text-gray-500 font-medium text-xs mt-1">{product.description}</p>
              </div>

              <h2 className="hidden md:block text-2xl font-black text-[#1a2f1c] leading-tight mb-1">{product.marketingName || product.name}</h2>
              <p className="hidden md:block text-gray-500 font-medium text-sm mb-6">{product.description}</p>

              <div className="space-y-2.5 md:space-y-3 flex-1">
                {bundles.map((bundle) => {
                  const pricing = getItemPricing(product.id, bundle.qty);
                  const totalPrice = pricing.totalPrice;
                  const originalTotal = pricing.originalTotalPrice;
                  const savings = pricing.savings;
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
                                ? `${language === 'en' ? 'SAVE' : 'ÉCONOMISEZ'} ${Math.round((singleOriginalPrice - basePrice) / singleOriginalPrice * 100)}% ($${(singleOriginalPrice - basePrice).toFixed(2)})`
                                : `${language === 'en' ? 'SAVE ANOTHER' : 'ÉCONOMISEZ'} ${(bundle.discount * 100).toFixed(0)}%${language === 'en' ? '' : ' DE PLUS'} ($${savings.toFixed(2)})`}
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
