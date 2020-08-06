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
                className={'col-3'}
                key={index}
              >
                <div className="cube">
                  <Avatar
                    avatars={user.avatars}
                    feelColor={user.feel.color_code}
                  />
                  <div>{user.username}</div>
                  {sendUser?.userId !== user.id &&
                    <button className="button success" onClick={() => onShare(post, user.id)}>Send</button>
                  }
                  {sendUser?.sendStatus && sendUser.userId === user.id &&
                    <button className="button success" >Sent</button>
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