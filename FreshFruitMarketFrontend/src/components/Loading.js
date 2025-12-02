import React from 'react';

// PUBLIC_INTERFACE
export default function Loading({ message = 'Loading…' }) {
  /** Accessible loading indicator */
  return (
    <div className="loading" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{message}</span>
      <span>{message}</span>
    </div>
  );
}
