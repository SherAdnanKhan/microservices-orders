import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ProfileCube from '../common/profileCube';
import { favUser, unfavUser } from "../../actions/userActions";
import { useRouteMatch } from 'react-router-dom';
import { getUserStudio } from "../../actions/studioActions";
import { getUserFeeds } from "../../actions/mzFlashActions";
import Avatar from "../common/avatar";

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
  }, [dispatch, slug]);

  useEffect(() => {
    if (userStudio) {
      dispatch(getUserFeeds(userStudio.user.id))
    }
  }, [userStudio, dispatch]);

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
          userFeeds.map((feed, index) => (
            <div className="col-4 box-3" key={index}>
              <div className="sub-box row">
                <div className="col-3">
                  <Avatar
                    avatars={feed.user.avatars}
                    feelColor={feed.user.feel_color}
                  />
                </div>
                <div className="col-7">
                  <span>Name: {feed.user.username}</span>
                  <span className="name-btn BT-2">
                    {/* <Link to="#">Button</Link> */}
                  </span>
                  <p> {feed.feed} </p>
                </div>
              </div>
            </div>
          ))}
      </>
    </div>
  )

}
export default MzFlash;