import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';

const ViewProfile = ({ myStudio }) => {
  const history = useHistory();
  return (
    <div className="wrapper">
      <div className="edit-studioScreen">
        {myStudio &&
          <div className="procu">
            <div className="editTool Edit" onClick={() => history.push('/dashboard/my-studio/profile')}>
              <img src="/assets/images/paintbrush.png" alt="" className="clickable" />
            </div>
            <ProfileCube avatars={myStudio.user.avatars} />
          </div>
        }
        <div className="profilebioname">
          <div className="editTool Edit">
            <img src="/assets/images/paintbrush.png" alt="" />
          </div>
          {myStudio && <span className="nameof" id="nameof">{myStudio.user.username}</span>}
          <br />
          <span className="artof" id="artof">Cosplay/1213</span>
        </div>
        <form method="post" action="login.php">
          <label htmlFor="addbio" className="addbio-input">
            <div className="editTool Edit">
              <img src="/assets/images/paintbrush.png" alt="" />
            </div>
            <span className="labelText">Click edit Studio to add a bio.</span>
            <input type="text" name="username" id="addbio" />
          </label>
          <div className="faved-btn">
            <Link to="#">
              <div className="faved-by-btn">
                <img src="/assets/images/favers.png" alt="" />
                  Faved by
              </div>
              {myStudio && <span>{myStudio.fav_by_count}</span>}
            </Link>
            <Link to="#">
              <div className="faved-by-btn">
                <img src="/assets/images/faving.png" alt="" />
                Faved
              </div>
              {myStudio && <span>{myStudio.favs_count}</span>}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewProfile;
