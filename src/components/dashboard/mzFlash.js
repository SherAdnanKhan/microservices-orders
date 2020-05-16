import React, { useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import ProfileCube from '../common/profileCube';
import { makeUserFav, UserUnFav } from "../../actions/userActions";
import { useRouteMatch } from 'react-router-dom';
import { getUserStudio } from "../../actions/studioActions";
import Spinner from '../common/spinner';

const MzFlash = () => {
  const dispatch = useDispatch();
  const {
    studio: { userStudio },
    loading: { loading }
  } = useSelector(state => state);

  const { params: { slug } } = useRouteMatch();

  function handleFave(e,id){
    e.preventDefault();
    dispatch(makeUserFav(id,slug))
  }

  function handleUnFave(e,id){
    e.preventDefault();
    dispatch(UserUnFav(id,slug))
  }

  useEffect(() => {
    dispatch(getUserStudio(slug));
}, [dispatch,slug]);

  return (
    <div className="mz-flash-page">
       {loading && <Spinner />}
       {!loading &&
       <Fragment>
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
           userStudio && userStudio.has_faved &&
             <button className="fav-btn" onClick={(e) => handleUnFave(e,userStudio.user.id)}>FAVING</button>
         }
         {
           userStudio && !userStudio.has_faved &&
            <button className="fav-btn" onClick={(e) => handleFave(e,userStudio.user.id)}>FAVE</button>
         }
       </div>
     </div>
        
        <div className="fav-bar">
          <h3>MZ FLASH</h3>
        </div>
      </Fragment>
    }
    </div>
  )

}
export default MzFlash;