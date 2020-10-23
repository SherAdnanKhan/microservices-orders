import React, { useEffect, useContext, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteGalleryUsers, getFavouritePosts } from '../../../actions/lobbyActions';
import UserCube from '../../common/userCube';
import LobbyPosts from './lobbyPosts';
import { Link } from "react-router-dom";
import FeedSection from '../mzFlashGroup/feedSection';
import { getCollectiveFeeds, createFeedComment, createFeed, strokeFeed, unstrokeFeed } from '../../../actions/mzFlashActions';
import UserContext from '../../../context/userContext';
import VerticalSlider from '../../common/verticalSlider';
import HorizontalSlider from '../../common/horizontalSlider';
import ToolTip from "../../common/toolTip/toolTip";
import Loader from "../../common/loader";

const Lobby = () => {
  const dispatch = useDispatch();
  const [unReadMsgCount] = useState("0");
  const {
    lobby: { favouriteUsers, favouritePosts, postLoader },
    mzFlash: { collectiveFeeds },
    postView: { sendUser },
    feelColor: { feelColor },
  } = useSelector(state => state);

  const [activeFeedComment, setActiveFeedComment] = useState(0);

  const [comments, setComments] = useState({})
  const currentUser = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const postRef = useRef();

  // useEffect(() => {
  //   const totalCount = conversations
  //     ?.map(conversation => conversation.unread_messages_logs_count)
  //     .filter(messageCount => messageCount !== 0)
  //     .length
  //   setUnreadMsgCount(count => count = totalCount);
  //   clearCount(totalCount);
  // }, [conversations]);


  useEffect(() => {
    dispatch(getFavouritePosts());
    dispatch(getFavouriteGalleryUsers());
    dispatch(getCollectiveFeeds());
  }, [dispatch]);

  // const clearCount = (unReadMsgCount) => {
  //   if (unReadMsgCount && unReadMsgCount > 0) {
  //     setTimeout(() => {
  //       setUnreadMsgCount("0")
  //     }, 5000)
  //   }
  // };

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

  const handleScroll = () => {
    const scrollTop = postRef.current.scrollTop;
    const scrollHeight = postRef.current.scrollHeight;
    const clientHeight = postRef.current.clientHeight;

    if (scrollHeight - clientHeight === Math.round(scrollTop)) {
      if (favouritePosts.next_page_url && !postLoader) {
        dispatch(getFavouritePosts(currentPage + 1));
        setCurrentPage(currentPage => currentPage + 1);
      }
    }
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
              favouriteUsers?.data.map((user, index) => (
                <div key={index}>
                  <Link to={`/dashboard/studio/${user.slug}`}>
                    <UserCube user={user} />
                  </Link>
                </div>
              ))
            }
          </VerticalSlider>

          <HorizontalSlider>
            {favouriteUsers &&
              favouriteUsers?.data.map((user, index) => (
                <div key={index}>
                  <div className="item">
                    <Link to={`/dashboard/studio/${user.slug}`}>
                      <UserCube user={user} />
                    </Link>
                  </div>
                </div>
              ))
            }
          </HorizontalSlider>
        </div>
        <div
          className="col-6 section-2 box-2"
          onScroll={handleScroll}
          ref={postRef}>
          <ToolTip id="search" position="bottom" text="search" />
          <div>
            <LobbyPosts
              posts={favouritePosts?.data}
              sendUser={sendUser}
            />
            {postLoader &&
              <Loader />
            }
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
