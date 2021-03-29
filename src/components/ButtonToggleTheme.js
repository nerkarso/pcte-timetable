import Button from 'elements/Button';
import { useTheme } from 'hooks/ThemeContext';
import React from 'react';
import { Moon, Sun } from 'react-feather';

export default function ButtonToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button title="Toggle theme" onClick={toggleTheme}>
      {theme === 'light' ? <Sun color="var(--text)" size={24} /> : <Moon color="var(--text)" size={24} />}
    </Button>
  );
}
