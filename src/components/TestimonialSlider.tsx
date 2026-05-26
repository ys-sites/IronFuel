export default function TestimonialSlider() {
  const reviews = [
    {
      name: "Sarah K.",
      verified: true,
      text: "“My sleep quality has skyrocketed. I wake up feeling deeply recovered and ready to tackle whatever comes.”",
    },
    {
      name: "Marcus T.",
      verified: true,
      text: "“The mental clarity is unmatched. No jitters, just clean, sharp focus that lasts throughout the entire day.”",
    },
    {
      name: "Amanda R.",
      verified: true,
      text: "“I noticed a visible difference in my digestion within just a week. I feel lighter, energized, and balanced.”",
    },
    {
      name: "David L.",
      verified: true,
      text: "“Pure performance. My recovery times have halved and I'm pushing numbers I couldn't hit before.”",
    }
  ];

  return (
    <section className="bg-black py-10 md:py-16 overflow-hidden border-b border-white/5">
      <div className="max-w-[1240px] mx-auto px-4 md:px-20 text-center mb-8">
        <h2 className="text-white text-3xl md:text-[42px] font-bold leading-tight font-display tracking-tight">
          TRUSTED BY ELITE{" "}
          <span className="text-[#4ca735] block mt-2">
            PERFORMERS
          </span>
        </h2>
      </div>
      
      <div className="flex overflow-x-auto gap-4 px-4 md:px-20 pb-8 snap-x snap-mandatory scrollbar-none">
        {reviews.map((r, i) => (
          <div key={i} className="flex-shrink-0 w-[240px] md:w-[320px] bg-[#131514] border border-white/10 rounded-lg p-5 flex flex-col justify-between snap-start min-h-[180px] shadow-lg">
            <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed text-center italic mb-4 flex-grow flex items-center justify-center">
              {r.text}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 pt-4 border-t border-white/5">
              <div className="text-amber-500 text-lg tracking-widest flex gap-0.5">★★★★★</div>
              <div className="flex items-center gap-2 mt-1 md:mt-0">
                <span className="text-white font-bold text-sm border-l border-white/20 pl-2 ml-1">{r.name}</span>
                {r.verified && <span className="text-white font-semibold text-xs flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-sm"><span className="text-[#4ca735]">✓</span> Verified</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
