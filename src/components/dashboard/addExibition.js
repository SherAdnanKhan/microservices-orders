import React, { Fragment, useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import {artSearch,getGalleries,artPost} from "../../actions/exibitionAction"

const AddExibit = () => {
  const dispatch = useDispatch();
  const listCategory = useSelector(({exibition}) => exibition.ListOfArts?.data?.arts);
  const listGalleries = useSelector(({exibition}) => exibition.ListOfGalleries?.data);
  let initialData = {
    title:"",
    description:"",
    gallery_id:0,
    image:null,
    art_id: 1
  }
  const [arts,setArts] = useState("");
  const [artId,setArtId] = useState(-1);
  const [error,setError] = useState("");
  const [data,setData] = useState(initialData)
  
  const handleChange = ({ target: input }) => {
    if (input.type === 'file' && input.files[0]) {
      setData({ ...data, [input.name]: input.files[0] });
    }else if(input.type === 'radio') {
      setData({ ...data, [input.name]: parseInt(input.value) });
    }else {
      setData({ ...data, [input.name]: input.value });
    }
  }


  useEffect(() => {
    dispatch(getGalleries())
  }, [dispatch]);

  function validated(){
    if(!data.title){
      setError("Please Enter title!");
      return false;
    }
    if(!data.description){
      setError("Please Enter description!");
      return false;
    }
    if(!data.gallery_id){
      setError("Please Select a Gallery!");
      return false;
    }
    if(!data.image){
      setError("Please Enter image!");
      return false;
    }
    if(!data.art_id){
      setError("Please Enter Art Category!");
      return false;
    }
    return true;
  }
  

    const Submit = (e) => {
    e.preventDefault();
    if(validated()){
    const formData = new FormData();
    for (let key in data) {
     formData.append(key, data[key]);
    }
    setData(initialData);
    setError("");
    dispatch(artPost(formData))
    }
    
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
                <img id="preview" src="/assets/images/input-image.png" alt="dummy" />
              </label>
              <input 
                  type="file"  
                  name="image"
                  id="image"
                  accept=".png, .jpg, .jpeg"  
                  onChange={handleChange}
               />
            </div>
            <div className="exibition-form-input">
                {/* <input 
                    className="exibition-title-input"
                    list="art_id" 
                    name="art_id" 
                    value={arts} 
                    onChange={(e) => {
                      handleChange(e);
                      setArts(e.target.value)
                      dispatch(artSearch(e.target.value))
                    }}
                />
                  <datalist className="exibition-input-dropdown" placeholder="Art Catehory" id="art_id" onChange={(e) => console.log("clicked")}>
                    {
                      listCategory?.map((cat) =>(
                        <Fragment>
                           <option className="exibition-input-dropdown" key={cat.id} value={cat.name} />
                        </Fragment>
                       
                      ))
                    }
                </datalist> */}
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
          <p style={{ color:"red",fontSize:"18px"}} >{error}</p>
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