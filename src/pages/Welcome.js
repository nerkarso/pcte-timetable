import Logo from 'assets/logo.png';
import ButtonChooseClassname from 'components/ButtonChooseClassname';
import { useLatestTimetable } from 'hooks/useLatestTimetable';
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
      <ButtonChooseClassname />
    </section>
  );
}

function WelcomeDate() {
  const { data, error, loading } = useLatestTimetable();

  if (loading) return null;
  if (error || data.error) return <i>Error: {error.message || data.message}</i>;
  if (!data.date) return null;

  return <p>{new Date(data.date).toDateString()}</p>;
}
