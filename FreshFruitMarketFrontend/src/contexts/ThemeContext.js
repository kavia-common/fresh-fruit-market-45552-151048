import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export const ThemeContext = createContext({
  theme: 'light',
  // PUBLIC_INTERFACE
  toggle: () => {}
});

/**
 * PUBLIC_INTERFACE
 * ThemeProvider persists the selected theme in localStorage and applies data-theme to <html>.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('ffm-theme') : null;
    return saved || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('ffm-theme', theme);
    } catch {}
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Access theme and toggle function */
  return useContext(ThemeContext);
}
