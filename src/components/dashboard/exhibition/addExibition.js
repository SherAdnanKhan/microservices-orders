import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import { artSearch, artPost } from "../../../actions/exibitionAction"
import InputAutoComplete from "../../common/autoComplete";
import { useHistory, useRouteMatch } from "react-router-dom";
import UserContext from "../../../context/userContext";
import Spinner from "../../common/spinner";
import { getMyGalleries } from "../../../actions/galleryActions";
import ExhibitionModel from "./exhibitionModel";

const AddExibit = () => {
  const [showModel, setShowModel] = useState(true);

  const { params: { id } } = useRouteMatch();

  const history = useHistory();
  const dispatch = useDispatch();

  const { feelColor } = useSelector(state => state.feelColor);

  const listCategory = useSelector(({ exibition }) => exibition?.ListOfArts?.data?.arts);
  const { loading } = useSelector(state => state.loading);
  const {
    gallery: { myGalleries },
  } = useSelector(state => state);

  let initialData = {
    title: "",
    description: "",
    gallery_id: 0,
    image: null,
    video: null,
    art_id: null
  }

  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('')
  const [data, setData] = useState(initialData);

  const user = useContext(UserContext);

  const handleChange = ({ target: input }) => {
    if (input.type === 'file' && input.files[0]) {
      const fileType = input.files[0].type.split("/")[0];

      if (fileType === 'image') {
        setImage(URL.createObjectURL(input.files[0]));
        setData({ ...data, image: input.files[0] });
      } else {
        setVideo(URL.createObjectURL(input.files[0]));
        setData({ ...data, video: input.files[0] });
      }

    } else if (input.type === 'radio') {
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

  useEffect(() => {
    dispatch(getMyGalleries())

  }, [dispatch]);

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
          formData.append(key, data[key]);
        }
      }
      setData(initialData);
      dispatch(artPost(formData, history))
    }
    setError(error || '');
  }

  useEffect(() => {
    if (id !== 'new') {
      setData(data => {
        return {
          ...data,
          gallery_id: parseInt(id)
        }
      });
    }
  }, [id, user]);

  const handleSave = (name, file) => {
    if (name === 'image') {
      setImage(URL.createObjectURL(file));
      setData({ ...data, image: file });
    } else {
      setVideo(URL.createObjectURL(file));
      setData({ ...data, video: file });
    }
    setShowModel(false);
  };

  return (
    <div>
      {showModel &&
        <ExhibitionModel onSave={handleSave} />
      }
      {!showModel &&
        <div className={`frameReady ${feelColor}`}>
          {loading && <Spinner />}
          <>
            <div className="exibition-page-header">
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
                  <label htmlFor="image" className="exibition-input clickable" onClick={() => console.log('label')}>
                    {video &&
                      <video width="320" height="240" controls>
                        <source src={video} type="video/mp4" />
                        <source src={video} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    }
                    {!video &&
                      <img
                        id="preview"
                        src={image ? image : '/assets/images/input-image.png'} alt="dummy"
                      />
                    }
                  </label>
                </div>
                <div className="exibition-form-input">
                  <InputAutoComplete
                    options={listCategory}
                    displayProperty="name"
                    placeholder="Choose an art"
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
                  <textarea className="exibition-description-input" placeholder="Tell us something about this work..." name="description" value={data.description} onChange={handleChange} autoComplete="off"></textarea>
                </div>
              </div>

              <div className="exibition-gallery-header">
                <p> Choose Gallery</p>
              </div>
              <div className="exibition-gallery-utilties">
                {myGalleries &&
                  myGalleries.map((val, index) => (
                    <label key={index} className="exibition-gallery-item clickable" >
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
                <div className={`error ${user.feel_color}`}>
                  <div className="message"> {error} </div>
                </div>
              }
              {/* <p style={{ color: "red", fontSize: "18px" }} >{error}</p> */}
              <div className="exibition-button-div" id="submit" >
                <button className="exibition-button" type="submit" id="addex">Exhibit 》</button>
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