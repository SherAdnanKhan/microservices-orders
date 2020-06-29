import React, { useContext } from 'react';
import Avatar from '../../common/avatar';
import { Link } from 'react-router-dom';
import Stroke from '../../common/stroke';
import UserContext from '../../../context/userContext';

const FaveSection = ({
  sprfvsFeeds, favesFeeds, favesAndSprfvsFeeds, userFeeds,
  activeTab, activeUser, onTabChange, onCommentChange,
  activeFeedComment, onActiveFeedComment, onPostComment,
  comments, onRepost, onStroke, onUnstroke, myFeeds, activeUserList
}) => {

  const currentUser = useContext(UserContext);
  console.log(activeUser)
  return (
    <div className="col-6 box-2 tab">
      <div className="row">
        <div
          className={`col-4 ${activeTab === 1 && 'active'}`}
          onClick={() => onTabChange(1)}
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
                avatars={activeUser.avatars}
                feelColor={activeUser.feel_color}
              />
            }
          </button>
        </div>
        <div
          className={`col-4 ${activeTab === 2 && 'active'}`}
          onClick={() => onTabChange(2)}
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
                avatars={activeUser.avatars}
                feelColor={activeUser.feel_color}
              />
            }
          </button>
        </div>
        <div
          className={`col-4 ${activeTab === 3 && 'active'}`}
          onClick={() => onTabChange(3)}
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
                avatars={activeUser.avatars}
                feelColor={activeUser.feel_color}
              />
            }
          </button>
        </div>
        <div
          className={`col-4 ${activeTab === 4 && 'active'}`}
          onClick={() => onTabChange(4)}
        >
          <button className="tablinks">
            <Avatar
              avatars={currentUser.avatars}
              feelColor={currentUser.feel_color}
            />
          </button>
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
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                        has reposted this feed
                      </div>
                    }
                    <div className="col-2">
                      <Link to={`/dashboard/studio/${feed.user.slug}`}>
                        <Avatar
                          avatars={feed.user.avatars}
                          feelColor={feed.feel_color}
                        />
                      </Link>
                    </div>
                    <div className="col-7">
                      <span className="usernames">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                      </span>
                      <p> {feed.feed}</p>
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
                        <div className="video left-space">
                          <video controls>
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
                      <div className="col-2 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          <Avatar
                            avatars={feed.parent.user.avatars}
                            feelColor={feed.parent.user.feel_color}
                          />
                        </Link>
                      </div>
                      <div className="col-7 user-name-parent">
                        <p>{feed.parent.user.username}</p>
                        <img className="img-css" alt="" src="/assets/images/crit1.png" />
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
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`)}
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
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                        has reposted this feed
                      </div>
                    }
                    <div className="col-2">
                      <Link to={`/dashboard/studio/${feed.user.slug}`}>
                        <Avatar
                          avatars={feed.user.avatars}
                          feelColor={feed.feel_color}
                        />
                      </Link>
                    </div>
                    <div className="col-7">
                      <span className="usernames">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                      </span>
                      <p> {feed.feed} </p>
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
                        <div className="video left-space">
                          <video controls>
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
                      <div className="col-2 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          <Avatar
                            avatars={feed.parent.user.avatars}
                            feelColor={feed.parent.user.feel_color}
                          />
                        </Link>
                      </div>
                      <div className="col-7 user-name-parent">
                        <p>{feed.parent.user.username}</p>
                        <img className="img-css" alt="" src="/assets/images/crit1.png" />
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
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`)}
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
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                        has reposted this feed
                      </div>
                    }
                    <div className="col-2">
                      <Link to={`/dashboard/studio/${feed.user.slug}`}>
                        <Avatar
                          avatars={feed.user.avatars}
                          feelColor={feed.feel_color}
                        />
                      </Link>
                    </div>
                    <div className="col-7">
                      <span className="usernames">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                      </span>
                      <p>{feed.feed} </p>
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
                        <div className="video left-space">
                          <video controls>
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
                      <div className="col-2 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          <Avatar
                            avatars={feed.parent.user.avatars}
                            feelColor={feed.parent.user.feel_color}
                          />
                        </Link>
                      </div>
                      <div className="col-7 user-name-parent">
                        <p>{feed.parent.user.username}</p>
                        <img className="img-css" alt="" src="/assets/images/crit1.png" />
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
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`)}
                  />
                </div>
              ))}
          </>
        }

        {activeTab === 4 &&
          <>
            {myFeeds &&
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
                    <div className="col-2">
                      <Link to={`/dashboard/studio/${feed.user.slug}`}>
                        <Avatar
                          avatars={feed.user.avatars}
                          feelColor={feed.feel_color}
                        />
                      </Link>
                    </div>
                    <div className="col-7">
                      <span> {feed.user.username}</span>
                      <p>{feed.feed} </p>
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
                        <div className="video left-space">
                          <video controls>
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
                      <div className="col-2 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          <Avatar
                            avatars={feed.parent.user.avatars}
                            feelColor={feed.parent.user.feel_color}
                          />
                        </Link>
                      </div>
                      <div className="col-7 user-name-parent">
                        <p>{feed.parent.user.username}</p>
                        <img className="img-css" alt="" src="/assets/images/crit1.png" />
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
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`)}
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
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                        has reposted this feed
                      </div>
                    }
                    <div className="col-2">
                      <Link to={`/dashboard/studio/${feed.user.slug}`}>
                        <Avatar
                          avatars={feed.user.avatars}
                          feelColor={feed.feel_color}
                        />
                      </Link>
                    </div>
                    <div className="col-7">
                      <span className='usernames'>
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          {feed.user.username}
                        </Link>
                      </span>
                      <p>{feed.feed} </p>
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
                        <div className="video left-space">
                          <video controls>
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
                      <div className="col-2 action-cube">
                        <Link to={`/dashboard/studio/${feed.user.slug}`}>
                          <Avatar
                            avatars={feed.parent.user.avatars}
                            feelColor={feed.parent.user.feel_color}
                          />
                        </Link>
                      </div>
                      <div className="col-7 user-name-parent">
                        <p>{feed.parent.user.username}</p>
                        <img className="img-css" alt="" src="/assets/images/crit1.png" />
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
                    id={`fav${feed.id}`}
                    name={`fav${feed.id}`}
                    value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                    placeholder="Enter a Comment..."
                    onChange={onCommentChange}
                    onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`)}
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
