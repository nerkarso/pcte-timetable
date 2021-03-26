import ListItem from 'components/ListItem';
import MasterDetailsView from 'components/MasterDetailsView';
import Button from 'elements/Button';
import Loading from 'elements/Loading';
import TextField from 'elements/TextField';
import useMasterDetails from 'hooks/useMasterDetails';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

export default function Classnames() {
  return (
    <div className="admin__container">
      <h1 className="admin__heading">Classnames</h1>
      <MasterDetailsView masterView={<MasterViewContents />} detailsView={<DetailsForm />} />
    </div>
  );
}

function MasterViewContents() {
  const { data, error } = useSWR('/api/classnames');

  if (!data && !error) return <Loading />;
  if (data.error) return <div className="message">Error: {data.message}</div>;
  if (!data.classnames.length) return <div className="message">No classnames here</div>;

  return (
    <div className="list">
      {data.classnames.map((item, i) => (
        <MasterListItem item={item} key={i} />
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

  return <ListItem onClick={handleDetails} {...item} {...props} />;
}

function DetailsForm() {
  const { register, handleSubmit, errors, setValue } = useForm();
  const getBody = (data) => {
    return JSON.stringify({
      name: data.name,
    });
  };
  const onSubmit = (data) => {
    if (details) {
      // Update
      fetch(`/api/classnames/${details._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: getBody(data),
      }).then(() => {
        clearFields();
      });
    } else {
      // Create
      fetch(`/api/classnames`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: getBody(data),
      }).then(() => {
        clearFields();
      });
    }
  };

  const { details, setDetails } = useMasterDetails();
  useEffect(() => {
    if (details) {
      setValue('name', details.name);
    }
  }, [details, setValue]);

  const clearFields = () => {
    setValue('name', null);
  };

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this class?')) {
      fetch(`/api/classnames/${details._id}`, { method: 'DELETE' }).then(() => {
        clearFields();
      });
    }
  };

  const handleNew = () => {
    setDetails(null);
    clearFields();
  };

  return (
    <form id="details-form" className="form--details" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        label="Name"
        name="name"
        placeholder="BCA-1"
        ref={register({ required: true })}
        errors={errors}
      />
      <div className="form__actions form-field">
        <Button type="submit" className="button--default">
          Add
        </Button>
        {details && (
          <Button type="button" className="button--primary" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button type="button" className="button--secondary" onClick={handleNew}>
          New
        </Button>
      </div>
    </form>
  );
}
