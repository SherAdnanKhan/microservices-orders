import React, { Component } from 'react';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getConversation, updateConversation, clearConversation, createMessage, uploadImage } from '../../actions/conversationActions';
import io from 'socket.io-client';
import Avatar from '../common/avatar';
import UserContext from '../../context/userContext';
import { formatTime, formatDate } from '../../utils/helperFunctions';
import Spinner from '../common/spinner';

class ChatBox extends Component {
  // url = "http://localhost:8080";

  state = {
    message: '',
    socket: ''
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
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
        console.log("yes xsd", data);
        this.props.updateConversation(data);
      });
    }
  }

  componentCleanup = () => {
    const { conversation } = this.props.conversation;

    conversation && this.state.socket.emit('leave', { room: conversation.id });
    this.state.socket.emit('disconnect');
    this.setState({ message: '' });
    this.props.clearConversation();
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  handleEnter = e => {
    const { conversation } = this.props.conversation;
    if (e.keyCode === 13) {
      if (conversation) {

        const data = {
          message: e.target.value,
          user: this.context,
          room: conversation.id
        };

        this.state.socket.emit('sendMessage', data, () => {
          this.setState({ message: '' });
          this.props.createMessage(data);
        });
      }

      $('.chat-container').stop().animate({
        scrollTop: $('.chat-container')[0].scrollHeight
      }, 'slow');
    }
  };

  handleUpload = ({ target: input }) => {
    if (input.name === 'image') {
      if (input.files[0]) {
        const data = new FormData();
        data.append('image', input.files[0]);

        this.props.uploadImage(data,
          image => {
            this.setState({ message: image.image_path });
          },
          err => {
            console.log(err);
          })
      }
    }
  }
  render() {
    const { message } = this.state;
    const currentUser = this.context;
    const { history } = this.props;
    const { user, messages, loading } = this.props.conversation

    return (
      <div className="chat-box">
        {loading && <Spinner />}
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
                          <p>{data.message}</p>
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
                          <p>{data.message}</p>
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
        <div className="message-input">
          <i className="fa fa-plus add-items-btn" />
          <input
            autoFocus
            placeholder="Type a message"
            type="text"
            name="message"
            value={message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyUp={this.handleEnter}
          />
          <button>Post</button>
        </div>

        <div className="add-img-vid-box">
          <i className="fa fa-times close-add-box" />
          <label>
            <img alt="" src="/assets/images/plus.png" />
            Add Image
            <input type="file" name="image" onChange={this.handleUpload} />
          </label>
          <label>
            <img alt="" src="/assets/images/plus.png" />
            Add Video
          </label>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    conversation: state.conversation
  }
};

ChatBox.contextType = UserContext;

export default connect(
  mapStateToProps, {
  getConversation,
  updateConversation,
  clearConversation,
  createMessage,
  uploadImage
})(withRouter(ChatBox));
