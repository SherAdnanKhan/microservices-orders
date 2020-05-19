import React from 'react';

const ViewButton = ({ onEdit }) => {
  return (
    <div className="editstudio-btn">
      <button onClick={onEdit}>
        <img src="/assets/images/paintbrush.png" alt="" />
        View Studio
      </button>
    </div>
  );
};

export default ViewButton;
