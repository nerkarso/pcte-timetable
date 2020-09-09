import React from 'react';
import { createPortal } from 'react-dom';
import Button from '../elements/Button';
import '../styles/Modal.scss';

export default function Modal({
  children,
  headerTitle,
  closeTitle,
  isModalShown,
  toggleModalShown
}) {
  const dismissModal = e => {
    if (e.target.className === 'modal__wrapper') {
      toggleModalShown();
    }
  };

  return isModalShown
    ? createPortal(
        <div className="modal">
          <div className="modal__wrapper" onClick={dismissModal}>
            <div className="modal__container" role="dialog">
              <div className="modal__header">
                <h2>{headerTitle}</h2>
              </div>
              <div className="modal__body">{children}</div>
              <div className="modal__footer">
                <Button
                  className="button--default button--block"
                  onClick={toggleModalShown}
                >
                  {closeTitle}
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}
