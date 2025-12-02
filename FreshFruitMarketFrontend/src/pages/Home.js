import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../api/client';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page shows catalog grid with search and sort */
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('name');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await fetchProducts();
      if (mounted) {
        setProducts(data);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    let out = products;
    const q = query.trim().toLowerCase();
    if (q) {
      out = out.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (category !== 'all') {
      out = out.filter(p => p.category === category);
    }
    switch (sort) {
      case 'price-asc': out = [...out].sort((a, b) => a.price - b.price); break;
      case 'price-desc': out = [...out].sort((a, b) => b.price - a.price); break;
      case 'popularity': out = [...out].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)); break;
      default: out = [...out].sort((a, b) => a.name.localeCompare(b.name));
    }
    return out;
  }, [products, query, category, sort]);

  return (
    <section aria-labelledby="catalog-title">
      <h2 id="catalog-title" className="sr-only">Product Catalog</h2>

      <div className="searchbar" role="search">
        <input
          className="input"
          type="search"
          placeholder="Search fruits..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search fruits"
        />
        <select className="select" aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="organic">Organic</option>
          <option value="conventional">Conventional</option>
        </select>
        <select className="select" aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {loading ? (
        <Loading message="Loading products…" />
      ) : (
        <div className="grid" aria-live="polite">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          {filtered.length === 0 && (
            <div className="alert card-body" role="note">No products match your search.</div>
          )}
        </div>
      )}
    </section>
  );
}
