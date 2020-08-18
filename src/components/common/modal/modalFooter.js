import React from 'react';

const ModalFooter = ({ children }) => {
  return (
    <div className="modalFooter">
      <div className="actions">
        {children && children}
      </div>
    </div>
  );
};

export default ModalFooter;
