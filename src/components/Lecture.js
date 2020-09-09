import React from 'react';
import '../styles/Lecture.scss';

export default function Lecture({ day, lecture, lectureIndex }) {
  const { timeslot, subject, faculty, room } = lecture;

  const classNames = ['lecture'];
  if (subject && subject.color) {
    classNames.push(`lecture--${subject.color}`);
  } else {
    classNames.push(`lecture--grey`);
  }

  return (
    <section id={`${day}-${lectureIndex}`} className={classNames.join(' ')}>
      <header className="lecture__header">
        <h4 className="lecture__index">{lectureIndex}</h4>
        <time className="lecture__time">{timeslot}</time>
        {room && <span className="lecture__room">{room}</span>}
      </header>
      {subject && (
        <div className="lecture__body">
          <h4 className="lecture__subject">
            {typeof subject === 'object' ? subject.name : subject}
          </h4>
          <p className="lecture__footer">
            {subject && typeof subject === 'object' && (
              <>
                {subject.code}
                {<span> &bull; </span>}
              </>
            )}
            {faculty && typeof faculty === 'object' ? faculty.name : faculty}
          </p>
        </div>
      )}
    </section>
  );
}
