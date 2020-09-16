import React, { useState, useEffect } from 'react';
import Conversation from '../conversation';
import ChatBox from './chatBox';
import { isChrome } from '../../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { clearConversation, getAllConversations, getConversation } from '../../../actions/conversationActions';
import Spinner from '../../common/spinner';
import useViewport from '../../common/useViewport';
import { useRouteMatch } from 'react-router-dom';

const Chat = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { conversation } = useSelector(state => state.conversation);
  const { width } = useViewport();
  const breakPoint = 768;

  const {
    conversation: { conversations },
    loading: { loading }
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

  return (
    <div className={!isChrome() ? "chat-Row safari" : "chat-Row"}>
      {loading && <Spinner />}
      {width <= breakPoint
        ? (
          <>
            {!activeConversation &&
              <div className="conversation">
                <Conversation
                  conversations={conversations}
                  onActiveConversation={handleActiveConversation}
                  activeConversation={activeConversation}
                />
              </div>
            }
          </>
        ) : (
          <div className="conversation">
            <Conversation
              conversations={conversations}
              onActiveConversation={handleActiveConversation}
              activeConversation={activeConversation}
            />
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