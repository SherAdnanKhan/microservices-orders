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
        <span className="sprfav"> SPRFAV </span>
        <img
          src={userStudio?.is_sprfvs
            ? '/assets/images/sprfvs_full.png'
            : '/assets/images/sprfvs_empty.png'
          }
          alt=""
          className="clickable sprvs-empty"
          onClick={() => history.push(`/dashboard/studio/sprfvs/${userStudio.user.slug}`)}
        />
        <img
          onClick={() => onModelOpen(true)}
          src="/assets/images/invite_gallery_icon.png"
          className="clickable fav-icon invite-only"
          alt=""
        />
      </div>

      <div className="heart">
        <img src="/assets/images/favebackoff.png" alt="" />
      </div>
    </div>
  );
};

export default StudioHeader;
