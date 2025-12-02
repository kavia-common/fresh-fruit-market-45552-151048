import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';

test('renders header title Fresh Fruit Market', () => {
  render(
    <ThemeProvider>
      <CartProvider>
        <HashRouter>
          <Header />
        </HashRouter>
      </CartProvider>
    </ThemeProvider>
  );
  expect(screen.getByText('Fresh Fruit Market')).toBeInTheDocument();
});
