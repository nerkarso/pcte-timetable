import Day from 'components/Day';
import { getDay, showLecture, weekdays } from 'helpers';
import { useSlide } from 'hooks/SlideContext';
import React, { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';

export const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export default function SwipeableViewArea({ timetable, classname }) {
  const { slideIndex, setSlideIndex } = useSlide();

  useEffect(() => {
    if (getDay() !== -1) {
      setTimeout(showLecture, 500);
    }
  }, [classname]);

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
        <Day name={day} lectures={timetable[classname][index] ? timetable[classname][index] : []} key={index} />
      ))}
    </BindKeyboardSwipeableViews>
  );
}
