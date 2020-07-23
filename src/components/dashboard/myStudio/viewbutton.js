import React from 'react';

const ViewButton = ({ onEdit, feelColor }) => {
  return (
    <div
      className="editstudio-btn"
      style={{ backgroundColor: feelColor }}
    >
      <button onClick={onEdit}>
        <img src="/assets/images/paintbrush.png" alt="" />
        View Studio
      </button>
    </div>
  );
};

export default ViewButton;
