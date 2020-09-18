import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';
import ToolTip from "../../common/toolTip/toolTip";

const EditProfile = ({ myStudio, feelColor }) => {
  return (
    <div className="wrapper">
      <div className="studioScreen">
        <div className="studioHead">
          <div className="procu">
            {myStudio && <ProfileCube avatars={myStudio.user.avatars} feelColor={feelColor} />}
          </div>
        </div>
        <div className="studioDetail">
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
          <form>
            <label htmlFor="addbio" className="addbio-input">
              <span className="labelText"></span>
              <div> {myStudio && myStudio.user.bio ? myStudio.user.bio.replace(/<br\s*\/?>/g, '\n') : ''} </div>
            </label>
            <div className="faved-btn">
              {/* <Link to='/dashboard/my-studio/fave-by'>
                <div className="faved-by-btn">
                  <img src="/assets/images/favers.png" alt="" />
                  Faved by
              </div>
                {myStudio && <span>{myStudio.fav_by_count}</span>}
              </Link> */}
              <Link to={`/dashboard/my-studio/fave-galleries/${myStudio?.user?.id}`}>
                <div
                  className="faved-by-btn"
                  style={{ backgroundColor: feelColor }}
                >
                  <img
                    src="/assets/images/fave_icon.png"
                    alt=""
                    data-for="favedGalleries"
                    data-tip="Faved Galleries"
                  />
                    Faves

                  <ToolTip id="favedGalleries" />
                </div>
              </Link>
              {/* <Link to="/dashboard/my-studio/fave">
                <div className="faved-by-btn">
                  <img src="/assets/images/faving.png" alt="" />
                  Faved
              </div>
                {myStudio && <span>{myStudio.favs_count}</span>}
              </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
