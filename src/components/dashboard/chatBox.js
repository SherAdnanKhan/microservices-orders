import React, { Component, createRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '../common/avatar';
import { formatTime, formatDate } from '../../utils/helperFunctions';
import SocketContext from '../../context/socketContext';
import { getCurrentUser, getAuthToken } from '../../actions/authActions';
import socket from '../../services/socketService';

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
} from '../../actions/conversationActions';
import { toast } from 'react-toastify';

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
    typingText: ''
  };

  preview = createRef();
  containerRef = createRef();
  bottomRef = createRef();

  componentDidMount() {
    const currentUser = getCurrentUser();
    this.props.getConversation(this.props.match.params.slug);

    socket.on('recieveMessage', async (data) => {
      await this.props.updateConversation(data.message);
      this.bottomRef.current.scrollIntoView({ behavior: 'auto' });

      if (data.message.created_by === this.props.conversation.user.id) {
        if (data.message.feel_color !== this.props.conversation.user.feel_color) {
          this.componentRefreshUser();
        }
      }

      if (data.message.user.id !== currentUser.id) {
        const user = {
          user_id: currentUser.id
        };
        socket.emit("onRead", data.message.id, user, data, getAuthToken(), () => { });
        this.setState({ typingText: '' });
      }
    });

    socket.on('read', (data) => {
      if (data.message.user.id !== currentUser.id) {
        console.log('i will update my status');
        console.log(data.user);
      }

      this.props.changeReadMessageStatus(data.message);
    });

    socket.on('readAll', (data) => {
      if (data.user.id !== currentUser.id) {
        this.props.readAll(data);
      }
    });

    socket.on('typing', (data) => {
      if (data.user.id !== currentUser.id) {
        if (data.message) {
          this.setState({ typingText: `${data.user.username} is typing...` });
        } else {
          this.setState({ typingText: '' });
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.preview.current.scrollIntoView({ behavior: 'auto' });

    const { conversation: currentConversation } = this.props.conversation;
    const { conversation: previos } = prevProps.conversation;
    const currentUser = getCurrentUser();

    if (currentConversation && currentConversation !== previos) {
      localStorage.setItem('activeConversation', currentConversation.id);

      if (previos?.id !== currentConversation.id) {
        this.bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        socket.emit('join', { room: currentConversation.id }, () => {
          socket.emit('onReadAll', { room: currentConversation.id, user: currentUser }, getAuthToken(), () => {
          });
        });
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
        reciver: this.props.match.params.slug
      };

      if (message.trim() !== '') {
        data.message = message;
      }

      this.setState({ message: '', image: '', video: '', document: '' });

      if (data.message || data.url) {
        socket.emit('sendMessage', data, getAuthToken(), message => {
          toast.error(message);
        });
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

  handleUpload = ({ target: input }) => {
    this.setState({ hidden: false });

    if (input.files[0]) {
      const data = new FormData();
      data.append('file_upload', input.files[0]);

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
        },
        err => {
          this.setState({ progress: 0 });
        })
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
          this.props.getConversation(this.props.match.params.slug, page + 1, () => {
            this.containerRef.current.scrollTo(0, this.state.scrollHeight);
          });
        }
      });
    }
  }

  render() {
    const { message, image, hidden, video, document, progress } = this.state;
    const currentUser = getCurrentUser();
    const { history } = this.props;
    const { user, messages } = this.props.conversation

    return (
      <div className="chat-box">
        <>
          <div className={`chat-header ${user && user.feel_color}`}>
            <i
              className="fa fa-arrow-left clickable"
              onClick={() => history.goBack()}
            />

            {user &&
              <Link to={`/dashboard/studio/${user.slug}`} >
                <Avatar avatars={user.avatars} feelColor={user.feel_color} />
              </Link>
            }

            <div className="user-Status">
              {user && <p>
                <Link to={`/dashboard/studio/${user.slug}`} >{user.username}</Link>
              </p>
              }
              <span>Time Ago Active</span>
            </div>

            <div className="call-btn">
              <button>video Call</button>
              <button>Draw</button>
            </div>
          </div>

          <div className="chat-container"
            ref={ref => this.containerRef.current = ref}
            onScroll={this.handleScroll}
          >
            <div className="chat-uesr">
              {user && <Avatar avatars={user.avatars} feelColor={user.feel_color} />}
              <div className="chat-uesr-name">
                <p>	You are now Strqing with </p>
                {user && <span>{user.username}</span>}
              </div>
            </div>

            {messages?.data?.map((data, index) => (
              <div key={index}>
                {data.user.id === currentUser.id
                  ? (
                    <div
                      className="message-row group"
                    >
                      <div className={`outgoing ${data.feel_color}`}>
                        <div className="user-message">
                          <div className={index === messages.data.length - 1 ? 'send-icon high' : 'send-icon'}>
                            {data.messages_logs.length > 0
                              ? data.messages_logs[0].status === 1
                                ? <img alt="" src={`/assets/images/${data.messages_logs[0].feel_color}.png`} />
                                : <img alt="" src="/assets/images/avatarblack.png" />
                              : <img src="/assets/images/avatarblack.png" alt="" />
                            }
                          </div>
                          <div className="text">
                            {data.message}
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
                      <div className={`incoming ${data.feel_color}`}>
                        <div className="user-message">
                          <Avatar avatars={data.user.avatars} feelColor={data.feel_color} />
                          <div className='text'>
                            {data.message}
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
                      <div ref={ref => this.bottomRef.current = ref}></div>
                    </div>
                  )
                }
              </div>
            ))
            }
          </div>
        </>
        {
          progress > 0 &&
          <div>
            <div className={`progressBar ${currentUser.feel_color}`}>
              <span className="text"> {progress}% </span>
              <div className="percent" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        }

        <div className="message-input">
          <i
            className="fa fa-plus add-items-btn"
            onClick={() => this.setState({ hidden: true })}
          />
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
            className={`clickable btn-send ${currentUser.feel_color}`}
          >
            Post
          </button>
        </div>
        {this.state.typingText &&
          <div className='typing-text'>
            {this.state.typingText}
          </div>
        }
        <div className="preview">
          {image &&
            <div className="image-preview">
              <i className="fas fa-trash" onClick={() => this.setState({ image: '' })}></i>
              <img src={image} alt="" />
            </div>
          }
          {video &&
            <div className="video-preview">
              <i className="fas fa-trash" onClick={() => this.setState({ video: '' })}></i>
              <video width="320" height="240" controls>
                <source src={video} type="video/mp4" />
                <source src={video} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </div>
          }
          {document &&
            <div className="document-preview">
              <i className="fas fa-trash" onClick={() => this.setState({ document: '' })}></i>
              <i className="fas fa-file-alt"></i>
              <div> {document.doc_name && document.doc_name}</div>
            </div>
          }
          <div ref={ref => this.preview.current = ref}> </div>
        </div>
        {hidden &&
          <div className="add-img-vid-box">
            <i
              className="fa fa-times close-add-box"
              onClick={() => this.setState({ hidden: false })}
            />
            <label>
              <img alt="" src="/assets/images/plus.png" />
              Add Image
              <input type="file" name="image" onChange={this.handleUpload} accept="image/*" />
            </label>
            <label>
              <img alt="" src="/assets/images/plus.png" />
              Add Video
              <input type="file" name="video" onChange={this.handleUpload} accept=".mp4" />
            </label>
            <label>
              <img alt="" src="/assets/images/plus.png" />
              Add Document
              <input
                type="file"
                name="video"
                onChange={this.handleUpload}
                accept=".pdf,.doc,.docx,.xlsx,.xlsm,.xlsb,.xltx,.csv"
              />
            </label>
          </div>
        }
      </div >
    );
  }
};

const mapStateToProps = state => {
  return {
    conversation: state.conversation
  }
};

ChatBox.contextType = SocketContext;

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
})(withRouter(ChatBox));
