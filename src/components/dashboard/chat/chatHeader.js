import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import MeuzmLogo from '../../common/meuzmLogo';
import Avatar from '../../common/avatar';

const ChatHeader = ({ user, conversation, onlineUsers, onOpenInvitationModel, onOpenParticipatsModel }) => {
  const history = useHistory();

  return (
    <div
      className='chat-header'
      style={{
        backgroundColor:
          conversation?.participants.length > 2
            ? 'red'
            : user?.feel.color_code
      }}
    >
      <i
        className="fa fa-arrow-left clickable"
        onClick={() => history.goBack()}
      />
      {conversation?.participants.length > 2
        ? (
          <div onClick={onOpenParticipatsModel}>
            <MeuzmLogo />
          </div>
        ) : (
          <Link to={`/dashboard/studio/${user?.slug}`} >
            <Avatar avatars={user?.avatars} feelColor={user?.feel.color_code} />
          </Link>
        )
      }

      <div className="user-Status">
        {conversation?.participants.length > 2
          ? (
            <>
              <p className="clickable" onClick={onOpenParticipatsModel}>
                {conversation.participants.length - 1} participants
              </p>
            </>
          ) : (
            <>
              <p>
                <Link to={`/dashboard/studio/${user?.slug}`} >{user?.username}</Link>
              </p>
              <span>
                {onlineUsers?.some(slug => slug === user?.slug)
                  ? <> Online </>
                  : <>{user?.last_login}</>
                }
              </span>
            </>
          )
        }

      </div>

      <div className="call-btn">
        <button className="addPeople" onClick={onOpenInvitationModel}> add people </button>
        <Link to="/dashboard/video-call">
          <img href="#" src="/assets/images/icons/VidStrq.png" className="call-icon" alt="Video Call"></img>
        </Link>
        <img src="/assets/images/icons/DrawStrq.png" alt="Draw"></img>
      </div>
    </div>
  );
};

export default ChatHeader;
