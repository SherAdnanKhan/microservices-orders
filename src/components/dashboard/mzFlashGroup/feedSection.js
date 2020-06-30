import React, { useState, useRef } from 'react';
import Avatar from '../../common/avatar';
import Input from '../../common/input';
import { useDispatch } from 'react-redux';
import { createFeed, getCollectiveFeeds } from '../../../actions/mzFlashActions';
import { Link } from 'react-router-dom';
import Stroke from '../../common/stroke';

const FeedSection = ({
  collectiveFeeds, onModelChange, showModel,
  currentUser, onCommentChange, onActiveFeedComment,
  activeFeedComment, comments, onPostComment, onRepost,
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
            <video controls>
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        }
        {showModel &&
          <div className="add-img-vid-box">
            <i
              className="fa fa-times close-add-box"
              onClick={() => onModelChange(false)}
            />
            <label>
              <img alt="" src="/assets/images/plus.png" />
              Add Image
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
            <label>
              <img alt="" src="/assets/images/plus.png" />
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
                  : <> <p className="usernames">
                    <Link to={`/dashboard/studio/${feed.user.slug}`}>
                      {feed.user.username}
                    </Link> has reposted this feed
                  </p>
                  </>
                }
              </div>
            }
            <div className="col-12 cube-top">
              <Link to={`/dashboard/studio/${feed.user.slug}`}>
                <Avatar
                  avatars={feed.user.avatars}
                  feelColor={feed.feel_color}
                />
              </Link>
              <span>Monday may 2014</span>
            </div>
            <div className="col-12">
              <span className="usernames">
                <Link to={`/dashboard/studio/${feed.user.slug}`}>
                  {feed.user.username}
                </Link>
              </span>
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
                <div className="video">
                  <video controls>
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
                  <Avatar
                    avatars={feed.parent.user.avatars}
                    feelColor={feed.parent.user.feel_color}
                  />
                </div>
                <div className="user-name-parent">
                  <p className="user-name usernames">
                    <Link to={`/dashboard/studio/${feed.parent.user.slug}`}>
                      {feed.parent.user.username}
                    </Link>
                  </p>
                </div>
                <p className="submit-text">{feed.feed} </p>
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
                  onStroke={() => onStroke(feed.id)}
                  onUnstroke={() => onUnstroke(feed.id)}
                />
                <div className="strk-counter">
                  {feed.stroke_users_count}
                </div>
              </div>
              <div className="actions-repost">
                <button
                  className="repost"
                  onClick={e => onRepost(e, feed)}
                >
                  Repost
                </button>
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
              onKeyUp={e => onPostComment(e, feed.id, `feed${feed.id}`)}
            />
          </div>
        ))}
    </div>
  );
};

export default FeedSection;
