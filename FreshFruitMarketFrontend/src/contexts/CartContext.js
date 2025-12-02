import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Types
// item: { id, name, price, image, quantity }

// PUBLIC_INTERFACE
export const CartContext = createContext({
  items: [],
  // PUBLIC_INTERFACE
  addItem: (_product, _qty) => {},
  // PUBLIC_INTERFACE
  updateQty: (_id, _qty) => {},
  // PUBLIC_INTERFACE
  removeItem: (_id) => {},
  // PUBLIC_INTERFACE
  clear: () => {},
  // PUBLIC_INTERFACE
  subtotal: 0,
  // PUBLIC_INTERFACE
  totals: { subtotal: 0, tax: 0, shipping: 0, total: 0 }
});

const TAX_RATE = 0.07;
const FREE_SHIP_THRESHOLD = 50;
const SHIP_FLAT = 4.99;

/**
 * PUBLIC_INTERFACE
 * CartProvider provides cart state and helpers, persisted to localStorage.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = window.localStorage.getItem('ffm-cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('ffm-cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: Math.min(i.quantity + qty, 99) } : i);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: Math.max(1, qty) }];
    });
  };

  const updateQty = (id, qty) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, quantity: Math.max(1, Math.min(99, Number(qty) || 1)) } : i)
      .filter(i => i.quantity > 0)
    );
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const clear = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
  const totals = useMemo(() => {
    const tax = +(subtotal * TAX_RATE).toFixed(2);
    const shipping = subtotal === 0 ? 0 : (subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIP_FLAT);
    const total = +(subtotal + tax + shipping).toFixed(2);
    return { subtotal: +subtotal.toFixed(2), tax, shipping, total };
  }, [subtotal]);

  const value = useMemo(() => ({ items, addItem, updateQty, removeItem, clear, subtotal, totals }), [items, subtotal, totals]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Access cart helpers and totals */
  return useContext(CartContext);
}
