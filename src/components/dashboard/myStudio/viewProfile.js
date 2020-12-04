import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProfileCube from '../../common/profileCube';
import { updateBio, updateUsername, updateArt, updateBirthDate } from '../../../actions/studioActions';
import { useDispatch } from 'react-redux';
import ToolTip from '../../common/toolTip/toolTip';
import InputAutoComplete from "../../common/autoComplete";
import { artSearch, clearArtSearch, clearChildArt, searchChildArt } from "../../../actions/exibitionAction";
import { useSelector } from "react-redux";
import { completeDate, isEmpty, validateAge } from '../../../utils/helperFunctions';
import Input from '../../common/input';

const ViewProfile = ({ myStudio, feelColor }) => {
  const listCategory = useSelector(({ exibition }) => exibition?.ListOfArts?.data?.arts);
  const { childArts } = useSelector(state => state.exibition);

  const [bio, setBio] = useState('');
  const [username, setUserName] = useState('');
  const [dob, setDob] = useState('');

  const [artId, setArtId] = useState('');
  const [childArtId, setChildArtId] = useState('');
  const [error, setError] = useState({ username: "", artName: "", bio: "", dob: "" });

  const [parentArtName, setParentArtName] = useState('');
  const [childArtName, setChildArtName] = useState('');
  const [hasChildren, setHasChildren] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
  }, [error])

  useEffect(() => {
    if (myStudio && myStudio.user.bio) {
      setBio(myStudio.user.bio);
    }
    if (myStudio && myStudio.user.username) {
      setUserName(myStudio.user.username);
    }
    if (myStudio && myStudio.user.dob) {
      setDob(myStudio.user.dob);
    }
    if (myStudio && myStudio?.user?.art) {

      if (myStudio?.user?.art?.parent) {
        setParentArtName(myStudio?.user?.art?.parent.name);
        setArtId(myStudio?.user?.art?.parent?.id);
        setChildArtId(myStudio?.user?.art?.id)
        setChildArtName(myStudio?.user?.art?.name);
        setHasChildren(true);

      } else {
        setParentArtName(myStudio?.user?.art?.name)
        setArtId(myStudio?.user?.art?.id);
      }
    }
    return () => {
      dispatch(clearArtSearch());
      dispatch(clearChildArt());
    }
  }, [dispatch, myStudio]);


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
  const updateDateOfBirth = () => {
    let object = {
      dob: dob
    }
    if (!isEmpty(dob)) {
      setError({ ...error, username: "" })
      dispatch(updateBirthDate(object))
    }
    else {
      setError({ ...error, dob: "date of birth cannot be empty" })
    }
  }

  const updateUserArt = () => {
    const data = {
      art_id: childArtId ? childArtId : artId
    };

    if (!artId) {
      setError({ artName: "Art cannot be empty" })
    } else if (artId && hasChildren && !childArtId) {
      setError({ artName: "Sub art cannot be empty" });
    } else {
      dispatch(updateArt(data));
      setError({ artName: "" })
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
    else if (event.target.name === "dob") {
      const isValid = validateAge(event.target.value)
      if (isValid) {
        setDob(event.target.value)
        setError({ ...error, dob: "" })
      }
      else {
        setError({ ...error, dob: "Age must be 13 years or greater" })
      }
    }
    else {
      setUserName(event.target.value)
    }
    !isEmpty(event.target.value) && !event.target.name === "dob" &&
      setError({ ...error, [event.target.name]: "" })
  }


  const handleSearchEnd = useCallback(result => {
    dispatch(artSearch(result));
  }, [dispatch]);

  const handleParentChange = value => {
    setParentArtName(value);
    setChildArtName('');
    setArtId('');
    setChildArtId('');
    setHasChildren(false);
  };


  const handleChildSearchEnd = useCallback(result => {
    dispatch(searchChildArt(artId, result));
  }, [dispatch, artId]);

  const handleChildChange = value => {
    setChildArtName(value);
    setChildArtId('');
  };

  function handleParentArtSelect(option) {
    setHasChildren(option?.children_count > 0 ? true : false);
    setArtId(option.id);
    setParentArtName(option.name);

    dispatch(searchChildArt(option.id));
  }

  function handleChildArtSelect(option) {
    setChildArtName(option.name);
    setChildArtId(option.id)
  }
  // const handleAutoSelect = (option) => {
  //   if (option && option.id) {
  //     setArtId(option.id);
  //     setArtName(option.name);
  //   }
  // }
  return (
    <div className="wrapper">
      <div className="edit-studioScreen">
        <div className="studioHead">
          {myStudio &&
            <div className="procu">
              <div className="editTool Edit">

                <Link to={`/my-studio/profile`}>
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

              <Input
                type="text"
                name="username"
                value={username}
                onChange={changeHandler}
                error={error?.username}
              />
              {/* 
  
              {
                error?.username?.length > 0 &&
                <p>{error?.username}</p>
              } */}
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
              {/* <br /> */}
            </div>
            <div className="user-age" >

              <Input
                name="dob"
                type="date"
                className="dob"
                label="Select date of birth"
                value={dob}
                onChange={changeHandler}
                error={error.dob}
                max={completeDate(new Date())}
              />
              <div className="editTool Edit">
                <img
                  src="/assets/images/paintbrush.png"
                  alt=""
                  data-for="editDob"
                  data-tip="edit date of birth"
                  onClick={updateDateOfBirth}
                />
                <ToolTip id="editDob" />
              </div>
              {/* {
                error.dob &&
                <p>{error.dob}</p>
              } */}
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
              {error.artName &&
                <p
                  className="error"
                >
                  {error?.artName}
                </p>
              }
              <InputAutoComplete
                options={listCategory}
                displayProperty="name"
                placeholder="Choose an art"
                defaultValue={parentArtName}
                onChange={handleParentChange}
                onSearchEnd={handleSearchEnd}
                onSelect={handleParentArtSelect}
              />

              {hasChildren &&
                <InputAutoComplete
                  options={childArts}
                  displayProperty="name"
                  placeholder="Choose sub art"
                  defaultValue={childArtName}
                  onChange={handleChildChange}
                  onSearchEnd={handleChildSearchEnd}
                  onSelect={handleChildArtSelect}
                />
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
                  value={bio.replace(/<br\/>/g, '')}
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
    </div >
  );
};

export default ViewProfile;
