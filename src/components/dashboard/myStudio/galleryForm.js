import React, { useState, useEffect } from 'react';
import Input from '../../common/input';
import { useDispatch, useSelector } from 'react-redux';
import { updateGallery, createGallery, removeGalleryImage } from '../../../actions/galleryActions';
import Spinner from '../../common/spinner';
import ImageCropper from '../../common/imageCropper';
import { isEmpty } from '../../../utils/helperFunctions';
import {userKey} from "../../../constants/keys";
const GalleryForm = ({ onModelClose, gallery }) => {
  const [imageUrl, setImageUrl] = useState('/assets/images/gray.png');

  const [error, setError] = useState('');
  const [data, setData] = useState({
    title: '',
    image: null,
  });

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.gallery);
  const [croppedImage, setCroppedImage] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (gallery) {
      setData(data => {
        return {
          id: gallery.id,
          title: gallery.title,
        }
      });
      if (gallery.image) {
        setImageUrl(imageUrl => imageUrl = gallery.image.path);
      }
    }
  }, [gallery]);

  const handleChange = ({ target: input }) => {
    if (input.type === 'file') {
      if (input.files[0]) {
        setData({ ...data, image: input.files[0] });
        setToggle(true);
        setImageUrl(URL.createObjectURL(input.files[0]));
      }
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };

  const handleCompleteCrop = croppedImage => {
    setCroppedImage(croppedImage);
  };

  const handleSkip = value => {
    setToggle(value);
    setCroppedImage('');
  };

  const handleToggle = value => {
    setToggle(value);
  }
  const handleRemove = () => {
    dispatch(removeGalleryImage(data.id, () => onModelClose(false)))
  };

  const validate = () => {
    let error = ''

    if (!data.title) {
      error = 'Please enter gallery title.';
    }

    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const error = validate();

    const formData = new FormData();

    if (!error) {
      if (croppedImage) {
        data.image = croppedImage;
      };
      for (let key in data) {
        if (key === 'image') {
          if (data[key]) {
            formData.append(key, data[key]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      if (data.id) {
        dispatch(updateGallery(formData, data.id, () => onModelClose(false)))
      } else {
        dispatch(createGallery(formData, () => onModelClose(false)))
      }
    } else {
      setError(error);
    }
  };
  const feelColor=JSON.parse(localStorage.getItem(userKey));

  return (
    <div className="gallery-form">
      {loading && <Spinner />}
      <div className="update-image">
        <div className="nag-btn"  >
        <i className="fas fa-window-close" style={{backgroundColor:feelColor.feel.color_code}} onClick={() => onModelClose(false)}></i>
        </div>
        <ImageCropper
          imageUrl={imageUrl}
          toggle={toggle}
          onToggle={handleToggle}
          onSkip={handleSkip}
          onCompleteCrop={handleCompleteCrop}
          croppedImage={croppedImage}
        />
        <form onSubmit={handleSubmit}>
          <div className="up-img-box">
            {isEmpty(croppedImage)
              ? <img className="update-pic" src={imageUrl} alt="gallery" />
              : <img className="update-pic" src={URL.createObjectURL(croppedImage)} alt="gallery" />
            }

            <div className="add-nag-icon">
              {gallery && gallery.image &&
                <div className="nag">
                  <div className="nag-icon" style={{backgroundColor:feelColor.feel.color_code}} onClick={handleRemove}>
                    <img alt="" src="/assets/images/minus.png" />
                  </div>
                  <div className="nag-btn" style={{backgroundColor:feelColor.feel.color_code}}> 
                    Remove gallery cover
                  </div>
                </div>
              }
              <div className="nag">
                <div className="nag-icon" style={{backgroundColor:feelColor.feel.color_code}}>
                  <img
                    alt=""
                    src="/assets/images/plus.png"
                    onClick={handleRemove}
                  />
                </div>
                <div className="nag-btn" style={{backgroundColor:feelColor.feel.color_code}}>
                  Add gallery cover
                </div>
                <input
                  type="file"
                  size={60}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="gallery-title"> {gallery && gallery.title}</div>
          {/* <div className="nag-btn" style={{backgroundColor:feelColor.feel.color_code}}> */}
          <Input
            name="title"
            placeholder="Enter gallery title"
            value={data.title}
            onChange={handleChange}
            error={error}
            style={{backgroundColor:feelColor.feel.color_code}}
          />
          {/* </div> */}
       
          <div className="actions">
            <button style={{backgroundColor:feelColor.feel.color_code}}> Save </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default GalleryForm;
