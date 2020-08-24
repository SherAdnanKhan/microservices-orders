import React, { useContext } from 'react'
import UserContext from '../../context/userContext';
import Avatar from '../common/avatar';
import { formatTime, formatDate } from '../../utils/helperFunctions';
import MeuzmLogo from '../common/meuzmLogo';

const Conversation = ({ onActiveConversation, conversations, activeConversation }) => {
  const currentUser = useContext(UserContext);

  const getDateOrTime = date => {
    const current = new Date();
    const incoming = new Date(date);

    if (current.getDate() === incoming.getDate()) {
      return formatTime(date);
    }
    return formatDate(date);
  }

  return (
    <div className="conversationContainer">
      {(!conversations || conversations.length === 0) &&
        <div className="logo">
          <img src="/assets/images/strqicon.png" alt="" />
          <p> Find an Artist to Strq </p>
        </div>
      }
      <div className="setMarginTop" />
      <div className="chatMsgLists">
        {conversations &&
          conversations.map((conversation, index) => (
            <div
              className={conversation.id === activeConversation.id ? "singleMsg active" : "singleMsg"}
              key={index}
              onClick={() => onActiveConversation(conversation)}
            >
              {conversation.unread_messages_logs_count > 0 &&
                <>
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
                </>
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
                            avatars={conversation.participants[0].avatars}
                            feelColor={conversation.participants[0].feel.color_code}
                          />
                        }
                        {conversation.participants[1].id !== currentUser.id &&
                          <Avatar
                            avatars={conversation.participants[1].avatars}
                            feelColor={conversation.participants[1].feel.color_code}
                          />
                        }
                      </>
                    )
                  }
                </>
              }
              <div className="msg">
                {conversation.participants.length > 0 &&
                  <>
                    {conversation.participants.length > 2
                      ? (
                        <>
                          <div className="name">
                            {conversation?.participants?.filter(p => p.id !== currentUser.id)[0].username + ', '}
                            {conversation?.participants?.filter(p => p.id !== currentUser.id)[1].username}
                            {conversation?.participants.filter(p => p.id !== currentUser.id).length > 2 &&
                              <>
                                {` and ${conversation?.participants.length - 3}`} participants
                              </>
                            }
                            {/* Total participants {conversation?.participants.length} */}
                          </div>
                        </>
                      )
                      : (
                        <>
                          {conversation.participants[0].id !== currentUser.id &&
                            <div className="name"> {conversation.participants[0].username} </div>
                          }
                          {conversation.participants[1].id !== currentUser.id &&
                            <div className="name"> {conversation.participants[1].username} </div>
                          }
                        </>
                      )
                    }
                  </>
                }
                {conversation.last_message &&
                  <>
                    {conversation.last_message.message}
                  </>
                }
              </div>
              <div className="dateTime">
                {conversation.last_message &&
                  <>
                    {getDateOrTime(conversation.last_message.created_at)}
                  </>
                }
              </div>
            </div>
          ))
        }

      </div>
    </div >
  );
};

export default Conversation;
