import React, { useEffect } from 'react';
import Avatar from '../common/avatar';
import { getFavouriteGalleryUsers } from "../../actions/lobbyActions";
import { useDispatch, useSelector } from 'react-redux';

const SharePostStrqModal = ({ onShare, onModalClose, post, favUsers, sendUser }) => {

  const dispatch = useDispatch();
  const {
    lobby: { favouriteUsers },
  } = useSelector(state => state);

  useEffect(() => {
    if (!favUsers) {
      dispatch(getFavouriteGalleryUsers())
    }
  }, [dispatch, favUsers])

  return (
    <div className="studio">
      <div className="gallery-model">
        <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
        <div className="gallery-container">
          <div className="heading"> Send Post to your Faves</div>
          {/* Mapping through existing lists via props  */}
          {favUsers ?
            favUsers.map((user, index) => (
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
                    {sendUser?.userId !== user.id &&
                      <button className="button success" onClick={() => onShare(post, user.id)}>Send</button>
                    }
                  </div>
                  {sendUser?.sendStatus && sendUser.userId === user.id &&
                    <button className="button success sents" >Sent</button>
                  }
                </div>
              </div>
            ))
            // if no fav users are there then mapping through reducer state
            :
            favouriteUsers.data.map((user, index) => (
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
                    {sendUser?.userId !== user.id &&
                      <button className="button success" onClick={() => onShare(post, user.id)}>Send</button>
                    }
                  </div>
                  {sendUser?.sendStatus && sendUser.userId === user.id &&
                    <button className="button success sents" >Sent</button>
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>

  );
};

export default SharePostStrqModal;