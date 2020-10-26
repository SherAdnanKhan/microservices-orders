import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '../../common/avatar';
import { formatTime, formatDate, getText, getURL, convertHexToRGBA } from '../../../utils/helperFunctions';
import { getCurrentUser, getAuthToken } from '../../../actions/authActions';
import socket from '../../../services/socketService';
import { toast } from 'react-toastify';
import ChatInvitationModel from '../../common/chatInvitationModal';
import ChatHeader from './chatHeader';
import ParticipantsModel from './participantsModel';
import UserCube from '../../common/userCube';
import { ReactTinyLink } from 'react-tiny-link';
import {
  getConversation,
  updateConversation,
  clearConversation,
  createMessage,
  uploadImage,
  uploadFile,
  readMessage,
  readAll,
  changeReadMessageStatus,
  resetConversationCount,
} from '../../../actions/conversationActions';
import ToolTip from '../../common/toolTip/toolTip';
import Draw from './draw';
import MediumMeuzmLogo from '../../common/mediumMeuzmLogo';

class ChatBox extends Component {
  state = {
    image: '',
    video: '',
    document: '',
    message: '',
    hidden: false,
    progress: 0,
    page: 1,
    scrollHeight: '',
    typings: [],
    show: false,
    showParticipantsModal: false,
    showCallingModal: false,
    width: window.innerWidth,
    draw: false
  };

  preview = createRef();
  containerRef = createRef();
  bottomRef = createRef();
  footerRef = createRef();
  breakPoint = 768;

  handleWindowResize = () => {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);

    const currentUser = getCurrentUser();
    this.props.getConversation(this.props.activeConversation.id);

    socket.on('recieveMessage', async (data) => {
      await this.props.updateConversation(data.message);
      this.bottomRef.current.scrollIntoView({ behavior: 'auto' });

      // if (data.message.created_by === this.props.conversation.user.id) {
      //   if (data.message.feel.color !== this.props.conversation.user.feel.color) {
      //     this.componentRefreshUser();
      //   }
      // }

      if (data.message.user.id !== currentUser.id) {
        const user = {
          user_id: currentUser.id
        };

        data.reader = currentUser;

        socket.emit("onRead", data.message.id, user, data, getAuthToken(), () => { });
        this.setState({ typings: this.state.typings.filter(typing => typing.id !== data.message.user.id) });
      }
    });

    socket.on('read', (data) => {
      if (data.reader.id !== currentUser.id) {
        this.props.changeReadMessageStatus(data);
      }
    });

    socket.on('readAll', (data) => {
      if (data.user.id !== currentUser.id) {
        this.props.readAll(data);
      }
    });

    socket.on('typing', (data) => {
      if (data.user.id !== currentUser.id) {
        const typings = [...this.state.typings];

        if (data.message) {
          if (!typings.some(typing => typing.id === data.user.id)) {

            this.setState({ typings: [data.user, ...typings] });
          }
        } else {
          this.setState({ typings: typings.filter(typing => typing.id !== data.user.id) });
        }
      }

    });
    socket.on('drawOpened', () => {
      this.setState({ draw: true })
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.width > this.breakPoint) {
      if (this.props.activeConversation !== prevProps.activeConversation) {
        this.componentCleanup();
        this.componentDidMount();
      }
    }

    const { conversation: currentConversation } = this.props.conversation;
    const { conversation: previos } = prevProps.conversation;
    const currentUser = getCurrentUser();

    if (currentConversation && currentConversation !== previos) {
      localStorage.setItem('activeConversation', currentConversation.id);

      if (previos?.id !== currentConversation.id) {
        this.bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        socket.emit('join', { room: currentConversation.id, user: currentUser }, () => {
          socket.emit('onReadAll', { room: currentConversation.id, user: currentUser }, getAuthToken(), () => {
            this.props.resetConversationCount(currentConversation);
          });
        })
      }
    }
  }

  componentCleanup = () => {
    const { conversation } = this.props.conversation;
    localStorage.removeItem('activeConversation');
    conversation && socket.emit('leave', { room: conversation.id });
    socket.off('recieveMessage');
    socket.off('onRead');
    socket.off('onReadAll');
    socket.off('typing')

    window.removeEventListener("resize", this.handleWindowResize)
    this.props.clearConversation();
  }

  componentRefreshUser = () => {
    this.props.getConversation(this.props.match.params.slug);
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  sendMessage = async (e) => {
    const { image, video, message, document } = this.state;
    const { conversation } = this.props.conversation;
    const user = getCurrentUser();

    if (conversation) {
      let data = {
        url: image || video || (document && document.path) || '',
        message_type: image ? 1 : video ? 2 : document ? 3 : 0,
        user_id: user.id,
        conversation_id: conversation.id,
        recievers:
          conversation
            ?.participants
            ?.filter(p => p.id !== user.id)
            ?.map(p => p.slug)
      };

      if (message.trim() !== '') {
        data.message = message;
      }

      this.setState({ message: '', image: '', video: '', document: '' });

      if (data.message || data.url) {
        if (socket.connected) {
          socket.emit('sendMessage', data, getAuthToken(), message => {
            toast.error(message);
          });
        } else {
          toast('There is some issue check your connection.');
        }
      }
    }
  }

  handleEnter = e => {
    if (e.keyCode === 13) {
      this.sendMessage(e);
    }
  };

  handlePost = e => {
    this.sendMessage(e);
  }
  convertFileSize = (sizeBytes) => {
    const fileSizeKb = sizeBytes / 1000;
    const fileSizeMb = fileSizeKb / 1000;
    return fileSizeMb
  }

  validateFile = (size, type) => {
    let error;
    if (type === "video/mp4" && size > 51.2) {
      error = "Video size must be 50MB long";
    }
    else if ((type === "image/png" || type === "image/jpeg" || type === "image/png") && size > 25.6) {
      error = "Image size must be 25MB long"
    }
    else if (type === "application/document" && size > 51.2) {
      error = "Document size must be 25MB long"
    }
    return error ? error : false
  }


  handleUpload = ({ target: input }) => {
    this.setState({ hidden: false });

    if (input.files[0]) {
      const data = new FormData();
      data.append('file_upload', input.files[0]);
      const fileSizeMb = this.convertFileSize(input.files[0].size);
      const fileType = input.files[0].type;
      const isErrors = this.validateFile(fileSizeMb, fileType);
      if (isErrors === false) {
        this.props.uploadFile(data,
          progress => {
            this.setState({ progress });
          },
          result => {
            if (result.doc_type === 'document') {
              this.setState({ [result.doc_type]: result, progress: 0 });
            } else {
              this.setState({ [result.doc_type]: result.path, progress: 0 });
            }
            this.preview.current.scrollIntoView({ behavior: 'auto' });
          },
          err => {
            this.setState({ progress: 0 });
          })
      }
      else {
        toast.error(isErrors)
      }
    }
  }

  handleChange = ({ target: input }) => {
    this.setState({ message: input.value });

    const { conversation } = this.props.conversation;
    const user = getCurrentUser();

    const data = {
      conversation_id: conversation?.id,
      message: input.value,
      user
    };

    socket.emit('onType', data);
  }

  handleDeletePreview = () => {
    this.setState({ image: '', video: '', document: '' });
  }

  handleScroll = () => {
    const scrollTop = this.containerRef.current.scrollTop;
    const { scrollHeight } = this.state;
    const { page } = this.state;

    if (scrollTop === 0) {
      if (!scrollHeight) {
        this.setState({ scrollHeight: this.containerRef.current.scrollHeight / 2 })
      }

      this.setState({ page: page + 1, }, () => {
        if (this.props.conversation.messages.next_page_url) {
          this.props.getConversation(this.props.activeConversation.id, page + 1, () => {
            this.containerRef.current.scrollTo(0, this.state.scrollHeight);
          })
        }
      });
    }
  }

  handleOpenInvitationModel = () => {
    this.setState({ show: true });
  }

  handleOpenPartcipantsModel = () => {
    this.setState({ showParticipantsModal: true });
  }

  handleCloseInvitationModal = () => {
    this.setState({ show: false });
  }

  handleCloseParticipantsModal = () => {
    this.setState({ showParticipantsModal: false });
  }

  handleCloseDraw = () => {
    this.setState({ draw: false });
  }

  render() {
    const { message, image, hidden, video, document, progress } = this.state;
    const currentUser = getCurrentUser();
    const { user, messages, conversation } = this.props.conversation;
    const { onlineUsers } = this.props;

    return (
      <div className="chat-box">
        <>
          <ChatHeader
            currentUser={currentUser}
            user={user}
            conversation={conversation}
            onlineUsers={onlineUsers}
            onOpenInvitationModel={this.handleOpenInvitationModel}
            onOpenParticipatsModel={this.handleOpenPartcipantsModel}
            onBackPress={this.props.onBackPress}
            onOpenDraw={() => this.setState({ draw: true })}
          />

          <div className="chat-container"
            ref={ref => this.containerRef.current = ref}
            onScroll={this.handleScroll}
          >
            <div className="chat-uesr">
              {conversation?.participants?.length > 2
                ? (
                  <>
                    <MediumMeuzmLogo />
                    <div className="chat-uesr-name">
                      <p>	You are now Strqing with
                        <span>
                          &nbsp;
                          {conversation?.participants?.filter(p => p.id !== currentUser.id)[0].username + ', '}
                          {conversation?.participants?.filter(p => p.id !== currentUser.id)[1].username}
                          {conversation?.participants.filter(p => p.id !== currentUser.id).length > 2 &&
                            <>
                              {` and ${conversation?.participants.length - 3}`} participants
                              </>
                          }
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <UserCube user={conversation?.participants?.filter(p => p.id !== currentUser.id)[0]} />
                    <div className="chat-uesr-name">
                      <p>	You are now Strqing with
                        <span>
                          &nbsp;
                          {conversation?.participants?.filter(p => p.id !== currentUser.id)[0]?.username}
                        </span>
                      </p>
                    </div>
                  </>
                )
              }

            </div>

            {messages?.data?.map((data, index) => (
              <div key={index}>
                {data.user.id === currentUser.id
                  ? (
                    <div
                      className="message-row group"
                    >
                      <div className='outgoing'>
                        <div className="user-message">
                          {conversation?.participants.length === 2 &&
                            <div className={index === messages.data.length - 1 ? 'send-icon high' : 'send-icon'}>
                              {data.messages_logs.length > 0
                                ? data.messages_logs[0].status === 1
                                  ? <img alt="" src={`/assets/images/${data.messages_logs[0].feel.color}.png`} />
                                  : <img alt="" src="/assets/images/avatarblack.png" />
                                : <img src="/assets/images/avatarblack.png" alt="" />
                              }
                            </div>
                          }
                          <div className="text"
                            style={{
                              backgroundColor: convertHexToRGBA(data.feel.color_code, .6),
                              borderColor: data.feel.color_code,
                              boxShadow: `1px 1px 10px ${data.feel.color_code}, -1px -1px 10px ${data.feel.color_code}`
                            }}
                          >
                            {getText(data.message) && getText(data.message)}
                            {getURL(data.message) &&
                              <ReactTinyLink
                                cardSize="small"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url={getURL(data.message)}
                              // defaultMedia={data.message}
                              />
                            }

                            {data.type === 1 &&
                              <div className="msgImg">
                                <a href={data.url} target="_blank" rel="noopener noreferrer">
                                  <img
                                    src={data.url}
                                    alt=""
                                  />
                                </a>
                              </div>
                            }
                            {data.type === 2 &&
                              <div className="msgVideo">
                                <video width="320" height="240" controls>
                                  <source src={data.url} type="video/mp4" />
                                  <source src={data.url} type="video/ogg" />
                                  <source src={data.url} type="video/mov" />
                                  <source src={data.url} type="video/mpeg" />
                                    Your browser does not support the video tag.
                                </video>
                              </div>
                            }
                            {data.type === 3 &&
                              <div className="msgDocument">
                                <i className="fas fa-file-alt"></i>
                                <a
                                  href={data.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ textDecoration: 'none' }}
                                >
                                  Document
                                    </a>
                              </div>
                            }
                          </div>
                        </div>
                        {conversation?.participants.length > 2 &&
                          <div className={index === messages.data.length - 1 ? 'send-icon high' : 'send-icon'}>
                            {data?.messages_logs?.map(log => (
                              <>
                                {log.status === 1 &&
                                  <img alt=""
                                    src={`/assets/images/${log.feel.color}.png`}
                                  />
                                }
                              </>
                            ))}
                          </div>
                        }
                        {data.created_at &&
                          <p className='time'>
                            {data.created_at === 'now'
                              ? 'now'
                              : `${formatDate(data.created_at)} AT ${formatTime(data.created_at)}`
                            }
                          </p>
                        }
                      </div>
                    </div>
                  ) : (
                    <div className="message-row group">
                      <div className='incoming'>
                        <div className="user-message">
                          <Avatar
                            user={data.user}
                          />
                          <div
                            className='text'
                            style={{
                              backgroundColor: convertHexToRGBA(data.feel.color_code, 0.3),
                              borderColor: data.feel.color_code,
                              boxShadow: `1px 1px 10px ${data.feel.color_code}, -1px -1px 10px ${data.feel.color_code}`
                            }}
                          >

                            {getText(data.message) && getText(data.message)}
                            {getURL(data.message) &&
                              <ReactTinyLink
                                cardSize="small"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                url={getURL(data.message)}
                              // defaultMedia={data.message}
                              />
                            }

                            {data.type === 1 &&
                              <div className="msgImg">
                                <a href={data.url} target="_blank" rel="noopener noreferrer">
                                  <img
                                    src={data.url}
                                    alt=""
                                  />
                                </a>
                              </div>
                            }
                            {data.type === 2 &&
                              <div className="msgVideo">
                                <video width="320" height="240" controls>
                                  <source src={data.url} type="video/mp4" />
                                  <source src={data.url} type="video/ogg" />
                                  <source src={data.url} type="video/mov" />
                                  <source src={data.url} type="video/mpeg" />
                                      Your browser does not support the video tag.
                                    </video>
                              </div>
                            }
                            {data.type === 3 &&
                              <div className="msgDocument">
                                <i className="fas fa-file-alt"></i>
                                <a
                                  href={data.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ textDecoration: 'none' }}
                                >
                                  Document
                                    </a>
                              </div>
                            }
                          </div>
                        </div>
                        {data.created_at &&
                          <p className='time'>
                            {`${formatDate(data.created_at)} AT ${formatTime(data.created_at)}`}
                          </p>
                        }
                      </div>

                    </div>
                  )
                }
              </div>
            ))
            }
            <div ref={ref => this.bottomRef.current = ref}></div>
          </div>
        </>
        <div className="chat-footer" ref={this.footerRef}>
          {progress > 0 &&
            <div>
              <div className='progressBar'>
                <span className="text"> {progress}% </span>
                <div
                  className="percent"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: currentUser.feel.color_code
                  }}
                >
                </div>
              </div>
            </div>
          }

          <div className="message-input">
            <span
              data-for="uplaodPost"
              data-tip="upload">
              <i
                className="fa fa-plus add-items-btn"
                onClick={() => this.setState({ hidden: true })}
              />
            </span>
            <ToolTip id="uploadPost" />
            <input
              autoFocus
              placeholder="Type a message"
              type="text"
              name="message"
              value={message}
              onChange={this.handleChange}
              onKeyUp={this.handleEnter}
            />
            <button
              onClick={this.handlePost}
              className='clickable btn-send'
              style={{ backgroundColor: currentUser.feel.color_code }}
            >
              Post
          </button>
          </div>
          <div className='typing-text'>
            {this.state.typings.length > 1 &&
              <>
                {this.state.typings?.map((typing, index) => (
                  <span key={index}> {typing.username} {index < this.state.typings.length - 1 && 'and'}</span>
                ))
                }
                are typing..
              </>
            }
            {this.state.typings.length === 1 &&
              <span> {this.state.typings[0].username} is typing </span>
            }
          </div>
          <div className="preview">
            {image &&
              <div className="image-preview">
                <i className="fas fa-trash" onClick={this.handleDeletePreview}></i>
                <img src={image} alt="" />
              </div>
            }
            {video &&
              <div className="video-preview">
                <i className="fas fa-trash" onClick={this.handleDeletePreview}></i>
                <video controls>
                  <source src={video} type="video/mp4" />
                  <source src={video} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
              </div>
            }
            {document &&
              <div className="document-preview">
                <i className="fas fa-trash" onClick={this.handleDeletePreview}></i>
                <i className="fas fa-file-alt"></i>
                <div> {document.doc_name && document.doc_name}</div>
              </div>
            }
            <div ref={ref => this.preview.current = ref}> </div>
          </div>
          {
            hidden &&
            <div className="add-img-vid-box">
              <i
                style={{ backgroundColor: currentUser.feel.color_code }}
                className="fa fa-times close-add-box"
                onClick={() => this.setState({ hidden: false })}
              />
              <label>
                <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: currentUser.feel.color_code }} />
                <div className="nag-btn">
                  Add Image
              </div>
                <input type="file" name="image" onChange={this.handleUpload} accept="image/*" />
              </label>
              <label>
                <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: currentUser.feel.color_code }} />
                <div className="nag-btn">
                  Add Video
              </div>
                <input type="file" name="video" onChange={this.handleUpload} accept=".mp4" />
              </label>
              <label>
                <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: currentUser.feel.color_code }} />
                <div className="nag-btn">
                  Add Document
              </div>
                <input
                  type="file"
                  name="video"
                  onChange={this.handleUpload}
                  accept=".pdf,.doc,.docx,.xlsx,.xlsm,.xlsb,.xltx,.csv"
                />
              </label>
            </div>
          }
        </div>

        {this.state.show &&
          <ChatInvitationModel
            onClose={this.handleCloseInvitationModal}
            participants={conversation?.participants}
            currentUser={currentUser}
            room={conversation?.id}
          />
        }

        {this.state.showParticipantsModal &&
          <ParticipantsModel
            participants={conversation?.participants}
            onlineUsers={onlineUsers}
            onClose={this.handleCloseParticipantsModal}
            currentUser={currentUser}
          />
        }

        {this.state.draw &&
          <Draw
            socket={socket}
            room={conversation?.id}
            onClose={this.handleCloseDraw}
          />
        }
      </div >
    );
  }
};

const mapStateToProps = state => {
  return {
    conversation: state.conversation,
    onlineUsers: state.onlineUser.onlineUsers
  }
};

export default connect(
  mapStateToProps, {
  getConversation,
  updateConversation,
  clearConversation,
  createMessage,
  uploadImage,
  uploadFile,
  readMessage,
  readAll,
  changeReadMessageStatus,
  resetConversationCount
})(withRouter(ChatBox));
