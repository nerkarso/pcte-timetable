import React, { useContext, useLayoutEffect } from 'react';
import { SlideContext } from '../context/slide-context';
import '../styles/Tabs.scss';

export default function Tabs({ weekdays }) {
  const { slideIndex, changeSlideIndex } = useContext(SlideContext);

  useLayoutEffect(() => {
    try {
      const buttonIsActive = document.querySelector(
        '.tabs__grid__item--active'
      );

      /**
       * Element.scrollIntoView()
       * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
       */
      setTimeout(() => {
        buttonIsActive.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }, 300);
    } catch (err) {}
  }, [slideIndex]);

  return (
    <nav className="tabs tabs--bottom">
      <div className="tabs__grid">
        {weekdays.map((name, index) => (
          <button
            className={`tabs__grid__item${
              slideIndex === index ? ' tabs__grid__item--active' : ''
            }`}
            title={name}
            onClick={() => changeSlideIndex(index)}
            key={name}
          >
            {name}
          </button>
        ))}
      </div>
    </nav>
  );
}
