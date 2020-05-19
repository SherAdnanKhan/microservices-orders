import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';

const EditProfile = ({ myStudio }) => {
  return (
    <div className="wrapper">
      <div className="studioScreen">
        <div className="studioHead">
          <div>

          </div>
          <div className="procu">
            {myStudio && <ProfileCube avatars={myStudio.user.avatars} />}
          </div>
          <div>

          </div>
        </div>
        {myStudio &&
          <div className="profilebioname">
            <span className="nameof" id="nameof"> {myStudio.user.username} </span>
            <br />
            <span className="artof" id="artof">
              {myStudio.user.art &&
                <>
                  {myStudio.user.art.parent && myStudio.user.art.parent.name + '/'}
                  {myStudio.user.art.name}
                </>
              }
            </span>
          </div>
        }
        <form method="post" action="login.php">
          <label htmlFor="addbio" className="addbio-input">
            <span className="labelText">Click edit Studio to add a bio.</span>
            <input type="text" name="username" id="addbio" />
          </label>
          <div className="faved-btn">
            <Link to={`/dashboard/faving/${'by'}`}>
              <div className="faved-by-btn">
                <img src="/assets/images/favers.png" alt="" />
                  Faved by
                </div>
              {myStudio && <span>{myStudio.fav_by_count}</span>}
            </Link>
            <Link to="/dashboard/faving">
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

export default EditProfile;
