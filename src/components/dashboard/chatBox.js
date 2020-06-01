import React, { Component } from 'react';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getConversation, updateConversation, clearConversation } from '../../actions/conversationActions';
import io from 'socket.io-client';
import Avatar from '../common/avatar';
import UserContext from '../../context/userContext';

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
        this.props.updateConversation(data);
        console.log("recieved: ", data);
      });
    }
  }

  componentCleanup = () => {
    this.setState({ message: '' });
    this.props.clearConversation();
    this.state.socket.emit('leave', { room: this.props.conversation.conversation.id });
    this.state.socket.emit('disconnect');
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
          user_id: this.context.id,
          conversation_id: conversation.id
        };

        this.state.socket.emit('sendMessage', data, () => {
          this.setState({ message: '' });
        });
      }

      $('.chat-container').stop().animate({
        scrollTop: $('.chat-container')[0].scrollHeight
      }, 'slow');
    }
  };

  render() {
    const { message } = this.state;
    const currentUser = this.context;
    const { history } = this.props;
    const { slug } = this.props.match.params;
    const { user, messages } = this.props.conversation

    return (
      <div className="chat-box">
        <div className="chat-header">
          <i
            className="fa fa-arrow-left clickable"
            onClick={() => history.replace(`/dashboard/studio/${slug}`)}
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
                      <div className="outgoing">
                        <div className="send-icon">
                          <img alt="" src={`/assets/images/${currentUser.feel_color}.png`} />
                        </div>
                        <p>{data.message}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="message-row group">
                      <div className="incoming">
                        <Avatar avatars={data.user.avatars} />
                        <p>{data.message}</p>
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
          <div>
            <img alt="" src="/assets/images/plus.png" />
            Add Image
          </div>
          <div>
            <img alt="" src="/assets/images/plus.png" />
            Add Video
          </div>
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
  clearConversation
})(withRouter(ChatBox));
