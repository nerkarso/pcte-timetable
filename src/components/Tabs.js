import { weekdays } from 'helpers';
import { useSlide } from 'hooks/SlideContext';
import React, { useLayoutEffect } from 'react';
import 'styles/Tabs.scss';

export default function Tabs() {
  const { slideIndex, setSlideIndex } = useSlide();

  useLayoutEffect(() => {
    try {
      const buttonIsActive = document.querySelector('.tabs__grid__item--active');
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
            className={`tabs__grid__item${slideIndex === index ? ' tabs__grid__item--active' : ''}`}
            title={name}
            onClick={() => setSlideIndex(index)}
            key={name}>
            {name}
          </button>
        ))}
      </div>
    </nav>
  );
}
