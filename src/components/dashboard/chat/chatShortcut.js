import React, { useEffect, useContext, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversations } from "../../../actions/conversationActions";
import Avatar from "../../common/avatar";
import MeuzmLogo from "../../common/meuzmLogo";
import UserContext from "../../../context/userContext";
import ToolTip from "../../common/toolTip/toolTip";
import socket from "../../../services/socketService";

const ChatShortCut = ({ onActiveConversation }) => {
  const [showShortcut, setShowShortcut] = useState(false);
  const { conversations, conversation } = useSelector(state => state.conversation)
  const currentUser = useContext(UserContext);
  let dispatch = useDispatch();

  const conversationRef = useRef();

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  useEffect(() => {
    socket.on('notify', data => {
      if (conversationRef.current?.id !== data.message.conversation_id) {
        setShowShortcut(showShortcut => showShortcut = true);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch]);

  const handleShowShortcut = () => {
    setShowShortcut(!showShortcut)
  }
  return (
    <div className="chatUsers">
      <i
        className="fa fa-ellipsis-h chatOptions"
        aria-hidden="true"
        data-tip="more"
        data-for="other chats" onClick={handleShowShortcut} ></i>
      <ToolTip id="more" position="top" />

      <div className="shortcutOpen">
        {showShortcut &&
          <div className="chatShortcut">
            {
              conversations.data.length > 0 &&
              conversations.data.map((conversation, index) => (
                <div
                  key={index}
                  className="list-container"
                  style={{ width: "auto" }}
                  onClick={() => onActiveConversation(conversation)}
                >
                  {conversation.unread_messages_logs_count > 0 &&
                    <div >
                      {conversation.participants.length > 2
                        ? (
                          <span
                            className='notify'
                            style={{ borderColor: 'white' }}
                          >
                            {conversation.unread_messages_logs_count}
                          </span>
                        ) : (
                          <span
                            className='notify'
                            style={{
                              borderColor:
                                conversation.participants[0].id !== currentUser.id
                                  ? conversation.participants[0].feel.color_code
                                  : conversation.participants[1].feel.color_code
                            }}
                          >
                            {conversation.unread_messages_logs_count}
                          </span>
                        )
                      }
                    </div>
                  }
                  {conversation.participants.length > 0 &&
                    <>
                      {conversation.participants.length > 2
                        ? (
                          <MeuzmLogo />
                        ) : (
                          <>
                            {conversation.participants[0].id !== currentUser.id &&
                              <Avatar
                                user={conversation.participants[0]}
                              />
                            }
                            {conversation.participants[1].id !== currentUser.id &&
                              <Avatar
                                user={conversation.participants[1]}
                              />
                            }
                          </>
                        )
                      }
                    </>
                  }
                </div>
              ))}
          </div>
        }
      </div>
    </div>
  )
}
export default ChatShortCut;

