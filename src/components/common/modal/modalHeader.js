import React from 'react';

const ModalHeader = ({ title, onClose, children }) => {
  return (
    <div className="modalHeader">
      {children && children}
      <div className="title">
        {title && title}
      </div>
      <div className="btn-close" onClick={onClose}>
        <i className="far fa-times-circle"></i>
      </div>
    </div>
  );
};

export default ModalHeader;
