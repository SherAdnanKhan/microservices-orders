import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MeuzmLogo from '../../common/meuzmLogo';
import Avatar from '../../common/avatar';
import socket from '../../../services/socketService';
import CallingModal from './callingModal';
import { useWindowUnloadEffect } from '../../common/useWindowUnloadEffect';
import useViewport from '../../common/useViewport';
import ToolTip from '../../common/toolTip/toolTip';

const ChatHeader = ({
  user, conversation, onlineUsers, onOpenInvitationModel,
  onOpenParticipatsModel, currentUser, onBackPress
}) => {
  const filtered = conversation?.participants.filter(p => p.id !== currentUser.id)[0];
  const history = useHistory();
  const rejectedUsers = useRef([]);
  const timeout = useRef();
  const [hasRendered, setHasRendered] = useState(false);
  const [showCallingModal, setShowCallingModal] = useState(false);
  const allParticipants = useRef([]);
  const audioRef = useRef();
  const { width } = useViewport();
  const breakPoint = 768;

  useWindowUnloadEffect(() => {
    socket.off('call-accepted');
    clearTimeout(timeout);
  }, true);

  useEffect(() => {
    if (conversation?.participants) {
      allParticipants.current = conversation?.participants;;
    }
  }, [conversation]);

  useEffect(() => {
    if (!hasRendered) {
      socket.on('call-accepted', data => {
        clearTimeout(timeout.current);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        console.log('redirect')
        history.push(`/dashboard/video-call/${data.room}`)
      });

      socket.on('call-rejected', data => {
        if (!rejectedUsers.current.some(user => user.id === data.user.id)) {
          rejectedUsers.current.push(data.user);
        }

        if (rejectedUsers.current.length === allParticipants.current?.length - 1) {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          setShowCallingModal(showCallingModal => showCallingModal = false);
          clearTimeout(timeout.current);
        }
      });
      setHasRendered(true);
    }
  }, [history, hasRendered, conversation]);

  const handleCall = async () => {
    rejectedUsers.current = [];
    setShowCallingModal(true);

    audioRef.current = new Audio('/assets/sounds/Skype Ringtone 2018.mp3');

    try {
      await audioRef.current.play();
    } catch (ex) {
    }

    socket.emit('outgoing-call', {
      caller: currentUser,
      room: conversation?.id,
      participants: conversation
        ?.participants
        ?.filter(p => p.id !== currentUser.id) || []
    });

    timeout.current = setTimeout(() => {
      if (!showCallingModal) {
        handleDecline();
      }
    }, 30000);
  };

  const handleDecline = () => {
    clearTimeout(timeout.current);
    setShowCallingModal(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    socket.emit('decline-call', {
      caller: currentUser,
      room: conversation?.id,
      participants: conversation
        ?.participants
        ?.filter(p => p.id !== currentUser.id || [])
    })
  }

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
      {width <= breakPoint &&
        <i
          className="fa fa-arrow-left clickable"
          onClick={onBackPress}
        />
      }
      {conversation?.participants.length > 2
        ? (
          <div onClick={onOpenParticipatsModel}>
            <MeuzmLogo />
          </div>
        ) : (
          <Link to={`/dashboard/studio/${filtered?.slug}`} >
            <Avatar
              user={filtered}
            />
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
        <i
          className="fas fa-user-plus"
          aria-hidden="true"
          onClick={onOpenInvitationModel}
          data-tip="Invite Others"
          data-for="invite"
        />
        <ToolTip id="invite" />

        <div onClick={handleCall}>
          <img
            href="#"
            src="/assets/images/icons/VidStrq.png"
            className="call-icon"
            alt="Video Call"
            data-for="call"
            data-tip="call"
          />
          <ToolTip id="call" />
        </div>
        <img src="/assets/images/icons/DrawStrq.png" alt="Draw" data-tip="Draw" data-for="draw" />
        <ToolTip id="draw" />
      </div>

      {showCallingModal &&
        <CallingModal
          onDecline={handleDecline}
        />
      }
    </div>
  );
};

export default ChatHeader;
