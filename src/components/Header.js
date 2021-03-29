import Logo from 'assets/logo.png';
import ButtonChooseClassname from 'components/ButtonChooseClassname';
import ButtonShowInfo from 'components/ButtonShowInfo';
import ButtonToggleTheme from 'components/ButtonToggleTheme';
import React from 'react';
import 'styles/Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <img src={Logo} className="header__brand__image" alt="Logo" />
          <ButtonChooseClassname />
        </div>
        <div className="header__buttons">
          <ButtonShowInfo />
          <ButtonToggleTheme />
        </div>
      </div>
    </header>
  );
}
