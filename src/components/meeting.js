import React from 'react';
import { useSelector } from 'react-redux';
import GroupVideoCall from './video/groupVideo';

const Meeting = () => {
  const { meeting, room } = useSelector(state => state.meeting);
  return (
    <>
      {meeting && room &&
        <GroupVideoCall room={room} />
      }
    </>
  );
};

export default Meeting;