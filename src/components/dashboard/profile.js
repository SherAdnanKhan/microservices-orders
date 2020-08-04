import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateProfile, deleteProfileImage } from '../../actions/studioActions';
import Spinner from '../common/spinner';
import LeftBorder from './layout/leftBorder';
import RightBorder from './layout/rightBorder';
import Footer from './layout/footer';
import ImageCropper from '../common/imageCropper';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { avatars } = useContext(UserContext);
  const user = useContext(UserContext);

  const [croppedImage, setCroppedImage] = useState('');
  const [toggle, setToggle] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState({});

  const { loading } = useSelector(state => state.loading);
  const { feelColor } = useSelector(state => state.feelColor);

  useEffect(() => {
    if (avatars)
      setImages(avatars);

  }, [avatars, images])

  const handleImageSelect = (image) => {
    setSelectedImage(image || {});
  }

  const handleChange = ({ target: input }) => {
    if (input.files[0]) {
      const image = { ...selectedImage };
      image.path = URL.createObjectURL(input.files[0]);
      image.avatar = input.files[0];

      setToggle(true);
      setImageUrl(URL.createObjectURL(input.files[0]))
      setSelectedImage(image);
    }
  }

  const handleDelete = () => {
    dispatch(deleteProfileImage(selectedImage.id, history));
  }

  const handleSubmit = () => {
    const data = new FormData();
    if (selectedImage.id) {
      data.append('image_id', selectedImage.id);
    }

    if (croppedImage) {
      data.append('avatar', croppedImage);
    } else {
      data.append('avatar', selectedImage.avatar);
    }

    dispatch(createOrUpdateProfile(data, history));
  }

  const handleCompleteCrop = croppedImage => {
    setCroppedImage(croppedImage);
  };

  const handleBackPress = () => {
    setToggle(false);
    history.push('/dashboard/my-studio');
  }

  const handleSkip = value => {
    setToggle(value);
    setCroppedImage('');
  };

  return (
    <div className={`frameReady ${feelColor}`}>
      <LeftBorder feelColor={feelColor} />
      <RightBorder feelColor={feelColor} />
      <div className="edit-profile-page">
        {loading && <Spinner />}
        <div className="edit-user-page">
          <div className="header-bar" style={{ backgroundColor: feelColor }} >
            <div className="back-icon">
              <i className="fa fa-arrow-left clickable" onClick={handleBackPress} />
            </div>
            <p>Edit Your Profile Cube {user.username}</p>
          </div>
          <div className="wrapper">
            <div className="edit-profile">
              <div className="scr-inner">
                <div
                  className="item-box"
                  onClick={() => handleImageSelect(images[0])}
                  style={{ border: `2px solid ${feelColor}` }}
                >
                  <div className="editTool Edit">
                    <img src="/assets/images/paintbrush.png" alt="" />
                  </div>
                  <img
                    src={images[0] ? images[0].path : "/assets/images/avataricon.png"}
                    alt=""

                  />
                </div>
                <div
                  className="item-box"
                  onClick={() => handleImageSelect(images[1])}
                  style={{ border: `2px solid ${feelColor}` }}
                >
                  <div className="editTool Edit">
                    <img src="/assets/images/paintbrush.png" alt="" />
                  </div>
                  <img
                    src={images[1] ? images[1].path : "/assets/images/avataricon.png"}
                    alt=""

                  />
                </div>
                <div
                  className="item-box"
                  onClick={() => handleImageSelect(images[2])}
                  style={{ border: `2px solid ${feelColor}` }}
                >
                  <div className="editTool Edit">
                    <img src="/assets/images/paintbrush.png" alt="" />
                  </div>
                  <img
                    src={images[2] ? images[2].path : "/assets/images/avataricon.png"}
                    alt=""
                  />
                </div>
                <div
                  className="item-box"
                  onClick={() => handleImageSelect(images[3])}
                  style={{ border: `2px solid ${feelColor}` }}
                >
                  <div className="editTool Edit">
                    <img src="/assets/images/paintbrush.png" alt="" />
                  </div>
                  <img
                    src={images[3] ? images[3].path : "/assets/images/avataricon.png"}
                    alt=""
                  />
                </div>
              </div>
              <p>Select a profile picture change</p>

              <button
                onClick={() => history.push('/dashboard/my-studio')}
                style={{ backgroundColor: feelColor }}
              >
                <i className="fa fa-check" />
              Done
            </button>
            </div>
          </div>
        </div>
        <div className="my-studio-edit">
          <div className="header-bar "style={{ backgroundColor: feelColor }}>
            <div className="back-icon go-to-profile">
              <i className="fa fa-arrow-left" />
            </div>
            <p>Edit your Profile Cube {user.username}</p>
          </div>
          <div className="wrapper update-image">
            <>
              <div className="up-img-box">
                <ImageCropper
                  toggle={toggle}
                  imageUrl={imageUrl}
                  onToggle={(value) => setToggle(value)}
                  onCompleteCrop={handleCompleteCrop}
                  onSkip={handleSkip}
                  croppedImage={croppedImage}
                />
                {!croppedImage
                  ? (
                    <img
                      className="update-pic"
                      src={selectedImage ? selectedImage.path : "/assets/images/gray.png"}
                      alt=""
                    />
                  ) : (
                    <img
                      className="update-pic"
                      src={URL.createObjectURL(croppedImage)}
                      alt=""
                    />
                  )
                }

                <div className={selectedImage.avatar ? " hide" : "add-nag-icon"}>
                  {selectedImage.id &&
                    <div className="nag">
                      <div className="nag-icon" style={{ backgroundColor: feelColor }}>
                        <img alt="" src="/assets/images/minus.png" onClick={handleDelete} />
                      </div>
                      <div className="nag-btn" style={{ backgroundColor: feelColor }}>
                        Remove profile picture
                      </div>
                    </div>
                  }
                  <div className="nag">
                    <div className="nag-icon" style={{ backgroundColor: feelColor }}>
                      <img alt="" src="/assets/images/plus.png"  />
                    </div>
                    <div className="nag-btn" style={{ backgroundColor: feelColor }} >
                      {selectedImage.id ? "Update profile picture" : "Add profile picture"}
                    </div>
                    <input type="file" size={60} onChange={handleChange} accept="image/*" />
                  </div>
                </div>
              </div>
              {!toggle &&  //if toggle is not opened
                <div className={selectedImage.avatar ? "actions" : "actions hide"}>
                  <button
                    onClick={handleSubmit}
                    className="clickable"
                    style={{ backgroundColor: feelColor }}
                  >
                    Save
                  </button>
                  <button
                    className="clickable"
                    onClick={() => window.location.reload()}
                    style={{ backgroundColor: feelColor }}
                  >
                    Try again
                  </button>
                </div>
              }
            </>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
};

export default Profile;
