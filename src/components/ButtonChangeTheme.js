import React, { useContext } from 'react';
import { Sun } from 'react-feather';
import { ThemeContext } from '../context/theme-context';
import Button from '../elements/Button';

export default function ButtonchangeTheme() {
  const { changeTheme } = useContext(ThemeContext);

  return (
    <Button title="Switch theme" onClick={changeTheme}>
      <Sun color="var(--text)" size={24} />
    </Button>
  );
}
