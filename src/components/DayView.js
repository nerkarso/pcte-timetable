import Day from 'components/Day';
import DaySkeleton from 'components/DaySkeleton';
import { getDay, showLecture } from 'helpers';
import { useClassname } from 'hooks/ClassnameContext';
import { useLatestTimetable } from 'hooks/useLatestTimetable';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function DayView({ day, index }) {
  const { data, error, loading } = useLatestTimetable();
  const { classname } = useClassname();

  useEffect(() => {
    if (classname && getDay() !== -1) {
      setTimeout(showLecture, 1000);
    }
  }, [classname]);

  if (loading) return <DaySkeleton />;
  if (error) return <DayError>{error.message}</DayError>;
  if (data.error) return <DayError>{data.message}</DayError>;
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

  if (!classname || !timetable[classname]) {
    return (
      <Redirect
        to={{
          pathname: '/error',
          state: { message: 'Class does not exist' },
        }}
      />
    );
  }

  return <Day name={day} lectures={timetable[classname][index] ? timetable[classname][index] : []} key={index} />;
}

export function DayError({ children }) {
  return (
    <article className="day">
      <div className="day__container">
        <h1 className="day__heading">Error</h1>
        <p>
          <i>Error: {children}</i>
        </p>
      </div>
    </article>
  );
}
