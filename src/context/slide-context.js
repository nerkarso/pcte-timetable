import React, { createContext, useState } from 'react';
import { getDay } from '../helpers';

const initialState = {
  slideIndex: getDay() > -1 ? getDay() : 0,
  changeSlideIndex: () => {}
};

const SlideContext = createContext(initialState);

function SlideProvider({ children }) {
  const [slideIndex, setSlideIndex] = useState(initialState.slideIndex);

  const changeSlideIndex = index => {
    setSlideIndex(index);
  };

  return (
    <SlideContext.Provider value={{ slideIndex, changeSlideIndex }}>
      {children}
    </SlideContext.Provider>
  );
}

export { SlideContext, SlideProvider };
