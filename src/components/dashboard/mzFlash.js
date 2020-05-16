import React from "react"
import { useSelector, useDispatch } from "react-redux"
import ProfileCube from '../common/profileCube';
import { makeUserFav } from "../../actions/userActions";

const MzFlash = () => {
  const dispatch = useDispatch();
  const {
    studio: { userStudio }
  } = useSelector(state => state);

  function handleFave(){
    dispatch(makeUserFav())
  }

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
              ? (<button className="fav-btn" onClick={() => handleFave(userStudio.user.id)}>UNFAVE</button>) 
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