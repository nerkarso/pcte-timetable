import ListItem from 'components/ListItem';
import MasterDetailsView from 'components/MasterDetailsView';
import Button from 'elements/Button';
import Loading from 'elements/Loading';
import Select from 'elements/Select';
import TextField from 'elements/TextField';
import useMasterDetails from 'hooks/useMasterDetails';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

export default function Subjects() {
  return (
    <div className="admin__container">
      <h1 className="admin__heading">Subjects</h1>
      <MasterDetailsView masterView={<MasterViewContents />} detailsView={<DetailsForm />} />
    </div>
  );
}

function useAPI() {
  return useSWR('/api/subjects');
}

function MasterViewContents() {
  const { data, error } = useAPI();

  if (!data && !error) return <Loading />;
  if (data.error) return <div className="message">Error: {data.message}</div>;
  if (!data.subjects.length) return <div className="message">No subjects here</div>;

  return (
    <div className="list">
      {data.subjects.map((item, i) => (
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
  const { mutate } = useAPI();
  const { register, handleSubmit, errors, setValue } = useForm();
  const { details, setDetails } = useMasterDetails();

  useEffect(() => {
    if (details) {
      setValue('code', details.code);
      setValue('name', details.name);
      setValue('color', details.color);
    }
  }, [details, setValue]);

  const clearFields = () => {
    setDetails(null);
    setValue('code', null);
    setValue('name', null);
    setValue('color', null);
  };

  const getBody = (data) => {
    return JSON.stringify({
      code: data.code,
      name: data.name,
      color: data.color,
    });
  };

  const onSubmit = (data) => {
    if (details) {
      // Update
      fetch(`/api/subjects/${details._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: getBody(data),
      }).then(() => {
        clearFields();
        mutate();
      });
    } else {
      // Create
      fetch(`/api/subjects`, {
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
    if (window.confirm('Do you really want to delete this subject?')) {
      fetch(`/api/subjects/${details._id}`, {
        method: 'DELETE',
      }).then(() => {
        clearFields();
        mutate();
      });
    }
  };

  return (
    <form id="details-form" className="form--details" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        label="Code"
        name="code"
        placeholder="HVPE-101"
        ref={register({ required: true })}
        errors={errors}
      />
      <TextField
        type="text"
        label="Name"
        name="name"
        placeholder="Human Values"
        ref={register({ required: true })}
        errors={errors}
      />
      <Select
        label="Color"
        name="color"
        options={[
          { value: '', label: 'Select a color' },
          { value: 'red', label: 'Red' },
          { value: 'yellow', label: 'Yellow' },
          { value: 'green', label: 'Green' },
          { value: 'teal', label: 'Teal' },
          { value: 'blue', label: 'Blue' },
          { value: 'indigo', label: 'Indigo' },
          { value: 'purple', label: 'Purple' },
        ]}
        ref={register({ required: true })}
        errors={errors}
      />
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
