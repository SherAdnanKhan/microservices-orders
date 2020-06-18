import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';
import { toast } from 'react-toastify';

const StudioDetail = ({ userStudio, slug }) => {
  const history = useHistory();

  const hasAllowedStro = slug => {
    if (userStudio) {
      const found = userStudio.other_privacy.find(privacy => privacy.privacy_page === 'Stro');
      return (found && found.is_allowed === 1)
        ? history.push(`/dashboard/chat/${slug}`)
        : toast('You are not allowed to view this');
    }
  };

  const hasAllowedMzflash = slug => {
    if (userStudio) {
      const found = userStudio.other_privacy.find(privacy => privacy.privacy_page === 'Mzflash');
      return (found && found.is_allowed === 1)
        ? history.push(`/dashboard/mz-flash/${slug}`)
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

  const hasAllowedFaves = () => {
    if (userStudio) {
      const found = userStudio.other_privacy.find(privacy => privacy.privacy_page === 'Faves');
      return (found && found.is_allowed === 1)
        ? history.push('/dashboard/studio/fave')
        : toast('You are not allowed to view this');
    }
  };

  const hasAllowedFavedBy = () => {
    if (userStudio) {
      const found = userStudio.other_privacy.find(privacy => privacy.privacy_page === 'Faved By');
      return (found && found.is_allowed === 1)
        ? history.push('/dashboard/studio/fave-by')
        : toast('You are not allowed to view this');
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="studio-Screen">
          <div className="studio-Head">
            <div>
              <img
                className="clickable"
                src="/assets/images/strqicon.png" alt=""
                onClick={() => hasAllowedStro(userStudio && userStudio.user.slug)}
              />
            </div>
            {userStudio &&
              <div className="procu">
                <ProfileCube avatars={userStudio.user.avatars} />
              </div>
            }
            <div>
              <Link to="#" onClick={e => {
                e.preventDefault();
                hasAllowedMzflash(slug)
              }}>
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
          <form onSubmit={e => e.preventDefault()}>
            {hasAllowedBio() &&
              <label htmlFor="addbio" className="addbio-input">
                <span className="labelText"> user bio</span>
                <input
                  type="text"
                  name="username"
                  id="addbio"
                  value={userStudio && userStudio.user.bio ? userStudio.user.bio : ''}
                  disabled
                />
              </label>
            }
            <div className="stuion-faved-btn">
              <Link to="#" onClick={e => {
                e.preventDefault();
                hasAllowedFavedBy();
              }}>
                <div className="faved-by-btn">
                  <img src="/assets/images/favers.png" alt="" />
                  Faved by
                </div>
                {userStudio && <span>{userStudio.fav_by_count}</span>}
              </Link>
              <Link to="#" onClick={e => {
                e.preventDefault();
                hasAllowedFaves();
              }}>
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
      <div className="studio-editstudio-btn">
        <div style={{ height: '40px' }}></div>
      </div>
    </>
  );
};

export default StudioDetail;
