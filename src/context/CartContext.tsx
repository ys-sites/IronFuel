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

function getBundleDiscount(qty: number): number {
  if (qty >= 6) return 0.15;
  if (qty === 3) return 0.10;
  return 0; // 1, 2, 4, 5 = no discount
}

const BASE_HANDLE_MAP: Record<string, string> = {
  'zenfuel-ashwagandha':           'zenfuel-ashwagandha-for-deep-recovery-and-balance',
  'neurofuel-lions-mane-mushroom': 'neurofuel-lions-mane-for-peak-mental-clarity',
  'gutfuel-gut-health':            'gutfuel-for-daily-digestive-balance-and-comfort',
  'fury-isolate-vanilla':          'fury-isolate-vanilla-for-rapid-muscle-growth',
  'fury-hydrate-creatine-formula': 'fury-hydrate-creatine-for-maximum-power-and-endurance',
};

const BUNDLE_3_HANDLE_MAP: Record<string, string> = {
  'zenfuel-ashwagandha':           'zenfuel-ashwagandha-for-deep-recovery-and-balance',
  'neurofuel-lions-mane-mushroom': 'neurofuel-lions-mane-for-peak-mental-clarity',
  'gutfuel-gut-health':            'gutfuel-for-daily-digestive-balance-and-comfort',
  'fury-isolate-vanilla':          'fury-isolate-vanilla-for-rapid-muscle-growth',
  'fury-hydrate-creatine-formula': 'fury-hydrate-creatine-for-maximum-power-and-endurance',
};

const BUNDLE_6_HANDLE_MAP: Record<string, string> = {
  'zenfuel-ashwagandha':           'zenfuel-ashwagandha-bundle-6',
  'neurofuel-lions-mane-mushroom': 'neurofuel-lions-mane-bundel-6',
  'gutfuel-gut-health':            'gutfuel-bundel-6',
  'fury-isolate-vanilla':          'fury-isolate-bundel-6',
  'fury-hydrate-creatine-formula': 'fury-hydrate-creatine-bundel-6',
};

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
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
            products(first: 50) {
              edges {
                node {
                  handle
                  variants(first: 1) {
                    edges {
                      node {
                        id
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
        const map: Record<string, string> = {};
        data.data.products.edges.forEach((edge: any) => {
          if (edge.node.variants.edges.length > 0) {
            map[edge.node.handle] = edge.node.variants.edges[0].node.id;
          }
        });
        setVariantCache(map);
        console.log('SHOPIFY HANDLES:', JSON.stringify(Object.keys(map), null, 2));
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
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items]
  );

  const bundleSavings = useMemo(() => {
    return items.reduce((acc, item) => {
      const discount = getBundleDiscount(item.quantity);
      const originalTotal = item.price * item.quantity;
      const discountedTotal = Math.round(originalTotal * (1 - discount) * 100) / 100;
      return acc + (originalTotal - discountedTotal);
    }, 0);
  }, [items]);

  const savings = useMemo(
    () => bundleSavings + (isSubscribed ? (subtotal - bundleSavings) * SUBSCRIBE_DISCOUNT : 0),
    [subtotal, bundleSavings, isSubscribed]
  );
  
  const total = useMemo(() => subtotal - savings, [subtotal, savings]);

  const checkout = useCallback(async (onComplete: () => void) => {
    if (items.length === 0) { onComplete(); return; }
    try {
      const query = `query {
        products(first: 100) {
          edges { node { handle variants(first: 1) { edges { node { id } } } } }
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
        if (edge.node.variants.edges.length > 0)
          handleMap[edge.node.handle] = edge.node.variants.edges[0].node.id;
      });

      const BASE_HANDLE_MAP: Record<string, string> = {
        'zenfuel-ashwagandha':           'zenfuel-ashwagandha',
        'neurofuel-lions-mane-mushroom': 'neurofuel-lion-s-mane-mushroom',
        'gutfuel-gut-health':            'gutfuel-gut-health',
        'fury-isolate-vanilla':          'fury-isolate-vanilla',
        'fury-hydrate-creatine-formula': 'fury-hydrate-creatine-formula',
      };

      const BUNDLE_3_HANDLE_MAP: Record<string, string> = {
        'zenfuel-ashwagandha':           'zenfuel-ashwagandha-for-deep-recovery-and-balance',
        'neurofuel-lions-mane-mushroom': 'neurofuel-lions-mane-for-peak-mental-clarity',
        'gutfuel-gut-health':            'gutfuel-for-daily-digestive-balance-and-comfort',
        'fury-isolate-vanilla':          'fury-isolate-vanilla-for-rapid-muscle-growth',
        'fury-hydrate-creatine-formula': 'fury-hydrate-creatine-for-maximum-power-and-endurance',
      };

      const BUNDLE_6_HANDLE_MAP: Record<string, string> = {
        'zenfuel-ashwagandha':           'zenfuel-ashwagandha-bundle-6',
        'neurofuel-lions-mane-mushroom': 'neurofuel-lions-mane-bundel-6',
        'gutfuel-gut-health':            'gutfuel-bundel-6',
        'fury-isolate-vanilla':          'fury-isolate-bundel-6',
        'fury-hydrate-creatine-formula': 'fury-hydrate-creatine-bundel-6',
      };

      const lineItems = items.flatMap(item => {
        let shopifyHandle: string;
        let shopifyQty: number;

        if (item.quantity === 3) {
          shopifyHandle = BUNDLE_3_HANDLE_MAP[item.id] ?? BASE_HANDLE_MAP[item.id] ?? item.id;
          shopifyQty = 1;
        } else if (item.quantity >= 6) {
          shopifyHandle = BUNDLE_6_HANDLE_MAP[item.id] ?? BASE_HANDLE_MAP[item.id] ?? item.id;
          shopifyQty = 1;
        } else {
          shopifyHandle = BASE_HANDLE_MAP[item.id] ?? item.id;
          shopifyQty = item.quantity;
        }

        const variantId = handleMap[shopifyHandle];
        if (!variantId) console.error(`No variant for handle: "${shopifyHandle}"`);
        return variantId ? [{ merchandiseId: variantId, quantity: shopifyQty }] : [];
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
        window.location.assign(cartData.data.cartCreate.cart.checkoutUrl);
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
  }, [items]);

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
