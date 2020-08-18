import React from 'react';

const Modal = ({ children }) => {
  return (
    <div className="myModal">
      <div className="innerModal">
        {children && children}
      </div>
    </div>
  );
};

export default Modal;
