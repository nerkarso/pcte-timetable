import ButtonShowToday from 'components/ButtonShowToday';
import DayError from 'components/DayError';
import DaySkeleton from 'components/DaySkeleton';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SwipeableViewArea from 'components/SwipeableViewArea';
import Tabs from 'components/Tabs';
import { initGA, logPageView, trackEvent } from 'googleAnalytics';
import { useClassname } from 'hooks/ClassnameContext';
import { useLatestTimetable } from 'hooks/useLatestTimetable';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'styles/Timetable.scss';

export default function Timetable() {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView('Timetable');
    if (window.localStorage.getItem('classname')) {
      trackEvent('Class', 'From this Class', window.localStorage.getItem('classname'));
    }
  }, []);

  return (
    <>
      <Header />
      <Main />
      <ButtonShowToday />
      <Footer>
        <Tabs />
      </Footer>
    </>
  );
}

function Main() {
  const { data, error, loading } = useLatestTimetable();
  const { classname } = useClassname();

  if (loading) return <DaySkeleton />;
  if (error) return <DayError>{error.message}</DayError>;
  if (data.error) return <DayError>{data.message}</DayError>;
  if (!classname) return <Redirect to="/welcome" />;
  if (!data.timetable) {
    return (
      <Redirect
        to={{
          pathname: '/error',
          state: { message: 'Latest timetable not published' },
        }}
      />
    );
  }

  const timetable = JSON.parse(data.timetable);

  if (!timetable[classname]) {
    return (
      <Redirect
        to={{
          pathname: '/error',
          state: { message: 'Class does not exist' },
        }}
      />
    );
  }

  return <SwipeableViewArea timetable={timetable} classname={classname} />;
}
