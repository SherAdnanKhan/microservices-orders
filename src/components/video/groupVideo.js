
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useRouteMatch } from 'react-router-dom';
import socket from '../../services/socketService';
import Peer from 'simple-peer';
import { useWindowUnloadEffect } from '../common/useWindowUnloadEffect';
import { getCurrentUser } from '../../actions/authActions';
import Avatar from '../common/avatar';

const Video = ({ peer, index, user }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      ref.current.srcObject = stream
    });
  });

  return (
    <div
      className="item"
      style={{ borderColor: user.feel.color_code }}
    >
      <div className="add-strq">
        <div className=" dropdown">
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          <div className="dropdown-content">
            <a href="/dashboard/video-call">View galleries</a>
            <a href="/dashboard/video-call">View profile</a>
            <a href="/dashboard/video-call">Send ticket</a>
            <a href="/dashboard/video-call">Block</a>
            <a href="/dashboard/video-call">Mute</a>
            <a href="/dashboard/video-call">Report</a>
            <a href="/dashboard/video-call">End chat</a>
          </div>
        </div>
        <div className="video-cube">
          <Avatar
            avatars={user?.avatars}
            feelColor={user?.feel.color_code}
          />
        </div>
        <div className="artist-name">
          {user?.username}
        </div>

        <div style={{ marginLeft: "auto" }} >
          {/* <Link to="/dashboard/video-call/add">
                <button className="btn-style" >Add Artist</button>
              </Link>
              <Link to="/dashboard/video-call/group">
                <button className="btn-style" style={{ marginLeft: "12px", marginRight: "12px" }} >Group Video</button>
              </Link> */}
        </div>
      </div>
      <div className="user-video">
        <video
          ref={ref}
          autoPlay
        >
        </video>
      </div>
    </div>
  );
}

const GroupVideoCall = () => {
  const localVideo = useRef();
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);
  const user = getCurrentUser();
  const { params } = useRouteMatch();


  const [showActions, setShowActions] = useState(false);
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
        .getUserMedia({
          video: {
            width: { min: 640, ideal: 1920 },
            height: { min: 400, ideal: 1080 },
            aspectRatio: { ideal: 1.7777777778 }
          }, audio: true
        })
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
            console.log(peersRef.current)
            console.log('data', data.from)
            const item = peersRef.current.find(p => p.socketId === data.from);

            if (item) {
              console.log('item', item)
              try {
                item.peer.signal(data.signal)
              } catch (ex) {
                const filtered = peersRef.current.filter(p => p.socketId !== data.from);
                setPeers(filtered);
              }
            }
          });

          socket.on('user-leave', data => {
            removePeer(data.socketId ? data.socketId : data)
          });
          console.log('inn')
        });
      setHasRendered(true);
    }

  }, [peers, hasRendered, params, user]);

  const handleFullScreen = () => {
    if (localVideo.current.requestFullscreen) {
      localVideo.current.requestFullscreen();
    } else if (localVideo.current.mozRequestFullScreen) { /* Firefox */
      localVideo.current.mozRequestFullScreen();
    } else if (localVideo.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      localVideo.current.webkitRequestFullscreen();
    } else if (localVideo.current.msRequestFullscreen) { /* IE/Edge */
      localVideo.current.msRequestFullscreen();
    }
  }

  const handleShowActions = e => {
    setShowActions(!showActions);
  }

  return (
    <React.Fragment>
      <div
        className={showActions ? "main show-actions" : "main"}
        onClick={handleShowActions}
      >

        {/* <div className="draw-Icon"><img src="/assets/images/icons/DrawStrq.png" alt="Draw" /></div>
        <div className="video-Icon"><img href="#" src="/assets/images/icons/VidStrq.png" alt="Video Call" /></div>
        <div className="screen-Maximize"><i className="fas fa-expand" /></div> */}
        <div className="video-container">
          <Draggable bounds="parent">
            <div className="own-Video">
              <video
                muted
                ref={localVideo}
                onDoubleClick={handleFullScreen}
                onClick={(e) => e.stopPropagation()}
                onTou
                poster="/assets/images/avataricon.png"
                autoPlay
              >
              </video>
              <div className="settings-Icon"><i className="fas fa-ellipsis-h" /></div>
            </div>
          </Draggable>

          <div className={`item-List item${peers.length}`}>
            {peers.map(({ peer, user }, index) => (
              <>
                <Video
                  index={index}
                  peer={peer}
                  user={user}
                />
              </>
            ))}
            {/* <div className="item">
              <div className="add-strq">
                <div className=" dropdown">
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  <div className="dropdown-content">
                    <a href="/dashboard/video-call">View galleries</a>
                    <a href="/dashboard/video-call">View profile</a>
                    <a href="/dashboard/video-call">Send ticket</a>
                    <a href="/dashboard/video-call">Block</a>
                    <a href="/dashboard/video-call">Mute</a>
                    <a href="/dashboard/video-call">Report</a>
                    <a href="/dashboard/video-call">End chat</a>
                  </div>
                </div>
                <div className="video-cube">
                </div>
                <div className="artist-name">
                  salwa
                </div>
                <div style={{ marginLeft: "auto" }} >

                </div>
              </div>
              <div className="user-video">
                <video poster="/assets/images/red.png"></video>
              </div>
            </div> */}
            {/* <div className="item"><video poster="/assets/images/avataricon.png"></video></div> */}
            {/* <div className="item"><video poster="/assets/images/avataricon.png"></video></div> */}
            {/* <div className="item"><video poster="/assets/images/avataricon.png"></video></div> */}
            {/* <div className="item"><video poster="/assets/images/avataricon.png"></video></div>
            <div className="item"><video poster="/assets/images/avataricon.png"></video></div>
            <div className="item"><video poster="/assets/images/avataricon.png"></video></div>
            <div className="item"><video poster="/assets/images/avataricon.png"></video></div>
            <div className="item"><video poster="/assets/images/avataricon.png" ></video></div> */}
            <div className="call-Actions">
              <i className="fa fa-microphone" aria-hidden="true" data-tip="hello world" />
              <i className="fa fa-retweet" aria-hidden="true" />
              <i className="fa fa-camera" aria-hidden="true" />
            </div>
            <div className="call-Actions2">
              <img className="valut-img" alt="" src="/assets/images/strqicon.png"></img>
              <img src="/assets/images/icons/DrawStrq.png" alt="Draw"></img>
              <i className="fas fa-user-plus" aria-hidden="true" />
              <i className="far fa-times-circle" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default GroupVideoCall;