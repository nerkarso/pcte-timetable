import Modal from 'elements/Modal';
import Toast from 'elements/Toast';
import { getDay, showLecture } from 'helpers';
import { useSlide } from 'hooks/SlideContext';
import { useModal } from 'hooks/useModal';
import { useToast } from 'hooks/useToast';
import React from 'react';
import { Calendar } from 'react-feather';
import 'styles/FloatingButton.scss';

let headerTitle;
let closeTitle;
let modalBody;

export default function ButtonShowToday() {
  const { isToastShown, setToastShown } = useToast();
  const { isModalShown, toggleModalShown } = useModal();
  const { slideIndex, setSlideIndex } = useSlide();

  const showToday = () => {
    if (getDay() === slideIndex) {
      showLecture();
      setToastShown(true);
      setTimeout(() => setToastShown(false), 3000);
    } else if (getDay() === -1) {
      headerTitle = 'Free';
      closeTitle = 'Okay';
      modalBody = (
        <>
          <p>There are no lectures today.</p>
          <p>Enjoy your day.</p>
        </>
      );
      toggleModalShown();
    } else {
      setSlideIndex(getDay());
      setTimeout(showLecture, 1000);
    }
  };

  return (
    <>
      <button className="floating-button" title="Show today" onClick={showToday}>
        <Calendar color="white" size={24} />
      </button>
      <Toast isToastShown={isToastShown}>This is today</Toast>
      <Modal
        headerTitle={headerTitle}
        closeTitle={closeTitle}
        isModalShown={isModalShown}
        toggleModalShown={toggleModalShown}>
        {modalBody}
      </Modal>
    </>
  );
}
