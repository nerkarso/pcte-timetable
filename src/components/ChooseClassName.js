import React, { useContext } from 'react';
import { ClassNameContext } from '../context/classname-context';
import { classNames } from '../data/db.json';
import Modal from '../elements/Modal';
import { trackEvent } from '../googleAnalytics';
import useModal from '../hooks/useModal';
import '../styles/Button.scss';
import '../styles/List.scss';

export default function ChooseClassName({ placeholder }) {
  const { isModalShown, toggleModalShown } = useModal();
  const { className, changeClassName } = useContext(ClassNameContext);

  const handleItemClick = name => {
    changeClassName(name);
    toggleModalShown();
    trackEvent('Class', 'Chose this Class', name);
  };

  return (
    <>
      <button
        className="button--chooser"
        title="Choose your class"
        onClick={toggleModalShown}
      >
        {className ? className : placeholder}
      </button>
      <Modal
        headerTitle="Choose your class"
        closeTitle="Close"
        isModalShown={isModalShown}
        toggleModalShown={toggleModalShown}
      >
        <div className="list">
          {classNames.map(name => (
            <button
              className={`list__item${
                className === name ? ' list__item--active' : ''
              }`}
              onClick={() => handleItemClick(name)}
              key={name}
            >
              {name}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
