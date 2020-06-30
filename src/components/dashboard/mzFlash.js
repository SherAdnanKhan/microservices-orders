import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import ProfileCube from '../common/profileCube';
import Stroke from '../common/stroke';
import Avatar from "../common/avatar";
import { favUser, unfavUser } from "../../actions/userActions";
import { useRouteMatch } from 'react-router-dom';
import { getUserStudio } from "../../actions/studioActions";
import { getUserFeeds, unstrokeFeed, strokeFeed, createFeedComment, createFeed } from "../../actions/mzFlashActions";
import Spinner from "../common/spinner";

const MzFlash = () => {
  const [comments, setComments] = useState({});
  const [activeComments, setActiveComments] = useState('');

  const dispatch = useDispatch();
  const {
    studio: { userStudio },
    mzFlash: { userFeeds, loading }
  } = useSelector(state => state);

  const { params: { slug } } = useRouteMatch();

  function handleFave(e, id) {
    e.preventDefault();
    dispatch(favUser(id))
  }

  function handleUnFave(e, id) {
    e.preventDefault();
    dispatch(unfavUser(id))
  }

  const handleStroke = id => {
    const data = {
      feed_id: id
    };
    dispatch(strokeFeed(data));
  };

  const handleUnstroke = id => {
    const data = {
      feed_id: id
    };
    dispatch(unstrokeFeed(data));
  };

  const handleCommentChange = ({ target: input }) => {
    setComments({ ...comments, [input.name]: input.value });
  };

  const handleActiveComments = (e, feedId) => {
    e.preventDefault();

    if (feedId === activeComments) {
      setActiveComments('');
    } else {
      setActiveComments(feedId);
    }
  };

  const handlePostComment = (e, feedId) => {
    if (e.keyCode === 13 && comments[feedId]) {
      const commentData = {
        feed_id: feedId,
        comment: comments[feedId]
      };

      dispatch(createFeedComment(commentData));
      setComments({ ...comments, [feedId]: '' });
    }
  };

  const handleRepost = (e, feed) => {
    e.preventDefault();

    const formData = {};
    formData.feed_id = feed.id;
    dispatch(createFeed(formData));
  };

  useEffect(() => {
    dispatch(getUserStudio(slug));
    dispatch(getUserFeeds(slug))
  }, [dispatch, slug]);

  return (
    <div className={`mz-flash-page ${userStudio && userStudio.user.feel_color}`}>
      {loading && <Spinner />}
      <>
        <div className="mz-flash-head">
          {userStudio &&
            <div className="fav-amount">
              <p>Amount Faves {userStudio.fav_by_count}</p>
              <p>Amount Faving {userStudio.favs_count}</p>
            </div>
          }
          <div className="fav-cub">
            {userStudio &&
              <div className="procu">
                <ProfileCube avatars={userStudio?.user?.avatars} />
              </div>
            }
          </div>
          <div className="fav-btn-div">
            {userStudio && userStudio.has_faved &&
              <button className="fav-btn clickable" onClick={(e) => handleUnFave(e, userStudio.user.id)}>FAVING</button>
            }
            {userStudio && !userStudio.has_faved &&
              <button className="fav-btn clickable" onClick={(e) => handleFave(e, userStudio.user.id)}>FAVE</button>
            }
          </div>
        </div>

        <div className="fav-bar">
          <h3>MZ FLASH</h3>
        </div>

        {userFeeds &&
          userFeeds.data.map((feed, index) => (
            <div className="box-3" key={index}>
              <div className="sub-box row">
                {feed.parent &&
                  <div className="reposted-text">
                    {feed.parent.user.username} has reposted this feed
                  </div>
                }
                <div className="col-1">
                  <Avatar
                    avatars={feed.user.avatars}
                    feelColor={feed.user.feel_color}
                  />
                </div>
                <div className="col-7">
                  <span className="usernames">Name:
                    <Link to={`/dashboard/studio/${feed.user.slug}`} >
                      {feed.user.username}
                    </Link>
                  </span>
                  <p> {feed.feed} </p>
                </div>
                <div className="imgvideo-mzflash">
                  {feed.feed_type === 1 &&
                    feed.image &&
                    <img
                      src={feed.image.path}
                      alt="Snow"
                      className="img-css"
                    />
                  }
                  {feed.feed_type === 2 &&
                    feed.image &&
                    <video controls>
                      <source src={feed.image.path} type="video/mp4" />
                      <source src={feed.image.path} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  }
                </div>
                {feed.parent &&
                  <div className="flex-container-nested">
                    <div className="action-cube">
                      <Avatar
                        avatars={feed.parent.user.avatars}
                        feelColor={feed.parent.user.feel_color}
                      />
                    </div>
                    <div className="user-name-parent">
                      <p className="user-name">{feed.parent.user.username}</p>
                    </div>
                  </div>
                }
                <div className="flex-container">
                  <div className="action">
                    <img className="comment-img" alt="" src="/assets/images/crit1.png" />
                    <div className="coment-counter">
                      {feed.comments_count}
                    </div>
                  </div>
                  <div className="strk-btn">
                    <Stroke
                      hasStroke={feed.has_stroke_count}
                      className="strk-img"
                      onStroke={() => handleStroke(feed.id)}
                      onUnstroke={() => handleUnstroke(feed.id)}
                    />
                    {/* <img className="strk-img" alt="" src="/assets/images/strokeiconem.png" /> */}
                    <div className="strk-counter">
                      {feed.stroke_users_count}
                    </div>
                  </div>
                  <div className="actions-repost">
                    <button
                      className="repost"
                      onClick={e => handleRepost(e, feed)}
                    >
                      Repost
                    </button>
                  </div>
                </div>
                <div className="view-comment">
                  {feed.limited_comments.length > 0 &&
                    <Link
                      to="#"
                      onClick={(e) => handleActiveComments(e, feed.id)}
                    >
                      View Comments
                    </Link>
                  }
                  {activeComments === feed.id &&
                    <>
                      {feed?.limited_comments?.map((comment, index) => (
                        <p key={index}> {comment.comment} </p>
                      ))}
                    </>
                  }
                </div>
                <input
                  type="text"
                  name={feed.id}
                  value={comments[feed.id] ? comments[feed.id] : ''}
                  onChange={handleCommentChange}
                  onKeyUp={e => handlePostComment(e, feed.id)}
                  placeholder="Enter a Comment..."
                />
              </div>
            </div>
          ))}
      </>
    </div>
  )

}
export default MzFlash;