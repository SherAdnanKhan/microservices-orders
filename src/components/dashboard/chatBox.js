import React, { Component } from 'react';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '../common/avatar';
import { formatTime, formatDate } from '../../utils/helperFunctions';
import SocketContext from '../../context/socketContext';
import { getCurrentUser } from '../../actions/authActions';
import io from 'socket.io-client';

import {
  getConversation,
  updateConversation,
  clearConversation,
  createMessage,
  uploadImage,
  uploadFile,
  readMessage
} from '../../actions/conversationActions';

class ChatBox extends Component {

  state = {
    image: '',
    video: '',
    message: ' ',
    hidden: false,
    progress: 0
  };

  componentDidMount() {
    this.props.getConversation(this.props.match.params.slug);
    this.setState({ socket: io.connect(process.env.REACT_APP_SOCKET_URL) });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { conversation: currentConversation } = this.props.conversation;
    const { conversation: previos } = prevProps.conversation;

    if (currentConversation && currentConversation !== previos) {
      this.state.socket.emit('join', { room: currentConversation.id }, () => {
        console.log(`Group with id ${currentConversation.id}  joined `);
      });

      this.state.socket.on('recieveMessage', (data) => {
        this.props.updateConversation(data);
        this.state.socket.emit("onRead", data, () => {
        });
      });

      this.state.socket.on('read', (data) => {

        console.log("seen: ", data);
        this.props.readMessage(data);
      });
    }

    if (this.props.conversation.messages) {
      if ($('.chat-container').length) {
        $('.chat-container').stop().animate({
          scrollTop: $('.chat-container')[0].scrollHeight
        }, 'fast');
      }
    }
  }

  componentCleanup = () => {
    const { conversation } = this.props.conversation;

    conversation && this.state.socket.emit('leave', { room: conversation.id });
    this.state.socket.emit('disconnect');
    this.setState({ message: '', socket: '' });
    this.props.clearConversation();
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  sendMessage = e => {
    const { image, video, message } = this.state;
    const { conversation } = this.props.conversation;
    const user = getCurrentUser();

    if (conversation) {
      if (message || image || video) {
        const data = {
          message,
          url: image || video || '',
          type: image ? 1 : video ? 2 : 0,
          user,
          room: conversation.id
        };

        this.setState({ message: '', image: '', video: '' });
        this.props.createMessage(data,
          (result) => {
            const newData = result.message;

            newData.user = result.user;
            newData.room = result.message.conversation_id

            this.state.socket.emit('sendMessage', newData, () => {
            });
          });
      }
    }

    $('.chat-container').stop().animate({
      scrollTop: $('.chat-container')[0].scrollHeight
    }, 'slow');

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
          console.log(result);
          this.setState({ [result.doc_type]: result.path, progress: 0 });
        },
        err => {
          this.setState({ progress: 0 });
        })
    }
  }

  render() {
    const { message, image, hidden, video, progress } = this.state;
    const currentUser = getCurrentUser();
    const { history } = this.props;
    const { user, messages } = this.props.conversation

    return (
      <div className="chat-box">
        {!hidden &&
          <>
            <div className="chat-header">
              <i
                className="fa fa-arrow-left clickable"
                onClick={() => history.goBack()}
              />

              {user && <Avatar avatars={user.avatars} feelColor={user.feel_color} />}

              <div className="user-Status">
                {user && <p>{user.username}</p>}
                <span>Time Ago Active</span>
              </div>
              <div className="call-btn">
                <button>video Call</button>
                <button>Draw</button>
              </div>
            </div>
            <div className="chat-container">
              <div className="chat-uesr">
                {user && <Avatar avatars={user.avatars} feelColor={user.feel_color} />}
                <div className="chat-uesr-name">
                  <p>	You are now Strqing with </p>
                  {user && <span>{user.username}</span>}
                </div>
              </div>

              {messages &&
                messages.map((data, index) => (
                  <div key={index}>
                    {data.user.id === currentUser.id
                      ? (
                        <div
                          className="message-row group"
                        >
                          <div className={`outgoing ${data.user.feel_color}`}>
                            <div className="user-message">
                              <div className="send-icon">
                                <img alt="" src={`/assets/images/${data.user.feel_color}.png`} />
                              </div>
                              <div className="text">
                                {data.message}
                                {data.type === 1 &&
                                  <div className="msgImg">
                                    <a href={data.url} target="_blank" rel="noopener noreferrer">>
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
                              </div>
                            </div>
                            {data.created_at &&
                              <p className='time'>
                                {`${formatDate(data.created_at)} AT ${formatTime(data.created_at)}`}
                              </p>
                            }
                          </div>
                        </div>
                      ) : (
                        <div className="message-row group">
                          <div className={`incoming ${data.user.feel_color}`}>
                            <div className="user-message">
                              <Avatar avatars={data.user.avatars} feelColor={data.user.feel_color} />
                              <div className="text">
                                {data.message}
                                {data.type === 1 &&
                                  <div className="msgImg">
                                    <a href={data.url} target="_blank" rel="noopener noreferrer">>
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
            </div>
          </>
        }

        {progress > 0 &&
          <div>
            <div className={`progressBar ${currentUser.feel_color}`}>
              <span className="text"> {progress} </span>
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
            onChange={e => this.setState({ message: e.target.value })}
            onKeyUp={this.handleEnter}
          />
          <button
            onClick={this.handlePost}
            className="clickable"
          >
            Post
          </button>
        </div>

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
  readMessage
})(withRouter(ChatBox));
