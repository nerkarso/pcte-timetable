import Logo from 'assets/logo.png';
import ChooseClassName from 'components/ChooseClassName';
import useLatestTimetable from 'hooks/useLatestTimetable';
import React from 'react';
import 'styles/Welcome.scss';

export default function Welcome() {
  return (
    <section className="welcome">
      <img src={Logo} alt="Logo" />
      <div className="welcome__body">
        <h3 className="welcome__title">{process.env.REACT_APP_TITLE}</h3>
        <WelcomeDate />
      </div>
      <ChooseClassName placeholder="Choose your class" />
    </section>
  );
}

function WelcomeDate() {
  const { data, error, loading } = useLatestTimetable();

  if (loading) return null;
  if (data.error || error) return <i>Error: {data.message || error.message}</i>;
  if (!data.date) return null;

  return <p>{new Date(data.date).toDateString()}</p>;
}
