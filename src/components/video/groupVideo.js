
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
import ChatInvitationModel from '../common/chatInvitationModal';
import { useSelector, useDispatch } from 'react-redux';
import { getConversation } from '../../actions/conversationActions';
import ToolTip from '../common/toolTip/toolTip';
import ReportUserModal from "../dashboard/chat/reportUserModal";
import OtherUserOptions from "../dashboard/chat/OtherUserOptions";
import ConfirmationModal from "../dashboard/chat/confirmationModal";
import { muteUser, blockUser, unMuteUser, unBlockUser } from "../../actions/userActions";



const Video = ({ peer, user, socketId, onPeerClose }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [hasListner, setHasListner] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMuteModal, setShowMuteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [connection, setConnection] = useState('connecting...');
  const { conversation: { is_blocked, is_muted } } = useSelector(state => state);

  useEffect(() => {
    if (!hasListner) {

      peer.on('stream', stream => {
        ref.current.srcObject = stream;
      });

      peer._pc.onconnectionstatechange = () => {
        switch (peer._pc.connectionState) {
          case 'connected':
            setConnection('');
            break;
          case 'connecting':
            setConnection('connecting...');
            break;
          case 'disconnected':
            setConnection('Poor connection...');
            break;
          default:
            onPeerClose(user);
        }
      };

      peer.on('close', () => {
        onPeerClose(user);
      });

      peer.on('error', () => {
        onPeerClose(user);
      });

      setHasListner(listner => listner = true);
    }

  }, [hasListner, peer, user, socketId, onPeerClose, connection]);

  const handleReportModal = (status) => {
    setShowReportModal(status)
  }

  const handleBlockModal = (status) => {
    setShowBlockModal(status)
  }

  const handleMuteModal = (status) => {
    setShowMuteModal(status)
  }

  const handleMuteUser = (user) => {
    if (is_muted) {
      const data = {
        unmute_user_id: user.id
      }
      dispatch(unMuteUser(data, user.username))
    }
    else {
      const data = {
        mute_user_id: user.id
      }
      dispatch(muteUser(data, user.username))
    }
    setShowMuteModal(false);
  }

  const handleBlockUser = (user) => {
    if (is_blocked) {
      const data = {
        unblock_user_id: user.id
      }
      dispatch(unBlockUser(data, user.username))
    }
    else {
      const data = {
        block_user_id: user.id
      }
      dispatch(blockUser(data, user.username))
    }
    setShowBlockModal(false);
  }

  return (
    <>
      <div>
        {showReportModal &&
          <ReportUserModal onClose={handleReportModal} user={user} is_blocked={is_blocked} />
        }
        {showBlockModal && user &&
          <ConfirmationModal
            message={is_blocked ?
              `Are you sure you want to unblock ${user.username}`
              : `Are you sure you want to block ${user.username}`}
            onCancel={handleBlockModal}
            onConfirm={() => handleBlockUser(user)}
          />
        }
        {showMuteModal && user &&
          <ConfirmationModal
            message={is_muted ?
              `Are you sure you want to unmute ${user.username}` :
              `Are you sure you want to mute ${user.username}`
            }
            onCancel={handleMuteModal}
            onConfirm={() => handleMuteUser(user)}
          />
        }
      </div>
      <div
        className="item"
        style={{ borderColor: user?.feel?.color_code }}
      >
        {connection &&
          <div className="connection">
            <div className="text">
              {connection}
            </div>
          </div>
        }
        <div className="add-strq">
          <OtherUserOptions
            onReportModal={handleReportModal}
            onBlockModal={handleBlockModal}
            onMuteModal={handleMuteModal}
            user={user}
            isBlocked={is_blocked}
            isMuted={is_muted}
          />
          <div className="video-cube">
            <Avatar
              user={user}
            />
          </div>
          <div className="artist-name">
            {user?.username}
          </div>

          <div style={{ marginLeft: "auto" }} >
            {/* <Link to="/video-call/add">
                <button className="btn-style" >Add Artist</button>
              </Link>
              <Link to="/video-call/group">
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
    </>
  );
}

const GroupVideoCall = () => {
  const user = getCurrentUser();
  const { params } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const localVideo = useRef();
  const peersRef = useRef([]);

  const [peers, setPeers] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [microPhone, setMicroPhone] = useState(true);
  const [video, setVideo] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);

  const { conversation: { conversation } } = useSelector(state => state);

  useWindowUnloadEffect(() => {
    socket.emit('leave-call', {
      room: params.room,
      user: user
    });

    if (localVideo?.current?.srcObject) {
      localVideo.current.srcObject.getTracks().forEach(track => track.stop());
      localVideo.current.srcObject = null;
    }

    peersRef.current.forEach(peerObject => {
      peerObject.peer.destroy();
    });

    peersRef.current = [];
    setPeers([]);

    socket.off('userList')
    socket.off('answer-made');
    socket.off('call-made');
    socket.off('user-leave');
    socket.off('toggle-microphone');
    socket.off('call-rejoined');
    socket.off('reconnect');
  }, true);

  useEffect(() => {
    dispatch(getConversation(params.room));
  }, [dispatch, params]);

  useEffect(() => {
    if (!hasRendered) {
      const addPeer = (data, stream) => {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          reconnectTimer: 40000,
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

      const removePeer = (user) => {
        let filtered = peersRef.current.filter(peerObject => peerObject.user.id !== user.id)

        peersRef.current = filtered;
        setPeers(filtered);
      };

      const updatePeer = (data) => {
        peersRef
          .current
          .map(peerObject => {
            return peerObject.user.id === data.user.id
              ? { ...peerObject, socketId: data.socketId }
              : peerObject;
          })

        setPeers(peersRef.current);
      };

      const createNewPeer = (data, stream) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          reconnectTimer: 40000,
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
          socket.emit('call-user', {
            signal,
            sender: user,
            userToCall: data.socketId,
            senderSocket: socket.id
          });
        });
        return peer;
      };

      navigator
        .mediaDevices
        .getUserMedia({
          video: {
            width: { min: 640, ideal: 1920 },
            height: { min: 400, ideal: 1080 },
            aspectRatio: { ideal: 1.7777777778 },
            facingMode: 'user',
          },
          audio: true
        })
        .then(stream => {
          localVideo.current.srcObject = stream;

          socket.emit('joinVideo', { room: params.room, user }, (message) => {
            toast.error(message);
            history.push('/chat');
          });

          socket.on('userList', users => {
            const myPeers = [];

            users.forEach((user) => {
              const peer = createNewPeer(user, stream);
              const peerObject = {
                user: user.user,
                socketId: user.socketId,
                peer
              };

              peersRef.current.push(peerObject);
              myPeers.push(peerObject);
            });

            setPeers(myPeers);
          });

          socket.on('call-made', (data) => {
            const peer = addPeer(data, stream);
            const peerObject = {
              user: data.sender,
              socketId: data.senderSocket,
              peer
            }

            setPeers(peers => peers = [...peersRef.current, peerObject]);
            peersRef.current.push(peerObject);
          });

          socket.on("answer-made", data => {
            const peerObject = peersRef.current.find(p => p.socketId === data.from);

            if (peerObject) {
              try {
                peerObject.peer.signal(data.signal)
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
            removePeer(data.user);
          });

          socket.on('call-rejoined', data => {
            updatePeer(data);
          });

          socket.on('reconnect', () => {
            const payload = {
              user: user,
              room: params.room
            };
            socket.emit('rejoin-call', payload);
          });
        });
      setHasRendered(true);
    }
  }, [peers, hasRendered, params, user, history]);

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
  };

  const handleToggleMicroPhone = () => {
    localVideo.current.srcObject.getAudioTracks()[0].enabled = !localVideo.current.srcObject.getAudioTracks()[0].enabled;

    const message = microPhone
      ? `${user.username} has muted his microphone`
      : `${user.username} has unmuted his microphone`;

    socket.emit('on-toggle-microphone', { room: params.room, message });

    setMicroPhone(!microPhone);
  };

  const handleToggleVideo = () => {
    localVideo.current.srcObject.getVideoTracks()[0].enabled = !localVideo.current.srcObject.getVideoTracks()[0].enabled;
    setVideo(!video);
  };

  const navigateToSTRQ = () => {
    window.open(`/chat/${params.room}`);
  }

  const handleCameraSwitch = (e) => {
    if (isMobile() && !isSwitching) {
      setIsSwitching(true);

      localVideo
        .current
        .srcObject
        .getVideoTracks()[0].stop();

      navigator
        .mediaDevices
        .getUserMedia({
          video: {
            width: { min: 640, ideal: 1920 },
            height: { min: 400, ideal: 1080 },
            facingMode: facingMode === 'user' ? 'environment' : 'user'
          },
        })
        .then(stream => {
          peersRef.current.forEach((peerObject) => {
            peerObject
              .peer
              .replaceTrack(
                peerObject.peer.streams[0].getVideoTracks()[0],
                stream.getVideoTracks()[0],
                peerObject.peer.streams[0]
              )
          });

          localVideo
            .current
            .srcObject
            .removeTrack(
              localVideo
                .current
                .srcObject
                .getVideoTracks()[0]
            );

          localVideo
            .current
            .srcObject
            .addTrack(stream.getVideoTracks()[0]);

          if (facingMode === 'user') {
            setFacingMode('environment')
          } else {
            setFacingMode('user')
          }
          setIsSwitching(false);
        }).catch(err => {
          toast.error(err.message);
          setIsSwitching(false);
        });
    }
  };

  const handlePeerClose = (user) => {
    if (user) {
      let filtered = peersRef.current.filter(peer => peer.user.id !== user.id);

      peersRef.current = filtered;
      setPeers(filtered);
    }
  };

  const handleEndCall = () => {
    history.goBack();
  }

  const handleCloseInvitationModal = () => {
    setShowInvitationModal(false);
  };

  const handleOpenInvitationModal = () => {
    setShowInvitationModal(true);
  };

  return (
    <React.Fragment>
      <div
        className={showActions ? "main show-actions" : "main"}
        onClick={handleShowActions}
      >
        <div className="video-container">
          <Draggable bounds="parent">
            <div
              className="own-Video"
              style={{ border: `9px solid ${user?.feel.color_code}` }}>
              <video
                muted
                ref={localVideo}
                onDoubleClick={handleFullScreen}
                onClick={(e) => e.stopPropagation()}
                poster="/assets/images/avataricon.png"
                autoPlay
              >
              </video>
              <div className="settings-Icon" onTouchStartCapture={handleShowActions} > <i className="fas fa-ellipsis-h" /></div>
            </div>
          </Draggable>

          <div className={`item-List item${peers.length}`}>
            {peers.map((peerObject) => (
              <Video
                key={peerObject.user.id}
                peer={peerObject.peer}
                user={peerObject.user}
                socketId={peerObject.socketId}
                onPeerClose={handlePeerClose}
              />
            ))}
            <div className="call-Actions" onClick={(e) => e.stopPropagation()}>
              {microPhone
                ?
                <>
                  <i
                    className="fa fa-microphone"
                    aria-hidden="true"
                    data-for="mic"
                    data-tip="Mic"
                    onClick={handleToggleMicroPhone}
                  />
                  <ToolTip id="mic" />
                </>
                :
                <>
                  <i
                    className="fa fa-microphone-slash"
                    aria-hidden="true"
                    onClick={handleToggleMicroPhone}
                    data-for="mic"
                    data-tip="Mic"
                  />
                  <ToolTip id="mic" />
                </>
              }
              <i
                className="fa fa-retweet"
                aria-hidden="true"
                onClick={handleCameraSwitch}
                data-for="switchCamera"
                data-tip="switch camera" />
              <ToolTip id="switchCamera" />
              {video
                ?
                <>
                  <i className="fa fa-camera" aria-hidden="true" onClick={handleToggleVideo} data-for="camera" data-tip="Camera" />
                  <ToolTip id="camera" />
                </>
                :
                <>
                  <img className="camera-off" src="/assets/images/camera-off.png" onClick={handleToggleVideo} alt="" data-for="camera" data-tip="camera" />
                  <ToolTip id="camera" />
                </>
              }

            </div>
            <div className="call-Actions2">
              <img
                className="valut-img"
                alt="strq"
                src="/assets/images/strqicon.png"
                onClick={navigateToSTRQ}
                data-for="chat"
                data-tip="strq" />
              <ToolTip id="chat" />
              <img
                src="/assets/images/icons/DrawStrq.png"
                alt="Draw"
                data-for="chat" data-tip="draw"
              ></img>
              <ToolTip id="draw strq" />
              <i
                className="fas fa-user-plus"
                aria-hidden="true"
                onClick={handleOpenInvitationModal}
                data-for="inviteUser"
                data-tip="invite users"
              />
              <ToolTip id="inviteUser" />
              <i
                className="far fa-times-circle"
                onClick={handleEndCall}
                data-for="endCall"
                data-tip="end call"
              />
              <ToolTip id="endCall" />
            </div>
          </div>
        </div>
        {showInvitationModal &&
          <ChatInvitationModel
            onClose={handleCloseInvitationModal}
            participants={conversation?.participants}
            currentUser={user}
            room={params.room}
            callUsers={true}
          />
        }
      </div>
    </React.Fragment >
  );
}
export default GroupVideoCall;