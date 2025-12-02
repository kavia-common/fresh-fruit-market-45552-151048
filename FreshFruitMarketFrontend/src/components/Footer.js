import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer with contact details */
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Fresh Fruit Market</span>
        <span style={{ float: 'right' }}>Quality fruits, delivered fresh.</span>
      </div>
    </footer>
  );
}
