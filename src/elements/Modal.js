import Button from 'elements/Button';
import React from 'react';
import { createPortal } from 'react-dom';
import 'styles/Modal.scss';

export default function Modal({
  children,
  headerTitle,
  primaryActionTitle,
  primaryActionHandler,
  closeTitle,
  isModalShown,
  toggleModalShown,
  large,
}) {
  const classNames = ['modal'];
  if (large) {
    classNames.push('modal--large');
  }

  const dismissModal = (e) => {
    if (e.target.className === 'modal__wrapper') {
      toggleModalShown();
    }
  };

  return isModalShown
    ? createPortal(
        <div className={classNames.join(' ')}>
          <div className="modal__wrapper" onClick={dismissModal}>
            <div className="modal__container" role="dialog">
              <div className="modal__header">
                <h2>{headerTitle}</h2>
              </div>
              <div className="modal__body">{children}</div>
              <div className="modal__footer">
                {primaryActionTitle && (
                  <Button className="button--primary" onClick={primaryActionHandler}>
                    {primaryActionTitle}
                  </Button>
                )}
                <Button className="button--default" onClick={toggleModalShown}>
                  {closeTitle}
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
}
