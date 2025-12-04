# Fresh Fruit Market - User Flow and Component Interaction Diagram

## Overview

This document presents a user journey and component interaction flow for the Fresh Fruit Market frontend. It reflects the current single-container React architecture using HashRouter, Theme and Cart contexts, and an API client with mock fallbacks. It also highlights where future backend integrations will occur via environment-driven base URLs (e.g., REACT_APP_API_BASE).

## Flow Diagram

```mermaid
flowchart TD
  %% App shell and routing
  A["App Shell
(ThemeProvider + CartProvider)
Ocean Professional"] --> B["HashRouter
Routes: '/', '/product/:id', '/cart', '/checkout', '*'"]
  B --> C["Header
Cart count + Theme toggle"]
  B --> D["Main Content
Route Outlet"]
  B --> Z["Footer"]

  %% Home: Browse/Search/Filter/Sort
  D --> E["Home
Responsive Grid"]
  E --> E1["Search/Filter/Sort
State in Home component"]
  E1 -->|filters query locally| E2["Derived list (useMemo)"]
  E2 -->|map| E3["ProductCard
Link to '/product/:id'"]

  %% Product details and add to cart
  D --> F["ProductDetail
useParams(:id)"]
  F -->|on mount| F1["fetchProductById(id)"]
  F1 -->|BASE_URL set| FB1["Future backend integration:
GET /products/:id via REACT_APP_API_BASE"]
  F1 -->|BASE_URL missing or error| FM1["Mock fallback product"]
  F -->|Add to Cart| G["CartContext.addItem(product, qty)"]

  %% Cart management
  D --> H["Cart
Update/Remove/Clear"]
  H -->|qty change| H1["CartContext.updateQty(id, qty)"]
  H -->|remove| H2["CartContext.removeItem(id)"]
  H -->|clear| H3["CartContext.clear()"]
  H -->|view totals| H4["CartContext.totals
{subtotal, tax, shipping, total}"]
  H -->|Checkout| I["Navigate -> /checkout"]

  %% Checkout flow
  D --> J["Checkout
Shipping Details Form"]
  J --> J1["Validate form
(simple client-side)"]
  J -->|submit| J2["submitCheckout(payload)"]
  J2 -->|BASE_URL set| FB2["Future backend integration:
POST /checkout via REACT_APP_API_BASE"]
  J2 -->|BASE_URL missing or error| FM2["Mock confirmation
{orderId, status}"]
  J -->|success| J3["Order Review + Confirmation
Clears Cart"]
  J3 -->|Link Home| E

  %% Shared contexts and persistence
  A --> K["ThemeContext
data-theme on <html>"]
  A --> L["CartContext
items + totals (localStorage)"]

  %% Accessibility & responsiveness (annotations)
  C --- AA["Accessibility:
- Semantic landmarks (header, main, footer)
- aria-live for loading
- Visible focus outlines"]
  E --- AR["Responsive:
- Grid breakpoints
- Cards scale from 1->2->3 per row"]
  F --- AB["Accessibility:
- Labeled quantity input
- Button groups with aria-labels"]
  H --- AC["Responsive:
- Summary card stacks on small viewports"]
  J --- AD["Accessibility:
- Required field hints and aria-invalid"]

  %% Future integration placeholders
  subgraph Future Backend Integration
    FB1
    FB2
  end

  subgraph Mock Fallbacks
    FM1
    FM2
  end
```

## Narrative Summary

- The application mounts ThemeProvider and CartProvider around a HashRouter. Header and Footer are persistent; the main content switches between Home, ProductDetail, Cart, and Checkout via Route elements.
- On Home, users can browse a responsive product grid and refine the list through local search, filter, and sort. ProductCard links to the detail page using '/product/:id'.
- ProductDetail fetches the product by id. If REACT_APP_API_BASE (or fallback env) is not available or fails, a mock product is used. Users can set a quantity and add the item to the cart via CartContext.
- The Cart page allows updating quantities, removing items, clearing all items, and reviewing computed totals (subtotal, tax, shipping, total). Proceeding to Checkout routes to '/checkout'.
- Checkout validates basic shipping details on the client and submits the order via submitCheckout. When API envs are set, a future backend call will be made; otherwise, a mock confirmation is returned. On success, the cart is cleared and a confirmation screen is shown.
- Accessibility and responsiveness are baked in: semantic landmarks, aria-live for loading, visible focus, labeled inputs, and grid-based responsive layouts aligned with the Ocean Professional theme.

## Environment and Integration Notes

- The API client reads the base URL from REACT_APP_API_BASE (preferred) or REACT_APP_BACKEND_URL and falls back to mock data when unset or unreachable.
- Future backend endpoints:
  - GET /products and GET /products/:id for catalog and details.
  - POST /checkout for order submission.
- Additional environment variables available for broader control include REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH, REACT_APP_FEATURE_FLAGS, and REACT_APP_EXPERIMENTS_ENABLED.

## Accessibility and Responsive Design Considerations

- Semantic structure uses header, main, and footer landmarks for clarity with screen readers.
- Loading states use aria-live to announce progress non-intrusively.
- Inputs and interactive controls have labels and visible focus outlines, improving keyboard navigation.
- Layouts adapt from single-column to multi-column grids; cards and summary panels reflow for smaller devices while maintaining readable tap targets and spacing.

