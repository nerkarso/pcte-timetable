import React, { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  theme: 'light',
  toggleTheme: () => {},
};

const ThemeContext = createContext(initialState);

export const useTheme = () => useContext(ThemeContext);

/**
 * Toggle theme using React Hooks
 * http://www.vimalselvam.com/2019/05/28/toggle-theme-using-react-hooks/
 */
export default function ThemeProvider({ children }) {
  const [state, setState] = useState(initialState.theme);

  // On mount, read the preferred theme from the persistence
  useEffect(() => {
    const mode = localStorage.getItem('theme') || initialState.theme;

    // Change html element attribute
    document.querySelector('html').setAttribute('theme', mode);

    // Change meta theme color
    const color = state === 'light' ? process.env.REACT_APP_THEME_COLOR : process.env.REACT_APP_THEME_DARK_COLOR;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', color);

    setState(mode);
  }, [state]);

  // To switch between dark and light modes.
  const toggleTheme = () => {
    const mode = state === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    setState(mode);
  };

  return <ThemeContext.Provider value={{ theme: state, toggleTheme }}>{children}</ThemeContext.Provider>;
}
