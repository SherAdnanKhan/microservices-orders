import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const LeftBorder = () => {
  const history = useHistory();
  const { feelColor } = useSelector(state => state.feelColor);
  return (
    <div
      className="left"
      style={{ backgroundColor: feelColor }}
    >
      <img
        className="lobby-img"
        alt=""
        src="/assets/images/lobbyicon.png"
        onClick={() => history.push('/dashboard/lobby')}
      />
      <img
        className="mystudio-img"
        alt=""
        src="/assets/images/newstudioicon.png"
        onClick={() => history.push('/dashboard/my-studio')}
      />
      <img
        className="add-img"
        alt=""
        src="/assets/images/add.png"
        onClick={() => history.push('/dashboard/exhibition')}
      />
    </div>
  );
};

export default LeftBorder;
