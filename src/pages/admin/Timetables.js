import ListItem from 'components/ListItem';
import MasterDetailsView from 'components/MasterDetailsView';
import Button from 'elements/Button';
import Loading from 'elements/Loading';
import Modal from 'elements/Modal';
import TextField from 'elements/TextField';
import Toast from 'elements/Toast';
import { useMasterDetails } from 'hooks/MasterDetailsContext';
import { useModal } from 'hooks/useModal';
import { useToast } from 'hooks/useToast';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

export default function Timetables() {
  return (
    <div className="admin__container">
      <h1 className="admin__heading">Timetables</h1>
      <MasterDetailsView
        masterView={
          <>
            <ModalImportSheet />
            <MasterViewContents />
          </>
        }
        detailsView={<DetailsForm />}
      />
    </div>
  );
}

function useAPI() {
  return useSWR('/api/timetables');
}

function ModalImportSheet() {
  const { isModalShown, toggleModalShown } = useModal(false);
  const { isToastShown, setToastShown } = useToast();
  const [toastMessage, setToastMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { setDetails } = useMasterDetails();

  const hideToast = () => setToastShown(false);
  const showToast = (message) => {
    clearTimeout(hideToast);
    setToastMessage(message);
    setToastShown(true);
    setTimeout(hideToast, 3000);
  };

  const handleImport = async () => {
    const fileUploader = document.querySelector('#fileUploader');

    if (fileUploader.files.length < 1) {
      showToast('File is missing');
      return;
    }

    if (fileUploader.files[0].name.search(/\.xlsx|\.xls/) === -1) {
      showToast('Only Excel files allowed');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', fileUploader.files[0]);
      const data = await (
        await fetch('/api/timetables/import', {
          method: 'POST',
          body: formData,
        })
      ).json();
      if (data.error) {
        showToast(data.message);
      } else {
        toggleModalShown();
        setDetails({
          date: new Date().toJSON().substr(0, 10),
          data: JSON.stringify(data.data),
          published: true,
        });
      }
    } catch (ex) {
      showToast(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button type="button" className="button--primary mb-4" onClick={toggleModalShown}>
        Import spreadsheet
      </Button>
      <Modal headerTitle="Import spreadsheet" closeTitle="Cancel" primaryActionTitle="Import" primaryActionHandler={handleImport} isModalShown={isModalShown} toggleModalShown={toggleModalShown}>
        {isLoading ? (
          <div className="place-items-center">
            <Loading>Importing...</Loading>
          </div>
        ) : (
          <div className="modal__content">
            <input type="file" id="fileUploader" className="file-uploader mb-4" accept="application/*" />
            <p className="text-info">Only .xlsx and .xls files allowed</p>
          </div>
        )}
      </Modal>
      <Toast isToastShown={isToastShown}>{toastMessage}</Toast>
    </>
  );
}

function MasterViewContents() {
  const { data, error } = useAPI();

  if (!data && !error) return <Loading />;
  if (error) return <div className="message">Error: {error.message}</div>;
  if (data.error) return <div className="message">Error: {data.message}</div>;
  if (!data.timetables.length) return <div className="message">No timetables here</div>;

  const formatDate = (date) => {
    return new Date(date).toDateString();
  };

  return (
    <div className="list">
      {data.timetables.map((item, i) => (
        <MasterListItem item={{ name: formatDate(item.date), ...item }} key={i} />
      ))}
    </div>
  );
}

function MasterListItem({ item, ...props }) {
  const { setDetails } = useMasterDetails();

  const handleDetails = () => {
    setDetails(item);
    // Scroll to details form
    document.querySelector('#details-form').scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  return <ListItem onClick={handleDetails} color={item.published ? 'green' : 'grey'} {...item} {...props} />;
}

function DetailsForm() {
  const { mutate } = useAPI();
  const { register, handleSubmit, errors, setValue } = useForm();
  const { details, setDetails } = useMasterDetails();

  useEffect(() => {
    if (details) {
      setValue('date', details.date);
      setValue('data', details.data);
      setValue('published', details.published);
    }
  }, [details, setValue]);

  const clearFields = () => {
    setDetails(null);
    setValue('date', null);
    setValue('data', null);
    setValue('published', null);
  };

  const getBody = (data) => {
    return JSON.stringify({
      date: data.date,
      data: data.data ? data.data.replace(/\s+/g, ' ').trim() : null,
      published: data.published,
    });
  };

  const onSubmit = (data) => {
    if (details._id) {
      // Update
      fetch(`/api/timetables/${details._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: getBody(data),
      }).then(() => {
        clearFields();
        mutate();
      });
    } else {
      // Create
      fetch(`/api/timetables`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: getBody(data),
      }).then(() => {
        clearFields();
        mutate();
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this timetable?')) {
      fetch(`/api/timetables/${details._id}`, {
        method: 'DELETE',
      }).then(() => {
        clearFields();
        mutate();
      });
    }
  };

  return (
    <form id="details-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField type="date" label="Date" name="date" ref={register({ required: true })} errors={errors} />
      <div className="form-field">
        <label htmlFor="data" className="form-field__label">
          Data
        </label>
        <textarea name="data" id="data" className="form-field__control" rows="14" ref={register} />
      </div>
      <div className="form-field">
        <label htmlFor="published">
          <input type="checkbox" name="published" id="published" className="form-field__checkbox" ref={register} />
          <span>Published</span>
        </label>
      </div>
      <div className="form__actions form-field">
        <Button type="submit" className="button--default">
          {details ? 'Save' : 'Add'}
        </Button>
        {details && (
          <>
            <Button type="button" className="button--secondary" onClick={clearFields}>
              Clear
            </Button>
            <Button type="button" className="button--primary" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
