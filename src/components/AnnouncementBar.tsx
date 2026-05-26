import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 13, seconds: 12 });
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

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Top Banner with Countdown */}
      <div 
        className="text-[#1a2318] text-center py-1 md:py-1.5"
        style={{
          background: "#4ca735",
        }}
      >
        <div className="flex justify-center items-center gap-2 md:gap-4 text-[15px] md:text-base font-bold flex-wrap px-2 uppercase tracking-wide">
          <span>{language === 'en' ? 'FLASH SALE ENDS IN' : 'VENTE FLASH SE TERMINE DANS'}</span>
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
        </div>
      </div>
      
      {/* Bottom Banner */}
      <div 
        className="w-full text-white text-center py-3 md:py-4 flex justify-center items-center bg-[#1a2318]"
      >
        <span className="flex items-center text-base md:text-xl font-bold gap-2 uppercase tracking-tight">
          ⚡ {language === 'en' ? '30% OFF ALL PERFORMANCE BUNDLES' : '30% DE RÉDUCTION SUR TOUS LES PACKS'}
        </span>
      </div>
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
