import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';
import { toast } from 'react-toastify';
import ToolTip from "../../common/toolTip/toolTip";
import { convertDateIntoAge } from '../../../utils/helperFunctions';

const StudioDetail = ({ userStudio, slug }) => {
  const history = useHistory();

  const hasAllowedMzflash = slug => {
    if (userStudio) {
      const found = userStudio.other_privacy.find(privacy => privacy.privacy_page === 'Mzflash');
      return (found && found.is_allowed === 1)
        ? history.push(`/mz-flash/${slug}`)
        : toast('You are not allowed to view this');
    }
  };

  const hasAllowedBio = () => {
    if (userStudio) {
      const found = userStudio.other_privacy.find(privacy => privacy.privacy_page === 'Bio');
      return (found && found.is_allowed === 1) ? true : false;
    }
    return false;
  };

  // const hasAllowedFaves = () => {
  //   if (userStudio) {
  //     const found = userStudio.other_privacy.find(privacy => privacy.privacy_page === 'Faves');
  //     return (found && found.is_allowed === 1)
  //       ? history.push('/studio/fave')
  //       : toast('You are not allowed to view this');
  //   }
  // };

  // const hasAllowedFavedBy = () => {
  //   if (userStudio) {
  //     const found = userStudio.other_privacy.find(privacy => privacy.privacy_page === 'Faved By');
  //     return (found && found.is_allowed === 1)
  //       ? history.push('/studio/fave-by')
  //       : toast('You are not allowed to view this');
  //   }
  // };

  return (
    <>
      <div className="wrapper">
        <div className="studio-Screen">
          <div className="studio-Head">

            {userStudio &&
              <div className="procu">
                <ProfileCube avatars={userStudio.user.avatars} feelColor={userStudio?.user.feel.color_code} />
              </div>
            }

            {/* Fave Action Starts Here */}
            <div className="faves-action">
              <div className="sprfvs-section">
                <div className="sprfvs-image">
                  <img src="/assets/images/sprfvs_full.png" alt="Sprfvs here" />
                  <span>SPRFVS</span>
                </div>
                <div className="sprfvs-users">{userStudio?.sprfvs_count}</div>
              </div>

              <div className="sprfvs-section">
                <div className="sprfvs-image">
                  <img src="/assets/images/catfaveon.png" className="fave" alt="faves here" />
                  <span>FAVES</span>
                </div>
                <div className="sprfvs-users">{userStudio?.fav_by_count}</div>
              </div>

              <div className="sprfvs-section">
                <div className="sprfvs-image">
                  <img src="/assets/images/fave_icon.png" className="fave" alt="faving here" />
                  <span>FAVING</span>
                </div>
                <div className="sprfvs-users">{userStudio?.favs_count}</div>
              </div>

              <div className="sprfvs-section">
                <div className="sprfvs-image">
                  {/* <img src="/assets/images/sprfvs_empty.png" alt="Sprfvs here" /> */}
                  <span>POST</span>
                </div>
                <div className="sprfvs-users">{userStudio?.user?.posts_count}</div>
              </div>
            </div>
            {/* Fave Action Starts Here */}

          </div>
          <div className="studioDetail">
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
                {/* <div className="dob-studio">DOB: 1193-05-27</div>
                <div className="dob-studio">Age: 27</div> */}
              </div>
            }
            <form onSubmit={e => e.preventDefault()}>
              {userStudio?.user?.dob &&
                <label htmlFor="add-dob" className="add-dob-input">
                  <span className="labelText"></span>
                  <div>
                    <p className="dob">Date of birth: {userStudio.user.dob}</p>
                    <p className="age">Age: {userStudio && convertDateIntoAge(userStudio.user.dob)}
                    </p>
                  </div>
                </label>
              }
              {hasAllowedBio() &&
                <label htmlFor="addbio" className="addbio-input">
                  <span className="labelText"> </span>
                  <div
                    type="text"
                    name="username"
                    id="addbio"
                    value={userStudio && userStudio.user.bio ? userStudio.user.bio : ''}
                    disabled
                  >  {userStudio && userStudio.user.bio ? userStudio.user.bio.replace(/<br\s*\/?>/g, '\n') : ''}
                  </div>
                </label>
              }

              <div className="stuion-faved-btn">
                <Link to={`/studio/fave-galleries/${userStudio?.user?.id}`} className="faves">
                  <div
                    className="faved-by-btn faves"
                    style={{ backgroundColor: userStudio?.user?.feel?.color_code }}
                  >
                    <img src="/assets/images/fave_icon.png" alt="" data-for="userFavedGalleries" data-tip="faved galleries" />
                  Faves
                  <ToolTip position="bottom" id="userFavedGalleries" />
                  </div>
                </Link>
                <Link to={`/studio/sprfvs/${userStudio?.user?.slug}`} className="sprfaves">
                  <div
                    className="faved-by-btn"
                    style={{ backgroundColor: userStudio?.user?.feel?.color_code }}
                  >
                    <img src="/assets/images/sprfvs_full.png" alt="" data-for="userFavedGalleries" data-tip="faved galleries" />
                    <ToolTip position="bottom" id="userFavedGalleries" />
                  </div>
                  Sprfve
                </Link>
                <div>
                  <Link to={`/chat/${slug}`}>
                    <img
                      className="clickable"
                      src="/assets/images/strqicon.png" alt=""
                      style={{ backgroundColor: userStudio?.user.feel.color_code }}
                      data-for="chatUser"
                      data-tip="strq"
                    />
                    <span className="strqText"> Strq</span>
                  </Link>

                  <ToolTip position="bottom" id="chatUser" />

                </div>
                {/* <Link to="#" onClick={e => {
                e.preventDefault();
                hasAllowedFavedBy();
              }}>
                <div className="faved-by-btn">
                  <img src="/assets/images/favers.png" alt="" />
                  Faved by
                </div>
                {userStudio && <span>{userStudio.fav_by_count}</span>}
              </Link> */}

                <div>
                  <Link to="#" onClick={e => {
                    e.preventDefault();
                    hasAllowedMzflash(slug)
                  }}>
                    <img
                      className="mzflash-studio"
                      src="/assets/images/mzflash.png"
                      alt=""
                      style={{ backgroundColor: userStudio?.user.feel.color_code }}
                      data-for="userMzflash"
                      data-tip="mzflash"
                    />
                    <ToolTip position="bottom" id="userMzflash" />
                    <span className="strqText">Mzflash</span>
                  </Link>
                </div>
                {/* <Link to="#" onClick={e => {
                e.preventDefault();
                hasAllowedFaves();
              }}>
                <div className="faved-by-btn">
                  <img src="/assets/images/faving.png" alt="" />
                Faved
                </div>
                {userStudio && <span>{userStudio.favs_count}</span>}
              </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="studio-editstudio-btn"
        style={{ backgroundColor: userStudio?.user.feel.color_code }}
      >
        <div style={{ height: '40px' }}></div>
      </div>
    </>
  );
};

export default StudioDetail;
