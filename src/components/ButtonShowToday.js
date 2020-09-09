import React, { useContext } from 'react';
import { Calendar } from 'react-feather';
import { SlideContext } from '../context/slide-context';
import Button from '../elements/Button';
import Modal from '../elements/Modal';
import useModal from '../hooks/useModal';

let headerTitle;
let closeTitle;
let modalBody;

export default function ButtonShowToday() {
  const { isModalShown, toggleModalShown } = useModal();
  const { slideIndex, changeSlideIndex } = useContext(SlideContext);

  const showToday = () => {
    const today = new Date();
    const thisDay = today.getDay() - 1;

    if (thisDay === slideIndex) {
      headerTitle = `Today`;
      closeTitle = 'Ok';
      modalBody = (
        <>
          <p>These are the lectures for today.</p>
          <p>Have a nice day.</p>
        </>
      );

      toggleModalShown();
    } else if (thisDay === -1) {
      headerTitle = 'Free';
      closeTitle = 'Thanks';
      modalBody = (
        <>
          <p>There are no lectures today.</p>
          <p>Enjoy your day.</p>
        </>
      );

      toggleModalShown();
    } else {
      changeSlideIndex(thisDay);
    }
  };

  return (
    <>
      <Button title="Show today" onClick={showToday}>
        <Calendar color="var(--text)" size={24} />
      </Button>
      <Modal
        headerTitle={headerTitle}
        closeTitle={closeTitle}
        isModalShown={isModalShown}
        toggleModalShown={toggleModalShown}
      >
        {modalBody}
      </Modal>
    </>
  );
}
