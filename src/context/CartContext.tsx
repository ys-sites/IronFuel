import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  colorBg: string;
  quantity?: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
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

// Maps each base product handle to its pre-priced Shopify bundle product handles
const BUNDLE_HANDLES: Record<string, { bundle3: string; bundle6: string }> = {
  'zenfuel-ashwagandha':           { bundle3: 'zenfuel-ashwagandha-bundel-3',      bundle6: 'zenfuel-ashwagandha-bundle-6' },
  'neurofuel-lions-mane-mushroom': { bundle3: 'neurofuel-lions-mane-bundel-3',     bundle6: 'neurofuel-lions-mane-bundel-6' },
  'gutfuel-gut-health':            { bundle3: 'gutfuel-bundel-3',                  bundle6: 'gutfuel-bundel-6' },
  'fury-isolate-vanilla':          { bundle3: 'fury-isolate-vanilla-bundel-3',     bundle6: 'fury-isolate-bundel-6' },
  'fury-hydrate-creatine-formula': { bundle3: 'fury-hydrate-creatine-bundel-3',    bundle6: 'fury-hydrate-bundle-6' },
};

// Set of all bundle handles — if item.id is one of these, checkout sends qty 1
const ALL_BUNDLE_HANDLES = new Set<string>(
  Object.values(BUNDLE_HANDLES).flatMap(b => [b.bundle3, b.bundle6])
);

function getCheckoutHandle(item: CartItem): string {
  // BundleModal now sets item.id directly to the bundle handle, so just return it.
  // For base-product items (qty 1) it's also just the base handle — either way correct.
  const b = BUNDLE_HANDLES[item.id];
  if (b && item.quantity >= 6) return b.bundle6;
  if (b && item.quantity >= 3) return b.bundle3;
  return item.id;
}

function getCheckoutQty(item: CartItem): number {
  // Bundle products must be sent as qty 1 regardless of display quantity
  if (ALL_BUNDLE_HANDLES.has(item.id)) return 1;
  const b = BUNDLE_HANDLES[item.id];
  if (b && item.quantity >= 3) return 1;
  return item.quantity;
}

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
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
        );
      }
      return [...prev, { ...product, quantity: quantityToAdd }];
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
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
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
      let discount = 0;
      // Use the same 10%/15% logic as the modal
      if (item.quantity >= 6) discount = 0.15;
      else if (item.quantity >= 3) discount = 0.10;
      
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
        if (edge.node.variants.edges.length > 0) {
          handleMap[edge.node.handle] = edge.node.variants.edges[0].node.id;
        }
      });
      console.log('Available Shopify handles:', Object.keys(handleMap));

      // For qty 3 or 6, route to the pre-priced Shopify bundle product (qty 1)
      // so Shopify charges the discounted bundle price instead of base price × qty
      const CHECKOUT_BUNDLE_MAP: Record<string, Record<number, string>> = {
        'zenfuel-ashwagandha':           { 3: 'zenfuel-ashwagandha-bundel-3',      6: 'zenfuel-ashwagandha-bundle-6' },
        'neurofuel-lions-mane-mushroom': { 3: 'neurofuel-lions-mane-bundel-3',     6: 'neurofuel-lions-mane-bundel-6' },
        'gutfuel-gut-health':            { 3: 'gutfuel-bundel-3',                  6: 'gutfuel-bundel-6' },
        'fury-isolate-vanilla':          { 3: 'fury-isolate-vanilla-bundel-3',     6: 'fury-isolate-bundel-6' },
        'fury-hydrate-creatine-formula': { 3: 'fury-hydrate-creatine-bundel-3',    6: 'fury-hydrate-creatine-bundel-6' },
      };

      const lineItems = items.map(item => {
        const bundleHandle = CHECKOUT_BUNDLE_MAP[item.id]?.[item.quantity];
        const checkoutHandle = bundleHandle ?? item.id;
        const checkoutQty = bundleHandle ? 1 : item.quantity;
        const variantId = handleMap[checkoutHandle];
        if (!variantId) console.error(`❌ No Shopify product found for handle: "${checkoutHandle}" (base: "${item.id}", qty: ${item.quantity})`);
        return { merchandiseId: variantId, quantity: checkoutQty };
      }).filter(i => i.merchandiseId);

      if (lineItems.length === 0) throw new Error('No valid Shopify variants found. Check console for missing handles.');

      const cartMutation = `mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { checkoutUrl }
          userErrors { message }
        }
      }`;
      const cartRes = await fetch("https://76s90y-fe.myshopify.com/api/2024-04/graphql.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "665ed20ae0135838f2e0134f20e8811a"
        },
        body: JSON.stringify({ query: cartMutation, variables: { input: { lines: lineItems } } })
      });
      const cartData = await cartRes.json();
      console.log('Cart response:', JSON.stringify(cartData));
      if (cartData.data?.cartCreate?.cart?.checkoutUrl) {
        window.location.assign(cartData.data.cartCreate.cart.checkoutUrl);
      } else {
        console.error('Cart errors:', cartData.data?.cartCreate?.userErrors);
        throw new Error('Failed to create cart');
      }
    } catch (e) {
      console.error('Checkout error:', e);
      alert('Checkout failed. Please try again.');
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
