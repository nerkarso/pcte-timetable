import ListItem from 'components/ListItem';
import MasterDetailsView from 'components/MasterDetailsView';
import Button from 'elements/Button';
import Loading from 'elements/Loading';
import TextField from 'elements/TextField';
import useMasterDetails from 'hooks/useMasterDetails';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

export default function Faculties() {
  return (
    <div className="admin__container">
      <h1 className="admin__heading">Faculties</h1>
      <MasterDetailsView masterView={<MasterViewContents />} detailsView={<DetailsForm />} />
    </div>
  );
}

function MasterViewContents() {
  const { data, error } = useSWR('/api/faculties');

  if (!data && !error) return <Loading />;
  if (data.error) return <div className="message">Error: {data.message}</div>;
  if (!data.faculties.length) return <div className="message">No faculties here</div>;

  return (
    <div className="list">
      {data.faculties.map((item, i) => (
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
      code: data.code,
      name: data.name,
    });
  };
  const onSubmit = (data) => {
    if (details) {
      // Update
      fetch(`/api/faculties/${details._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: getBody(data),
      }).then(() => {
        clearFields();
      });
    } else {
      // Create
      fetch(`/api/faculties`, {
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
      setValue('code', details.code);
      setValue('name', details.name);
    }
  }, [details, setValue]);

  const clearFields = () => {
    setValue('code', null);
    setValue('name', null);
  };

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this faculty?')) {
      fetch(`/api/faculties/${details._id}`, { method: 'DELETE' }).then(() => {
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
        label="Code"
        name="code"
        placeholder="KP"
        ref={register({ required: true })}
        errors={errors}
      />
      <TextField
        type="text"
        label="Name"
        name="name"
        placeholder="Kapil Prashar"
        ref={register({ required: true })}
        errors={errors}
      />
      <div className="form__actions form-field">
        <Button type="submit" className="button--default">
          Save
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
