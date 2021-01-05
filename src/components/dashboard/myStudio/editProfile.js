import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';
import ToolTip from "../../common/toolTip/toolTip";
import { convertDateIntoAge } from "../../../utils/helperFunctions"
import numeral from 'numeral';

const EditProfile = ({ myStudio, feelColor }) => {
  return (
    <div className="wrapper">
      <div className="studioScreen">
        <div className="studioHead">
          <div className="procu">
            {myStudio && <ProfileCube avatars={myStudio.user.avatars} feelColor={feelColor} />}
          </div>
          {/* Fave Action Own Studio Starts Here */}
          <div className="faves-action">
            <div className="sprfvs-section">
              <div className="sprfvs-image">
                <img src="/assets/images/catfaveon.png" alt="Sprfvs here" />
              </div>
              <div className="sprfvs-users">$7.03</div>
            </div>

            <div className="sprfvs-section">
              <div className="sprfvs-image">
                <img src="/assets/images/catfaveon.png" alt="Sprfvs here" />
              </div>
              <div className="sprfvs-users">{numeral(myStudio?.fav_by_count).format('0,a')}</div>
            </div>

            <div className="sprfvs-section">
              <div className="sprfvs-image">
                <img src="/assets/images/sprfvs_full.png" className="fave" alt="faves here" />
              </div>
              <div className="sprfvs-users">16</div>
            </div>

            <div className="sprfvs-section">
              <div className="sprfvs-image">
                <img src="/assets/images/catfaveon.png" alt="Sprfvs here" />
              </div>
              <div className="sprfvs-users">{numeral(myStudio?.favs_count).format('0,a')}</div>
            </div>

            <div className="sprfvs-section">
              <div className="sprfvs-image">
                <span>POST</span>
              </div>
              <div className="sprfvs-users">{numeral(myStudio?.user?.posts_count).format('0,a')}</div>
            </div>
          </div>
          {/* Fave Action Own Studio Ends Here */}
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
            {myStudio?.user?.dob &&
              <label htmlFor="add-dob" className="add-dob-input">
                <span className="labelText"></span>
                <div className="dobSection">
                  <p className="dob">Date of birth: {myStudio.user.dob}</p>
                  <p className="age">Age: {myStudio && convertDateIntoAge(myStudio.user.dob)}
                  </p>
                </div>
              </label>
            }
            {myStudio?.user?.bio &&
              <label htmlFor="addbio" className="addbio-input">
                <span className="labelText"></span>
                <div> {myStudio && myStudio.user.bio ? myStudio.user.bio.replace(/<br\s*\/?>/g, '\n') : ''} </div>
              </label>
            }

            <div className="faved-btn">
              {/* <Link to='/my-studio/fave-by'>
                <div className="faved-by-btn">
                  <img src="/assets/images/favers.png" alt="" />
                  Faved by
              </div>
                {myStudio && <span>{myStudio.fav_by_count}</span>}
              </Link> */}
              <Link to={`/my-studio/fave-galleries/${myStudio?.user?.id}`}>
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
              {/* <Link to="/my-studio/fave">
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
