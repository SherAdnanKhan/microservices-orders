import React from 'react';

const ModalBody = ({ children }) => {
  return (
    <div className="modalBody">
      <div className="modalContent">
        {children && children}
      </div>
    </div>
  );
};

export default ModalBody;
