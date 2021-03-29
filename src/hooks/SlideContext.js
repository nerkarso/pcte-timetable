import { getDay } from 'helpers/index';
import React, { createContext, useContext, useState } from 'react';

const initialState = {
  slideIndex: getDay() > -1 ? getDay() : 0,
  setSlideIndex: () => {},
};

const SlideContext = createContext(initialState);

export const useSlide = () => useContext(SlideContext);

export default function SlideProvider({ children }) {
  const [state, setState] = useState(initialState.slideIndex);

  const setSlideIndex = (index) => setState(index);

  return <SlideContext.Provider value={{ slideIndex: state, setSlideIndex }}>{children}</SlideContext.Provider>;
}
