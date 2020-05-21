import React, { Fragment, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import { artSearch, getGalleries, artPost } from "../../actions/exibitionAction"
import InputAutoComplete from "../common/autoComplete";
import { useHistory, useRouteMatch } from "react-router-dom";
import UserContext from "../../context/userContext";

const AddExibit = () => {
  const [color, setColor] = useState('red');
  const { params: { id } } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const listCategory = useSelector(({ exibition }) => exibition.ListOfArts?.data?.arts);
  const listGalleries = useSelector(({ exibition }) => exibition.ListOfGalleries?.data);
  let initialData = {
    title: "",
    description: "",
    gallery_id: 0,
    image: null,
    art_id: null
  }
  // const [arts, setArts] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState(initialData);

  const user = useContext(UserContext);

  const handleChange = ({ target: input }) => {
    if (input.type === 'file' && input.files[0]) {
      setImage(URL.createObjectURL(input.files[0]));
      setData({ ...data, [input.name]: input.files[0] });
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
    dispatch(getGalleries())

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

    if (!data.image) {
      return "Please select an image.";
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
        formData.append(key, data[key]);
      }
      setData(initialData);
      dispatch(artPost(formData, history))
    }
    setError(error || '');
  }

  useEffect(() => {
    setColor(user.feel_color);

    if (id !== 'new') {
      setData(data => {
        return {
          ...data,
          gallery_id: parseInt(id)
        }
      });
    }
  }, [id, user]);

  return (
    <div className={`frameReady ${color}`}>
      <Fragment>
        <div className="exibition-page-header">
          <span className="exibition-exit-icon">
            <i className="fas fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')}></i>
          </span>
          <span className="exibition-header-name">Exhibit Your Art</span>
        </div>
        <br />
        <br />
        <form className="exibition-page-form" onSubmit={Submit}>
          <div className="exibition-top-textboxes">
            <div className="exbition-img" style={{ textAlign: "center" }}>
              <div className="exibition-input">
                <img id="preview" src={image ? image : '/assets/images/input-image.png'} alt="dummy" />
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChange}
                />
              </div>

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
            {
              listGalleries?.map((val, index) => (
                <Fragment key={index}>
                  <div className="exibition-gallery-item">
                    <input type="radio" name="gallery_id" value={val.id} checked={data.gallery_id === val.id ? true : false} onChange={handleChange} /><span > {val.title}  </span>
                  </div>
                </Fragment>

              ))
            }
          </div>
          <p style={{ color: "red", fontSize: "18px" }} >{error}</p>
          <div className="exibition-button-div" id="submit" >
            <button className="exibition-button" type="submit" id="addex">Exhibit 》</button>
          </div>
        </form>
        <footer className="exibtion-footer">
          <p>production of: QuetzalArtz x R&R</p>
        </footer>
      </Fragment>
    </div>
  );
};

export default AddExibit;