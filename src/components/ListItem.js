import React from 'react';

export default function ListItem({ color, name, code, onClick }) {
  const classNames = ['dot'];
  if (color) classNames.push(`lecture--${color}`);

  return (
    <button className="list__item" onClick={onClick}>
      {color && <div className={classNames.join(' ')}></div>}
      <div className="list__item__content">
        {code && <span className="list__item__subtitle">{code}</span>}
        <h3>{name}</h3>
      </div>
    </button>
  );
}
