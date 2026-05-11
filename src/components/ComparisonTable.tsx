import React from 'react';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ComparisonTable() {
  const { language } = useLanguage();

  const features = language === 'en' ? [
    { name: "Premium Clinical Dosing", us: true, them: false },
    { name: "No Proprietary Blends", us: true, them: false },
    { name: "Zero Artificial Fillers", us: true, them: false },
    { name: "Fast Absorption Formula", us: true, them: false },
    { name: "60-Day Guarantee", us: true, them: false },
  ] : [
    { name: "Dosage Clinique Premium", us: true, them: false },
    { name: "Aucun Mélange Exclusif", us: true, them: false },
    { name: "Zéro Remplisseur Artificiel", us: true, them: false },
    { name: "Formule d'Absorption Rapide", us: true, them: false },
    { name: "Garantie 60 Jours", us: true, them: false },
  ];

  return (
    <section className="py-20 px-4 bg-white font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2f1c] mb-4">
            {language === 'en' ? 'Why IronFuel is Different' : 'Pourquoi IronFuel est Différent'}
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
            {language === 'en' ? "Stop wasting money on under-dosed supplements. See how we stack up against the industry standard." : "Ne gaspillez plus votre argent sur des suppléments sous-dosés. Voyez comment nous nous comparons aux standards de l'industrie."}
          </p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100 p-4 md:p-6">
            <div className="col-span-1"></div>
            <div className="col-span-1 text-center font-black text-xl md:text-2xl text-[#1a2f1c]">IRONFUEL</div>
            <div className="col-span-1 text-center font-bold text-gray-400 text-base md:text-lg">
              {language === 'en' ? 'OTHERS' : 'AUTRES'}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {features.map((feature, idx) => (
              <div key={idx} className="grid grid-cols-3 p-4 md:p-6 items-center hover:bg-gray-50/50 transition-colors">
                <div className="col-span-1 font-bold text-[#1a2f1c] text-sm md:text-base">
                  {feature.name}
                </div>
                <div className="col-span-1 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#4ca735]/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#4ca735]" strokeWidth={3} />
                  </div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <X className="w-6 h-6 text-gray-300" strokeWidth={2} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
