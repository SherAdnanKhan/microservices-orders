import React from 'react';
import ToolTip from '../../common/toolTip/toolTip';

const ViewButton = ({ onEdit, feelColor }) => {
  return (
    <div
      className="editstudio-btn"
      style={{ backgroundColor: feelColor }}
    >
      <button onClick={onEdit}>
        <img
          src="/assets/images/paintbrush.png"
          alt=""
          data-for="viewStudio"
          data-tip="View studio"
        />
        View Studio
        <ToolTip id="viewStudio" />
      </button>
    </div>
  );
};

export default ViewButton;
