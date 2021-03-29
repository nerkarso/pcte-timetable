import ButtonShowToday from 'components/ButtonShowToday';
import DayView from 'components/DayView';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Tabs from 'components/Tabs';
import { weekdays } from 'helpers';
import { useSlide } from 'hooks/SlideContext';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import 'styles/Timetable.scss';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export default function Timetable() {
  return (
    <>
      <Header />
      <SwipeableViewArea />
      <ButtonShowToday />
      <Footer>
        <Tabs />
      </Footer>
    </>
  );
}

function SwipeableViewArea() {
  const { slideIndex, setSlideIndex } = useSlide();

  return (
    <BindKeyboardSwipeableViews
      className="main"
      containerStyle={{
        height: '100%',
      }}
      index={slideIndex}
      onChangeIndex={(index) => setSlideIndex(index)}
      springConfig={{
        duration: '0.5s',
        easeFunction: 'cubic-bezier(0.55, 0, 0.1, 1)',
        delay: '0s',
      }}
      resistance>
      {weekdays.map((day, index) => (
        <DayView day={day} index={index} key={index} />
      ))}
    </BindKeyboardSwipeableViews>
  );
}
