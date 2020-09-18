import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';
import { updateBio } from '../../../actions/studioActions';
import { useDispatch } from 'react-redux';
import ToolTip from '../../common/toolTip/toolTip';

const ViewProfile = ({ myStudio, feelColor }) => {
  const [bio, setBio] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (myStudio && myStudio.user.bio) {
      setBio(bio => bio = myStudio.user.bio);
    }
  }, [myStudio]);

  const handleSave = () => {
    let my_bio = bio.replace(/\n/g, '<br/>');
    dispatch(updateBio(my_bio));
  }
  return (
    <div className="wrapper">
      <div className="edit-studioScreen">
        <div className="studioHead">
          {myStudio &&
            <div className="procu">
              <div className="editTool Edit">
                <Link to={`/dashboard/my-studio/profile`}>
                  <img
                    src="/assets/images/paintbrush.png"
                    alt=""
                    className="clickable profile-brush"
                    data-for="editProfile"
                    data-tip="edit profile"
                  />
                </Link>
                <ToolTip id="editProfile" />
              </div>
              <ProfileCube avatars={myStudio.user.avatars} feelColor={feelColor} />
            </div>
          }
        </div>
        <div className="studioDetail">
          <div className="profilebioname">
            <div className="editTool Edit">
              <img
                src="/assets/images/paintbrush.png"
                alt=""
                data-for="editName"
                data-tip="edit name"
              />
              <ToolTip id="editName" />
            </div>
            {myStudio && <span className="nameof" id="nameof">{myStudio.user.username}</span>}
            <br />
            <span className="artof" id="artof">Cosplay/1213</span>
          </div>
          <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="addbio" className="addbio-input">
              <div
                className="editTool Edit clickable"
                onClick={handleSave}>
                <img
                  src="/assets/images/paintbrush.png"
                  alt=""
                  data-for="editBio"
                  data-tip="edit bio"
                />
                <ToolTip id="editBio" />
              </div>
              <span className="labelText">Click edit Studio to add a bio.</span>
              <div>
                <textarea
                  rows="4"
                  cols="20"
                  wrap="hard"
                  type="text"
                  name="username"
                  id="addbio"
                  value={bio.replace(/<br\s*\/?>/g, '\n')}
                  onChange={e => setBio(e.target.value)}
                />
              </div>
            </label>
            <div className="faved-btn">
              {/* <Link to="#">
                <div className="faved-by-btn">
                  <img src="/assets/images/favers.png" alt="" />
                  Faved by
              </div>
                {myStudio && <span>{myStudio.fav_by_count}</span>}
              </Link> */}
              <Link to='#'>
                <div
                  className="faved-by-btn"
                  style={{ backgroundColor: feelColor }}
                >
                  <img
                    src="/assets/images/fave_icon.png"
                    alt=""
                    data-for="faves"
                    data-tip="faved galleries"
                  />
                  Faves
                  <ToolTip id="faves" />
                </div>
              </Link>
              {/* <Link to="#">
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

export default ViewProfile;
