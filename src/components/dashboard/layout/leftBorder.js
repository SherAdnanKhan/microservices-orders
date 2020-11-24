import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import ToolTip from "../../common/toolTip/toolTip";

const LeftBorder = () => {
  const history = useHistory();
  const { feelColor } = useSelector(state => state.feelColor);
  return (
    <div className="invisible-left">
      <div
      className="left"
      style={{ backgroundColor: feelColor }}
      >
      
      <img
        className="lobby-img"
        alt=""
        src="/assets/images/lobbyicon.png"
        onClick={() => history.push('/lobby')}
        data-tip="lobby"
      />
      <ToolTip position="right" />
      <img
        className="mystudio-img"
        alt=""
        src="/assets/images/newstudioicon.png"
        onClick={() => history.push('/my-studio')}
        data-tip="my studio"
      />
      <ToolTip id="my" position="right" />
      <img
        className="add-img"
        alt=""
        src="/assets/images/add.png"
        onClick={() => history.push('/exhibition')}
        data-tip="add exhibit"
      />
      <ToolTip position="right" />
      </div>
    </div>
    
  );
};

export default LeftBorder;
