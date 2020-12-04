import React from 'react';

const Textarea = ({
  id, name, label, error, showError = true, children, onEnter, childPosition = 'up', ...rest
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
        <textarea
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

export default Textarea;
