import React from 'react';
import { useHistory } from 'react-router-dom';

const StudioHeader = ({ myStudio }) => {
  const history = useHistory();

  return (
    <div className="header-bar">
      <div className="back-icon">
        <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')} />
      </div>
      {myStudio && <p>{myStudio.user.username}</p>}
    </div>
  );
};

export default StudioHeader;
