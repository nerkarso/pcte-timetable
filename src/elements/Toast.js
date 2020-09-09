import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/Toast.scss';

export default function Toast({ children, className, isToastShown, ...rest }) {
  const classNames = ['toast'];
  if (className) {
    classNames.push(className);
  }

  return isToastShown
    ? createPortal(
        <div className={classNames.join(' ')} {...rest}>
          {children}
        </div>,
        document.body
      )
    : null;
}
