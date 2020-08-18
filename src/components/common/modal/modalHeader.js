import React from 'react';

const ModalHeader = ({ title, onClose, feelColor }) => {
  return (
    <div className="modalHeader">
      <div className="title">
        {title && title}
      </div>
      <div className="btn-close" onClick={onClose}>
        <i className="far fa-times-circle" style={{ color: feelColor && feelColor }}></i>
      </div>
    </div>
  );
};

export default ModalHeader;
