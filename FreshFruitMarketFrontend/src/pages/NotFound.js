import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Not Found route */
  return (
    <section className="card">
      <div className="card-body">
        <h2 style={{ marginTop: 0 }}>Page Not Found</h2>
        <p>We couldn’t find that page.</p>
        <Link to="/" className="btn primary">Go Home</Link>
      </div>
    </section>
  );
}
