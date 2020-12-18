import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import ProfileCube from '../common/profileCube';
import Stroke from '../common/stroke';
import Avatar from "../common/avatar";
import { favUser, unfavUser } from "../../actions/userActions";
import { useRouteMatch } from 'react-router-dom';
import { getUserStudio } from "../../actions/studioActions";
import { getUserFeeds, unstrokeFeed, strokeFeed, createFeedComment, repostFeed } from "../../actions/mzFlashActions";
import Spinner from "../common/spinner";
import { completeFormattedDate, formatTime } from "../../utils/helperFunctions";
import PostModal from "../../components/dashboard/mzFlashGroup/postModal";
import useViewPort from "../common/useViewport";
import UserCube from "../common/userCube";
const MzFlash = () => {
  const [comments, setComments] = useState({});
  const [activeComments, setActiveComments] = useState('');
  const [imagePath, setImagepath] = useState("");
  const [showPostModel, setShowPostModel] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const { width } = useViewPort();
  const breakpoint = 768;

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

  const handleStroke = (id, user) => {
    const data = {
      feed_id: id
    };
    dispatch(strokeFeed(data, user));
  };

  const handleUnstroke = (id, user) => {
    const data = {
      feed_id: id
    };
    dispatch(unstrokeFeed(data, user));
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

  const handlePostComment = (e, feedId, user) => {
    if (e.keyCode === 13 && comments[feedId]) {
      const commentData = {
        feed_id: feedId,
        comment: comments[feedId]
      };

      dispatch(createFeedComment(commentData, user));
      setComments({ ...comments, [feedId]: '' });
    }
  };

  const handleRepost = (e, feed) => {
    e.preventDefault();

    const formData = {};
    formData.feed_id = feed.id;
    dispatch(repostFeed(formData, feed.user));
  };

  useEffect(() => {
    dispatch(getUserStudio(slug));
    dispatch(getUserFeeds(slug))
  }, [dispatch, slug]);

  const handlePostModal = (value, type, image) => {
    if (value === true) {
      setImagepath(image.path);
      setMediaType(type);
    }
    setShowPostModel(value);

  };
  return (
    <div className='mz-flash-page'>
      {loading && <Spinner />}
      {showPostModel &&
        <PostModal
          onPostModalClose={handlePostModal}
          imagePath={imagePath}
          mediaType={mediaType}
        />
      }
      <>
        <div className="mz-flash-head">
          {userStudio &&
            <div className="fav-amount">
              <p>Amount Faves {userStudio.fav_by_count}</p>
              <p>Amount Faving {userStudio.favs_count}</p>
            </div>
          }
          <div className="fav-cub">
            {userStudio && width > breakpoint
              ? (
                <div className="procu">
                  <ProfileCube
                    avatars={userStudio?.user?.avatars}
                    feelColor={userStudio?.user?.feel?.color_code}
                  />
                </div>
              ) : (
                <div className="feelColorCube">
                  <UserCube
                    user={userStudio?.user}
                  />
                </div>
              )
            }
          </div>
          <div className="fav-btn-div">
            {userStudio && userStudio.has_faved &&
              <button
                className="fav-btn clickable"
                onClick={(e) => handleUnFave(e, userStudio?.user?.id)}
                style={{ backgroundColor: userStudio?.user?.feel?.color_code }}
              >
                FAVING
              </button>
            }
            {userStudio && !userStudio.has_faved &&
              <button className="fav-btn clickable" style={{ backgroundColor: userStudio?.user?.feel?.color_code }} onClick={(e) => handleFave(e, userStudio.user.id)}>FAVE</button>
            }
          </div>
        </div>

        <div className="fav-bar" style={{ backgroundColor: userStudio?.user?.feel?.color_code }}>
          <h3>MZ FLASH</h3>
        </div>
        {userFeeds?.data?.map((feed, index) => (
          <div className="box-3" key={index}>
            {/* Reposted box starts here */}
            <div className="sub-box row">
              {feed.parent &&
                <>
                  <div className="reposted-text">
                    {feed?.parent?.user?.username} has reposted this feed
                  </div>
                  <div>
                  </div>
                  <div className="action-cube">
                    <div>
                      <Avatar
                        user={feed.parent?.user}
                      />
                    </div>
                  </div>
                  <span className="date-time"
                    style={{ float: "right", marginTop: "-38px", marginLeft: "50px" }}
                  >
                    {completeFormattedDate(feed.parent.created_at)}
                  </span>
                  <div className="time" style={{ float: "right" }}>
                    {formatTime(feed.parent.created_at)}
                  </div>
                  <div className="user-name-parent">
                    <p className="user-name" style={{ marginLeft: "9px" }}>{feed.parent.user.username}</p>
                    <p className="submit-text">{feed.feed} </p>
                    {feed.parent.feed_type === 1 &&
                      feed.parent.image &&
                      <img
                        src={feed.parent.image.path}
                        alt="Snow"
                        className="img-css-fave"
                      />
                    }
                    {feed.parent.feed_type === 2 &&
                      feed.parent.image &&
                      <div className="video left-space">
                        <video controls>
                          <source src={feed.parent.image.path} type="video/mp4" />
                          <source src={feed.parent.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                          </video>
                      </div>
                    }
                  </div>
                </>
              }
              {/* my box starts here */}
              <div className="col-12 mz-flash-flex">
                <Avatar
                  user={feed.user}
                />
                <span className="date-time">
                  {completeFormattedDate(feed.created_at)}
                </span>
              </div>
              <div className="time">
                {formatTime(feed.created_at)}
              </div>
              <div className="col-12">
                <div className="usernames">Name:
                  <Link to={`/studio/${feed.user.slug}`} >
                    {feed.user.username}
                  </Link>
                </div>
                <p className="submit-text">{feed.feed} </p>
              </div>
              <div className="imgvideo-mzflash">
                {feed.feed_type === 1 &&
                  feed.image &&
                  <Link target="_blank" to={{ pathname: `/post/${feed.user.slug}?image=${feed.image.path}`, query: { postUrl: feed.image.path, postType: feed.feed_type } }}>
                    <img
                      src={feed.image.path}
                      alt="Snow"
                      className="img-css"
                    // onClick={()=>handlePostModal(true,feed.feed_type,feed.image)}
                    />
                  </Link>
                }
                {feed.feed_type === 2 &&
                  feed.image &&
                  <video
                  // onClick={()=>handlePostModal(true,feed.feed_type,feed.image)}
                  >
                    <source src={feed.image.path} type="video/mp4" />
                    <source src={feed.image.path} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                }
              </div>
              <div className="flex-container-nested">
              </div>
              <div className="flex-container">
                <div className="action">
                  <span className="coment-counter">
                    {feed.comments_count}
                  </span>
                  <img className="comment-img" alt="" src="/assets/images/crit1.png" />
                </div>
                <div className="strk-btn">
                  <span className="strk-counter">
                    {feed.stroke_users_count}
                  </span>
                  <Stroke
                    hasStroke={feed.has_stroke_count}
                    className="strk-img"
                    onStroke={() => handleStroke(feed.id, feed.user)}
                    onUnstroke={() => handleUnstroke(feed.id, feed.user)}
                  />
                </div>

                <div className="actions-repost">
                  <img src="/assets/images/icons/repost_icon.png" style={{ width: "30px" }}
                    onClick={e => handleRepost(e, feed)} alt=""
                  >
                  </img>
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
                onKeyUp={e => handlePostComment(e, feed.id, feed.user)}
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