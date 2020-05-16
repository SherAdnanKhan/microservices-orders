import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ProfileCube from '../common/profileCube';
import { makeUserFav, UserUnFav } from "../../actions/userActions";
import { useRouteMatch } from 'react-router-dom';
import { getUserStudio } from "../../actions/studioActions";

const MzFlash = () => {
  const dispatch = useDispatch();
  const {
    studio: { userStudio }
  } = useSelector(state => state);

  const { params: { slug } } = useRouteMatch();

  function handleFave(id){
    dispatch(getUserStudio(slug));
    dispatch(makeUserFav(id))
  }

  function handleUnFave(id){
    dispatch(getUserStudio(slug));
    dispatch(UserUnFav(id))
  }

  useEffect(() => {
    dispatch(getUserStudio(slug));
}, [dispatch,slug]);

  return (
    <div className="mz-flash-page">
      <div className="mz-flash-head">
          {  userStudio &&
             <div className="fav-amount">
                <p>Amount Faves {userStudio.fav_by_count}</p>
                <p>Amount Faving {userStudio.favs_count}</p>
             </div>
          }
        <div className="fav-cub">
          { userStudio &&
              <div className="procu">
                <ProfileCube avatars={userStudio?.user?.avatars} />
              </div>
           }
        </div>
        <div className="fav-btn-div">
          {
            userStudio && userStudio.has_faved 
              ? (<button className="fav-btn" onClick={() => handleUnFave(userStudio.user.id)}>UNFAVE</button>) 
              : <button className="fav-btn" onClick={() => handleFave(userStudio.user.id)}>FAVE</button>
          }
        </div>
      </div>
      <div className="fav-bar">
        <h3>MZ FLASH</h3>
      </div>
    </div>
  )

}
export default MzFlash;