import Lecture from 'components/Lecture';
import React from 'react';
import 'styles/Day.scss';

export default function Day({ name, lectures }) {
  return (
    <article className="day">
      <div className="day__container">
        <h1 className="day__heading">{name}</h1>
        <Lectures day={name} lectures={lectures} />
      </div>
    </article>
  );
}

function Lectures({ day, lectures }) {
  if (lectures.length > 0) {
    return (
      <div className="day__grid">
        {lectures.map((lecture, i) => (
          <Lecture day={day} lecture={lecture} lectureIndex={i + 1} key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="day__empty">
      <p>No lectures today</p>
    </div>
  );
}
