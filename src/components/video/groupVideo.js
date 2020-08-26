
import React, { useEffect, useRef, useContext, useState } from 'react';
import Draggable from 'react-draggable';
import UserContext from '../../context/userContext';
import { useRouteMatch } from 'react-router-dom';
import socket from '../../services/socketService';
import Peer from 'simple-peer';
import { useWindowUnloadEffect } from '../common/useWindowUnloadEffect';


const Video = ({ peer, index, user }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      console.log(stream);

      ref.current.srcObject = stream
    });
  });

  return (
    <div
      className={`item border-item1`}
      style={{ borderColor: user.feel.color_code }}>
      <video
        // poster="/assets/images/avataricon.png"
        width="100%"
        height="100%"
        ref={ref}
        autoPlay
      >
      </video>
    </div>
  );
}

const GroupVideoCall = () => {
  const localVideo = useRef();
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);
  const user = useContext(UserContext);
  const { params } = useRouteMatch();

  const [hasRendered, setHasRendered] = useState(false);


  useWindowUnloadEffect(() => {
    socket.emit('leave-call', {
      room: params.room,
      user: user
    });
  }, true);


  useEffect(() => {

    if (!hasRendered) {
      const addPeer = (data, stream) => {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream
        });

        peer.on('signal', signal => {
          if (signal.type) {
            socket.emit("make-answer", {
              signal,
              user: user,
              to: data.senderSocket,
              from: socket.id
            });
          }
        });

        peer.signal(data.signal);
        return peer;
      };

      const removePeer = (socketId) => {
        peersRef.current = peersRef.current.filter(p => p.socketId !== socketId);
        setPeers([...peersRef.current]);
      }

      const createNewPeer = (data, stream) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream
        });

        peer.on('signal', signal => {
          socket.emit('call-user', { signal, sender: user, userToCall: data.socketId, senderSocket: socket.id });
        });

        return peer;
      }

      navigator
        .mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(stream => {
          localVideo.current.srcObject = stream;
          socket.emit('joinVideo', { room: params.room, user });

          socket.on('userList', users => {
            const myPeers = [];

            users.forEach((user) => {
              const peer = createNewPeer(user, stream);

              peersRef.current.push({
                user: user.user,
                socketId: user.socketId,
                peer
              });

              myPeers.push({
                user: user.user,
                socketId: user.socketId,
                peer
              });
            });
            setPeers(myPeers);
          });

          socket.on('call-made', (data) => {
            const peer = addPeer(data, stream)

            peersRef.current.push({
              user: data.sender,
              socketId: data.senderSocket,
              peer
            });

            setPeers(users => [...users, {
              user: data.sender,
              socketId: data.senderSocket,
              peer
            }]);
          });

          socket.on("answer-made", data => {
            const item = peersRef.current.find(p => p.user.id === data.user.id);

            if (item) {
              item.peer.signal(data.signal)
            }
          });

          socket.on('user-leave', data => {
            removePeer(data.socketId)
          });
        });
      setHasRendered(true);
    }


  }, [peers, hasRendered, params, user]);

  return (
    <React.Fragment>
      <div className="main">
        <Draggable bounds="parent">
          <div className="own-Video">
            <video
              muted
              ref={localVideo}
              onDoubleClick={() => localVideo.current.requestFullscreen()}
              poster="/assets/images/avataricon.png"
              width="100%"
              height="100%"
              autoPlay
            >
            </video>
            <div className="settings-Icon"><i className="fas fa-ellipsis-h" /></div>
          </div>
        </Draggable>
        <div className="draw-Icon"><img src="/assets/images/icons/DrawStrq.png" alt="Draw" /></div>
        <div className="video-Icon"><img href="#" src="/assets/images/icons/VidStrq.png" alt="Video Call" /></div>
        <div className="screen-Maximize"><i className="far fa-square" /></div>
        <div className="item-List">
          {peers.map(({ peer, user }, index) => (
            <>
              <Video
                index={index}
                peer={peer}
                user={user}
              />
            </>
          ))}

          {/* <div className="item border-item2"><video poster="/assets/images/avataricon.png" width="120" height="120px"></video></div>
          <div className="item border-item3"><video poster="/assets/images/avataricon.png" width="120" height="120px"></video></div>
          <div className="item border-item4"><video poster="/assets/images/avataricon.png" width="120" height="120px"></video></div>
          <div className="item border-item5"><video poster="/assets/images/avataricon.png" width="120" height="120px"></video></div>
          <div className="item border-item1"><video poster="/assets/images/avataricon.png" width="120" height="120px"></video></div>
          <div className="item border-item2"><video poster="/assets/images/avataricon.png" width="120" height="120px"></video></div>
          <div className="item border-item4"><video poster="/assets/images/avataricon.png" width="120" height="120px"></video></div>
          <div className="item border-item3"><video poster="/assets/images/avataricon.png" width="120" height="120px"></video></div> */}
        </div>
      </div>
    </React.Fragment>
  );
}
export default GroupVideoCall;