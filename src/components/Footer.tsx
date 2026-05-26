import React from 'react';
import { Instagram, Mail, Phone, ShieldCheck, Leaf, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const badges = [
    { icon: ShieldCheck, label: 'Pureté Vérifiée' },
    { icon: Leaf, label: '100% Végane' },
    { icon: Zap, label: 'Fabriqué aux USA' },
  ];

  return (
    <footer className="relative bg-[#060b07] overflow-hidden">
      {/* ── Ambient glow ── */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(76,167,53,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-[85rem] mx-auto w-full px-6 md:px-12 pt-20 pb-24">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          {/* Brand column */}
          <div className="md:col-span-5">
            {/* Logo */}
            <button onClick={scrollTop} className="cursor-pointer text-left mb-6 flex flex-col items-start gap-4 group">
              <span className="text-3xl lg:text-[40px] font-black tracking-[-0.04em] italic uppercase leading-none text-white whitespace-nowrap">
                IRON FUEL LAB.
              </span>
            </button>

            <p className="text-[#6b7d6e] text-[15px] leading-relaxed mb-8 max-w-[360px]">
              {language === 'en' 
                ? 'Advanced naturally sourced formulas designed for high performers seeking optimal results. Backed by science. Made in the USA.'
                : 'Des formules avancées de source naturelle conçues pour les performeurs de haut niveau recherchant des résultats optimaux. Soutenu par la science. Fabriqué aux États-Unis.'
              }
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#0c130d] hover:border-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#4ca735]" />
                  <span className="text-xs font-bold text-[#839886] tracking-wide">{label}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#111912] border border-white/5 flex items-center justify-center text-[#839886] hover:bg-[#4ca735] hover:text-white hover:border-[#4ca735] transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-black tracking-[0.1em] uppercase text-xs mb-8 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#4ca735] inline-block" />
              NAVIGUER
            </h4>
            <ul className="space-y-5">
              {[
                { label: 'Produits', id: 'products-section' },
                { label: 'Spécifications', id: 'about-section' },
                { label: 'Témoignages', id: 'testimonials' },
                { label: 'FAQ', id: 'faq' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-[#6b7d6e] text-[15px] font-semibold hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3">
            <h4 className="text-white font-black tracking-[0.1em] uppercase text-xs mb-8 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#dca853] inline-block" />
              SUPPORT
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact.ironfuellab@yahoo.com"
                  className="text-[#6b7d6e] text-[15px] font-semibold hover:text-white transition-colors duration-200 group flex items-start gap-3"
                >
                  <Mail className="w-5 h-5 text-[#839886] shrink-0 mt-0.5" />
                  contact.ironfuellab@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-[#6b7d6e] text-[13px] font-semibold">
            © {new Date().getFullYear()} Iron Fuel Lab. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[#6b7d6e] text-[13px] font-semibold">
            <a href="#" className="hover:text-white transition-colors duration-200">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Conditions d'utilisation</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Politique de Remboursement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
