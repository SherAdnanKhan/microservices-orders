import React, { useEffect } from 'react';
import Avatar from '../common/avatar';
import { getFavouriteGalleryUsers } from "../../actions/lobbyActions";
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from "../../utils/helperFunctions";
import { clearStatus, sharePostOnStrq } from '../../actions/postAction';
import Loader from './loader';
import { useWindowUnloadEffect } from './useWindowUnloadEffect';

const SharePostStrqModal = ({ onModalClose, post }) => {
  const {
    postView: { sentUsers },
  } = useSelector(state => state);

  const dispatch = useDispatch();
  const {
    lobby: { favouriteUsers },
  } = useSelector(state => state);

  useWindowUnloadEffect(() => {
    dispatch(clearStatus())
  }, true);

  useEffect(() => {
    dispatch(getFavouriteGalleryUsers())
  }, [dispatch])

  const handleStrqShare = (post, userId) => {
    dispatch(sharePostOnStrq(post, userId,));
  }

  return (
    <div className="studio">
      <div className="gallery-model">
        <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
        <div className="gallery-container">
          <div className="heading"> Send Post to your Faves</div>
          {/* Mapping through existing lists via props  */}
          {favouriteUsers.data.map((user, index) => (
            <div
              className={'cube-info'}
              key={index}
            >
              <div className="cube">
                <Avatar
                  user={user}
                />
                <div>{user.username}</div>
                <div className="send-btn-modal">
                  <button className="button"
                    disabled={sentUsers[user.id] === undefined ? false : true}
                    onClick={() => handleStrqShare(post, user.id)}
                  >
                    {sentUsers[user.id] === true &&
                      <Loader />
                    }
                    {sentUsers[user.id] === undefined &&
                      <> Send </>
                    }
                    {sentUsers[user.id] === false &&
                      <> Sent </>
                    }
                  </button>
                </div>
              </div>
            </div>
          ))
          }
          {isEmpty(favouriteUsers?.data) &&
            <p style={{ textAlign: "center" }}>There are no faved users</p>
          }
        </div>
      </div>
    </div>

  );
};

export default SharePostStrqModal;