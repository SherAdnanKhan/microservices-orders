import React, { useState, useEffect } from 'react';
import Input from '../../common/input';
import { useDispatch, useSelector } from 'react-redux';
import { updateGallery, createGallery, removeGalleryImage } from '../../../actions/galleryActions';
import Spinner from '../../common/spinner';

const GalleryForm = ({ onModelClose, gallery }) => {
  const [imageUrl, setImageUrl] = useState('/assets/images/gray.png');

  const [error, setError] = useState('');
  const [data, setData] = useState({
    title: '',
    image: null,
  });

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.gallery);

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
        setImageUrl(URL.createObjectURL(input.files[0]));
      }
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };

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

  return (
    <div className="gallery-form">
      {loading && <Spinner />
      }
      <div className="update-image">
        <i className="fas fa-window-close" onClick={() => onModelClose(false)}></i>
        <form onSubmit={handleSubmit}>
          <div className="up-img-box">
            <img className="update-pic" src={imageUrl} alt="" />
            <div className="add-nag-icon">
              {gallery && gallery.image &&
                <div className="nag">
                  <div className="nag-icon" onClick={handleRemove}>
                    <img alt="" src="/assets/images/minus.png" />
                  </div>
                  <div className="nag-btn">
                    Remove profile picture
                  </div>
                </div>
              }
              <div className="nag">
                <div className="nag-icon">
                  <img
                    alt=""
                    src="/assets/images/plus.png"
                    onClick={handleRemove}
                  />
                </div>
                <div className="nag-btn">
                  Add profile picture
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
          <Input
            name="title"
            placeholder="Enter gallery title"
            value={data.title}
            onChange={handleChange}
            error={error}
          />
          <div className="actions">
            <button> Save </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default GalleryForm;
