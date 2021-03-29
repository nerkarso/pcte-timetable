import DayView from 'components/DayView';
import FloatingButtonShowToday from 'components/FloatingButtonShowToday';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Tabs from 'components/Tabs';
import { SlideContext } from 'context/slide-context';
import { weekdays } from 'helpers';
import React, { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import 'styles/Timetable.scss';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export default function Timetable() {
  return (
    <>
      <Header />
      <SwipeableViewArea />
      <FloatingButtonShowToday />
      <Footer>
        <Tabs />
      </Footer>
    </>
  );
}

function SwipeableViewArea() {
  const { slideIndex, changeSlideIndex } = useContext(SlideContext);

  return (
    <BindKeyboardSwipeableViews
      className="main"
      containerStyle={{
        height: '100%',
      }}
      index={slideIndex}
      onChangeIndex={(index) => changeSlideIndex(index)}
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
