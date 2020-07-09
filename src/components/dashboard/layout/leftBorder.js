import React from 'react';
import { useHistory } from 'react-router-dom';

const LeftBorder = () => {
  const history = useHistory();
  return (
    <div className="left">
      <img alt="" src="/assets/images/lobbyicon.png" onClick={() => history.push('/dashboard/lobby')} />
      <img alt="" src="/assets/images/newstudioicon.png" onClick={() => history.push('/dashboard/my-studio')} />
      <img alt="" src="/assets/images/add.png" onClick={() => history.push('/dashboard/my-studio')} />
    </div>
  );
};

export default LeftBorder;
