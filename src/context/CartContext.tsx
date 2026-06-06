import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  colorBg: string;
  quantity?: number;
  discountPct?: number;
  bundleQty?: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
  discountPct?: number;
  bundleQty?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  savings: number;
  bundleSavings: number;
  total: number;
  isSubscribed: boolean;
  toggleSubscribe: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  checkout: (onComplete: () => void) => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'ironfuellab_cart';
const SUBSCRIBE_DISCOUNT = 0;

export const SHOPIFY_PRICES: Record<string, { base: number; bundle3: number; bundle6: number }> = {
  'zenfuel-ashwagandha':           { base: 34.99, bundle3: 94.47,  bundle6: 178.45 },
  'neurofuel-lions-mane':          { base: 39.99, bundle3: 107.97, bundle6: 203.95 },
  'neurofuel-lions-mane-mushroom': { base: 39.99, bundle3: 107.97, bundle6: 203.95 },
  'gutfuel-gut-health':            { base: 39.99, bundle3: 107.97, bundle6: 203.95 },
  'fury-isolate-vanilla':          { base: 79.99, bundle3: 215.97, bundle6: 407.95 },
  'fury-hydrate-creatine':         { base: 44.99, bundle3: 121.47, bundle6: 229.45 },
  'fury-hydrate-creatine-formula': { base: 44.99, bundle3: 121.47, bundle6: 229.45 },
};

export interface PricingBreakdown {
  totalPrice: number;
  originalTotalPrice: number;
  savings: number;
  segments: Array<{
    qty: number;        // how many of this bundle unit
    unitQty: number;    // bottles per unit (6, 3, or 1)
    unitPrice: number;  // price per bundle unit
    discountPct: number; // 0.15, 0.10, or 0
    label: string;      // e.g. "Bundle of 6 (−15%)"
  }>;
}

export function getItemPricing(itemId: string, qty: number): PricingBreakdown {
  const prices = SHOPIFY_PRICES[itemId] || { base: 34.99, bundle3: 94.47, bundle6: 178.45 };
  const num6 = Math.floor(qty / 6);
  const rem = qty % 6;
  const num3 = Math.floor(rem / 3);
  const num1 = rem % 3;

  const segments: PricingBreakdown['segments'] = [];

  if (num6 > 0) segments.push({ qty: num6, unitQty: 6, unitPrice: prices.bundle6, discountPct: 0.15, label: 'Bundle of 6 (−15%)' });
  if (num3 > 0) segments.push({ qty: num3, unitQty: 3, unitPrice: prices.bundle3, discountPct: 0.10, label: 'Bundle of 3 (−10%)' });
  if (num1 > 0) segments.push({ qty: num1, unitQty: 1, unitPrice: prices.base, discountPct: 0, label: num1 === 1 ? '1 Bottle' : `${num1} Bottles` });

  const totalPrice = (num6 * prices.bundle6) + (num3 * prices.bundle3) + (num1 * prices.base);
  const originalTotalPrice = prices.base * qty;
  const savings = Math.max(0, originalTotalPrice - totalPrice);

  return {
    totalPrice: Math.round(totalPrice * 100) / 100,
    originalTotalPrice: Math.round(originalTotalPrice * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    segments,
  };
}

function getBundleDiscount(qty: number): number {
  if (qty >= 6) return 0.15;
  if (qty === 3) return 0.10;
  return 0; // 1, 2, 4, 5 = no discount
}

export const BUNDLE_VARIANT_MAP: Record<string, {
  productHandle: string;
  base: string;
  bundle3: string;
  bundle6: string;
}> = {
  'zenfuel-ashwagandha': {
    productHandle: 'ashwagandha-bundle',
    base:    '1 Bottle',
    bundle3: '3 Bottles - Most Popular',
    bundle6: '6 Bottles - Best Value',
  },
  'neurofuel-lions-mane': {
    productHandle: 'pack-lions-mane',
    base:    '1 Bottle',
    bundle3: '3 Bottles - Most Popular',
    bundle6: '6 Bottles - Best Value',
  },
  'neurofuel-lions-mane-mushroom': {
    productHandle: 'pack-lions-mane',
    base:    '1 Bottle',
    bundle3: '3 Bottles - Most Popular',
    bundle6: '6 Bottles - Best Value',
  },
  'gutfuel-gut-health': {
    productHandle: 'pack-gutfuel-gut-health',
    base:    '1 Bottle',
    bundle3: '3 Bottles - Most Popular',
    bundle6: '6 Bottles - Best Value',
  },
  'fury-isolate-vanilla': {
    productHandle: 'pack-proteine',
    base:    '1 Tub',
    bundle3: '3 Tubs - Most Popular',
    bundle6: '6 Tubs - Best Value',
  },
  'fury-hydrate-creatine': {
    productHandle: 'pack-de-supplements',
    base:    '1 Bottle',
    bundle3: '3 Bottles - Most Popular',
    bundle6: '6 Bottles - Best Value',
  },
  'fury-hydrate-creatine-formula': {
    productHandle: 'pack-de-supplements',
    base:    '1 Bottle',
    bundle3: '3 Bottles - Most Popular',
    bundle6: '6 Bottles - Best Value',
  },
};

export const getCartHandles = (cartItems: CartItem[]) => {
  return cartItems.flatMap(item => {
    const mapping = BUNDLE_VARIANT_MAP[item.id];
    return mapping ? [mapping.productHandle] : [];
  });
};


function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map(item => ({
        ...item,
        id: item.id ? item.id.replace(/-(1|3|6)pack$/, '') : item.id,
        price: typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0),
        quantity: typeof item.quantity === 'number' ? item.quantity : 1,
        colorBg: item.colorBg || 'bg-[#f4f7f4]',
      }));
    }
    return [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadFromStorage);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [variantCache, setVariantCache] = useState<Record<string, string>>({});

  // Pre-fetch all variants to speed up checkout
  useEffect(() => {
    const fetchAllVariants = async () => {
      try {
        const query = `
          query {
            products(first: 100) {
              edges {
                node {
                  handle
                  variants(first: 10) {
                    edges {
                      node {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        `;
        const res = await fetch("https://76s90y-fe.myshopify.com/api/2024-04/graphql.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "665ed20ae0135838f2e0134f20e8811a"
          },
          body: JSON.stringify({ query })
        });
        const data = await res.json();
        const handleMap: Record<string, string> = {};
        data.data.products.edges.forEach((edge: any) => {
          edge.node.variants.edges.forEach((v: any) => {
            const key = `${edge.node.handle}::${v.node.title}`;
            handleMap[key] = v.node.id;
          });
        });
        setVariantCache(handleMap);
        console.log('VARIANT KEYS:', Object.keys(handleMap));
      } catch (e) {
        console.error("Failed to pre-fetch variants", e);
      }
    };
    fetchAllVariants();
  }, []);

  // Persist cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota exceeded — fail silently
    }
  }, [items]);

  const addItem = useCallback((product: CartProduct) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const quantityToAdd = product.quantity || 1;
      if (existing) {
        return prev.map((i) => {
          if (i.id === product.id) {
            const newQty = i.quantity + quantityToAdd;
            const discountPct = getBundleDiscount(newQty);
            return { ...i, quantity: newQty, discountPct };
          }
          return i;
        });
      }
      const initialQty = quantityToAdd;
      const discountPct = getBundleDiscount(initialQty);
      return [...prev, { ...product, quantity: initialQty, discountPct }];
    });

    const qtyAdded = product.quantity || 1;
    const pricing = getItemPricing(product.id, qtyAdded);
    const addedValue = pricing.totalPrice;

    const mapping = BUNDLE_VARIANT_MAP[product.id];
    const handle = mapping ? mapping.productHandle : product.id;

    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_ids: [handle],
        content_name: product.name,
        value: addedValue,
        currency: 'USD'
      });
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => {
          if (i.id === id) {
            const discountPct = getBundleDiscount(qty);
            return { ...i, quantity: qty, discountPct };
          }
          return i;
        })
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const toggleSubscribe = useCallback(() => setIsSubscribed((v) => !v), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const pricing = getItemPricing(item.id, item.quantity);
      return acc + pricing.originalTotalPrice;
    }, 0);
  }, [items]);

  const bundleSavings = useMemo(() => {
    return items.reduce((acc, item) => {
      const pricing = getItemPricing(item.id, item.quantity);
      return acc + pricing.savings;
    }, 0);
  }, [items]);

  const savings = useMemo(
    () => bundleSavings,
    [bundleSavings]
  );
  
  const total = useMemo(() => subtotal - savings, [subtotal, savings]);

  const checkout = useCallback(async (onComplete: () => void) => {
    if (items.length === 0) { onComplete(); return; }

    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: getCartHandles(items),
        content_type: 'product',
        value: total,
        currency: 'USD',
        num_items: count
      });
    }

    try {
      const query = `query {
        products(first: 100) {
          edges {
            node {
              handle
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }`;
      const res = await fetch('https://76s90y-fe.myshopify.com/api/2024-04/graphql.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': '665ed20ae0135838f2e0134f20e8811a' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      if (!data?.data?.products) throw new Error('Shopify API error: ' + JSON.stringify(data));

      const handleMap: Record<string, string> = {};
      data.data.products.edges.forEach((edge: any) => {
        edge.node.variants.edges.forEach((v: any) => {
          const key = `${edge.node.handle}::${v.node.title}`;
          handleMap[key] = v.node.id;
        });
      });

      const lineItems = items.flatMap(item => {
        const num6 = Math.floor(item.quantity / 6);
        const rem  = item.quantity % 6;
        const num3 = Math.floor(rem / 3);
        const num1 = rem % 3;
        const mapping = BUNDLE_VARIANT_MAP[item.id];
        if (!mapping) return [];

        const lines: { merchandiseId: string; quantity: number }[] = [];

        if (num6 > 0) {
          const key = `${mapping.productHandle}::${mapping.bundle6}`;
          const variantId = handleMap[key];
          if (variantId) lines.push({ merchandiseId: variantId, quantity: num6 });
        }
        if (num3 > 0) {
          const key = `${mapping.productHandle}::${mapping.bundle3}`;
          const variantId = handleMap[key];
          if (variantId) lines.push({ merchandiseId: variantId, quantity: num3 });
        }
        if (num1 > 0) {
          const key = `${mapping.productHandle}::${mapping.base}`;
          const variantId = handleMap[key];
          if (variantId) lines.push({ merchandiseId: variantId, quantity: num1 });
        }
        return lines;
      });

      if (lineItems.length === 0) throw new Error(`No valid variants. IDs: ${items.map(i => i.id).join(', ')}`);

      const cartMutation = `mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { checkoutUrl }
          userErrors { field message }
        }
      }`;
      const cartRes = await fetch('https://76s90y-fe.myshopify.com/api/2024-04/graphql.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': '665ed20ae0135838f2e0134f20e8811a' },
        body: JSON.stringify({ query: cartMutation, variables: { input: { lines: lineItems } } })
      });
      const cartData = await cartRes.json();

      if (cartData.data?.cartCreate?.cart?.checkoutUrl) {
        const checkoutUrl = cartData.data.cartCreate.cart.checkoutUrl;

        if (window.fbq) {
          window.fbq('track', 'Purchase', {
            content_ids: getCartHandles(items),
            content_type: 'product',
            value: total,
            currency: 'USD',
            num_items: count
          });
        }

        window.location.assign(checkoutUrl);
      } else {
        const errs = cartData.data?.cartCreate?.userErrors;
        throw new Error(errs?.length ? errs.map((e: any) => e.message).join(', ') : 'Failed to create cart');
      }
    } catch (e: any) {
      console.error('Checkout error:', e);
      alert('Checkout failed: ' + (e?.message || 'Unknown error'));
    } finally {
      onComplete();
    }
  }, [items, total, count]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      count,
      subtotal,
      savings,
      bundleSavings,
      total,
      isSubscribed,
      toggleSubscribe,
      isOpen,
      openCart,
      closeCart,
      checkout,
    }),
    [
      items, addItem, removeItem, updateQuantity, clearCart,
      count, subtotal, savings, bundleSavings, total,
      isSubscribed, toggleSubscribe,
      isOpen, openCart, closeCart, checkout
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
