import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFaveAndSprfvsUsers, getSprfvsUsers } from '../../../actions/userActions';
import PostModal from "./postModal";
import UserContext from '../../../context/userContext';
import Spinner from '../../common/spinner';
import UserSection from './userSection';
import FaveSection from './faveSection';
import FeedSection from './feedSection';
import $ from 'jquery';

import {
  getCollectiveFeeds,
  getMyFeeds,
  getMyFavesFeeds,
  getMySprfvsFeeds,
  getMySprfvsAndFavesFeeds,
  createFeedComment,
  createFeed,
  strokeFeed,
  unstrokeFeed,
  getUserFeeds
} from '../../../actions/mzFlashActions';

const MzFlashGroup = () => {
  const [activeTab, setActiveTab] = useState(4);
  const [activeUserList, setActiveUserList] = useState(2);
  const [activeUser, setActiveUser] = useState('');
  const [activeFeedComment, setActiveFeedComment] = useState(0);
  const [comments, setComments] = useState({})
  const [imagePath, setImagepath] = useState("");
  const [mediaType, setMediaType] = useState("");

  const [showModel, setShowModel] = useState(false);
  const [showPostModel, setShowPostModel] = useState(false);

  const currentUser = useContext(UserContext);
  const dispatch = useDispatch();

  const {
    user: { faveAndSprfvsUsers, sprfvsUsers },
    mzFlash: {
      collectiveFeeds, loading, favesFeeds, myFeeds,
      sprfvsFeeds, favesAndSprfvsFeeds, userFeeds
    }
  } = useSelector(state => state);

  const handleShowModel = value => {
    setShowModel(value);
  };
  const handlePostShowModel = (value, type, image) => {
    console.log("type=", type, "image=", image)
    if (value === true) {
      setImagepath(image.path);
      setMediaType(type);
    }
    setShowPostModel(value);

  };


  useEffect(() => {
    dispatch(getFaveAndSprfvsUsers());
    dispatch(getSprfvsUsers(3, 1));
    dispatch(getCollectiveFeeds());
    dispatch(getMyFeeds());
    dispatch(getMySprfvsFeeds());
    dispatch(getMyFavesFeeds());
    dispatch(getMySprfvsAndFavesFeeds());
  }, [dispatch]);

  useEffect(() => {

    const handleResize = () => {
      if (window.matchMedia('(min-width: 769px)').matches) {
        $('.my-slider-horizontal').hide();
      }

      if (window.matchMedia('(max-width: 768px)').matches) {
        if (activeTab === 2) {
          $('.my-slider-horizontal').show();
        } else {
          $('.my-slider-horizontal').hide();
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });

  const handleEnter = (e, feedId, comment, user) => {
    if (e.keyCode === 13 && comments[comment]) {
      const commentData = {
        feed_id: feedId,
        comment: comments[comment]
      };
      dispatch(createFeedComment(commentData, user));
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

  const handleActiveUser = user => {
    setActiveTab(0);
    setActiveUser(user);
    dispatch(getUserFeeds(user.slug));
  };

  const handleTabChange = async tab => {
    await setActiveTab(tab);
    await setActiveUser('');
    await setActiveUserList(tab);


    if (window.matchMedia('(max-width: 856px)').matches) {
      if (tab === 2) {
        $('.my-slider-horizontal').show();
      } else {
        $('.my-slider-horizontal').hide();
      }
    }
  };

  return (
    <section className="mz-flash-group">
      {loading && <Spinner />}
      <div className="row">
        {showPostModel &&
          <PostModal
            onPostModalClose={handlePostShowModel}
            imagePath={imagePath}
            mediaType={mediaType}
          />
        }
        <UserSection
          sprfvsUsers={sprfvsUsers}
          faveAndSprfvsUsers={faveAndSprfvsUsers}
          onActiveUser={handleActiveUser}
          activeUserList={activeUserList}
        />
        <FaveSection
          myFeeds={myFeeds}
          sprfvsFeeds={sprfvsFeeds}
          favesFeeds={favesFeeds}
          favesAndSprfvsFeeds={favesAndSprfvsFeeds}
          userFeeds={userFeeds}
          activeTab={activeTab}
          activeUser={activeUser}
          activeUserList={activeUserList}
          onTabChange={handleTabChange}
          activeFeedComment={activeFeedComment}
          onActiveFeedComment={handleActiveFeedComment}
          onCommentChange={handleCommentChange}
          comments={comments}
          onPostComment={handleEnter}
          onRepost={handleRepost}
          onStroke={handleFeedStroke}
          onUnstroke={handleFeedUnstroke}
          onPostModal={handlePostShowModel}
        />
        <FeedSection
          collectiveFeeds={collectiveFeeds}
          onModelChange={value => setShowModel(value)}
          showModel={showModel}
          currentUser={currentUser}
          activeFeedComment={activeFeedComment}
          onActiveFeedComment={handleActiveFeedComment}
          onCommentChange={handleCommentChange}
          comments={comments}
          onPostComment={handleEnter}
          onRepost={handleRepost}
          onStroke={handleFeedStroke}
          onUnstroke={handleFeedUnstroke}
          onModelOpen={handleShowModel}
          onPostModal={handlePostShowModel}
        />
      </div>
    </section >
  );
};

export default MzFlashGroup;
