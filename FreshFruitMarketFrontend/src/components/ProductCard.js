import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function ProductCard({ product }) {
  /** Card showing product image, name and price with link to detail */
  return (
    <article className="card" aria-labelledby={`title-${product.id}`}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="card-body">
          <div className="card-title">
            <h3 id={`title-${product.id}`} style={{ margin: 0, fontSize: 16 }}>{product.name}</h3>
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>
            {product.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
