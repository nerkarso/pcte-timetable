import Button from 'elements/Button';
import React from 'react';
import { Calendar } from 'react-feather';

export default function ButtonOpenTimetable() {
  const handleOpen = () => {
    window.open('/', '_blank');
  };

  return (
    <Button title="Open Timetable" onClick={handleOpen}>
      <Calendar color="var(--text)" size={24} />
    </Button>
  );
}
