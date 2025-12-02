import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { submitCheckout } from '../api/client';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Checkout() {
  /** Checkout form with validation and mock confirmation */
  const { items, totals, clear } = useCart();
  const [form, setForm] = useState({ name: '', address: '', city: '', postal: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, confirmation: null });

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!/^[A-Za-z0-9 \-]{3,10}$/.test(form.postal)) e.postal = 'Enter a valid postal code';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus({ loading: true, confirmation: null });
    const payload = { items, totals, customer: form };
    const result = await submitCheckout(payload);
    setStatus({ loading: false, confirmation: result });
    clear();
  };

  if (items.length === 0 && !status.confirmation) {
    return (
      <div className="alert">
        Your cart is empty. <Link to="/">Go back to catalog</Link>
      </div>
    );
  }

  if (status.confirmation) {
    return (
      <section className="card">
        <div className="card-body">
          <h2 style={{ marginTop: 0 }}>Order Confirmed</h2>
          <p>Thank you for your purchase.</p>
          <p><strong>Order ID:</strong> {status.confirmation.orderId}</p>
          <Link to="/" className="btn primary mt-3">Back to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card" aria-labelledby="checkout-title">
      <div className="card-body">
        <h2 id="checkout-title" style={{ marginTop: 0 }}>Checkout</h2>
        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" className="input" value={form.name} onChange={onChange} required aria-invalid={!!errors.name}/>
            {errors.name && <div style={{ color: 'var(--color-error)' }}>{errors.name}</div>}
          </div>

          <div className="field mt-3">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" className="input" value={form.address} onChange={onChange} required aria-invalid={!!errors.address}/>
            {errors.address && <div style={{ color: 'var(--color-error)' }}>{errors.address}</div>}
          </div>

          <div className="field mt-3">
            <label htmlFor="city">City</label>
            <input id="city" name="city" className="input" value={form.city} onChange={onChange} required aria-invalid={!!errors.city}/>
            {errors.city && <div style={{ color: 'var(--color-error)' }}>{errors.city}</div>}
          </div>

          <div className="field mt-3">
            <label htmlFor="postal">Postal Code</label>
            <input id="postal" name="postal" className="input" value={form.postal} onChange={onChange} required aria-invalid={!!errors.postal}/>
            {errors.postal && <div style={{ color: 'var(--color-error)' }}>{errors.postal}</div>}
          </div>

          <div className="mt-4" role="group" aria-label="Checkout actions">
            <button className="btn" type="button"><Link to="/cart" style={{ textDecoration: 'none' }}>Back to Cart</Link></button>
            <button className="btn primary" type="submit" style={{ marginLeft: 8 }} disabled={status.loading}>
              {status.loading ? 'Placing order…' : `Pay $${totals.total.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
