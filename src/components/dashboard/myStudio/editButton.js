import React from 'react';

const EditButton = ({ onEdit, feelColor }) => {
  return (
    <div
      className="editstudio-btn"
      style={{ backgroundColor: feelColor }}
    >
      <button onClick={onEdit}>
        Edit Studio
      </button>
    </div>
  );
};

export default EditButton;
