import ListItem from 'components/ListItem';
import MasterDetailsView from 'components/MasterDetailsView';
import Button from 'elements/Button';
import Loading from 'elements/Loading';
import TextField from 'elements/TextField';
import useMasterDetails from 'hooks/useMasterDetails';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

export default function Timetables() {
  return (
    <div className="admin__container">
      <h1 className="admin__heading">Timetables</h1>
      <MasterDetailsView masterView={<MasterViewContents />} detailsView={<DetailsForm />} />
    </div>
  );
}

function useAPI() {
  return useSWR('/api/timetables');
}

function MasterViewContents() {
  const { data, error } = useAPI();

  if (!data && !error) return <Loading />;
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
    if (details) {
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
