import React from 'react';
import 'styles/Loading.scss';

export default function Loading({ text }) {
  return (
    <div className="loading">
      {text && <p className="loading__text">{text}</p>}
      <div className="loading__bar">
        <div className="loading__indicator"></div>
      </div>
    </div>
  );
}
