import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ToolTip from "../../common/toolTip/toolTip";
import BlockUserModal from '../chat/blockUserModal';

const StudioHeader = ({ userStudio, onModelOpen, onSuperFav, onUnSprFavModal, onSuperFavRequested }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  }

  return (
    <div
      className="studio-header-bar"
      style={{ backgroundColor: userStudio?.user?.feel?.color_code }}
    >
      {show &&
        <BlockUserModal
          onClose={handleShow}
          isBlocked={userStudio.is_blocked}
          user={userStudio.user}
        />
      }
      <div className="back-icon">
        <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')} data-for="back" data-tip="back" />
        <ToolTip position="left" id="back" />
      </div>

      <p>{userStudio?.user?.username}</p>

      <div className="studio-actions">
        {userStudio && userStudio.is_blocked &&
          <button
            className="unblock"
            onClick={handleShow}
          >
            Unblock
          </button>
        }
        {userStudio && userStudio.is_viewable &&
          <>
            <span
              className="sprfav"
              onClick={() => history.push(`/dashboard/studio/sprfvs/${userStudio.user.slug}`)}
              data-tip="sprfvs list"
              data-for="sprfvsList"
            >
              SPRFV({userStudio?.sprfvs_count})
            </span>
            <ToolTip position="bottom" id="sprfvsList" />
            {userStudio?.is_sprfvs === 1 ?
              <>
                <img
                  src={
                    '/assets/images/sprfvs_full.png'
                  }
                  alt=""
                  className="clickable sprvs-empty"
                  onClick={() => onUnSprFavModal(true)}
                  data-for="sprfvsUn"
                  data-tip="sprfvs"
                />
                <ToolTip position="bottom" id="sprfvsUn" />
              </>
              : userStudio?.is_sprfvs === 0 ?
                <>
                  <img
                    src={
                      '/assets/images/sprfvs_empty.png'
                    }
                    alt=""
                    className="clickable sprvs-empty"
                    onClick={() => onSuperFav()}
                    data-for="sprfvsSup"
                    data-tip="sprfvs"
                  />
                  <ToolTip position="bottom" id="sprfvsSup" />
                </>
                :
                <>
                  <img
                    src={
                      '/assets/images/sprfvs_empty.png'
                    }
                    alt=""
                    className="clickable sprvs-empty"
                    onClick={() => onSuperFavRequested()}
                    data-for="sprfvsRequest"
                    data-tip="sprfvs"
                  />
                  <ToolTip position="bottom" id="sprfvsRequest" />
                </>
            }
            <img
              onClick={() => onModelOpen(true)}
              src="/assets/images/invite_gallery_icon.png"
              className="clickable fav-icon invite-only"
              alt=""
              data-tip="send invitation"
              data-for="sendInvitation"
            />
            <ToolTip position="bottom" id="sendInvitation" />
          </>
        }
      </div>
    </div>
  );
};

export default StudioHeader;
