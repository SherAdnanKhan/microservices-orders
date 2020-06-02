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
      console.log('yes')
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
                <span className="notify">
                  {conversation.unread_messages_logs_count}
                </span>
              }
              {conversation.participants.length > 0 &&
                <>
                  {conversation.participants[0].id !== currentUser.id &&
                    <Link to={`/dashboard/chat/${conversation.participants[0].slug}`}>
                      <Avatar
                        avatars={conversation.participants[0].avatars}
                        feelColor={conversation.participants[0].feel_color}
                      />
                    </Link>
                  }
                  {conversation.participants[1].id !== currentUser.id &&
                    <Link to={`/dashboard/chat/${conversation.participants[1].slug}`}>
                      <Avatar
                        avatars={conversation.participants[1].avatars}
                        feelColor={conversation.participants[1].feel_color}
                      />
                    </Link>
                  }
                </>
              }
              <div className="msg">
                {conversation.participants.length > 0 &&
                  <>
                    {conversation.participants[0].id !== currentUser.id &&
                      <div className="name">Name: {conversation.participants[0].username} </div>
                    }
                    {conversation.participants[1].id !== currentUser.id &&
                      <div className="name">Name: {conversation.participants[1].username} </div>
                    }
                  </>
                }
                {conversation.messages.length > 0 &&
                  <>
                    {conversation.messages[conversation.messages.length - 1].message}
                  </>
                }
              </div>
              <div className="dateTime">
                {conversation.messages.length > 0 &&
                  <>
                    {getDateOrTime(conversation.messages[conversation.messages.length - 1].created_at)}
                  </>
                }
              </div>
            </div>
          ))
        }

        {/* <div className="singleMsg" >
          <div className="artcubecase dodgerblue">
            <div className="procusmallmove">
              <div className="scenesmall">
                <a href="#__">
                  <div className="cubesmallmove">
                    <div className="cube-facesmall cube-face-frontsmall">
                      <img src="/assets/images/dummyData/03.png" height="100%" alt="" />
                    </div>
                    <div className="cube-facesmall cube-face-backsmall">
                      <img src="/assets/images/dummyData/03.png" height="100%" alt="" />
                    </div>
                    <div className="cube-facesmall cube-face-leftsmall">
                      <img src="/assets/images/dummyData/03.png" height="100%" alt="" />
                    </div>
                    <div className="cube-facesmall cube-face-rightsmall">
                      <img src="/assets/images/dummyData/03.png" height="100%" alt="" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="exhibitartname">
              <span className="artof" id="artof" />
            </div>
          </div>
          <div className="msg">
            <div className="name">Name: asdfasdf</div>
          asdf
        </div>
          <div className="dateTime">
            9:48 AM
          </div>
        </div > */}
      </div>
    </div >
  );
};

export default Conversation;
