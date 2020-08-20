import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import MeuzmLogo from '../../common/meuzmLogo';
import Avatar from '../../common/avatar';

const ChatHeader = ({ user, conversation, onlineUsers, onOpenInvitationModel, onOpenParticipatsModel, currentUser }) => {
  const history = useHistory();
  const filtered = conversation?.participants.filter(p => p.id !== currentUser.id)[0];

  return (
    <div
      className='chat-header'
      style={{
        backgroundColor:
          conversation?.participants.length > 2
            ? 'red'
            : filtered?.feel.color_code
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
          <Link to={`/dashboard/studio/${filtered?.slug}`} >
            <Avatar avatars={filtered?.avatars} feelColor={filtered?.feel.color_code} />
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
                <Link to={`/dashboard/studio/${filtered?.slug}`} >{filtered?.username}</Link>
              </p>
              <span>
                {onlineUsers?.some(slug => slug === filtered?.slug)
                  ? <> Online </>
                  : <>{filtered?.last_login}</>
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
