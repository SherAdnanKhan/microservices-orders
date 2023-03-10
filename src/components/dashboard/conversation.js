import React, { useCallback, useContext, useState } from 'react'
import UserContext from '../../context/userContext';
import Avatar from '../common/avatar';
import { formatTime, formatDate } from '../../utils/helperFunctions';
import MeuzmLogo from '../common/meuzmLogo';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../common/loader';
import ConversationOptions from './chat/conversationOptions';
import InputAutoComplete from '../common/autoComplete';
import { getAllUsers, clearUsers } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowUnloadEffect } from '../common/useWindowUnloadEffect';


const Conversation = ({
  onActiveConversation, toggleDeleteModal, conversations,
  feelColor, onDeleteConversation, activeConversation,
  onCallNextPage, currentPage, conversationLoader, nextPageUrl,
  onUserSelect
}) => {
  const currentUser = useContext(UserContext);
  const [username, setUsername] = useState('');
  const { users } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const filteredUsers = users?.filter(user => user.id !== currentUser.id) || null;

  useWindowUnloadEffect(() => {
    dispatch(clearUsers());
  }, true);

  const getDateOrTime = date => {
    const current = new Date();
    const incoming = new Date(date);

    if (current.getDate() === incoming.getDate()) {
      return formatTime(date);
    }
    return formatDate(date);
  }

  const fetchData = () => {
    onCallNextPage();
  }

  const handleChange = value => {
    setUsername(value);
  }

  const handleSearchEnd = useCallback(result => {
    if (result) {
      dispatch(getAllUsers(result));
    }
  }, [dispatch]);

  const handleSelect = option => {
    dispatch(clearUsers());
    setUsername(option.username)
    onUserSelect(option.slug)
  };

  // const renderLastMessage = lastMessage => {

  // }

  return (
    <div className="conversationContainer">
      <div className="searchField">
        <InputAutoComplete
          className="search"
          type="search"
          options={filteredUsers}
          displayProperty="username"
          placeholder="Search"
          defaultValue={username}
          onChange={handleChange}
          onSearchEnd={handleSearchEnd}
          onSelect={handleSelect}
        />
        {username && filteredUsers?.length === 0 &&
          <div style={{ textAlign: 'center' }}>
            no data found
          </div>
        }
      </div>
      {(!conversations || conversations.length === 0) &&
        <div className="logo">
          <img src="/assets/images/strqicon.png" alt="" />
          <p> Find an Artist to Strq </p>
        </div>
      }
      <div className="setMarginTop" />
      <div className="chatMsgLists">
        <InfiniteScroll
          dataLength={conversations?.length} //This is important field to render the next data
          next={fetchData}
          hasMore={nextPageUrl ? true : false}
          height="90vh"
          loader={
            <>
              {currentPage !== 1 && conversationLoader && <Loader />}
            </>
          }
        >

          {conversations && conversations.length > 0 &&
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
                  <>
                    {conversation?.last_message?.message}
                  </>

                </div>
                <div className="date-action">
                  <div className="dateTime">
                    {conversation.last_message &&
                      <>
                        {getDateOrTime(conversation.last_message.created_at)}
                      </>
                    }
                  </div>
                  <div className="messageDots clickable">
                    <i className="fa fa-ellipsis-v"
                      aria-hidden="true"
                      onClick={(event) => event.stopPropagation()}
                    ></i>
                    <ConversationOptions
                      toggleDeleteModal={(e) => {
                        toggleDeleteModal(true, conversation.id);
                        e.stopPropagation();
                      }
                      }
                      feelColor={feelColor}
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </InfiniteScroll>


      </div>
    </div >
  );
};

export default Conversation;
