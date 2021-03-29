import React from 'react';
import 'styles/Loading.scss';

export default function Loading({ children }) {
  return (
    <div className="loading">
      {children && <p className="loading__text">{children}</p>}
      <div className="loading__bar">
        <div className="loading__indicator"></div>
      </div>
    </div>
  );
}
