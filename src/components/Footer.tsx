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
    { icon: ShieldCheck, label: t.footer.tested },
    { icon: Leaf, label: t.footer.vegan },
    { icon: Zap, label: t.footer.usa },
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

      {/* ── Top gradient divider ── */}
      <div
        className="w-full h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(76,167,53,0.5) 30%, rgba(220,168,83,0.5) 70%, transparent 100%)',
        }}
      />

      <div className="relative max-w-[85rem] mx-auto w-full px-6 md:px-12 pt-16 pb-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">

          {/* Brand column */}
          <div className="md:col-span-5">
            {/* Logo */}
            <button onClick={scrollTop} className="cursor-pointer text-left mb-8 flex flex-col items-start gap-4 group">
              <span className="text-3xl lg:text-4xl font-black tracking-tighter italic uppercase leading-none text-white whitespace-nowrap">
                IRON FUEL LAB.
              </span>
            </button>

            <p className="text-[#6b7d6e] text-sm leading-relaxed mb-8 max-w-[320px]">
              {t.footer.brandDesc}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-[#4ca735]" />
                  <span className="text-[11px] font-semibold text-white/60 tracking-wide">{label}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#4ca735] hover:text-white hover:border-[#4ca735] transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold tracking-[0.2em] uppercase text-[10px] mb-7 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#4ca735] inline-block" />
              {t.footer.navigate}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t.nav.products, id: 'products-section' },
                { label: t.nav.specs, id: 'about-section' },
                { label: t.nav.testimonials, id: 'testimonials' },
                { label: t.nav.faq, id: 'faq' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-white/40 text-sm font-medium hover:text-white transition-colors duration-200 cursor-pointer group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#4ca735] transition-all duration-300 inline-block" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold tracking-[0.2em] uppercase text-[10px] mb-7 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#dca853] inline-block" />
              {t.footer.support}
            </h4>
            <ul className="space-y-4">

              <li>
                <a
                  href="mailto:support@ironfuellab.com"
                  className="text-white/40 text-sm font-medium hover:text-white transition-colors duration-200 group flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-white/25 group-hover:text-[#dca853] transition-colors duration-200" />
                  support@ironfuellab.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18005551234"
                  className="text-white/40 text-sm font-medium hover:text-white transition-colors duration-200 group flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-white/25 group-hover:text-[#dca853] transition-colors duration-200" />
                  +1 (800) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-white/20 text-xs font-medium">
            © {new Date().getFullYear()} Iron Fuel Lab. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-white/20 text-xs font-medium">
            <a href="#" className="hover:text-white transition-colors duration-200">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors duration-200">{t.footer.terms}</a>
            <a href="#" className="hover:text-white transition-colors duration-200">{t.footer.refund}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
