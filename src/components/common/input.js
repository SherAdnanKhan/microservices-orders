import React from 'react';

const Input = ({
  id, name, label, error, showError = true, children, type = 'text', ...rest
}) => (
    <>
      <label htmlFor={id}>
        <span className="labelText">
          {label}
        </span>
        {children && children}
        <input
          type={type}
          name={name}
          id={id}
          className={error && 'is-invalid'}
          {...rest}
        />
      </label>
    </>
  );

export default Input;
