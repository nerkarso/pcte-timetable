import Button from 'elements/Button';
import Loading from 'elements/Loading';
import Modal from 'elements/Modal';
import { useLatestTimetable } from 'hooks/useLatestTimetable';
import { useModal } from 'hooks/useModal';
import React from 'react';
import { Info } from 'react-feather';
import 'styles/List.scss';

export default function ButtonShowInfo() {
  const { isModalShown, toggleModalShown } = useModal();

  return (
    <>
      <Button title="Show info" onClick={toggleModalShown}>
        <Info color="var(--text)" size={24} />
      </Button>
      <Modal headerTitle="Info" closeTitle="Close" isModalShown={isModalShown} toggleModalShown={toggleModalShown}>
        <div className="list">
          <p className="list__item__between">
            <span>Date</span>
            <LatestDate />
          </p>
          <p className="list__item__between">
            <span>Version</span>
            <b>{process.env.REACT_APP_VERSION}</b>
          </p>
        </div>
      </Modal>
    </>
  );
}

function LatestDate() {
  const { data, error, loading } = useLatestTimetable();

  if (loading) return <Loading />;
  if (error || data.error) return <i>Error</i>;
  if (!data.date) return <i>None</i>;

  return <b>{new Date(data.date).toDateString()}</b>;
}
