import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const ROTATING_EN = [
  "🔥 73 people bought in the last hour — stock running low",
  "📦 Order before 3:00 PM EST → Delivered Tomorrow",
  "⚡ 2,847 units sold this week — don't miss out",
  "🏆 Join 14,200+ elite performers already on the protocol",
  "🎯 This price won't last — flash deal expires tonight",
];

const ROTATING_FR = [
  "🔥 73 personnes ont acheté dans la dernière heure — stock limité",
  "📦 Commandez avant 15h00 EST → Livraison demain",
  "⚡ 2 847 unités vendues cette semaine — ne manquez pas",
  "🏆 Rejoignez 14 200+ performeurs d'élite déjà dans le protocole",
  "🎯 Ce prix ne durera pas — l'offre flash expire ce soir",
];

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 13, seconds: 12 });
  const [rotatingIdx, setRotatingIdx] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate the bottom message every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIdx(prev => (prev + 1) % ROTATING_EN.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const rotatingMessages = language === 'en' ? ROTATING_EN : ROTATING_FR;

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Top Banner with Countdown */}
      <div className="text-[#1a2318] text-center py-1 md:py-1.5 bg-[#4ca735]">
        <div className="flex justify-center items-center gap-2 md:gap-4 text-[13px] md:text-base font-bold flex-wrap px-2 uppercase tracking-wide">
          <span>{language === 'en' ? '⚡ FLASH SALE ENDS IN' : '⚡ VENTE FLASH SE TERMINE DANS'}</span>
          <div className="flex items-center text-white">
            <div className="bg-[#1a2318] rounded-sm w-[22px] md:w-[30px] h-[26px] md:h-[40px] flex flex-col justify-center items-center mx-[2px]">
              <span className="text-[13px] md:text-sm font-black leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[7px] md:text-[8px] leading-none uppercase">Hrs</span>
            </div>
            <span className="text-[#1a2318] px-0.5 md:px-[2px] font-extrabold">:</span>
            <div className="bg-[#1a2318] rounded-sm w-[22px] md:w-[30px] h-[26px] md:h-[40px] flex flex-col justify-center items-center mx-[2px]">
              <span className="text-[13px] md:text-sm font-black leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[7px] md:text-[8px] leading-none uppercase">Min</span>
            </div>
            <span className="text-[#1a2318] px-0.5 md:px-[2px] font-extrabold">:</span>
            <div className="bg-[#1a2318] rounded-sm w-[22px] md:w-[30px] h-[26px] md:h-[40px] flex flex-col justify-center items-center mx-[2px]">
              <span className="text-[13px] md:text-sm font-black leading-none">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[7px] md:text-[8px] leading-none uppercase">Sec</span>
            </div>
          </div>
          <span className="hidden sm:inline">
            {language === 'en' ? '— UP TO 15% OFF BUNDLES — ENDS WHEN TIMER HITS ZERO' : '— JUSQU\'À 15% DE RÉDUCTION SUR LES LOTS — SE TERMINE À ZÉRO'}
          </span>
        </div>
      </div>

      {/* Bottom Banner — rotating urgency messages */}
      <div className="w-full text-white text-center py-2.5 md:py-3 flex justify-center items-center bg-[#1a2318] overflow-hidden">
        <div
          key={rotatingIdx}
          className="text-sm md:text-base font-bold tracking-tight animate-fade-in"
          style={{ animation: "fadeInUp 0.4s ease forwards" }}
        >
          {rotatingMessages[rotatingIdx]}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
