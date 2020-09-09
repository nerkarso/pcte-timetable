import React from 'react';
import { Info } from 'react-feather';
import { date } from '../data/db.json';
import Button from '../elements/Button';
import Modal from '../elements/Modal';
import useModal from '../hooks/useModal';

export default function ButtonShowInfo() {
  const { isModalShown, toggleModalShown } = useModal();

  return (
    <>
      <Button title="Show info" onClick={toggleModalShown}>
        <Info color="var(--text)" size={24} />
      </Button>
      <Modal
        headerTitle="Info"
        closeTitle="Close"
        isModalShown={isModalShown}
        toggleModalShown={toggleModalShown}
      >
        <p>Date: {date}</p>
        <p>Version: {process.env.REACT_APP_VERSION}</p>
      </Modal>
    </>
  );
}
