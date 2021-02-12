import React from 'react';
import '../styles/Day.scss';
import Lecture from './Lecture';

export default function Day({ name, lectures }) {
  const Lectures = lectures.length && lectures.map((lecture, index) => (
    <Lecture
      day={name}
      lecture={lecture}
      lectureIndex={index + 1}
      key={index}
    />
  ));

  return (
    <article className="day">
      <div className="day__container">
        <h1 className="day__heading">{name}</h1>
        {lectures.length ? (
          <div className="day__grid">{Lectures}</div>
        ) : (
          <div className="day__empty">
            <p>No lectures today</p>
          </div>
        )}
      </div>
    </article>
  );
}
