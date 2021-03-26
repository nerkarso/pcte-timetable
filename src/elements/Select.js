import { Label } from 'elements/TextField';
import React, { forwardRef } from 'react';
import 'styles/Form.scss';

const Select = forwardRef(({ errors, label, name, options, ...props }, ref) => {
  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <select className="form-field__control" name={name} ref={ref} {...props}>
        {options.map(({ value, label }, i) => (
          <option value={value} key={i}>
            {label}
          </option>
        ))}
      </select>
      {errors[name] && <div className="form-field__feedback">This field is required</div>}
    </div>
  );
});

export default Select;
