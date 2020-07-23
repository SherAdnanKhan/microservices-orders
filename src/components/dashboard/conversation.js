import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllConversations } from '../../actions/conversationActions';
import UserContext from '../../context/userContext';
import Avatar from '../common/avatar';
import Spinner from '../common/spinner';
import { formatTime, formatDate } from '../../utils/helperFunctions';
import { Link } from 'react-router-dom';

const Conversation = () => {
  const currentUser = useContext(UserContext);
  const dispatch = useDispatch();
  const {
    conversation: { conversations },
    loading: { loading }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch]);

  const getDateOrTime = date => {
    const current = new Date();
    const incoming = new Date(date);

    if (current.getDate() === incoming.getDate()) {
      return formatTime(date);
    }
    return formatDate(date);
  }

  return (
    <div className="conversation">
      {loading && <Spinner />}
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
            <div className="singleMsg" key={index}>
              {conversation.unread_messages_logs_count > 0 &&
                <span className='notify'
                  style={{
                    borderColor:
                      conversation.participants[0].id !== currentUser.id
                        ? conversation.participants[0].feel.color_code
                        : conversation.participants[1].feel.color_code
                  }}
                >
                  {conversation.unread_messages_logs_count}
                </span>
              }
              {conversation.participants.length > 0 &&
                <>
                  {conversation.participants[0].id !== currentUser.id &&
                    <Link to={`/dashboard/chat/${conversation.participants[0].slug}`}>
                      <Avatar
                        avatars={conversation.participants[0].avatars}
                        feelColor={conversation.participants[0].feel.color_code}
                      />
                    </Link>
                  }
                  {conversation.participants[1].id !== currentUser.id &&
                    <Link to={`/dashboard/chat/${conversation.participants[1].slug}`}>
                      <Avatar
                        avatars={conversation.participants[1].avatars}
                        feelColor={conversation.participants[1].feel.color_code}
                      />
                    </Link>
                  }
                </>
              }
              <div className="msg">
                {conversation.participants.length > 0 &&
                  <>
                    {conversation.participants[0].id !== currentUser.id &&
                      <div className="name"> {conversation.participants[0].username} </div>
                    }
                    {conversation.participants[1].id !== currentUser.id &&
                      <div className="name"> {conversation.participants[1].username} </div>
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
    </div>
  );
};

export default Conversation;
