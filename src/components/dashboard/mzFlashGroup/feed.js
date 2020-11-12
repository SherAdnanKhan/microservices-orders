import React from 'react';
import { Link } from 'react-router-dom';
import { completeFormattedDate, formatTime } from '../../../utils/helperFunctions';
import Avatar from '../../common/avatar';
import Stroke from '../../common/stroke';
import ToolTip from '../../common/toolTip/toolTip';

const Feed = ({ feed, onStroke, onUnstroke, activeFeedComment, onActiveFeedComment, currentUser, onRepost, children }) => {
  return (
    <div className="sub-box row set-sources">
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
            user={feed.user}
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
      {feed.feed_type === 1 &&
        feed.image &&
        <div className="imgvideo-mzflash">
          <a href={feed.image.path} target="_blank" rel="noopener noreferrer">
            <img
              src={feed?.image?.path}
              alt=""
            />
          </a>
        </div>
      }
      {feed.feed_type === 2 &&
        feed.image &&
        <>
          <div className="imgvideo-mzflash">
            <a href={feed.image.path} target="_blank" rel="noopener noreferrer">
              Created By: {feed.user.slug}
            </a>
            <video
              style={{ width: "220px", height: "96px" }}
              controls
              src={feed?.image?.path}
              alt=""
            />
          </div>
        </>
      }

      {
        feed.parent &&
        <div className="flex-container-nested">
          <div className="action-cube">
            <Link to={`/dashboard/studio/${feed.parent.user.slug}`}>
              <Avatar
                user={feed.parent.user}
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
          <div className="imgvideo-mzflash-nested">
            {feed.parent.feed_type === 1 &&
              feed.parent.image &&
              <img
                src={feed.parent.image.path}
                alt="Snow"
                className="img-css"
              />
            }
            {feed.parent.feed_type === 2 &&
              feed.parent.image &&
              // <div className="video left-space">
              <video controls>
                <source src={feed.parent.image.path} type="video/mp4" />
                <source src={feed.parent.image.path} type="video/ogg" />
                  Your browser does not support the video tag.
              </video>
              // </div>
            }
          </div>

        </div>
      }
      < div className="flex-container" >
        <div className="action">
          <span className="coment-counter">
            {feed.comments_count > 1
              ? <>{feed.comments_count} comments </>
              : <>{feed.comments_count} comment </>
            }
          </span>
          <img className="comment-img"
            alt=""
            src="/assets/images/crit1.png"
            data-for="comments"
            data-tip="comments"
          />
          <ToolTip id="comments" position="top" />
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
            onStroke={onStroke}
            onUnstroke={onUnstroke}
          />
          <ToolTip id="stroke" position="top" />
        </div>
        <div className="actions-repost" >
          <img src="/assets/images/icons/repost_icon.png"
            onClick={e => onRepost(e, feed)} alt=""
            data-tip="Repost"
            data-for="repost"
            style={{ cursor: "pointer" }}
          >
          </img>
          <ToolTip id="repost" position="top" />
        </div>
      </div>
      <div className="view-comment">
        {feed.limited_comments.length > 0 &&
          <Link
            to="#"
            onClick={onActiveFeedComment}
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
        {children && children}
      </div>
    </div>
  )
}

export default Feed;
