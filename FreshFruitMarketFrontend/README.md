# Fresh Fruit Market Frontend

A modern React app for browsing, searching, and purchasing fresh fruits. Implements HashRouter, Theme and Cart contexts, and an API client with mock fallback.

## Features
- HashRouter routes: `/`, `/product/:id`, `/cart`, `/checkout`, and NotFound.
- Theme toggle with persistence (light/dark) following the "Ocean Professional" theme.
- Home page: responsive grid, search, filter, sort; loads from API when available, falls back to mock.
- Product detail: quantity selector and Add to Cart.
- Cart: update quantity, remove, clear; subtotal, estimated tax, shipping (free over threshold), total.
- Checkout: basic form validation, mock confirmation, clears cart.
- Accessibility: semantic landmarks, focus outlines, aria-live for loading.

## Environment Variables
- REACT_APP_API_BASE (preferred)
- REACT_APP_BACKEND_URL (fallback)
- REACT_APP_FRONTEND_URL (not required for current features)

If API envs are unset/unreachable, the app uses mock data.

## Scripts
- npm start
- npm test
- npm run build

## Structure
- src/contexts: ThemeContext, CartContext
- src/api/client.js: API client with mock fallback
- src/components: Header, Footer, ProductCard, Loading
- src/pages: Home, ProductDetail, Cart, Checkout, NotFound

## Theme
Ocean Professional with blue and amber accents applied via CSS variables in `src/App.css`.
