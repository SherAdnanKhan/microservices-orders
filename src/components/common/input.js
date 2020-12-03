import React from 'react';

const Input = ({
  id, name, label, error, showError = true, children, onEnter, type = 'text', childPosition = 'up', ...rest
}) => {
  const handleKeyUp = e => {
    e.preventDefault();
    e.stopPropagation();

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
        {childPosition === 'up' &&
          <>
            {children && children}
          </>
        }
        <input
          type={type}
          name={name}
          id={id}
          onKeyUp={handleKeyUp}
          className={error && 'is-invalid'}
          {...rest}
        />
      </label>
      {childPosition === 'down' &&
        <>
          {children && children}
        </>
      }
      {showError && error &&
        <div className="error">{error}</div>}
    </>
  );
}

export default Input;
