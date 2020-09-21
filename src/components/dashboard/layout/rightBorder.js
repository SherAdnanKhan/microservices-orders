import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import ToolTip from "../../common/toolTip/toolTip";

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
        data-tip="chat"
        data-for="chat"
      />
      <ToolTip position="left" id="chat" />
      <img
        alt=""
        src="/assets/images/mzflash.png"
        onClick={() => history.push('/dashboard/mz-flash-group')}
        data-tip="mz-flash"
        data-for="mzflash"
      />
      <ToolTip position="left" id="mzflash" />
    </div>
  );
};

export default RightBorder;
