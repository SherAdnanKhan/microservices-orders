import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';
import { updateBio, updateUsername, updateArt } from '../../../actions/studioActions';
import { useDispatch } from 'react-redux';
import ToolTip from '../../common/toolTip/toolTip';
import InputAutoComplete from "../../common/autoComplete";
import { artSearch, clearArtSearch } from "../../../actions/exibitionAction";
import { useSelector } from "react-redux";
import { isEmpty } from '../../../utils/helperFunctions';

const ViewProfile = ({ myStudio, feelColor }) => {
  const listCategory = useSelector(({ exibition }) => exibition?.ListOfArts?.data?.arts);
  const [bio, setBio] = useState('');
  const [username, setUserName] = useState('');
  const [artName, setArtName] = useState('');
  const [artId, setArtId] = useState('');
  const [error, setError] = useState({ username: "", artName: "", bio: "" });
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
  useEffect(() => {
    if (!isEmpty(listCategory) && listCategory.length === 1) {
      setArtId(listCategory[0].id)
    }
    else if (isEmpty(listCategory) && !isEmpty(artName)) {
      setArtId("");
    }
  }, [listCategory, artName])

  const updateUserName = () => {
    let object = {
      username: username
    }
    if (!isEmpty(username)) {
      setError({ ...error, username: "" })
      dispatch(updateUsername(object))
    }
    else {
      setError({ ...error, username: "username cannot be empty" })
    }
  }
  const updateUserArt = () => {
    const data = {
      art_id: artId
    }
    if (isEmpty(artName)) {
      dispatch(clearArtSearch())
      setError({ artName: "Art cannot be empty" })
    } else if (!isEmpty(artName) && isEmpty(artId)) {
      dispatch(clearArtSearch())
      setError({ artName: "Please select a valid Art Name" });
    } else if (!isEmpty(artName) && !isEmpty(artId)) {
      setError({ artName: "" })
      dispatch(updateArt(data));
    }
  }
  const changeBio = () => {
    let my_bio = bio.replace(/\n/g, '<br/>');
    let object = {
      bio: my_bio
    }
    if (!isEmpty(bio)) {
      setError({ error, bio: "" })
      dispatch(updateBio(object));
    }
    else {
      setError({ ...error, bio: "bio cannot be empty" })
    }
  }
  const changeHandler = (event) => {
    if (event.target.name === "bio") {
      setBio(event.target.value)
    }
    else {
      setUserName(event.target.value)
    }
    !isEmpty(event.target.value) &&
      setError({ ...error, [event.target.name]: "" })
  }
  const handleAutoChange = (value) => {
    setArtName(value)
    if (value) {
      dispatch(artSearch(value));
      setError({ ...error, artName: "" })
    }
    else {
      setError({ ...error, artName: "please select valid art" })
    }
  }
  const handleAutoSelect = (option) => {
    if (option && option.id) {
      setArtId(option.id);
      setArtName(option.name);
    }
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
              <input type="text" name="username" value={username} onChange={changeHandler}></input>
              {
                error?.username?.length > 0 &&
                <p>{error?.username}</p>
              }
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
              {
                error?.artName?.length > 0 &&
                <p>{error?.artName}</p>
              }
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
                  name="bio"
                  id="addbio"
                  value={bio}
                  onChange={changeHandler}
                />
                {
                  error?.bio?.length > 0 &&
                  <p>{error?.bio}</p>
                }
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
