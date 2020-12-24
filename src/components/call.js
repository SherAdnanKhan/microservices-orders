import React, { useEffect, useState, useRef } from 'react';
import RingingModal from './dashboard/chat/ringingModal';
import socket from '../services/socketService';
import { getCurrentUser } from '../actions/authActions';
import { useWindowUnloadEffect } from './common/useWindowUnloadEffect';
import { useDispatch, useSelector } from "react-redux";
import { startMeeting } from '../actions/meetingActions';

const currentUser = getCurrentUser();

const Call = () => {
  const dispatch = useDispatch();

  const [showRingingModal, setShowRingingModal] = useState(false);
  const [incomingPayload, setIncomingPayload] = useState({});
  const { feelColor } = useSelector(state => state.feelColor)
  const audioRef = useRef(new Audio('/assets/sounds/Skype Ringtone 2018.mp3'));

  useEffect(() => {
    if (currentUser) {
      socket.on('incoming-call', async payload => {
        setIncomingPayload(payload);
        setShowRingingModal(true);

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
    setShowRingingModal(false);

    const payload = {
      user: currentUser,
      callerSocket: incomingPayload.socketId,
      room: incomingPayload.room,
      messageId: incomingPayload.messageId
    }

    socket.emit('accept-call', payload);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    dispatch(startMeeting(incomingPayload.room));
    // history.push(`/video-call/${incomingPayload.room}`);
  };

  const handleRejectCall = () => {
    const payload = {
      user: currentUser,
      callerSocket: incomingPayload.socketId,
      room: incomingPayload.room,
      messageId: incomingPayload.messageId
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
          feelColor={feelColor}
        />
        : null
      }
    </>
  );
};

export default Call;
