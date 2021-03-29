import Button from 'elements/Button';
import React from 'react';
import { Calendar } from 'react-feather';

export default function ButtonOpenTimetable() {
  return (
    <Button title="Open timetable" onClick={() => window.open('/', '_blank')}>
      <Calendar color="var(--text)" size={24} />
    </Button>
  );
}
