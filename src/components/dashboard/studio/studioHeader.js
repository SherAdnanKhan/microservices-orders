import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ToolTip from "../../common/toolTip/toolTip";
import ConfirmationModal from '../chat/confirmationModal';
import { blockUser, unBlockUser } from "../../../actions/userActions";
import { useDispatch } from "react-redux";

const StudioHeader = ({ userStudio, onModelOpen, onSuperFav, onUnSprFavModal, onSuperFavRequested }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleShow = () => {
    setShow(!show);
  }

  const handleBlockUser = (userStudio) => {
    const user = userStudio?.user;
    if (userStudio?.is_blocked) {
      const data = {
        unblock_user_id: user.id
      }
      dispatch(unBlockUser(data, user.username))
    }
    else {
      const data = {
        block_user_id: user.id
      }
      dispatch(blockUser(data, user.username))
    }
    setShow(false);
  }

  return (
    <div
      className="studio-header-bar"
      style={{ backgroundColor: userStudio?.user?.feel?.color_code }}
    >
      {show &&
        <ConfirmationModal
          onCancel={handleShow}
          isBlocked={userStudio.is_blocked}
          user={userStudio.user}
          message={userStudio.is_blocked ?
            `Are you sure you want to unblock ${userStudio.user.username}?`
            : `Are you sure you want to block ${userStudio.user.username}?`}
          onConfirm={() => handleBlockUser(userStudio)}
        />
      }
      <div className="back-icon">
        <i className="fa fa-arrow-left clickable" onClick={() => history.push('/lobby')} data-for="back" data-tip="back" />
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
              onClick={() => history.push(`/studio/sprfvs/${userStudio.user.slug}`)}
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
