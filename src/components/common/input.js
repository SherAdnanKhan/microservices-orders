import React from 'react';

const Input = ({
  id, name, label, error, showError = true, children, onEnter, type = 'text', ...rest
}) => {
  const handleKeyUp = e => {
    e.preventDefault();

    if (e.keyCode === 13) {
      onEnter && onEnter();
    }
  }

  return (
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
          onKeyUp={handleKeyUp}
          className={error && 'is-invalid'}
          {...rest}
        />
      </label>
      {showError && error &&
        <div className="error">{error}</div>}
    </>
  );
}

export default Input;
