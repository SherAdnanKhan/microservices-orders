import React from 'react';
import { useHistory } from 'react-router-dom';

const LeftBorder = ({ feelColor }) => {
  const history = useHistory();
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
        onClick={() => history.push('/dashboard/exhibition/new')}
      />
    </div>
  );
};

export default LeftBorder;
