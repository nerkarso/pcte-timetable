import Day from 'components/Day';
import DaySkeleton from 'components/DaySkeleton';
import { ClassNameContext } from 'context/classname-context';
import { getDay, showLecture } from 'helpers';
import useLatestTimetable from 'hooks/useLatestTimetable';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function DayView({ day, index }) {
  const { data, error, loading } = useLatestTimetable();
  const { className } = useContext(ClassNameContext);

  useEffect(() => {
    if (className && getDay() !== -1) {
      setTimeout(showLecture, 1000);
    }
  }, [className]);

  if (loading) return <DaySkeleton />;
  if (data.error || error) return <DayError>{data.message || error.message}</DayError>;

  const timetable = JSON.parse(data.timetable);

  if (!className || !timetable[className]) return <Redirect to="/welcome" />;

  return <Day name={day} lectures={timetable[className][index] ? timetable[className][index] : []} key={index} />;
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
