import React from 'react';

export default function DayError({ children }) {
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
