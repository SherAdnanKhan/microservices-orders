
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useRouteMatch, useHistory } from 'react-router-dom';
import socket from '../../services/socketService';
import Peer from 'simple-peer';
import { useWindowUnloadEffect } from '../common/useWindowUnloadEffect';
import { getCurrentUser } from '../../actions/authActions';
import Avatar from '../common/avatar';
import { toast } from 'react-toastify';
import { isMobile } from '../../utils/helperFunctions';

const Video = ({ peer, user, index, socketId, onPeerClose }) => {
  const ref = useRef();
  const [hasListner, setHasListner] = useState(false);

  useEffect(() => {
    if (!hasListner) {
      peer.on('stream', stream => {
        ref.current.srcObject = stream;
        console.log(stream.getAudioTracks()[0]);
      });

      peer.on('close', () => {
        onPeerClose(socketId);
      })

      peer.on('error', () => {
        onPeerClose(socketId);
      })

      setHasListner(listner => listner = true);
    }

  }, [hasListner, peer, user, socketId, onPeerClose]);

  return (
    <div
      key={index}
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
  const user = getCurrentUser();
  const { params } = useRouteMatch();
  const history = useHistory();

  const localVideo = useRef();
  const peersRef = useRef([]);

  const [peers, setPeers] = useState([]);
  const [totalPeers, setTotalPeers] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [microPhone, setMicroPhone] = useState(true);

  useWindowUnloadEffect(() => {
    socket.emit('leave-call', {
      room: params.room,
      user: user
    });

    if (localVideo.current) {
      localVideo.current.srcObject.getTracks().forEach(track => track.stop());
      localVideo.current = null;
    }

    peersRef.current.forEach((peer) => {
      if (peer) {
        peer.peer.destroy();
      }
    });
    peersRef.current = [];
    setPeers([]);

    socket.off('userList')
    socket.off('answer-made');
    socket.off('call-made');
    socket.off('user-leave');
    socket.off('toggle-microphone');
  }, true);

  useEffect(() => {
    if (!hasRendered) {
      const addPeer = (data, stream) => {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          config: {
            iceServers: [
              {
                urls: "stun:numb.viagenie.ca"
              },
              {
                urls: 'turn:numb.viagenie.ca',
                credential: 'Akif3334796768',
                username: 'm.akif.farooq@gmail.com'
              }
            ]
          },
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
        let filtered = peersRef.current.map(peer => {
          if (peer?.socketId === socketId) {
            peer.peer.destroy();
            return null
          }
          return peer
        });

        peersRef.current = filtered;

        setPeers(filtered);
        setTotalPeers(filtered.filter(peer => peer !== null).length);
      }

      const createNewPeer = (data, stream) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          config: {
            iceServers: [

              {
                urls: "stun:numb.viagenie.ca"
              },
              {
                urls: 'turn:numb.viagenie.ca',
                credential: 'Akif3334796768',
                username: 'm.akif.farooq@gmail.com'
              },
            ]
          },
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
            aspectRatio: { ideal: 1.7777777778 },
            facingMode: 'user'
          },

          audio: true
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

            setTotalPeers(myPeers.length);
            setPeers(myPeers);
          });

          socket.on('call-made', (data) => {
            const peer = addPeer(data, stream)

            peersRef.current.push({
              user: data.sender,
              socketId: data.senderSocket,
              peer
            });

            setTotalPeers(peersRef.current.filter(peer => peer !== null).length);
            setPeers(peersRef.current);
          });

          socket.on("answer-made", data => {
            const item = peersRef.current.find(p => p.socketId === data.from);

            if (item) {
              try {
                item.peer.signal(data.signal)
              } catch (ex) {
                const filtered = peersRef.current.filter(p => p.socketId !== data.from);
                setPeers(filtered);
              }
            }
          });

          socket.on('toggle-microphone', data => {
            toast(data.message);
          })

          socket.on('user-leave', data => {
            removePeer(data.socketId);
          });
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

  const handleToggleMicroPhone = () => {
    localVideo.current.srcObject.getAudioTracks()[0].enabled = !localVideo.current.srcObject.getAudioTracks()[0].enabled;

    const message = microPhone
      ? `${user.username} has muted his microphone`
      : `${user.username} has unmuted his microphone`;

    socket.emit('on-toggle-microphone', { room: params.room, message });

    setMicroPhone(!microPhone);
  }

  const handleCameraSwitch = (e) => {
    if (isMobile()) {
      localVideo.current.srcObject.getTracks().forEach(track => track.stop());

      if (navigator.mediaDevices) {
        navigator
          .mediaDevices
          .getUserMedia({
            video: {
              width: { min: 640, ideal: 1920 },
              height: { min: 400, ideal: 1080 },
              facingMode: facingMode === 'user' ? 'environment' : 'user'
            },
            audio: true
          })

          .then(stream => {
            localVideo.current.srcObject = stream

            peersRef.current.forEach((peer) => {
              if (peer) {
                peer
                  .peer
                  .replaceTrack &&
                  peer
                    .peer
                    .replaceTrack(
                      peer.peer.streams[0].getVideoTracks()[0],
                      stream.getVideoTracks()[0],
                      peer.peer.streams[0]
                    )
              }
            });

            if (facingMode === 'user') {
              setFacingMode('environment')
            } else {
              setFacingMode('user')
            }
          }).catch(err => {
            toast.error(err.message)
          });
      }
    }
  }

  const handlePeerClose = (socketId) => {
    let filtered = peersRef.current.map(peer => {
      if (peer?.socketId === socketId) {
        peer.peer.destroy();
        return null
      }
      return peer;
    });

    peersRef.current = filtered;

    setPeers(filtered);
    setTotalPeers(filtered.filter(peer => peer !== null).length);
  };

  const handleEndCall = () => {
    history.goBack();
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

          <div className={`item-List item${totalPeers}`}>
            {peers.map((peer, index) => (
              <>
                {peer
                  ? <Video
                    index={index}
                    peer={peer.peer}
                    user={peer.user}
                    socketId={peer.socketId}
                    onPeerClose={handlePeerClose}
                  />
                  : ""
                }
              </>
            ))}
            <div className="call-Actions" onClick={(e) => e.stopPropagation()}>
              {microPhone
                ? <i
                  className="fa fa-microphone"
                  aria-hidden="true"
                  data-tip="hello world"
                  onClick={handleToggleMicroPhone}
                />
                : <i
                  className="fa fa-microphone-slash"
                  aria-hidden="true"
                  data-tip="hello world"
                  onClick={handleToggleMicroPhone}
                />
              }
              <i className="fa fa-retweet" aria-hidden="true" onClick={handleCameraSwitch} />
              <i className="fa fa-camera" aria-hidden="true" />
            </div>
            <div className="call-Actions2">
              <img className="valut-img" alt="" src="/assets/images/strqicon.png"></img>
              <img src="/assets/images/icons/DrawStrq.png" alt="Draw"></img>
              <i className="fas fa-user-plus" aria-hidden="true" />
              <i className="far fa-times-circle" onClick={handleEndCall} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default GroupVideoCall;