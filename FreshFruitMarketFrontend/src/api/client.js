//
// PUBLIC INTERFACE: API client for products and checkout with mock fallback.
// Uses REACT_APP_API_BASE or REACT_APP_BACKEND_URL; falls back to mock data if unset/unreachable.
//

const envBase =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  '';

const BASE_URL = envBase && typeof envBase === 'string' ? envBase.replace(/\/+$/, '') : '';

const mockProducts = [
  {
    id: '1',
    name: 'Organic Apples',
    price: 3.99,
    description: 'Crisp and sweet organic apples, perfect for snacking.',
    category: 'organic',
    popularity: 5,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Bananas',
    price: 1.29,
    description: 'Ripe bananas packed with potassium and flavor.',
    category: 'conventional',
    popularity: 4,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Blueberries',
    price: 4.99,
    description: 'Fresh blueberries rich in antioxidants.',
    category: 'organic',
    popularity: 5,
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Mango',
    price: 2.79,
    description: 'Juicy and aromatic mangoes from tropical farms.',
    category: 'conventional',
    popularity: 3,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Strawberries',
    price: 5.49,
    description: 'Sweet and vibrant strawberries freshly picked.',
    category: 'organic',
    popularity: 4,
    image: 'https://images.unsplash.com/photo-1439127989242-c3749a012eac?q=80&w=800&auto=format&fit=crop',
  }
];

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export async function fetchProducts() {
  /**
   * Fetch the list of products from API; fallback to mock data when envs are unset or unreachable.
   * Returns: Promise<Array<Product>>
   */
  if (!BASE_URL) {
    return mockProducts;
  }
  try {
    const res = await fetch(`${BASE_URL}/products`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error('bad status');
    const data = await safeJson(res);
    return Array.isArray(data) && data.length ? data : mockProducts;
  } catch {
    return mockProducts;
  }
}

// PUBLIC_INTERFACE
export async function fetchProductById(id) {
  /**
   * Fetch a single product by id; fallback to mock.
   * Returns: Promise<Product | undefined>
   */
  if (!BASE_URL) {
    return mockProducts.find(p => p.id === id);
  }
  try {
    const res = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error('bad status');
    const data = await safeJson(res);
    return data || mockProducts.find(p => p.id === id);
  } catch {
    return mockProducts.find(p => p.id === id);
  }
}

// PUBLIC_INTERFACE
export async function submitCheckout(payload) {
  /**
   * Submit a checkout request; on failure or missing envs, return a mock confirmation and status 'success'.
   * Returns: Promise<{orderId: string, status: string}>
   */
  const confirmation = {
    orderId: `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    status: 'success',
  };
  if (!BASE_URL) return confirmation;

  try {
    const res = await fetch(`${BASE_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('bad status');
    const data = await safeJson(res);
    return data || confirmation;
  } catch {
    return confirmation;
  }
}

export const mockData = { products: mockProducts };
