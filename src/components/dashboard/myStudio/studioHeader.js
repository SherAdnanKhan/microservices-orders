import React from 'react';
import { useHistory } from 'react-router-dom';

const StudioHeader = ({ myStudio, feelColor }) => {
  const history = useHistory();

  return (
    <div
      className="header-bar"
      style={{ backgroundColor: feelColor }}
    >
      <div className="back-icon">
        <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')} />
      </div>
      {myStudio && <p>{myStudio.user.username}</p>}
      <div className="actions">
        <img
          src='/assets/images/sprfvs_full.png'
          alt=""
          className="clickable"
          onClick={() => history.push(`/dashboard/my-studio/sprfvs/${myStudio.user.slug}`)}
        />
      </div>
    </div>
  );
};

export default StudioHeader;
