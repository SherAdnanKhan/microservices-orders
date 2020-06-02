import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllConversations } from '../../actions/conversationActions';
import UserContext from '../../context/userContext';
import Avatar from '../common/avatar';
import Spinner from '../common/spinner';

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

  const formatTime = dateTime => {
    let date = new Date(dateTime);
    var hours = date.getHours();
    var minuts = date.getMinutes();
    var isAmOrPm = "AM";

    if (hours >= 12) {
      hours = hours - 12;
      isAmOrPm = "PM";
    }

    if (hours === 0) {
      hours = 12;
    }
    return `${hours}:${minuts} ${isAmOrPm} `;
  }

  return (
    <div className="conversation">
      {loading && <Spinner />}
      <div className="setMarginTop" />
      <div className="chatMsgLists">

        {conversations &&
          conversations.map((conversation, index) => (
            <div className="singleMsg" key={index}>
              <span className="notify">
                9
              </span>
              {conversation.participants.length > 0 &&
                <>
                  {conversation.participants[0].id !== currentUser.id &&
                    <Avatar
                      avatars={conversation.participants[0].avatars}
                      feelColor={conversation.participants[0].feel_color}
                    />
                  }
                  {conversation.participants[1].id !== currentUser.id &&
                    <Avatar
                      avatars={conversation.participants[1].avatars}
                      feelColor={conversation.participants[1].feel_color}
                    />
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
                {/* 9:48 AM */}
                {conversation.messages.length > 0 &&
                  <>
                    {formatTime(conversation.messages[conversation.messages.length - 1].created_at)}
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
    </div>
  );
};

export default Conversation;
