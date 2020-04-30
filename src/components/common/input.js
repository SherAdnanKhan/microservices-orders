import React from 'react'

const Input = ({ id, name, label, error, children, type = 'text', ...rest }) => {
  console.log(rest);
  return (
    <>
      <label htmlFor={id}>
        <span className="labelText" > {label} </span>
        {children && children}
        <input
          type={type}
          name={name}
          id={id}
          className={error && "is-invalid"}
          {...rest}
        />
      </label >
      {error && <div className="error"> {error}</div>}
    </>
  );
};

export default Input;
