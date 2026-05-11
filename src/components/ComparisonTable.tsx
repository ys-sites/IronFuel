import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ComparisonTable() {
  const { language } = useLanguage();

  const categories = language === 'en' ? [
    {
      label: 'Quality & Sourcing',
      rows: [
        { name: 'Grass-Fed / Organic Ingredients', us: true, them: false },
        { name: 'Third-Party Lab Tested', us: true, them: false },
        { name: 'No Artificial Fillers or Dyes', us: true, them: false },
      ]
    },
    {
      label: 'Formula Integrity',
      rows: [
        { name: 'Premium Clinical Dosing', us: true, them: false },
        { name: 'No Proprietary Blends', us: true, them: false },
        { name: 'Transparent Full Labeling', us: true, them: false },
        { name: 'Fast Absorption Formula', us: true, them: false },
      ]
    },
    {
      label: 'Customer Promise',
      rows: [
        { name: '60-Day Money Back Guarantee', us: true, them: false },
        { name: 'Made in USA (GMP Certified)', us: true, them: false },
      ]
    }
  ] : [
    {
      label: 'Qualite & Sourcing',
      rows: [
        { name: "Ingredients Biologiques / Nourris a l'Herbe", us: true, them: false },
        { name: 'Teste par un Laboratoire Tiers', us: true, them: false },
        { name: 'Sans Charges Artificielles ni Colorants', us: true, them: false },
      ]
    },
    {
      label: 'Integrite de la Formule',
      rows: [
        { name: 'Dosage Clinique Premium', us: true, them: false },
        { name: 'Aucun Melange Exclusif', us: true, them: false },
        { name: 'Etiquetage Complet et Transparent', us: true, them: false },
        { name: "Formule d'Absorption Rapide", us: true, them: false },
      ]
    },
    {
      label: 'Promesse Client',
      rows: [
        { name: 'Garantie de Remboursement 60 Jours', us: true, them: false },
        { name: 'Fabrique aux USA (Certifie GMP)', us: true, them: false },
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#f4f7f4] font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#2b4224]/30 text-xs font-semibold mb-4 text-[#2b4224] tracking-wider uppercase">
            {language === 'en' ? 'The IronFuel Difference' : 'La Difference IronFuel'}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2f1c] mb-4">
            {language === 'en' ? 'Why IronFuel Outperforms the Rest' : 'Pourquoi IronFuel Surpasse les Autres'}
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
            {language === 'en'
              ? "Stop paying for under-dosed, filler-packed supplements. See exactly where we stand apart."
              : "Arretez de payer pour des supplements sous-doses et bourres de charges. Voyez exactement ce qui nous distingue."}
          </p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
          {/* Header */}
          <div className="grid grid-cols-3 p-4 md:p-6 border-b border-gray-100">
            <div className="col-span-1" />
            <div className="col-span-1 text-center">
              <div className="inline-flex flex-col items-center gap-1">
                <span className="font-black text-xl md:text-2xl text-[#1a2f1c]">IRONFUEL</span>
                <span className="text-[10px] font-bold text-[#4ca735] bg-[#4ca735]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {language === 'en' ? 'Premium Grade' : 'Grade Premium'}
                </span>
              </div>
            </div>
            <div className="col-span-1 text-center font-bold text-gray-400 text-base md:text-lg self-center">
              {language === 'en' ? 'OTHERS' : 'AUTRES'}
            </div>
          </div>

          {/* Category rows */}
          {categories.map((cat, ci) => (
            <div key={ci}>
              <div className="bg-gray-50/80 px-4 md:px-6 py-2.5 border-y border-gray-100">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{cat.label}</span>
              </div>
              <div className="divide-y divide-gray-100">
                {cat.rows.map((feature, idx) => (
                  <div key={idx} className="grid grid-cols-3 p-4 md:p-5 items-center hover:bg-gray-50/50 transition-colors">
                    <div className="col-span-1 font-semibold text-[#1a2f1c] text-sm md:text-base">
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
          ))}

          {/* Footer guarantee callout */}
          <div className="bg-[#1a2f1c] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#4ca735] shrink-0" />
              <div>
                <p className="text-white font-black text-sm md:text-base">
                  {language === 'en' ? '60-Day Money Back Guarantee' : 'Garantie de Remboursement 60 Jours'}
                </p>
                <p className="text-white/50 text-xs font-medium">
                  {language === 'en' ? 'Not satisfied? Full refund, no questions asked.' : 'Pas satisfait? Remboursement complet, sans questions.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#4ca735] hover:bg-[#3d862a] text-white font-bold px-6 py-3 rounded-full text-sm tracking-wide transition-colors shrink-0 active:scale-95"
            >
              {language === 'en' ? 'Shop Now' : 'Acheter'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
