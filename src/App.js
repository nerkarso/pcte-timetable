import React, { useContext, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Day from './components/Day';
import FloatingButtonShowToday from './components/FloatingButtonShowToday';
import Footer from './components/Footer';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Welcome from './components/Welcome';
import { ClassNameContext } from './context/classname-context';
import { SlideContext } from './context/slide-context';
import { date, schedule, weekdays } from './data/db.json';
import { initGA, logPageView, trackEvent } from './googleAnalytics.js';
import { getDay, showLecture } from './helpers';
import './styles/App.scss';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
let WelcomeView = null;

export default function App() {
  const { slideIndex, changeSlideIndex } = useContext(SlideContext);
  const handleChangeIndex = (index) => {
    changeSlideIndex(index);
  };

  const { className } = useContext(ClassNameContext);
  const Days =
    className &&
    schedule[className] &&
    weekdays.map((day, index) => (
      <Day name={day} lectures={schedule[className][index] ? schedule[className][index] : []} key={index} />
    ));

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (className === null) {
      WelcomeView = (
        <Welcome>
          <p>{date}</p>
        </Welcome>
      );
    } else {
      if (getDay() !== -1) {
        // changeSlideIndex(getDay());
        setTimeout(showLecture, 1000);
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, [className, isLoading]);

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    if (window.localStorage.getItem('className')) {
      trackEvent('Class', 'From this Class', window.localStorage.getItem('className'));
    }
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          {className && schedule[className] ? (
            <>
              <Header />
              <BindKeyboardSwipeableViews
                className="main"
                containerStyle={styles.slideContainer}
                index={slideIndex}
                onChangeIndex={handleChangeIndex}
                springConfig={springConfig}
                resistance>
                {Days}
              </BindKeyboardSwipeableViews>
              <FloatingButtonShowToday />
              <Footer>
                <Tabs weekdays={weekdays} />
              </Footer>
            </>
          ) : (
            WelcomeView
          )}
        </>
      )}
    </>
  );
}

const springConfig = {
  duration: '0.5s',
  easeFunction: 'cubic-bezier(0.55, 0, 0.1, 1)',
  delay: '0s',
};

const styles = {
  slideContainer: {
    height: '100%',
  },
};
