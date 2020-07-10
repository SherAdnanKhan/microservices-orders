import React from 'react';
import { useHistory } from 'react-router-dom';

const LeftBorder = () => {
  const history = useHistory();
  return (
    <div className="left">
      <img className="lobby-img" alt="" src="/assets/images/lobbyicon.png" onClick={() => history.push('/dashboard/lobby')} />
      <img className="mystudio-img" alt="" src="/assets/images/newstudioicon.png" onClick={() => history.push('/dashboard/my-studio')} />
      <img className="add-img" alt="" src="/assets/images/add.png" onClick={() => history.push('/dashboard/my-studio')} />
    </div>
  );
};

export default LeftBorder;
