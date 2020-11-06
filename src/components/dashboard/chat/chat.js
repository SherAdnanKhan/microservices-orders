import React, { useState, useEffect, useRef } from 'react';
import Conversation from '../conversation';
import ChatBox from './chatBox';
import { isChrome } from '../../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { clearConversation, getAllConversations, getConversation, deleteConversation } from '../../../actions/conversationActions';
import Spinner from '../../common/spinner';
import useViewport from '../../common/useViewport';
import { useRouteMatch } from 'react-router-dom';
import Loader from "../../common/loader";

const Chat = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { width } = useViewport();
  const breakPoint = 768;
  const conversationRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    conversation: { conversations, conversation, conversationLoader },
    loading: { loading },
    feelColor: { feelColor }
  } = useSelector(state => state);

  const [activeConversation, setActiveConversation] = useState("");
  const [hasConversation, setHasConversation] = useState(false);

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch]);

  useEffect(() => {
    if (params.slug) {
      if (conversation) {
        if (!hasConversation) {
          setActiveConversation(conversation);
          dispatch(clearConversation());
          setHasConversation(hasConversation => hasConversation = true)
        }
      }
    }
  }, [params, conversation, hasConversation, dispatch]);

  const handleBackPress = () => {
    setActiveConversation('');
  }

  useEffect(() => {
    if (params.slug) {
      dispatch(getConversation(params.slug));
    }
  }, [params, dispatch])


  const handleActiveConversation = conversation => {
    setActiveConversation(conversation)
  }

  const handleCallNextPage = () => {
    const scrollTop = conversationRef.current.scrollTop;
    const scrollHeight = conversationRef.current.scrollHeight;
    const clientHeight = conversationRef.current.clientHeight;
    dispatch(getAllConversations(currentPage + 1));
    setCurrentPage(currentPage => currentPage + 1);

    if (scrollHeight - clientHeight === Math.round(scrollTop)) {

      if (conversations.next_page_url) {

      }
    }
  };
  const handleDeleteConversation = (id) => {
    dispatch(deleteConversation(id));
  }

  return (
    <div className={!isChrome() ? "chat-Row safari" : "chat-Row"}>
      {loading && currentPage === 1 && <Spinner />}
      {width <= breakPoint
        ? (
          <>
            {!activeConversation &&
              <div
                className="conversation"
                ref={conversationRef}>

                <Conversation
                  conversations={conversations?.data}
                  onActiveConversation={handleActiveConversation}
                  activeConversation={activeConversation}
                  onCallNextPage={handleCallNextPage}
                  currentPage={currentPage}
                  conversationLoader={conversationLoader}
                  nextPageUrl={conversations?.next_page_url}
                  onDeleteConversation={handleDeleteConversation}
                  feelColor={feelColor}
                />
                {conversationLoader && <Loader />}
              </div>
            }
          </>
        ) : (
          <div className="conversation" ref={conversationRef}>
            <Conversation
              conversations={conversations?.data}
              onActiveConversation={handleActiveConversation}
              activeConversation={activeConversation}
              onCallNextPage={handleCallNextPage}
              currentPage={currentPage}
              conversationLoader={conversationLoader}
              nextPageUrl={conversations?.next_page_url}
              onDeleteConversation={handleDeleteConversation}
              feelColor={feelColor}
            />
            {conversationLoader && <Loader />}
          </div>
        )
      }
      {width <= breakPoint
        ? (
          <>
            {activeConversation &&
              <div className="chat-Block">
                <ChatBox
                  activeConversation={activeConversation}
                  onBackPress={handleBackPress}
                />
              </div>
            }
          </>
        ) : (
          <div className="chat-Block">
            {activeConversation &&
              <ChatBox
                activeConversation={activeConversation}
              // onBackPress={handleBackPress}
              />
            }
          </div>
        )
      }
    </div>

  );
};

export default Chat;