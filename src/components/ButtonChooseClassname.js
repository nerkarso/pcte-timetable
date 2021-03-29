import Loading from 'elements/Loading';
import Modal from 'elements/Modal';
import { trackEvent } from 'googleAnalytics';
import { useClassname } from 'hooks/ClassnameContext';
import { useLatestTimetable } from 'hooks/useLatestTimetable';
import { useModal } from 'hooks/useModal';
import React from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/Button.scss';
import 'styles/List.scss';

export default function ButtonChooseClassname() {
  const history = useHistory();
  const { classname, setClassname } = useClassname();
  const { isModalShown, toggleModalShown } = useModal();
  const { data, error, loading } = useLatestTimetable();

  if (loading) return <Loading />;
  if (error || data.error) return null;
  if (!data.classnames) return null;

  return (
    <>
      <button className="button--chooser" title="Choose your class" onClick={toggleModalShown}>
        {classname ? classname : 'Choose your class'}
      </button>
      <Modal
        headerTitle="Choose your class"
        closeTitle="Close"
        isModalShown={isModalShown}
        toggleModalShown={toggleModalShown}>
        <div className="list">
          {data.classnames.map((item) => (
            <button
              className={`list__item${classname === item.name ? ' list__item--active' : ''}`}
              onClick={() => {
                setClassname(item.name);
                trackEvent('Class', 'Chose this Class', item.name);
                history.push('/');
              }}
              key={item._id}>
              {item.name}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
