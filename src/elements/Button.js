import React from 'react';
import '../styles/Button.scss';

export default function Button(props) {
  const { children, className, ...otherProps } = props;

  const classNames = ['button'];

  if (className) {
    classNames.push(className);
  }

  return (
    <button className={classNames.join(' ')} {...otherProps}>
      {children}
    </button>
  );
}
