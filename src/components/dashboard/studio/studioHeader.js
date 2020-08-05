import React from 'react';
import { useHistory } from 'react-router-dom';

const StudioHeader = ({ userStudio, onModelOpen, onUnSprFavModal }) => {
  const history = useHistory();
  return (
    <div
      className="studio-header-bar"
      style={{ backgroundColor: userStudio?.user.feel.color_code }}
    >
      <div className="back-icon">
        <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')} />
      </div>

      {userStudio && <p>{userStudio.user.username}</p>}

      <div className="actions">
        <span className="sprfav" onClick={() => history.push(`/dashboard/studio/sprfvs/${userStudio.user.slug}`)}> SPRFAV </span>
        {userStudio?.is_sprfvs !== 0 ?
          <img
            src={
              '/assets/images/sprfvs_full.png'
            }
            alt=""
            className="clickable sprvs-empty"
            onClick={() => onUnSprFavModal(true)}
          /> :
          <img
            src={
              '/assets/images/sprfvs_empty.png'
            }
            alt=""
            className="clickable sprvs-empty"
          />
        }
        <img
          onClick={() => onModelOpen(true)}
          src="/assets/images/invite_gallery_icon.png"
          className="clickable fav-icon invite-only"
          alt=""
        />
      </div>
    </div>
  );
};

export default StudioHeader;
