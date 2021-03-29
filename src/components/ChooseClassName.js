import { ClassNameContext } from 'context/classname-context';
import Loading from 'elements/Loading';
import Modal from 'elements/Modal';
import useLatestTimetable from 'hooks/useLatestTimetable';
import useModal from 'hooks/useModal';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/Button.scss';
import 'styles/List.scss';

export default function ChooseClassName({ placeholder }) {
  const history = useHistory();
  const { data, error, loading } = useLatestTimetable();
  const { isModalShown, toggleModalShown } = useModal();
  const { className, changeClassName } = useContext(ClassNameContext);

  const handleItemClick = (name) => {
    changeClassName(name);
    history.push('/');
  };

  if (loading) return <Loading />;
  if (data.error || error) return null;
  if (!data.classnames) return null;

  return (
    <>
      <button className="button--chooser" title="Choose your class" onClick={toggleModalShown}>
        {className ? className : placeholder}
      </button>
      <Modal
        headerTitle="Choose your class"
        closeTitle="Close"
        isModalShown={isModalShown}
        toggleModalShown={toggleModalShown}>
        <div className="list">
          {data.classnames.map((item) => (
            <button
              className={`list__item${className === item.name ? ' list__item--active' : ''}`}
              onClick={() => handleItemClick(item.name)}
              key={item._id}>
              {item.name}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
