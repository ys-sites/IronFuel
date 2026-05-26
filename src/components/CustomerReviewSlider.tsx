export default function CustomerReviewSlider() {
  const reviews = [
    {
      name: "Mike T.",
      text: "“I’ve been taking ZenFuel for a month. The difference in my deep sleep is noticeable. I wake up completely refreshed without grogginess.”",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1100&auto=format&fit=crop",
      date: "Purchased ZenFuel Ashwagandha",
      prodImg: "/Ashwagandha1.jpeg"
    },
    {
      name: "David L.",
      text: "“NeuroFuel is honestly the best cognitive enhancer I've used. I take it before deep work and get laser focus for hours.”",
      img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1100&auto=format&fit=crop",
      date: "Purchased NeuroFuel Lion's Mane",
      prodImg: "/Lion.jpeg"
    },
    {
      name: "Chris F.",
      text: "”The Isolate is pure, mixes instantly, and digests easily. FURY is exactly what I needed for my recovery stack.”",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1100&auto=format&fit=crop",
      date: "Purchased FURY Isolate Vanilla",
      prodImg: "/FURY Isolate.jpeg"
    },
  ];

  return (
    <section className="bg-[#131514] py-16 md:py-20 border-b border-white/5">
      <div className="max-w-[1240px] mx-auto px-4 md:px-20">
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl md:text-[42px] font-bold leading-tight font-display tracking-tight uppercase">
            Built For The High Performers<br/>
            <span className="text-[#4ca735] block mt-2">
              Who Demand Results
            </span>
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory scrollbar-none">
          {reviews.map((r, i) => (
            <div key={i} className="flex-shrink-0 w-[85%] md:w-[calc(33.33%-1rem)] bg-black border border-white/10 rounded-md overflow-hidden snap-start flex flex-col shadow-lg">
              <div className="w-full aspect-[4/3] relative bg-white/5">
                <img src={r.img} alt={r.name} className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="p-5 flex flex-col gap-3 flex-grow">
                <div className="text-amber-500 text-lg tracking-widest flex gap-0.5">★★★★★</div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">{r.name}</span>
                  <span className="text-gray-400 border-l border-white/10 pl-2 text-xs font-semibold flex items-center gap-1"><span className="text-[#4ca735]">✓</span> Verified</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-grow font-medium italic">
                  {r.text}
                </p>
                <div className="bg-[#131514] rounded p-3 flex gap-3 items-center border border-white/5 mt-2">
                  <img src={r.prodImg} alt="Product" className="w-[60px] h-[60px] object-cover rounded border border-white/10" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white mb-1.5">{r.date}</span>
                    <span className="text-[#4ca735] font-bold text-xs">Purity Verified</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

