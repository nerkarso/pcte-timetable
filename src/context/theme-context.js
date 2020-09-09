import React, { createContext, useEffect, useState } from 'react';

const initialState = {
  theme: 'light',
  changeTheme: () => {}
};

const ThemeContext = createContext(initialState);

/**
 * Toggle theme using React Hooks
 * http://www.vimalselvam.com/2019/05/28/toggle-theme-using-react-hooks/
 *
 * @param {*} props
 */
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialState.theme);

  // On mount, read the preferred theme from the persistence.
  useEffect(() => {
    const mode = localStorage.getItem('theme') || initialState.theme;
    setTheme(mode);

    // Change html element attribute.
    document.querySelector('html').setAttribute('theme', mode);

    // Change meta theme color.
    const color =
      theme === 'light'
        ? process.env.REACT_APP_THEME_COLOR
        : process.env.REACT_APP_THEME_DARK_COLOR;
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', color);
  }, [theme]);

  // To switch between dark and light modes.
  const changeTheme = () => {
    const mode = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
