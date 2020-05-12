import React, { Fragment, useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import {artSearch,getGalleries,artPost} from "../../actions/exibitionAction"

const AddExibit = () => {
  const dispatch = useDispatch();
  const listCategory = useSelector(({exibition}) => exibition.ListOfArts?.data?.arts);
  const listGalleries = useSelector(({exibition}) => exibition.ListOfGalleries?.data);
  const [data,setData] = useState({
    title:"",
    art_id:"",
    description:"",
    image:null,
    gallery_id:""
  })
  
  const handleChange = ({ target: input }) => {
    if (input.type === 'file' && input.files[0]) {
      setData({ ...data, [input.name]: input.files[0] });
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  }


  useEffect(() => {
    dispatch(getGalleries())
  }, [dispatch]);
  

  function Submit(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    dispatch(artPost(formData))
  }

  return (
    <div>
      <Fragment>
        <div className = "exibition-page-header">
          <span className="exibition-exit-icon">
            <i className="fas fa-arrow-left"></i>
          </span>
          <span className="exibition-header-name">Exhibit Your Art</span>
        </div>
        <br />
        <br />
        <form className="exibition-page-form" onSubmit={Submit}>
          <div className="exibition-top-textboxes">
            <div style={{textAlign:"center"}}>
              <label>
                <img id="preview" src="/assets/images/input-image.png" alt="" />
              </label>
              <input 
                  type="file"  
                  name="avatar"
                  id="avatar"
                  accept=".png, .jpg, .jpeg"  
                  onChange={handleChange}
               />
            </div>
            <div className="exibition-form-input">
                <input 
                    className="exibition-title-input"
                    list="art_id" 
                    name="art_id" 
                    value={data.art_id} 
                    onChange={(e) => {
                      handleChange(e);
                      dispatch(artSearch(e.target.value))
                    }}
                />
                  <datalist className="exibition-input-dropdown" placeholder="Art Catehory" id="art_id">
                    {
                      listCategory?.map((cat) =>(
                        <Fragment>
                           <option className="exibition-input-dropdown" key={cat.id} value={cat.name} />
                        </Fragment>
                       
                      ))
                    }
                  
                </datalist>
              <input className="exibition-title-input" type="text" placeholder="Give this art a title.." name="title" value={data.title} onChange={handleChange} autoComplete="off" />
              <textarea className="exibition-description-input" placeholder="Tell us something about this work..." name="description" value={data.description} onChange={handleChange} autoComplete="off"></textarea>
            </div>
          </div>
          
        <div className="exibition-gallery-header">
          <p> Choose Gallery</p>
        </div>
          <div className="exibition-gallery-utilties">
            {
              listGalleries?.map((val, index) => (
                <Fragment>
                   <div className="exibition-gallery-item" key={index}>
                     <input type="radio" name="gallery_id" value={val.id} checked={data.gallery_id === val.id ? true : false} onChange={handleChange} /><span > {val.title}  </span>
                   </div>
                </Fragment>
               
              ))
            }
          </div>
            <div className="exibition-button-div" id="submit" >
              <button className="exibition-button" type="submit" id="addex">Exhibit 》</button>
            </div>

          {/* <div>
            <img src="loader2red.png" alt="" />
          </div>
          <button id="submitfeel" type="submit" name="colorchange"></button> */}
        </form>
        <footer className="exibtion-footer">
          <p>production of: QuetzalArtz x R&R</p>
        </footer>
      </Fragment>
    </div>
  );
};

export default AddExibit;