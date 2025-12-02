import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api/client';
import Loading from '../components/Loading';
import { useCart } from '../contexts/CartContext';

// PUBLIC_INTERFACE
export default function ProductDetail() {
  /** Displays single product and allows adding to cart */
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      if (mounted) {
        setProduct(data || null);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <Loading message="Loading product…" />;
  if (!product) return <div className="alert">Product not found. <Link to="/">Back to home</Link></div>;

  return (
    <section className="detail" aria-labelledby="detail-title">
      <div className="detail-media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="detail-info">
        <h2 id="detail-title" style={{ marginTop: 0 }}>{product.name}</h2>
        <p className="price" style={{ fontSize: 20 }}>${product.price.toFixed(2)}</p>
        <p style={{ color: 'var(--muted)' }}>{product.description}</p>
        <div className="field mt-3" style={{ maxWidth: 200 }}>
          <label htmlFor="qty">Quantity</label>
          <input id="qty" className="input" type="number" min="1" max="99" value={qty} onChange={(e) => setQty(Math.min(99, Math.max(1, Number(e.target.value) || 1)))} />
        </div>
        <div className="mt-3" role="group" aria-label="Purchase actions">
          <button className="btn primary" onClick={() => addItem(product, qty)}>Add to Cart</button>
          <Link to="/cart" className="btn" style={{ marginLeft: 8 }}>View Cart</Link>
        </div>
      </div>
    </section>
  );
}
