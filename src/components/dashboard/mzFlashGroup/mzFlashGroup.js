import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites, getFaveAndSprfvsUsers, getSprfvsUsers } from '../../../actions/userActions';
import UserContext from '../../../context/userContext';
import Spinner from '../../common/spinner';
import UserSection from './userSection';
import FaveSection from './faveSection';
import FeedSection from './feedSection';
import {
  getCollectiveFeeds,
  getMyFavesFeeds,
  getMySprfvsFeeds,
  getMySprfvsAndFavesFeeds,
  createFeedComment,
  createFeed
} from '../../../actions/mzFlashActions';

const MzFlashGroup = () => {
  const [activeTab, setActiveTab] = useState(2);
  const [activeFeedComment, setActiveFeedComment] = useState(0);
  const [comments, setComments] = useState({})

  const [showModel, setShowModel] = useState(false);

  const currentUser = useContext(UserContext);
  const dispatch = useDispatch();

  const {
    user: { favouriteUsers, faveAndSprfvsUsers, sprfvsUsers },
    mzFlash: { collectiveFeeds, loading, favesFeeds, sprfvsFeeds, favesAndSprfvsFeeds }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getFaveAndSprfvsUsers());
    dispatch(getSprfvsUsers(3, 1));
    dispatch(getCollectiveFeeds());
    dispatch(getMySprfvsFeeds());
    dispatch(getMyFavesFeeds());
    dispatch(getMySprfvsAndFavesFeeds());
  }, [dispatch]);

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
    console.log(comments)
  };

  const handleActiveFeedComment = (e, feedId) => {
    e.preventDefault();
    if (feedId === activeFeedComment)
      setActiveFeedComment(0);
    else
      setActiveFeedComment(feedId);
  }

  const handleRepost = (e, feed) => {
    e.preventDefault();

    const formData = {};
    formData.feed_id = feed.id;
    formData.feed = feed.feed;

    dispatch(createFeed(formData));
  };

  return (
    <section className="mz-flash-group">
      {loading && <Spinner />}
      <div className="row">
        <UserSection
          activeTab={activeTab}
          favouriteUsers={favouriteUsers}
          sprfvsUsers={sprfvsUsers}
          faveAndSprfvsUsers={faveAndSprfvsUsers}
        />
        <FaveSection
          sprfvsFeeds={sprfvsFeeds}
          favesFeeds={favesFeeds}
          favesAndSprfvsFeeds={favesAndSprfvsFeeds}
          activeTab={activeTab}
          onTabChange={tab => setActiveTab(tab)}
          activeFeedComment={activeFeedComment}
          onActiveFeedComment={handleActiveFeedComment}
          onCommentChange={handleCommentChange}
          comments={comments}
          onPostComment={handleEnter}
          onRepost={handleRepost}
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
        />
      </div>
    </section >
  );
};

export default MzFlashGroup;
