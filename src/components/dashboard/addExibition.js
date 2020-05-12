import React, { Fragment, useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import {artSearch} from "../../actions/artSelectionActions"

const AddExibit = () => {
  const dispatch = useDispatch();
  const listCategory = useSelector(({artSelections}) => artSelections.ListOfArts?.data?.arts);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');
  const [picture, setPiucture] = useState([]);
  const [radioSelect, setRadioSelect] = useState(0);
  const untitle = [
    { name: "Untitled 1", value: 1 },
    { name: "Untitled 2", value: 2 },
    { name: "Untitled 3", value: 3 },
    { name: "Untitled 4", value: 4 },
    { name: "Untitled 5", value: 5 },
    { name: "Untitled 6", value: 6 }
  ];

  function Submit(e) {
    e.preventDefault();
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
              <input type="file" id="file" name="picture" accept="image/*" value={picture} onChange={(e) => setPiucture(e.target.value)} />
            </div>
            <div className="exibition-form-input">
                <input 
                    className="exibition-title-input"
                    list="categories" 
                    name="categories" 
                    value={category} 
                    onChange={(e) => {
                      setCategory(e.target.value);
                      dispatch(artSearch(e.target.value))
                    }}
                />
                  <datalist className="exibition-input-dropdown" placeholder="Art Catehory" id="categories">
                    {
                      listCategory?.map((cat) =>(
                        <Fragment>
                           <option className="exibition-input-dropdown" key={cat.id} value={cat.name} />
                        </Fragment>
                       
                      ))
                    }
                  
                </datalist>
              <input className="exibition-title-input" type="text" placeholder="Give this art a title.." name="title" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="off" />
              <textarea className="exibition-description-input" placeholder="Tell us something about this work..." name="about" value={about} onChange={(e) => setAbout(e.target.value)} autoComplete="off"></textarea>
            </div>
          </div>
          
        <div className="exibition-gallery-header">
          <p> Choose Gallery</p>
        </div>
          <div className="exibition-gallery-utilties">
            {
              untitle.map((val, index) => (
                <Fragment>
                   <div className="exibition-gallery-item" key={index}>
                     <input type="radio" name="gallery" value={val.value} checked={radioSelect === val.value ? true : false} onChange={(e) => { setRadioSelect(val.value) }} /><span > {val.value}: {val.name}  </span>
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