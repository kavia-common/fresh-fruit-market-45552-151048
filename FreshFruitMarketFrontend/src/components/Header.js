import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

// PUBLIC_INTERFACE
export default function Header() {
  /** Header with brand title and navigation */
  const { items } = useCart();
  const { theme, toggle } = useTheme();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Fresh Fruit Market Home">
          <span role="img" aria-label="fruit">🍊</span>
          <h1>Fresh Fruit Market</h1>
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cart">Cart ({count})</NavLink>
          <button className="btn" onClick={toggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
      </div>
    </header>
  );
}
