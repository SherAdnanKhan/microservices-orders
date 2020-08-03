import React, { useState, useRef } from 'react';
import Avatar from '../../common/avatar';
import Input from '../../common/input';
import { useDispatch, useSelector } from 'react-redux';
import { createFeed, getCollectiveFeeds } from '../../../actions/mzFlashActions';
import { Link } from 'react-router-dom';
import Stroke from '../../common/stroke';
import { completeFormattedDate, formatTime } from '../../../utils/helperFunctions';

const FeedSection = ({
  collectiveFeeds, onModelChange, showModel,
  currentUser, onCommentChange, onActiveFeedComment,
  activeFeedComment, comments, onPostComment, onRepost, onPostModal,
  onStroke, onUnstroke
}) => {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    feed: '',
    video: null,
    image: null
  });
  const { feelColor } = useSelector(state => state.feelColor);

  const feedRef = useRef();

  const handleChange = ({ target: input }) => {
    if (input.type === 'file') {
      onModelChange(false);
      if (input.files[0]) {
        if (input.name === 'image') {
          setData({ ...data, image: input.files[0], video: null });
          setImageUrl(URL.createObjectURL(input.files[0]));
          setVideoUrl('');
        } else if (input.name === 'video') {
          setData({ ...data, video: input.files[0], image: null });
          setVideoUrl(URL.createObjectURL(input.files[0]));
          setImageUrl('');
        }
      }
    } else {
      setData({ ...data, [input.name]: input.value });
      setCharCount(input.value.length);
    }
  };

  const validate = () => {
    let error = '';

    if (!data.feed) {
      error = 'Please enter your feed';
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const error = validate();
    const formData = new FormData();

    if (!error) {
      for (let key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }
      dispatch(createFeed(formData));
      setData({ ...data, image: null, video: null, feed: '' });
      setImageUrl('');
      setVideoUrl('');
      setCharCount(0);
    }
    setError(error);
  };

  const handleScroll = async () => {
    const scrollTop = feedRef.current.scrollTop;
    const scrollHeight = feedRef.current.scrollHeight;
    const clientHeight = feedRef.current.clientHeight;

    if (scrollHeight - clientHeight === scrollTop) {
      if (collectiveFeeds.next_page_url) {
        setCurrentPage(currentPage => currentPage + 1);
        dispatch(getCollectiveFeeds(currentPage + 1));
      }
    }
  };

  return (
    <div
      className="col-4 box-3"
      ref={ref => feedRef.current = ref}
      onScroll={handleScroll}
    >
      <div className="message-input">
        <form className="form-inline" onSubmit={handleSubmit}>
          <i
            className="fa fa-plus"
            aria-hidden="true"
            onClick={() => onModelChange(true)}
          >
          </i>
          <Input
            type="text"
            id="feed"
            name="feed"
            value={data.feed}
            maxLength={200}
            onChange={handleChange}
            error={error}
          />
          <br />
          <input className="clickable btn-send" type="submit" defaultValue="Submit" />
        </form>
        <div className="counter"> ({charCount}/200)</div>
        {imageUrl &&
          <div className="image-preview">
            <img alt="" src={imageUrl} />
          </div>
        }
        {videoUrl &&
          <div className="video-preview">
            <video >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        }
        {showModel &&
          <div className="add-img-vid-box">
            <i
              style={{ backgroundColor: feelColor }}
              className="fa fa-times close-add-box"
              onClick={() => onModelChange(false)}
            />
            <label>
              <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: feelColor }} />
              Add Image
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
            <label>
              <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: feelColor }} />
              Add Video
              <input
                type="file"
                name="video"
                accept=".mp4"
                onChange={handleChange}
              />
            </label>
          </div>
        }
      </div>
      {collectiveFeeds &&
        collectiveFeeds.data.map((feed, index) => (
          <div className=" sub-box row set-sources" key={index}>
            {feed.parent &&
              <div className="reposted-text">
                {feed.user.id === currentUser.id
                  ? <> You have reposted this feed </>
                  : <> {feed.user.username} has reposted this feed  </>
                }
              </div>
            }
            <div className="col-12 cube-top">
              <Link to={`/dashboard/studio/${feed.user.slug}`}>
                <Avatar
                  avatars={feed.user.avatars}
                  feelColor={feed.feel.color_code}
                />
              </Link>
              <span className="date-time">
                {completeFormattedDate(feed.created_at)}
              </span>
            </div>
            <div className="time">
              {formatTime(feed.created_at)}
            </div>
            <div className="col-12">
              <span className="usernames">
                <Link to={`/dashboard/studio/${feed.user.slug}`}>
                  {feed.user.username}
                </Link>
              </span>
            </div>
            <p className="submit-text">{feed.feed} </p>
            <div className="imgvideo-mzflash">
              {feed.feed_type === 1 &&
                feed.image &&
                <img
                  src={feed.image.path}
                  alt="Snow"
                  className="img-css"
                  onClick={() => onPostModal(true, feed.feed_type, feed.image)}
                />
              }
              {feed.feed_type === 2 &&
                feed.image &&
                <div className="video" >
                  <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                    <source src={feed.image.path} type="video/mp4" />
                    <source src={feed.image.path} type="video/ogg" />
                    Your browser does not support the video tag.

                  </video>
                </div>
              }
            </div>
            {feed.parent &&
              <div className="flex-container-nested">
                <div className="action-cube">
                  <Link to={`/dashboard/studio/${feed.parent.user.slug}`}>
                    <Avatar
                      avatars={feed.parent.user.avatars}
                      feelColor={feed.parent.user.feel.color_code}
                    />
                  </Link>
                  <span className="date-time">
                    {completeFormattedDate(feed.parent.created_at)}
                  </span>
                </div>
                <div className="time">
                  {formatTime(feed.parent.created_at)}
                </div>
                <div className="user-name-parent">
                  <p className="user-name usernames">
                    <Link to={`/dashboard/studio/${feed.parent.user.slug}`}>
                      {feed.parent.user.username}
                    </Link>
                  </p>
                </div>
                <p className="submit-text">{feed.parent.feed} </p>
                <div>
                  {feed.parent.feed_type === 1 &&
                    feed.parent.image &&
                    <img
                      src={feed.parent.image.path}
                      alt="Snow"
                      className="img-css"
                    />

                  }
                </div>

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
            }
            <div className="flex-container">
              <div className="action">
                <span className="coment-counter">
                  {feed.comments_count > 1
                    ? <>{feed.comments_count} comments </>
                    : <>{feed.comments_count} comment </>
                  }
                </span>
                <img className="comment-img" alt="" src="/assets/images/crit1.png" />
              </div>
              <div className="strk-btn">
                <span className="strk-counter">
                  {feed.stroke_users_count > 1
                    ? <> {feed.stroke_users_count} strokes </>
                    : <> {feed.stroke_users_count} stroke </>
                  }
                </span>
                <Stroke
                  hasStroke={feed.has_stroke_count}
                  className="strk-img"
                  onStroke={() => onStroke(feed.id, feed.user)}
                  onUnstroke={() => onUnstroke(feed.id, feed.user)}
                />
              </div>
              <div className="actions-repost"  >
                <img src="/assets/images/icons/repost_icon.png"
                  onClick={e => onRepost(e, feed)} alt=""
                >
                </img>
              </div>
            </div>
            <div className="view-comment">
              {feed.limited_comments.length > 0 &&
                <Link
                  to="#"
                  onClick={e => onActiveFeedComment(e, feed.id)}
                >
                  View Comments
                </Link>
              }
              {activeFeedComment === feed.id &&
                <>
                  {feed?.limited_comments?.map((comment, index) => (
                    <p key={index}> {comment.comment} </p>
                  ))}
                </>
              }
            </div>
            <input
              type="text"
              id={`feed${feed.id}`}
              name={`feed${feed.id}`}
              value={comments[`feed${feed.id}`] ? comments[`feed${feed.id}`] : ''}
              placeholder="Enter a Comment..."
              onChange={onCommentChange}
              onKeyUp={e => onPostComment(e, feed.id, `feed${feed.id}`, feed.user)}
            />
          </div>
        ))}
    </div>
  );
};

export default FeedSection;
