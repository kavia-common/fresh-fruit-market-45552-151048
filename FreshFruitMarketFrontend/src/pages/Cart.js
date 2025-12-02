import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

// PUBLIC_INTERFACE
export default function Cart() {
  /** Cart page for managing items and viewing totals */
  const { items, updateQty, removeItem, clear, totals } = useCart();
  const nav = useNavigate();

  const goCheckout = () => {
    if (items.length === 0) return;
    nav('/checkout');
  };

  return (
    <section aria-labelledby="cart-title" className="grid">
      <h2 id="cart-title" className="sr-only">Your Cart</h2>

      <div className="card" style={{ gridColumn: 'span 12' }}>
        <div className="card-body">
          {items.length === 0 ? (
            <div className="alert">
              Your cart is empty. <Link to="/">Browse products</Link>
            </div>
          ) : (
            items.map(i => (
              <div key={i.id} className="cart-item">
                <img src={i.image} alt={i.name} />
                <div>
                  <div style={{ fontWeight: 600 }}>{i.name}</div>
                  <div className="muted">${i.price.toFixed(2)} each</div>
                </div>
                <input
                  aria-label={`Quantity for ${i.name}`}
                  className="input"
                  style={{ width: 80 }}
                  type="number"
                  min="1"
                  max="99"
                  value={i.quantity}
                  onChange={(e) => updateQty(i.id, e.target.value)}
                />
                <div style={{ textAlign: 'right', minWidth: 90 }}>
                  ${(i.price * i.quantity).toFixed(2)}<br/>
                  <button className="btn danger mt-2" onClick={() => removeItem(i.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
          {items.length > 0 && (
            <div className="mt-3" role="group" aria-label="Cart actions">
              <button className="btn" onClick={clear}>Clear Cart</button>
              <button className="btn primary" style={{ marginLeft: 8 }} onClick={goCheckout}>Checkout</button>
            </div>
          )}
        </div>
      </div>

      <div className="cart-summary" style={{ gridColumn: 'span 12' }}>
        <h3 style={{ marginTop: 0 }}>Summary</h3>
        <div>Subtotal: ${totals.subtotal.toFixed(2)}</div>
        <div>Estimated Tax: ${totals.tax.toFixed(2)}</div>
        <div>Shipping: {totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</div>
        <hr />
        <div style={{ fontWeight: 700 }}>Total: ${totals.total.toFixed(2)}</div>
      </div>
    </section>
  );
}
