import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { artSearch, artPost, updatePost } from "../../../actions/exibitionAction"
import InputAutoComplete from "../../common/autoComplete";
import { useHistory, useLocation } from "react-router-dom";
import Spinner from "../../common/spinner";
import { getMyGalleries } from "../../../actions/galleryActions";
import ExhibitionModel from "./exhibitionModel";
import queryString from 'query-string';
import { getPost, clearPost } from "../../../actions/postAction";

const AddExibit = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { feelColor } = useSelector(state => state.feelColor);

  const listCategory = useSelector(({ exibition }) => exibition?.ListOfArts?.data?.arts);
  const { loading } = useSelector(state => state.loading);
  const {
    gallery: { myGalleries },
    postView: { post }
  } = useSelector(state => state);

  const [params] = useState(queryString.parse(location.search))
  const [showModel, setShowModel] = useState(params.post ? false : true);
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('')
  const [data, setData] = useState({
    title: "",
    description: "",
    gallery_id: 0,
    image: null,
    video: null,
    art_id: null
  });

  const handleChange = ({ target: input }) => {
    if (input.type === 'radio') {
      setData({ ...data, [input.name]: parseInt(input.value) });
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  }

  function handleAutoChange(value) {
    // setArts(value);
    dispatch(artSearch(value));
  }

  function handleAutoSelect(option) {
    setData({ ...data, art_id: option.id });
    // setArts(option.name)
  }

  const hasErrors = () => {
    if (!data.title) {
      return "Please enter title.";
    }

    if (!data.description) {
      return "Please enter description.";
    }

    if (!data.gallery_id) {
      return "Please select a Gallery.";
    }

    if (!data.image && !data.video) {
      return "Please choose a file.";
    }

    if (!data.art_id) {
      return "Please choose an art.";
    }

    return false;
  }

  const Submit = (e) => {
    e.preventDefault();
    const error = hasErrors();
    if (!error) {
      const formData = new FormData();
      for (let key in data) {
        if (key === 'image' || key === 'video') {
          if (data[key]) {
            formData.append(key, data[key]);
          }
        } else {
          if (key !== 'id') {
            formData.append(key, data[key]);
          }
        }
      }

      if (data.id) {
        dispatch(updatePost(formData, data.id, history));
      } else {
        dispatch(artPost(formData, history))
      }
    }
    setError(error || '');
  }

  useEffect(() => {
    if (params.gallery) {
      setData(data => {
        return {
          ...data,
          gallery_id: parseInt(params.gallery)
        }
      });
    }

    if (params.post) {
      dispatch(getPost(params.post));
    }
    dispatch(getMyGalleries());
    return () => {
      dispatch(clearPost());
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (post) {
      const splittedPath = post?.post?.image.path.split('.');
      const fileType = splittedPath[splittedPath.length - 1];

      if (fileType === 'mp4') {
        setVideo(post?.post?.image.path);
      } else {
        setImage(post?.post?.image.path);
      }

      setData(data => {
        return {
          ...data,
          id: post?.post?.id,
          title: post?.post?.title,
          description: post?.post?.description,
          art_id: post?.post?.art_id
        }
      });
      setShowModel(false);
    }
  }, [post, dispatch]);

  const handleSave = (name, file) => {
    if (name === 'image') {
      setImage(URL.createObjectURL(file));
      setData({ ...data, image: file, video: null });
      setVideo(null);
    } else {
      setVideo(URL.createObjectURL(file));
      setData({ ...data, video: file, image: null });
      setImage(null);
    }
    setShowModel(false);
  };

  return (
    <div>
      {showModel &&
        <ExhibitionModel
          onSave={handleSave}
          selectedImage={image}
          selectedVideo={video}
        />
      }
      {!showModel &&
        <div className={`frameReady ${feelColor}`}>
          {loading && <Spinner />}
          <>
            <div
              className="exibition-page-header"
              style={{ backgroundColor: feelColor }}
            >
              <span className="exibition-exit-icon">
                <i className="fas fa-arrow-left clickable" onClick={() => history.goBack()}></i>
              </span>
              <span className="exibition-header-name">Exhibit Your Art</span>
            </div>
            <br />
            <br />
            <form className="exibition-page-form" onSubmit={Submit}>
              <div className="exibition-top-textboxes">
                <div className="exbition-img" style={{ textAlign: "center" }}>
                  <label
                    htmlFor="image"
                    className="exibition-input clickable"
                    onClick={() => setShowModel(true)}
                  >
                    <div className="exhibit-imgVid-container">
                      {video &&
                        <video width="320" height="240" controls>
                          <source src={video} type="video/mp4" />
                          <source src={video} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                      }
                      {image &&
                        <img
                          id="preview"
                          src={image ? image : '/assets/images/input-image.png'}
                          alt="dummy"
                        />
                      }
                    </div>
                  </label>
                </div>
                <div className="exibition-form-input">
                  <InputAutoComplete
                    options={listCategory}
                    displayProperty="name"
                    placeholder="Choose an art"
                    defaultValue={post?.post?.art?.name}
                    onChange={handleAutoChange}
                    onSelect={handleAutoSelect}
                  />
                  <input
                    className="exibition-title-input"
                    type="text"
                    placeholder="Give this art a title.."
                    name="title" value={data.title}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <textarea
                    className="exibition-description-input"
                    placeholder="Tell us something about this work..."
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    autoComplete="off">
                  </textarea>
                </div>
              </div>

              <div className="exibition-gallery-header">
                <p> Choose Gallery</p>
              </div>
              <div className="exibition-gallery-utilties">
                {myGalleries &&
                  myGalleries.map((val, index) => (
                    <label
                      key={index}
                      className="exibition-gallery-item clickable"
                      style={{ backgroundColor: feelColor }}
                    >
                      <input
                        type="radio"
                        name="gallery_id"
                        id={val.id}
                        value={val.id}
                        checked={data.gallery_id === val.id ? true : false}
                        onChange={handleChange}
                      />
                      <span> {val.title} </span>
                    </label>
                  ))
                }
              </div>
              {error &&
                <div className='error' style={{ color: feelColor }}>
                  <div className="message"> {error} </div>
                </div>
              }
              {/* <p style={{ color: "red", fontSize: "18px" }} >{error}</p> */}
              <div className="exibition-button-div" id="submit">
                <button
                  className="exibition-button"
                  type="submit"
                  id="addex"
                  style={{ backgroundColor: feelColor }}
                >
                  Exhibit 》
                </button>
              </div>
            </form>
            <footer className="exibtion-footer">
              <p>Meuzm</p>
            </footer>
          </>
        </div >
      }

    </div>

  );
};

export default AddExibit;