import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';
import { updateBio, updateUsername, updateArt } from '../../../actions/studioActions';
import { useDispatch } from 'react-redux';
import ToolTip from '../../common/toolTip/toolTip';
import InputAutoComplete from "../../common/autoComplete";
import { artSearch, clearArtSearch } from "../../../actions/exibitionAction";
import { useSelector } from "react-redux";

const ViewProfile = ({ myStudio, feelColor }) => {
  const [bio, setBio] = useState('');
  const [username, setUserName] = useState('');
  const [artName, setArtName] = useState('');
  const [artId, setArtId] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (myStudio && myStudio.user.bio) {
      setBio(myStudio.user.bio);
    }
    if (myStudio && myStudio.user.username) {
      setUserName(myStudio.user.username);
    }
    if (myStudio && myStudio?.user?.art?.name) {
      setArtName(myStudio.user.art.name);
    }
    if (myStudio && myStudio?.user?.art?.id) {
      setArtId(myStudio.user.art.id);
    }
    return () => {
      dispatch(clearArtSearch());
    }
  }, [dispatch, myStudio]);

  const listCategory = useSelector(({ exibition }) => exibition?.ListOfArts?.data?.arts);

  const updateUserName = () => {
    let object = {
      username: username
    }
    dispatch(updateUsername(object))
  }
  const updateUserArt = () => {
    const data = {
      art_id: artId
    }
    dispatch(updateArt(data));
  }
  const changeBio = () => {
    let my_bio = bio.replace(/\n/g, '<br/>');
    let object = {
      bio: my_bio
    }
    dispatch(updateBio(object));
  }
  const handleAutoChange = (value) => {
    dispatch(artSearch(value));
  }
  const handleAutoSelect = (option) => {
    setArtId(option.id);
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
          <form onSubmit={e => e.preventDefault()}>
            <div className="profilebioname" >
              <input type="text" name="name" value={username} onChange={(event) => setUserName(event.target.value)} ></input>
              <div className="editTool Edit">
                <img
                  src="/assets/images/paintbrush.png"
                  alt=""
                  data-for="editName"
                  data-tip="edit name"
                  onClick={updateUserName}
                />
                <ToolTip id="editName" />
              </div>
              <br />
            </div>
            <div className="profileart">
              <div
                className="editTool Edit clickable"
              >
                <img
                  src="/assets/images/paintbrush.png"
                  alt=""
                  data-for="editArt"
                  data-tip="edit art"
                  onClick={updateUserArt}
                />
                <ToolTip id="editArt" />
              </div>
              <InputAutoComplete
                options={listCategory}
                displayProperty="name"
                placeholder="Choose an art"
                defaultValue={artName}
                onChange={handleAutoChange}
                onSelect={handleAutoSelect}
              />
            </div>
            <label htmlFor="addbio" className="addbio-input">
              <div
                className="editTool Edit clickable"
              >
                <img
                  src="/assets/images/paintbrush.png"
                  alt=""
                  data-for="editBio"
                  data-tip="edit bio"
                  onClick={changeBio}
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
