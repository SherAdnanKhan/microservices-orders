import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';

const StudioDetail = ({ userStudio, slug }) => {
  return (
    <>
      <div className="wrapper">
        <div className="studioScreen">
          <div className="studioHead">
            <div>
              <img src="/assets/images/strqicon.png" alt="" />
            </div>
            {userStudio &&
              <div className="procu">
                <ProfileCube avatars={userStudio.user.avatars} />
              </div>
            }
            <div>
              <Link to={`/dashboard/mz-flash/${slug}`}>
                <img src="/assets/images/mzflash.png" alt="" />
              </Link>
            </div>
          </div>
          {userStudio &&
            <div className="profilebioname">
              <span className="nameof" id="nameof"> {userStudio.user.username}</span>
              <br />
              <span className="artof" id="artof">
                {userStudio.user.art &&
                  <>
                    {userStudio.user.art.parent && userStudio.user.art.parent.name + '/'}
                    {userStudio.user.art.name && userStudio.user.art.name}
                  </>
                }
              </span>
            </div>
          }
          <form>
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
                {userStudio && <span>{userStudio.fav_by_count}</span>}
              </Link>
              <Link to="/dashboard/faving">
                <div className="faved-by-btn">
                  <img src="/assets/images/faving.png" alt="" />
                Faved
              </div>
                {userStudio && <span>{userStudio.favs_count}</span>}
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="editstudio-btn">
        <div style={{ height: '40px' }}></div>
      </div>
    </>
  );
};

export default StudioDetail;
