import React, { useContext } from 'react';
import Avatar from '../../common/avatar';
import { Link } from 'react-router-dom';
import Stroke from '../../common/stroke';
import UserContext from '../../../context/userContext';
import { completeFormattedDate, formatTime } from '../../../utils/helperFunctions';
import ToolTip from '../../common/toolTip/toolTip';

const FaveSection = ({
  sprfvsFeeds, favesFeeds, favesAndSprfvsFeeds, userFeeds,
  activeTab, activeUser, onTabChange, onCommentChange,
  activeFeedComment, onActiveFeedComment, onPostComment, onPostModal,
  comments, onRepost, onStroke, onUnstroke, myFeeds, activeUserList
}) => {

  const currentUser = useContext(UserContext);

  return (
    <div className="col-6 box-2 tab">
      <div className="row">
        <div
          className={`col-3 hide-mobile fav-tab-1 ${activeTab === 1 && 'active'}`}
          onClick={() => onTabChange(1)}
          data-for="favSuperFavTab"
          data-tip="sprfvs and fvs"
        >
          <button className="tablinks">
            {((activeUser && activeUserList !== 1) || !activeUser) &&
              <div className='artcubecase white'>
                <div className="procusmallmove">
                  <div className='scenesmall white'>
                    <div className="cubesmallmove">
                      <div className="cube-facesmall  cube-face-frontsmall">
                        <img alt="" src="/assets/images/sprfvs_empty.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall">
                        <img alt="" src="/assets/images/sprfvs_empty.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall">
                        <img alt="" src="/assets/images/sprfvs_empty.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall">
                        <img alt="" src="/assets/images/sprfvs_empty.png" height="100%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {activeUser && activeUserList === 1 &&
              <Avatar
                user={activeUser}
              />
            }
          </button>
          <ToolTip id="favSuperFavTab" />
        </div>
        <div
          className={`col-3 mobile-view fav-tab-2 ${activeTab === 2 && 'active'}`}
          onClick={() => onTabChange(2)}
          data-tip="SuperFav users Tab"
          data-for="sprfvs"
        >
          <button className="tablinks">
            {((activeUser && activeUserList !== 2) || !activeUser) &&
              <div className='artcubecase white'>
                <div className="procusmallmove">
                  <div className='scenesmall white'>
                    <div className="cubesmallmove">
                      <div className="cube-facesmall  cube-face-frontsmall">
                        <img alt="" src="/assets/images/fave_gallery_empty.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall">
                        <img alt="" src="/assets/images/fave_gallery_empty.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall">
                        <img alt="" src="/assets/images/fave_gallery_empty.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall">
                        <img alt="" src="/assets/images/fave_gallery_empty.png" height="100%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {activeUser && activeUserList === 2 &&
              <Avatar
                user={activeUser}
              />
            }
          </button>
          <ToolTip position="top" id="superFavTab" />
        </div>
        <div
          className={`col-3 mobile-view fav-tab-3 ${activeTab === 3 && 'active'}`}
          onClick={(e) => {
            e.preventDefault();
            onTabChange(3)
          }}
          data-for="favouriteTab"
          data-tip="faves"
        >
          <button className="tablinks">
            {((activeUser && activeUserList !== 3) || !activeUser) &&
              <div className='artcubecase white'>
                <div className="procusmallmove">
                  <div className='scenesmall white'>
                    <div className="cubesmallmove">
                      <div className="cube-facesmall  cube-face-frontsmall">
                        <img alt="" src="/assets/images/logowhite.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall">
                        <img alt="" src="/assets/images/logowhite.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall">
                        <img alt="" src="/assets/images/logowhite.png" height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall">
                        <img alt="" src="/assets/images/logowhite.png" height="100%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {activeUser && activeUserList === 3 &&
              <Avatar
                user={activeUser}
              />
            }
          </button>
          <ToolTip id="favouriteTab" />
        </div>
        <div
          className={`col-3 mobile-view fav-tab-4 ${activeTab === 4 && 'active'}`}
          onClick={() => onTabChange(4)}
          data-for="myTab"
          data-tip="My feeds"
        >
          <button className="tablinks">
            <Avatar
              user={currentUser}
            />
          </button>
          <ToolTip id="myTab" />
        </div>
      </div>
      <div className="box-container">
        {activeTab === 1 &&
          <>
            {sprfvsFeeds &&
              sprfvsFeeds.data.map((feed, index) => (
                <div
                  className="sub-box tabcontent"
                  id="tab1"
                  key={index}
                >
                  <div className="row">
                    {feed.parent &&
                      <div className="reposted-text usernames">
                        {feed.user.username} has reposted this feed
                      </div>
                    }
                    <div className="col-12 cube-fave">
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
                      <p className="submit-text">{feed.feed} </p>
                      {feed.feed_type === 1 &&
                        feed.image &&
                        <Link target="_blank"
                          to={{
                            pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                            query: { postUrl: feed?.image?.path, postType: feed?.feed_type }
                          }}>
                          <img
                            src={feed.image.path}
                            alt="Snow"
                            className="img-css-fave"
                          />
                        </Link>
                      }
                      {feed.feed_type === 2 &&
                        feed.image &&
                        <div className="video left-space">
                          <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                            <source src={feed.image.path} type="video/mp4" />
                            <source src={feed.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                          </video>
                        </div>
                      }
                    </div>
                  </div>
                  {feed.parent &&
                    <div className="flex-container-nested">
                      <div className="col-12 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
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
                      <div className="col-12 user-name-parent">
                        <p className="usernames">{feed.parent.user.username}</p>
                        <p className="submit-text"> {feed.parent.feed}</p>
                        {feed.parent.feed_type === 1 &&
                          feed.parent.image &&
                          <Link target="_blank"
                            to={{
                              pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                              query: {
                                postUrl: feed?.image?.path,
                                postType: feed?.feed_type
                              }
                            }}>
                            <img
                              src={feed.parent.image.path}
                              alt="Snow"
                              className="img-css-fave"

                            />
                          </Link>
                        }
                        {feed.parent.feed_type === 2 &&
                          feed.parent.image &&
                          <div className="video left-space">
                            <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                              <source src={feed.parent.image.path} type="video/mp4" />
                              <source src={feed.parent.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        }
                      </div>
                    </div>
                  }
                  <div className="flex-container">
                    <div className="action">
                      <div className="coment-counter">
                        {feed.comments_count > 1
                          ? <> {feed.comments_count} comments </>
                          : <> {feed.comments_count} comment </>
                        }
                      </div>
                      <img className="comment-img" alt="" src="/assets/images/crit1.png" data-for="comments" data-tip="comments" />
                      <ToolTip id="comments" />
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
                      <ToolTip id="stroke" />
                    </div>

                    <div className="actions-repost">
                      <img src="/assets/images/icons/repost_icon.png"
                        onClick={e => onRepost(e, feed)} alt=""
                        data-for="repost"
                        data-tip="respost"
                      >
                      </img>
                      <ToolTip id="repost" />
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
                        {feed.limited_comments.map((comment, index) => (
                          <p key={index}> {comment.comment} </p>
                        ))}
                      </>
                    }
                  </div>
                  <input
                    type="text"
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                  />
                </div>
              ))}
          </>
        }
        {activeTab === 2 &&
          <>
            {favesFeeds &&
              favesFeeds.data.map((feed, index) => (
                <div
                  className="sub-box tabcontent"
                  id="tab2"
                  key={index}
                >
                  <div className="row">
                    {feed.parent &&
                      <div className="reposted-text usernames">
                        {feed.user.username} has reposted this feed
                      </div>
                    }
                    <div className="col-12 cube-fave">
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
                      <p className="submit-text">{feed.feed} </p>
                      {feed.feed_type === 1 &&
                        feed.image &&
                        <Link
                          target="_blank"
                          to={{
                            pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                            query: {
                              postUrl: feed?.image?.path,
                              postType: feed?.feed_type
                            }
                          }}>
                          <img
                            src={feed.image.path}
                            alt="Snow"
                            className="img-css-fave"
                          />
                        </Link>
                      }
                      {feed.feed_type === 2 &&
                        feed.image &&
                        <div className="video left-space">
                          <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                            <source src={feed.image.path} type="video/mp4" />
                            <source src={feed.image.path} type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      }
                    </div>
                  </div>
                  {feed.parent &&
                    <div className="flex-container-nested">
                      <div className="col-12 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
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
                      <div className="col-12 user-name-parent">
                        <p className="usernames">{feed.parent.user.username}</p>
                        <p className="submit-text">{feed.parent.feed} </p>
                        {feed.parent.feed_type === 1 &&
                          feed.parent.image &&
                          <Link
                            target="_blank"
                            to={{
                              pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                              query: {
                                postUrl: feed?.image?.path,
                                postType: feed?.feed_type
                              }
                            }}>
                            <img
                              src={feed?.parent?.image?.path}
                              alt="Snow"
                              className="img-css-fave"
                            />
                          </Link>
                        }
                        {feed.parent.feed_type === 2 &&
                          feed.parent.image &&
                          <div className="video left-space">
                            <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                              <source src={feed.parent.image.path} type="video/mp4" />
                              <source src={feed.parent.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        }
                      </div>
                    </div>
                  }
                  <div className="flex-container">
                    <div className="action">
                      <span className="coment-counter">
                        {feed.comments_count > 1
                          ? <> {feed.comments_count} comments </>
                          : <> {feed.comments_count} comment </>
                        }
                      </span>
                      <img className="comment-img" alt="" src="/assets/images/crit1.png" data-for="comments" data-tip="comments" />
                      <ToolTip id="comments" />
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
                      <ToolTip id="stroke" />
                    </div>
                    <div className="actions-repost"  >
                      <img src="/assets/images/icons/repost_icon.png"
                        onClick={e => onRepost(e, feed)} alt=""
                        data-for="repost"
                        data-tipst="Repost"
                      >
                      </img>
                      <ToolTip id="repost" />
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
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                  />
                </div>
              ))}
          </>
        }
        {activeTab === 3 &&
          <>
            {favesAndSprfvsFeeds &&
              favesAndSprfvsFeeds.data.map((feed, index) => (
                <div
                  className="sub-box tabcontent"
                  id="tab3"
                  key={index}
                >
                  <div className="row">
                    {feed.parent &&
                      <div className="reposted-text usernames">
                        {feed.user.username} has reposted this feed
                      </div>
                    }
                    <div className="col-12 cube-fave">
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
                      <p className="submit-text"> {feed.feed}</p>
                      {feed.feed_type === 1 &&
                        feed.image &&
                        <Link
                          target="_blank"
                          to={{
                            pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                            query: {
                              postUrl: feed?.image?.path,
                              postType: feed?.feed_type
                            }
                          }}>
                          <img
                            src={feed.image.path}
                            alt="Snow"
                            className="img-css-fave"
                          />
                        </Link>
                      }
                      {feed.feed_type === 2 &&
                        feed.image &&
                        <div className="video left-space">
                          <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                            <source src={feed.image.path} type="video/mp4" />
                            <source src={feed.image.path} type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      }
                    </div>
                  </div>
                  {feed.parent &&
                    <div className="flex-container-nested">
                      <div className="col-12 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
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
                      <div className="col-12 user-name-parent">
                        <p className="usernames">{feed.parent.user.username}</p>
                        <p className="submit-text">{feed.parent.feed} </p>
                        {feed.parent.feed_type === 1 &&
                          feed.parent.image &&
                          <Link
                            target="_blank"
                            to={{
                              pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                              query: {
                                postUrl: feed?.image?.path,
                                postType: feed?.feed_type
                              }
                            }}>
                            <img
                              src={feed.parent.image.path}
                              alt="Snow"
                              className="img-css-fave"
                            />
                          </Link>
                        }
                        {feed.parent.feed_type === 2 &&
                          feed.parent.image &&
                          <div className="video left-space" >
                            <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                              <source src={feed.parent.image.path} type="video/mp4" />
                              <source src={feed.parent.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        }
                      </div>
                    </div>
                  }
                  <div className="flex-container">
                    <div className="action">
                      <span className="coment-counter">
                        {feed.comments_count > 1
                          ? <> {feed.comments_count} comments </>
                          : <> {feed.comments_count} comment </>
                        }
                      </span>
                      <img className="comment-img" alt="" src="/assets/images/crit1.png" data-for="comments" data-tip="comments" />
                      <ToolTip id="comments" />
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
                      <ToolTip id="stroke" />
                    </div>
                    <div className="actions-repost">
                      <img src="/assets/images/icons/repost_icon.png"
                        onClick={e => onRepost(e, feed)} alt=""
                        data-for="repost"
                        data-tip="repost"
                      >
                      </img>
                      <ToolTip id="repost" />
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
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                  />
                </div>
              ))}
          </>
        }

        {activeTab === 4 &&
          <>
            {myFeeds && myFeeds.data &&
              myFeeds.data.map((feed, index) => (
                <div
                  className="sub-box tabcontent"
                  id="tab3"
                  key={index}
                >
                  <div className="row">
                    {feed.parent &&
                      <div className="reposted-text">
                        {feed.user.username} has reposted this feed
                      </div>
                    }
                    <div className="col-12 cube-fave">
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
                      <span className="usernames"> {feed.user.username}</span>
                      <p className="submit-text">{feed.feed} </p>
                      {feed.feed_type === 1 &&
                        feed.image &&
                        <Link
                          target="_blank"
                          to={{
                            pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                            query: {
                              postUrl: feed?.image?.path,
                              postType: feed?.feed_type
                            }
                          }}
                        >
                          <img
                            src={feed.image.path}
                            alt="Snow"
                            className="img-css-fave"
                          />
                        </Link>
                      }
                      {feed.feed_type === 2 &&
                        feed.image &&
                        <div className="video left-space">
                          <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                            <source src={feed.image.path} type="video/mp4" />
                            <source src={feed.image.path} type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      }
                    </div>
                  </div>
                  {feed.parent &&
                    <div className="flex-container-nested">
                      <div className="col-12 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
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
                      <div className="col-12 user-name-parent">
                        <p className="usernames">{feed.parent.user.username}</p>
                        <p className="submit-text"> {feed.parent.feed}</p>
                        {feed.parent.feed_type === 1 &&
                          feed.parent.image &&
                          <Link
                            target="_blank"
                            to={{
                              pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                              query: {
                                postUrl: feed?.image?.path,
                                postType: feed?.feed_type
                              }
                            }}>
                            <img
                              src={feed.parent.image.path}
                              alt="Snow"
                              className="img-css-fave"
                            />
                          </Link>
                        }
                        {feed.parent.feed_type === 2 &&
                          feed.parent.image &&
                          <div className="video left-space">
                            <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                              <source src={feed.parent.image.path} type="video/mp4" />
                              <source src={feed.parent.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        }
                      </div>
                    </div>
                  }
                  <div className="flex-container">
                    <div className="action">
                      <span className="coment-counter">
                        {feed.comments_count > 1
                          ? <> {feed.comments_count} comments </>
                          : <> {feed.comments_count} comment </>
                        }
                      </span>
                      <img className="comment-img" alt="" src="/assets/images/crit1.png" data-for="comments" data-tip="comments" />
                      <ToolTip id="comments" />
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
                      <ToolTip id="stroke" />
                    </div>
                    <div className="actions-repost">
                      <img src="/assets/images/icons/repost_icon.png"
                        onClick={e => onRepost(e, feed)} alt=""
                        data-for="repost"
                        data-tip="repost"
                      >
                      </img>
                      <ToolTip id="repost" />
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
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                  />
                </div>
              ))}
          </>
        }

        {activeTab === 0 &&
          <>
            {userFeeds &&
              userFeeds.data.map((feed, index) => (
                <div
                  className="sub-box tabcontent"
                  id="tab3"
                  key={index}
                >
                  <div className="row">
                    {feed.parent &&
                      <div className="reposted-text">
                        {feed.user.username} has reposted this feed
                      </div>
                    }
                    <div className="col-12 cube-fave">
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
                      <span className='usernames'>
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                      </span>
                      <p className="submit-text">{feed.feed} </p>
                      {feed.feed_type === 1 &&
                        feed.image &&
                        <Link
                          target="_blank"
                          to={{
                            pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                            query: {
                              postUrl: feed?.image?.path,
                              postType: feed?.feed_type
                            }
                          }}>
                          <img
                            src={feed?.image?.path}
                            alt="Snow"
                            className="img-css-fave"
                          />
                        </Link>
                      }
                      {feed.feed_type === 2 &&
                        feed.image &&
                        <div className="video left-space">
                          <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                            <source src={feed.image.path} type="video/mp4" />
                            <source src={feed.image.path} type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      }
                    </div>
                  </div>
                  {feed.parent &&
                    <div className="flex-container-nested">
                      <div className="col-12 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
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
                      <div className="col-12 user-name-parent">
                        <p className="usernames">{feed.parent.user.username}</p>
                        <p className="submit-text"> {feed.parent.feed}</p>
                        {feed.parent.feed_type === 1 &&
                          feed.parent.image &&
                          <Link
                            target="_blank"
                            to={{
                              pathname: `/dashboard/post/${feed?.user?.slug}?image=${feed?.image?.path}`,
                              query: {
                                postUrl: feed?.image?.path,
                                postType: feed?.feed_type
                              }
                            }}>
                            <img
                              src={feed.parent.image.path}
                              alt="Snow"
                              className="img-css-fave"
                            />
                          </Link>
                        }
                        {feed.parent.feed_type === 2 &&
                          feed.parent.image &&
                          <div className="video left-space">
                            <video onClick={() => onPostModal(true, feed.feed_type, feed.image)}>
                              <source src={feed.parent.image.path} type="video/mp4" />
                              <source src={feed.parent.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        }
                      </div>
                    </div>
                  }
                  <div className="flex-container">
                    <div className="action">
                      <span className="coment-counter">
                        {feed.comments_count > 1
                          ? <> {feed.comments_count} comments </>
                          : <> {feed.comments_count} comment </>
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
                        style={{ paddingLeft: "5px" }}
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
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                  />
                </div>
              ))}
          </>
        }

      </div>
    </div >
  );
};

export default FaveSection;
