import React from 'react';
import '../styles/Footer.scss';

export default function Footer({ children }) {
  return (
    <footer className="footer">
      <div className="footer__container">{children}</div>
    </footer>
  );
}
