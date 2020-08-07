import React from 'react';
import Avatar from '../../common/avatar';

const SharePostStrqModal = ({ onShare, onModalClose, post, favouriteUsers, sendUser }) => {
  return (
    <div className="studio">
      <div className="gallery-model">
        <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
        <div className="gallery-container">
          <div className="heading"> Send Post to your Faves</div>
          {favouriteUsers &&
            favouriteUsers.map((user, index) => (
              <div
                className={'cube-info'}
                key={index}
              >
                <div className="cube">
                  <Avatar
                    avatars={user.avatars}
                    feelColor={user.feel.color_code}
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