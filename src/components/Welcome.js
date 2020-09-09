import React from 'react';
import Logo from '../assets/logo.png';
import '../styles/Welcome.scss';
import ChooseClassName from './ChooseClassName';

export default function Welcome({ children }) {
  return (
    <section className="welcome">
      <img src={Logo} alt="Logo" />
      <div className="welcome__body">
        <h3 className="welcome__title">{process.env.REACT_APP_TITLE}</h3>
        {children}
      </div>
      <ChooseClassName placeholder="Choose your class" />
    </section>
  );
}
