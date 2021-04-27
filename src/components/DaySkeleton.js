import React from 'react';

export default function DaySkeleton() {
  return (
    <article className="day">
      <div className="day__container">
        <h1 className="day__heading day__heading--skeleton">Day</h1>
        <div className="day__grid">
          {[1, 2, 3].map((i) => (
            <LectureSkeleton key={i} />
          ))}
        </div>
      </div>
    </article>
  );
}

function LectureSkeleton() {
  return <section className="lecture lecture--skeleton"></section>;
}
