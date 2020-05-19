import React from 'react';

const EditButton = ({ onEdit }) => {
  return (
    <div className="editstudio-btn">
      <button onClick={onEdit}>
        Edit Studio
      </button>
    </div>
  );
};

export default EditButton;
