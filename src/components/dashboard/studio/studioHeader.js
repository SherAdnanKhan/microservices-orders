import React from 'react';
import { useHistory } from 'react-router-dom';

const StudioHeader = ({ userStudio, onModelOpen }) => {
  const history = useHistory();

  return (
    <div className="studio-header-bar">
      <div className="back-icon">
        <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')} />
      </div>
      {userStudio && <p>{userStudio.user.username}</p>}
      <div className="actions">

        <button
          onClick={() => onModelOpen(true)}
        >
          Invite only
        </button>
      </div>
      <div className="heart">
        <img src="/assets/images/favebackoff.png" alt="" />
      </div>
    </div>
  );
};

export default StudioHeader;
