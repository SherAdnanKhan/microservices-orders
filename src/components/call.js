import React, { useEffect, useState, useRef } from 'react';
import RingingModal from './dashboard/chat/ringingModal';
import socket from '../services/socketService';
import { getCurrentUser } from '../actions/authActions';
// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useWindowUnloadEffect } from './common/useWindowUnloadEffect';

const currentUser = getCurrentUser();

const Call = () => {
  const history = useHistory();

  const [showRingingModal, setShowRingingModal] = useState(false);
  const [incomingPayload, setIncomingPayload] = useState({});
  const audioRef = useRef();
  const timeout = useRef()

  useEffect(() => {
    if (currentUser) {
      socket.on('incoming-call', async payload => {
        setIncomingPayload(payload);
        setShowRingingModal(true);

        audioRef.current = new Audio('/assets/sounds/Skype Ringtone 2018.mp3');

        timeout.current = setTimeout(() => {
          setShowRingingModal(false);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }, 30000);


        try {
          await audioRef.current.play();
        } catch (ex) {
        }
      });

      socket.on('call-declined', data => {

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        setShowRingingModal(false);
      });
    }
  }, []);

  useWindowUnloadEffect(() => {
    socket.off('incoming-call')
    socket.off('call-declined');
  }, true);

  const handleAcceptCall = () => {
    clearTimeout(timeout);

    const payload = {
      user: currentUser,
      callerSocket: incomingPayload.socketId,
      room: incomingPayload.room
    }

    socket.emit('accept-call', payload);
    setShowRingingModal(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    history.push(`/dashboard/video-call/${incomingPayload.room}`);
  };

  const handleRejectCall = () => {
    const payload = {
      user: currentUser,
      callerSocket: incomingPayload.socketId,
      room: incomingPayload.room
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    socket.emit('reject-call', payload);
    setShowRingingModal(false);
  };

  return (
    <>
      {showRingingModal
        ? <RingingModal
          payload={incomingPayload}
          onAcceptCall={handleAcceptCall}
          onRejectCall={handleRejectCall}
        />
        : null
      }
    </>
  );
};

export default Call;
