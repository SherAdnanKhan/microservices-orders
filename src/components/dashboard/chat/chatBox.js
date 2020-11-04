import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser, getAuthToken } from '../../../actions/authActions';
import socket from '../../../services/socketService';
import { toast } from 'react-toastify';
import ChatInvitationModel from '../../common/chatInvitationModal';
import ChatHeader from './chatHeader';
import ParticipantsModel from './participantsModel';
import UserCube from '../../common/userCube';
import Draw from './draw';
import MediumMeuzmLogo from '../../common/mediumMeuzmLogo';
import Loader from '../../common/loader';
import OutgoingMessage from './outgoingMessage';
import IncomingMessage from './incomingMessage';
import ProgressBar from '../../common/progressBar';
import ChatInput from './chatInput';
import WhoIsTyping from './whoIsTyping';
import FilePreview from './filePreview';
import FileUploadModal from './fileUploadModal';
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
  deleteMessage
} from '../../../actions/conversationActions';

class ChatBox extends Component {
  state = {
    image: '',
    video: '',
    document: '',
    message: '',
    hidden: true,
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
    conversation && socket.emit('leave', { room: conversation.id });
    socket.off('recieveMessage');
    socket.off('onRead');
    socket.off('onReadAll');
    socket.off('typing')

    window.removeEventListener("resize", this.handleWindowResize)
    this.props.clearConversation();
    this.setState({ page: 1 })
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
    } else if ((type === "image/png" || type === "image/jpeg" || type === "image/png") && size > 25.6) {
      error = "Image size must be 25MB long"
    } else if (type === "application/document" && size > 51.2) {
      error = "Document size must be 25MB long"
    }
    return error ? error : false
  }


  handleUpload = ({ target: input }) => {
    this.setState({ hidden: true });

    if (input.files[0]) {
      const fileSizeMb = this.convertFileSize(input.files[0].size);
      const fileType = input.files[0].type;
      const isErrors = this.validateFile(fileSizeMb, fileType);
      const data = new FormData();

      data.append('file_upload', input.files[0]);

      if (!isErrors) {
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
    const { page } = this.state;
    const { messages } = this.props.conversation;
    const element = document.getElementById(messages?.data[0]?.id)

    if (scrollTop === 0) {
      this.setState({ page: page + 1, }, () => {
        if (this.props.conversation.messages.next_page_url) {
          this.props.getConversation(this.props.activeConversation.id, page + 1, () => {
            element.scrollIntoView({ behavior: 'auto' })
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

  handleOpenUploadModal = () => {
    this.setState({ hidden: false })
  }

  handleCloseUploadModal = () => {
    this.setState({ hidden: true })
  }

  handleDeleteMessage = id => {
    this.props.deleteMessage(id);
  }

  render() {
    const { message, image, hidden, video, document, progress } = this.state;
    const currentUser = getCurrentUser();
    const { user, messages, conversation } = this.props.conversation;
    const filtered = conversation?.participants?.filter(p => p.id !== currentUser.id)[0];
    const { onlineUsers, isBlocked, isViewAble, isMuted } = this.props;

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
            isBlocked={isBlocked}
            isViewAble={isViewAble}
            isMuted={isMuted}
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
              {this.props.messageLoader &&
                <Loader />
              }
            </div>

            {messages?.data?.map((data, index) => (
              <div
                key={data.id}
                id={data.id}
              >
                {data.user.id === currentUser.id
                  ? (
                    <OutgoingMessage
                      data={data}
                      conversation={conversation}
                      index={index}
                      messagesLength={messages?.data?.length}
                      onDeleteMessage={this.handleDeleteMessage}
                      feelColor={currentUser?.feel?.color_code}
                    />
                  ) : (
                    <IncomingMessage
                      data={data}
                    />
                  )
                }
              </div>
            ))
            }
            <div ref={ref => this.bottomRef.current = ref}></div>
          </div>
        </>

        {isViewAble !== null &&
          <>
            {isViewAble
              ? (
                <div className="chat-footer" ref={this.footerRef}>
                  {progress > 0 &&
                    <ProgressBar
                      progress={progress}
                      feelColor={currentUser.feel.color_code}
                    />
                  }
                  <ChatInput
                    message={message}
                    onChange={this.handleChange}
                    onEnter={this.handleEnter}
                    onPost={this.handlePost}
                    feelColor={currentUser.feel.color_code}
                    onOpenUploadModal={this.handleOpenUploadModal}
                  />

                  <WhoIsTyping
                    typingUsers={this.state.typings}
                  />

                  <FilePreview
                    previewRef={this.preview}
                    image={image}
                    video={video}
                    document={document}
                    onDeletePreview={this.handleDeletePreview}
                  />
                  {!hidden &&
                    <FileUploadModal
                      feelColor={currentUser.feel.color_code}
                      onChange={this.handleUpload}
                      onClose={this.handleCloseUploadModal}
                    />
                  }
                </div>
              ) : (
                <p className="p-style">
                  You cannot message or video chat with {filtered?.first_name}  {filtered?.last_name} ({filtered?.username})
                </p>
              )
            }
          </>
        }

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
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    conversation: state.conversation,
    isBlocked: state.conversation.is_blocked,
    isViewAble: state.conversation.is_viewable,
    isMuted: state.conversation.is_muted,
    onlineUsers: state.onlineUser.onlineUsers,
    messageLoader: state.conversation.messageLoader,
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
  resetConversationCount,
  deleteMessage
})(withRouter(ChatBox));
