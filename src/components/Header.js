import React from 'react';
import Logo from '../assets/logo.png';
import '../styles/Header.scss';
import ButtonChangeTheme from './ButtonChangeTheme';
import ButtonShowInfo from './ButtonShowInfo';
import ChooseClassName from './ChooseClassName';

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <img src={Logo} className="header__brand__image" alt="Logo" />
          <ChooseClassName placeholder="Class" />
        </div>
        <div className="header__buttons">
          <ButtonShowInfo />
          <ButtonChangeTheme />
        </div>
      </div>
    </header>
  );
}
