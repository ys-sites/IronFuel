import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  colorBg: string;
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
const SUBSCRIBE_DISCOUNT = 0.15;

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
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
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
  const savings = useMemo(
    () => (isSubscribed ? subtotal * SUBSCRIBE_DISCOUNT : 0),
    [subtotal, isSubscribed]
  );
  const total = useMemo(() => subtotal - savings, [subtotal, savings]);

  const checkout = useCallback(async (onComplete: () => void) => {
    if (items.length === 0) {
      onComplete();
      return;
    }
    
    try {
      const handleQuery = items.map(i => `handle:${i.id}`).join(" OR ");
      const productQuery = `
        query getVariants($query: String!) {
          products(first: 50, query: $query) {
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
        body: JSON.stringify({ query: productQuery, variables: { query: handleQuery } })
      });
      const data = await res.json();
      
      const handleToVariant: Record<string, string> = {};
      data.data.products.edges.forEach((edge: any) => {
        handleToVariant[edge.node.handle] = edge.node.variants.edges[0].node.id;
      });

      const lineItems = items.map(item => ({
        merchandiseId: handleToVariant[item.id],
        quantity: item.quantity
      })).filter(i => i.merchandiseId);

      if (lineItems.length === 0) {
        throw new Error("No valid items");
      }

      const cartMutation = `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart { checkoutUrl }
            userErrors { message }
          }
        }
      `;

      const cartRes = await fetch("https://76s90y-fe.myshopify.com/api/2024-04/graphql.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "665ed20ae0135838f2e0134f20e8811a"
        },
        body: JSON.stringify({ query: cartMutation, variables: { input: { lines: lineItems } } })
      });
      
      const cartData = await cartRes.json();
      if (cartData.data?.cartCreate?.cart?.checkoutUrl) {
        window.location.href = cartData.data.cartCreate.cart.checkoutUrl;
      } else {
        throw new Error("Failed to create cart");
      }
    } catch (e) {
      console.error(e);
      alert("Checkout failed. Please try again.");
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
      count, subtotal, savings, total,
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
