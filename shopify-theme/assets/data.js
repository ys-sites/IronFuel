window.IronFuelData = {
  products: [
    {
      id: "zenfuel-ashwagandha",
      name: "ZenFuel – Ashwagandha",
      description: "Relax. Recover. Stay Balanced.",
      price: "34.99",
      image: window.ShopifyAssets.ashwagandha1,
      colorBg: "bg-[#e2eadc]",
      buttonBg: "bg-[#4ca735]",
      buttonHover: "hover:bg-[#3d862a]",
      buttonText: "text-white"
    },
    {
      id: "neurofuel-lions-mane",
      name: "NeuroFuel – Lion's Mane",
      description: "Focus. Clarity. Mental Performance.",
      price: "39.99",
      image: window.ShopifyAssets.lion,
      colorBg: "bg-[#f5ebd7]",
      buttonBg: "bg-amber-400",
      buttonHover: "hover:bg-amber-500",
      buttonText: "text-black"
    },
    {
      id: "gutfuel",
      name: "GutFuel",
      description: "Support Your Gut. Feel Better Daily.",
      price: "29.99",
      image: window.ShopifyAssets.gut_health,
      colorBg: "bg-[#fff7ed]",
      buttonBg: "bg-[#f97316]",
      buttonHover: "hover:bg-[#ea580c]",
      buttonText: "text-white"
    },
    {
      id: "fury-isolate",
      name: "FURY Isolate – Vanilla",
      description: "Premium fast-absorbing recovery",
      price: "79.99",
      image: window.ShopifyAssets.isolate_jpeg,
      colorBg: "bg-[#e2d5d5]",
      buttonBg: "bg-red-700",
      buttonHover: "hover:bg-red-800",
      buttonText: "text-white"
    },
    {
      id: "fury-hydrate",
      name: "FURY Hydrate",
      description: "Power. Hydration. Performance.",
      price: "44.99",
      image: window.ShopifyAssets.creatine,
      colorBg: "bg-[#d5dfe2]",
      buttonBg: "bg-slate-700",
      buttonHover: "hover:bg-slate-800",
      buttonText: "text-white"
    }
  ],
  heroSlides: [
    {
      id: "ashwagandha",
      tag: "Ashwagandha",
      titleWords: ["RELAX", "RECOVER", "SLEEP", "BALANCE"],
      highlightWord: "RECOVER",
      highlightColor: "text-[#4ca735]",
      buttonBg: "bg-[#4ca735]",
      buttonHover: "hover:bg-[#3d862a]",
      buttonText: "text-white",
      badge: { title: "Stress Support", icon: "Leaf", desc: "100% Vegan Friendly" },
      bg: window.ShopifyAssets.ashwagandha1,
      reviewer: "Sarah K.",
      review: {
        en: "My sleep quality has skyrocketed. I wake up feeling deeply recovered and ready to tackle whatever comes.",
        fr: "La qualité de mon sommeil a explosé. Je me réveille avec une sensation de récupération profonde et prête à tout affronter."
      }
    },
    {
      id: "lions-mane",
      tag: "Lion's Mane Mushroom",
      titleWords: ["DRIVE", "CLARITY", "FOCUS"],
      highlightWord: "DRIVE",
      highlightColor: "text-amber-400",
      buttonBg: "bg-amber-400",
      buttonHover: "hover:bg-amber-500",
      buttonText: "text-black",
      badge: { title: "Cognitive Focus", icon: "Brain", desc: "Clinically Researched" },
      bg: window.ShopifyAssets.lion,
      reviewer: "Marcus T.",
      review: {
        en: "The mental clarity is unmatched. No jitters, just clean, sharp focus that lasts throughout the entire day.",
        fr: "La clarté mentale est inégalée. Pas de nervosité, juste une concentration nette et précise qui dure toute la journée."
      }
    },
    {
      id: "gut-health",
      tag: "Gut Health",
      titleWords: ["CORE", "RESTORE", "BALANCE"],
      highlightWord: "RESTORE",
      highlightColor: "text-[#f97316]",
      buttonBg: "bg-[#f97316]",
      buttonHover: "hover:bg-[#ea580c]",
      buttonText: "text-white",
      badge: { title: "Digestive Balance", icon: "ShieldCheck", desc: "Potent Prebiotics" },
      bg: window.ShopifyAssets.gut_health,
      reviewer: "Amanda R.",
      review: {
        en: "I noticed a visible difference in my digestion within just a week. I feel lighter, energized, and balanced.",
        fr: "J'ai remarqué une différence visible dans ma digestion en seulement une semaine. Je me sens plus léger, énergisé et équilibré."
      }
    }
  ],
  translations: {
    en: {
      nav: { products: "Products", specs: "Product Specs", testimonials: "Testimonials", faq: "FAQ", signin: "Sign In", ordernow: "Order Now", cart: "Cart" },
      hero: { reviews: "18,921 reviews", description: "Iron Fuel Lab Is A US-Made Dietary Supplement Brand Focused On Advanced Formula Vitamins & Minerals", relax: "RELAX", recover: "RECOVER", sleep: "SLEEP", balance: "BALANCE", drive: "DRIVE", clarity: "CLARITY", focus: "FOCUS", core: "CORE", restore: "RESTORE" },
      products: { title: "OUR PRODUCTS", heading: "Explore Our Natural Herbal Extracts", description: "Every formula is engineered from pure adaptogens using an advanced extraction system, ensuring the natural ingredients maintain complete efficacy and maximum absorption.", viewMore: "View More", addtoCart: "Add to Cart" }
    },
    fr: {
      nav: { products: "Produits", specs: "Spécifications", testimonials: "Témoignages", faq: "FAQ", signin: "Connexion", ordernow: "Commander", cart: "Panier" },
      hero: { reviews: "18 921 avis", description: "Iron Fuel Lab est une marque de compléments alimentaires fabriquée aux États-Unis, axée sur des formules avancées de vitamines et minéraux", relax: "RELAXER", recover: "RÉCUPÉRER", sleep: "SOMMEIL", balance: "ÉQUILIBRE", drive: "MOTEUR", clarity: "CLARTÉ", focus: "CONCENTRATION", core: "CŒUR", restore: "RESTAURER" },
      products: { title: "NOS PRODUITS", heading: "Explorez nos extraits naturels de plantes", description: "Chaque formule est conçue à partir d'adaptogènes purs utilisant un système d'extraction avancé, garantissant que les ingrédients naturels conservent une efficacité totale et une absorption maximale.", viewMore: "Voir Plus", addtoCart: "Ajouter au Panier" }
    }
  }
};
