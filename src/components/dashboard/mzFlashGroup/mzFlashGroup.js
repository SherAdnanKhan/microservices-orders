import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites, getFaveAndSprfvsUsers, getSprfvsUsers } from '../../../actions/userActions';
import UserContext from '../../../context/userContext';


import {
  getCollectiveFeeds,
  getMyFavesFeeds,
  getMySprfvsFeeds,
  getMySprfvsAndFavesFeeds,
  createFeedComment
} from '../../../actions/mzFlashActions';
import Spinner from '../../common/spinner';
import UserSection from './userSection';
import FaveSection from './faveSection';
import FeedSection from './feedSection';

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

  const handleEnter = (e, feedId) => {
    if (e.keyCode === 13 && comments[feedId]) {
      const commentData = {
        feed_id: feedId,
        comment: comments[feedId]
      };
      dispatch(createFeedComment(commentData));
      setComments({ ...comments, [feedId]: '' });
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
  }

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
        />
      </div>
    </section >
  );
};

export default MzFlashGroup;
