import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const RightBorder = () => {
  const history = useHistory();
  const { feelColor } = useSelector(state => state.feelColor);
  return (
    <div
      className="right right-border"
      style={{ backgroundColor: feelColor }}
    >
      <img
        alt=""
        src="/assets/images/strqicon.png"
        onClick={() => history.push('/dashboard/chat')}
      />
      <img
        alt=""
        src="/assets/images/mzflash.png"
        onClick={() => history.push('/dashboard/mz-flash-group')}
      />
    </div>
  );
};

export default RightBorder;
