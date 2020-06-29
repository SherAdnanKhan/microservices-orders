import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ProfileCube from '../common/profileCube';
import { favUser, unfavUser } from "../../actions/userActions";
import { useRouteMatch } from 'react-router-dom';
import { getUserStudio } from "../../actions/studioActions";
import { getUserFeeds } from "../../actions/mzFlashActions";
import Avatar from "../common/avatar";
import { Link } from 'react-router-dom';

const MzFlash = () => {
  const dispatch = useDispatch();
  const {
    studio: { userStudio },
    mzFlash: { userFeeds }
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

  useEffect(() => {
    dispatch(getUserStudio(slug));
    dispatch(getUserFeeds(slug))
  }, [dispatch, slug]);

  useEffect(() => {
    console.log(userFeeds)
  }, [userFeeds]);

  return (
    <div className={`mz-flash-page ${userStudio && userStudio.user.feel_color}`}>
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
                  <span className="name-btn BT-2">
                    {/* <Link to="#">Button</Link> */}
                  </span>
                  <p> {feed.feed} </p>
                </div>
                <div class="imgvideo-mzflash">
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
                      {feed.stroke_users_count}
                    </div>
                  </div>
                  <div className="strk-btn">
                    <img className="strk-img" alt="" src="/assets/images/strokeiconem.png" />
                    <div className="strk-counter">
                      {feed.stroke_users_count}
                    </div>
                  </div>
                  <div className="actions-repost">
                    <button
                      className="repost"
                    >
                      Repost
                    </button>
                  </div>
                </div>
                <input
                  type="text"
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