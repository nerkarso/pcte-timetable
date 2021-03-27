import React, { forwardRef } from 'react';
import 'styles/Form.scss';

export const Label = ({ children, ...props }) => {
  return (
    <label className="form-field__label" {...props}>
      {children}
    </label>
  );
};

const Input = forwardRef(({ ...props }, ref) => {
  return <input className="form-field__control" ref={ref} {...props} />;
});

const TextField = forwardRef(({ errors, label, name, ...props }, ref) => {
  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} ref={ref} {...props} />
      {errors && errors[name] && <div className="form-field__feedback">This field is required</div>}
    </div>
  );
});

export default TextField;
