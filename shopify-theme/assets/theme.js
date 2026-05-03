const { useState, useEffect, useMemo, memo, useCallback, useRef } = React;
const { motion, AnimatePresence } = FramerMotion;
const { ShoppingBag, ArrowUpRight, Star, ChevronLeft, ChevronRight, ArrowRight, Brain, Leaf, Droplet, Sparkles, ShieldCheck, Zap, CheckCircle2, Menu, X, Instagram } = lucide;

// Mock Lucide components for React if they aren't available as components
const Icon = ({ name, ...props }) => {
  const LucideIcon = lucide[name] || lucide.HelpCircle;
  return <LucideIcon {...props} />;
};

const App = () => {
  const [language, setLanguage] = useState('en');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const data = window.IronFuelData;
  const t = data.translations[language];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-black min-h-screen">
      <HeroSection 
        data={data} 
        t={t} 
        language={language} 
        setLanguage={setLanguage} 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <ProductsSection data={data} t={t} onAddToCart={addToCart} />
      <FooterSection t={t} />
      
      {/* Simple Cart Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-md bg-[#080e09] h-full p-8 shadow-2xl overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white uppercase italic">Your Protocol</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-white/60 hover:text-white"><X /></button>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <p className="text-white/40">Your protocol is empty.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b border-white/5 pb-6">
                      <div className="w-20 h-20 rounded-xl bg-white/5 p-2 shrink-0">
                        <img src={item.image} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{item.name}</h3>
                        <p className="text-white/40 text-sm">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-6">
                    <button className="w-full py-4 bg-brand-green text-white font-black rounded-full hover:bg-green-600 transition-colors uppercase tracking-widest">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HeroSection = ({ data, t, language, setLanguage, cartCount, onOpenCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % data.heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = data.heroSlides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden bg-black p-4">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})`, filter: 'blur(40px)' }}
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full h-full border-2 border-white/20 rounded-[2.5rem] overflow-hidden flex flex-col">
        {/* Nav */}
        <header className="px-8 py-6 flex justify-between items-center bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3">
             <img src={window.ShopifyAssets.logo} className="h-8 w-auto" />
             <span className="text-white font-black tracking-tighter text-lg uppercase">IRON FUEL LAB</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="px-4 py-1.5 rounded-full border border-white/20 text-white font-bold text-xs uppercase"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
            <button onClick={onOpenCart} className="relative text-white p-2">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
           <motion.div
             key={currentSlide}
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="max-w-4xl"
           >
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic uppercase">
                {slide.titleWords.map(word => (
                  <span key={word} className={word === slide.highlightWord ? slide.highlightColor : ""}>{t.hero[word.toLowerCase()] || word} </span>
                ))}
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                {t.hero.description}
              </p>
              <button className={`px-10 py-5 ${slide.buttonBg} text-white font-black rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto uppercase tracking-widest`}>
                {t.nav.ordernow} <ArrowUpRight />
              </button>
           </motion.div>
        </div>

        {/* Indicators */}
        <div className="p-8 flex justify-center gap-2">
          {data.heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-12 bg-white' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductsSection = ({ data, t, onAddToCart }) => {
  return (
    <section className="bg-[#f4f7f4] py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-brand-green font-black tracking-widest uppercase text-xs border border-brand-green/20 px-4 py-1.5 rounded-full inline-block mb-6">
            {t.products.title}
          </span>
          <h2 className="text-4xl md:text-7xl font-black text-brand-dark tracking-tighter leading-none uppercase italic">
            {t.products.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.products.map(product => (
            <div key={product.id} className="group bg-white rounded-[2.5rem] p-4 shadow-xl hover:-translate-y-2 transition-transform duration-500 flex flex-col">
               <div className={`${product.colorBg} rounded-[2rem] aspect-square flex items-center justify-center p-8 mb-6 overflow-hidden`}>
                 <img src={product.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
               </div>
               <div className="px-4 pb-4 flex-1 flex flex-col">
                 <h3 className="text-2xl font-black text-brand-dark mb-2 uppercase italic">{product.name}</h3>
                 <p className="text-brand-dark/40 mb-6 flex-1">{product.description}</p>
                 <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-black text-brand-dark">${product.price}</span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className={`${product.buttonBg} ${product.buttonText} px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity uppercase text-xs tracking-widest`}
                    >
                      {t.products.addtoCart}
                    </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterSection = ({ t }) => (
  <footer className="bg-black py-20 px-8 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div>
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">IRON FUEL LAB.</h2>
        <p className="text-white/20 text-sm mt-2">© 2026 Iron Fuel Lab. All rights reserved.</p>
      </div>
      <div className="flex gap-8">
        <a href="#" className="text-white/40 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">Instagram</a>
        <a href="#" className="text-white/40 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">Twitter</a>
        <a href="#" className="text-white/40 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">Support</a>
      </div>
    </div>
  </footer>
);

const root = ReactDOM.createRoot(document.getElementById('ironfuel-root'));
root.render(<App />);
