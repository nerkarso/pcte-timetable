import Logo from 'assets/logo.png';
import ButtonChangeTheme from 'components/ButtonChangeTheme';
import React from 'react';

export default function Admin() {
  return (
    <>
      <Header />
      <main className="main"></main>
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <img src={Logo} className="header__brand__image" alt="Logo" />
          <h3>Admin</h3>
        </div>
        <div className="header__buttons">
          <ButtonChangeTheme />
        </div>
      </div>
    </header>
  );
}
