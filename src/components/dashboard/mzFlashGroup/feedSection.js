import React, { useState } from 'react';
import Input from '../../common/input';
import { useDispatch, useSelector } from 'react-redux';
import { createFeed } from '../../../actions/mzFlashActions';
import ToolTip from "../../common/toolTip/toolTip";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fileUpload } from '../../../actions/genericActions';
import ProgressBar from '../../common/progressBar';
import Feed from './feed';

const FeedSection = ({
  collectiveFeeds, onModelChange, showModel,
  currentUser, onCommentChange, onActiveFeedComment,
  activeFeedComment, comments, onPostComment, onRepost,
  onStroke, onUnstroke, onCallNextFeeds, feedLoader, nextPageUrl, currentPage
}) => {

  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const showError = true;
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    feed: '',
    doc_name: '',
    doc_path: '',
    doc_type: ''
  });

  const [progress, setProgress] = useState(0);
  const { feelColor } = useSelector(state => state.feelColor);

  const handleChange = ({ target: input }) => {
    if (input.type === 'file') {
      const fileData = new FormData();
      fileData.append('file_upload', input.files[0]);

      dispatch(
        fileUpload(fileData,
          updatedProgress => {
            setProgress(updatedProgress)
          },
          result => {
            setProgress(0);
            if (result.doc_type === 'image') {
              setImageUrl(result.path);
              setVideoUrl('');
            } else {
              setImageUrl('');
              setVideoUrl(result.path);
            }
            setData({ ...data, doc_name: result.doc_name, doc_path: result.path, doc_type: result.doc_type });
          },
          err => {
            setProgress(0)
          }
        )
      );
      onModelChange(false);

    } else {
      setData({ ...data, [input.name]: input.value });
      setCharCount(input.value.length);
    }
  };

  const validate = () => {
    let error = '';

    if (!data.feed) {
      error = 'Feed cannot be empty';
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const error = validate();

    if (!error) {
      dispatch(createFeed(data));
      setData({ ...data, feed: '', doc_name: '', doc_path: '', doc_type: '' });
      setImageUrl('');
      setVideoUrl('');
      setCharCount(0);
    }
    setError(error);
  };

  const fetchData = () => {
    onCallNextFeeds();
  }

  return (
    <InfiniteScroll
      dataLength={collectiveFeeds?.data?.length}
      next={fetchData}
      height="85vh"
      style={{ border: "2px solid #C3C3C3" }}
      hasMore={nextPageUrl ? true : false}
    >
      <div
        className="col-4 box-3"
      >
        <div className="message-input">
          <form className="form-inline" onSubmit={handleSubmit}>
            <i
              className="fa fa-plus"
              aria-hidden="true"
              onClick={() => onModelChange(true)}
              data-for="addPost"
              data-tip="upload post"
            >
            </i>
            <ToolTip id="addPost" />
            <Input
              type="text"
              id="feed"
              name="feed"
              value={data.feed}
              maxLength={200}
              onChange={handleChange}
              error={error}
              showError={false}
            />
            <br />
            <input className="clickable btn-send" type="submit" defaultValue="Submit" />
          </form>
          {progress > 0 &&
            <ProgressBar
              progress={progress}
              feelColor={feelColor}
            />
          }
          {showError && error && (
            <div className="error">
              {error}
            </div>
          )}
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
          collectiveFeeds?.data?.map((feed, index) => (
            // <div className="sub-box row set-sources" key={index}>
            //   {feed.parent &&
            //     <div className="reposted-text">
            //       {feed.user.id === currentUser.id
            //         ? <> You have reposted this feed </>
            //         : <> {feed.user.username} has reposted this feed  </>
            //       }
            //     </div>
            //   }
            //   <div className="col-12 cube-top">
            //     <Link to={`/dashboard/studio/${feed.user.slug}`}>
            //       <Avatar
            //         user={feed.user}
            //       />
            //     </Link>
            //     <span className="date-time">
            //       {completeFormattedDate(feed.created_at)}
            //     </span>
            //   </div>
            //   <div className="time">
            //     {formatTime(feed.created_at)}
            //   </div>
            //   <div className="col-12">
            //     <span className="usernames">
            //       <Link to={`/dashboard/studio/${feed.user.slug}`}>
            //         {feed.user.username}
            //       </Link>
            //     </span>
            //   </div>
            //   <p className="submit-text">{feed.feed} </p>
            //   <div className="imgvideo-mzflash">
            //     {feed.feed_type === 1 &&
            //       feed.image &&
            //       <a href={feed.image.path} target="_blank" rel="noopener noreferrer">
            //         <img
            //           src={feed?.image?.path}
            //           alt=""
            //         />
            //       </a>
            //     }
            //     {feed.feed_type === 2 &&
            //       feed.image &&
            //       <>
            //         <a href={feed.image.path} target="_blank" rel="noopener noreferrer">
            //           Created By: {feed.user.slug}
            //         </a>
            //         <video
            //           style={{ width: "220px", height: "103px" }}
            //           controls
            //           src={feed?.image?.path}
            //           alt=""
            //         />
            //       </>
            //     }
            //   </div>
            //   {
            //     feed.parent &&
            //     <div className="flex-container-nested">
            //       <div className="action-cube">
            //         <Link to={`/dashboard/studio/${feed.parent.user.slug}`}>
            //           <Avatar
            //             user={feed.parent.user}
            //           />
            //         </Link>
            //         <span className="date-time">
            //           {completeFormattedDate(feed.parent.created_at)}
            //         </span>
            //       </div>
            //       <div className="time">
            //         {formatTime(feed.parent.created_at)}
            //       </div>
            //       <div className="user-name-parent">
            //         <p className="user-name usernames">
            //           <Link to={`/dashboard/studio/${feed.parent.user.slug}`}>
            //             {feed.parent.user.username}
            //           </Link>
            //         </p>
            //       </div>
            //       <p className="submit-text">{feed.parent.feed} </p>
            //       <div className="imgvideo-mzflash">
            //         {feed.parent.feed_type === 1 &&
            //           feed.parent.image &&
            //           <img
            //             src={feed.parent.image.path}
            //             alt="Snow"
            //             className="img-css"
            //           />

            //         }
            //       </div>

            //       {feed.parent.feed_type === 2 &&
            //         feed.parent.image &&
            //         <div className="video left-space">
            //           <video controls>
            //             <source src={feed.parent.image.path} type="video/mp4" />
            //             <source src={feed.parent.image.path} type="video/ogg" />
            //           Your browser does not support the video tag.
            //         </video>
            //         </div>
            //       }
            //     </div>
            //   }
            //   < div className="flex-container" >
            //     <div className="action">
            //       <span className="coment-counter">
            //         {feed.comments_count > 1
            //           ? <>{feed.comments_count} comments </>
            //           : <>{feed.comments_count} comment </>
            //         }
            //       </span>
            //       <img className="comment-img"
            //         alt=""
            //         src="/assets/images/crit1.png"
            //         data-for="comments"
            //         data-tip="comments"
            //       />
            //       <ToolTip id="comments" position="top" />
            //     </div>
            //     <div className="strk-btn">
            //       <span className="strk-counter">
            //         {feed.stroke_users_count > 1
            //           ? <> {feed.stroke_users_count} strokes </>
            //           : <> {feed.stroke_users_count} stroke </>
            //         }
            //       </span>
            //       <Stroke
            //         hasStroke={feed.has_stroke_count}
            //         className="strk-img"
            //         onStroke={() => onStroke(feed.id, feed.user)}
            //         onUnstroke={() => onUnstroke(feed.id, feed.user)}

            //       />
            //       <ToolTip id="stroke" position="top" />
            //     </div>
            //     <div className="actions-repost" >
            //       <img src="/assets/images/icons/repost_icon.png"
            //         onClick={e => onRepost(e, feed)} alt=""
            //         data-tip="Repost"
            //         data-for="repost"
            //         style={{ cursor: "pointer" }}
            //       >
            //       </img>
            //       <ToolTip id="repost" position="top" />
            //     </div>
            //   </div>
            //   <div className="view-comment">
            //     {feed.limited_comments.length > 0 &&
            //       <Link
            //         to="#"
            //         onClick={e => onActiveFeedComment(e, feed.id)}
            //       >
            //         View Comments
            //     </Link>
            //     }
            //     {activeFeedComment === feed.id &&
            //       <>
            //         {feed?.limited_comments?.map((comment, index) => (
            //           <p key={index}> {comment.comment} </p>
            //         ))}
            //       </>
            //     }
            //   </div>
            //   <input
            //     type="text"
            //     id={`feed${feed.id}`}
            //     name={`feed${feed.id}`}
            //     value={comments[`feed${feed.id}`] ? comments[`feed${feed.id}`] : ''}
            //     placeholder="Enter a Comment..."
            //     onChange={onCommentChange}
            //     onKeyUp={e => onPostComment(e, feed.id, `feed${feed.id}`, feed.user)}
            //   />
            // </div >
            <Feed
              key={feed.id}
              feed={feed}
              onStroke={() => onStroke(feed.id, feed.user)}
              onUnstroke={() => onUnstroke(feed.id, feed.user)}
              activeFeedComment={activeFeedComment}
              onActiveFeedComment={e => onActiveFeedComment(e, feed.id)}
              onRepost={e => onRepost(e, feed)}
              currentUser={currentUser}
            >
              <input
                type="text"
                id={`feed${feed.id}`}
                name={`feed${feed.id}`}
                value={comments[`feed${feed.id}`] ? comments[`feed${feed.id}`] : ''}
                placeholder="Enter a Comment..."
                onChange={onCommentChange}
                onKeyUp={e => onPostComment(e, feed.id, `feed${feed.id}`, feed.user)}
              />
            </Feed>
          ))}
      </div >
    </InfiniteScroll>
  );
};

export default FeedSection;
