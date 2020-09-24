import React, { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../../../actions/userActions';
import { getAllConversations } from "../../../actions/conversationActions";
import UserCube from '../../common/userCube';
import LobbyPosts from './lobbyPosts';
import { Link } from "react-router-dom";
import { getUserArtById } from "../../../actions/userActions";
import FeedSection from '../mzFlashGroup/feedSection';
import { getCollectiveFeeds, createFeedComment, createFeed, strokeFeed, unstrokeFeed } from '../../../actions/mzFlashActions';
import { getMyGalleries } from "../../../actions/galleryActions";
import UserContext from '../../../context/userContext';

import VerticalSlider from '../../common/verticalSlider';
import HorizontalSlider from '../../common/horizontalSlider';

import ToolTip from "../../common/toolTip/toolTip";

const Lobby = () => {
  const dispatch = useDispatch();
  const [unReadMsgCount, setUnreadMsgCount] = useState("0");
  const {
    lobby: { favouriteUsers, favouritePosts },
    mzFlash: { collectiveFeeds },
    postView: { sendUser },
    feelColor: { feelColor },
    gallery: { myGalleries },
    conversation: { conversations }
  } = useSelector(state => state);

  const [activeFeedComment, setActiveFeedComment] = useState(0);

  const [comments, setComments] = useState({})
  const currentUser = useContext(UserContext);

  useEffect(() => {
    const totalCount = conversations
      ?.map(conversation => conversation.unread_messages_logs_count)
      .filter(messageCount => messageCount !== 0)
      .length
    setUnreadMsgCount(count => count = totalCount);
    clearCount(totalCount);
  }, [conversations]);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getUserArtById(currentUser.art_id));
    dispatch(getCollectiveFeeds());
    dispatch(getAllConversations());
    dispatch(getMyGalleries());
  }, [dispatch, currentUser]);

  const clearCount = (unReadMsgCount) => {
    if (unReadMsgCount && unReadMsgCount > 0) {
      setTimeout(() => {
        setUnreadMsgCount("0")
      }, 5000)
    }
  };

  const handleEnter = (e, feedId, comment) => {
    if (e.keyCode === 13 && comments[comment]) {
      const commentData = {
        feed_id: feedId,
        comment: comments[comment]
      };

      dispatch(createFeedComment(commentData));
      setComments({ ...comments, [comment]: '' });
    }
  };

  const handleCommentChange = ({ target: input }) => {
    setComments({ ...comments, [input.name]: input.value });
  };

  const handleActiveFeedComment = (e, feedId) => {
    e.preventDefault();
    if (feedId === activeFeedComment)
      setActiveFeedComment(0);
    else
      setActiveFeedComment(feedId);
  };

  const handleRepost = (e, feed) => {
    e.preventDefault();

    const formData = {};
    formData.feed_id = feed.id;

    dispatch(createFeed(formData));
  };


  const handleFeedStroke = (id, user) => {
    const data = {
      feed_id: id
    };
    dispatch(strokeFeed(data, user));
  };

  const handleFeedUnstroke = (id, user) => {
    const data = {
      feed_id: id
    };
    dispatch(unstrokeFeed(data, user));
  };

  return (
    <div className="lobby-page">
      {unReadMsgCount > "0" &&
        <div
          className="popUpChatMsg"
          style={{ backgroundColor: feelColor }}
        >
          <Link to="/dashboard/chat">
            <img src="/assets/images/strqicon.png" alt="" />
          </Link>
          <div className="noticeicons" >
            <div
              className="noticecountright"
              style={{ border: `2px solid ${feelColor}` }}
            >
              {unReadMsgCount}
            </div>
          </div>
        </div>
      }

      <div className="row">
        <div className="col-2 section-1  box-1" id="sec">
          <VerticalSlider>
            {favouriteUsers &&
              favouriteUsers.map((user, index) => (
                <div
                  className={index === 0 ? 'item active' : 'item'}
                  key={index}
                >
                  <div className="cube">
                    <Link to={`/dashboard/studio/${user.slug}`}>
                      <UserCube user={user} />
                    </Link>
                  </div>
                </div>
              ))
            }
          </VerticalSlider>

          <HorizontalSlider>
            {favouriteUsers &&
              favouriteUsers.map((user, index) => (
                <div
                  className={index === 0 ? 'item active' : 'item'}
                  key={index}
                >
                  <div className="cube">
                    <Link to={`/dashboard/studio/${user.slug}`}>
                      <UserCube user={user} />
                    </Link>
                  </div>
                </div>
              ))
            }
          </HorizontalSlider>
        </div>
        <div className="col-6 section-2 box-2">
          <ToolTip id="search" position="bottom" text="search" />
          <div>
            <LobbyPosts
              posts={favouritePosts}
              users={favouriteUsers}
              galleries={myGalleries}
              sendUser={sendUser}
            />
          </div>
        </div>

        <div className="section-3 box-3 col4">
          <FeedSection
            collectiveFeeds={collectiveFeeds}
            currentUser={currentUser}
            activeFeedComment={activeFeedComment}
            onActiveFeedComment={handleActiveFeedComment}
            onCommentChange={handleCommentChange}
            comments={comments}
            onPostComment={handleEnter}
            onRepost={handleRepost}
            onStroke={handleFeedStroke}
            onUnstroke={handleFeedUnstroke}
          />
        </div>
        <div className="assist">
          <a href="#__">
            <img src="/assets/images/icons/LogoIconWhite.png" alt="support" />
          </a>
        </div>
      </div>
    </div >
  );
}
export default React.memo(Lobby);
