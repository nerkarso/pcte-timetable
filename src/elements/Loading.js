import React from 'react';
import 'styles/Loading.scss';

export default function Loading() {
  return (
    <div className="loading">
      <p className="loading__text">Loading...</p>
      <div className="loading__bar">
        <div className="loading__indicator"></div>
      </div>
    </div>
  );
}
