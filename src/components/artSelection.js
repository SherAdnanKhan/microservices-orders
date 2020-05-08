import React, { useState, useEffect, Fragment } from 'react';
import { getCurrentUser } from '../actions/authActions';
import { useSelector, useDispatch } from "react-redux"
import { getArt, newArt } from "../actions/artSelectionActions";


const ArtSelection = () => {
  const dispatch = useDispatch();
  const userName = getCurrentUser()?.username;
  const [selectedArtName, setSelectedArt] = useState("");
  const [selectSubArtName, setSubArt] = useState("");
  const [clickMainArt, setClickMain] = useState(0);
  const [name, setName] = useState("");
  // const [subArt, setSubArr] = useState({ name: "", parent_id: null });
  const allArts = useSelector(({ artSelections }) => artSelections.artName);

  useEffect(() => {
    dispatch(getArt());
  }, [dispatch]);

  function MainArtClick(e, id) {
    e.preventDefault();
    setClickMain(id);
  }

  return (
    <div className="art-selection">
      <div className="art-selection-header">
        <p>What is your art?</p>
        <p>{userName}</p>
        <p>Whatever you are passionate about, Good at,Simply love doing,that is your art that makes you an artist Select a art category a sub-art or add a new one</p>
      </div>
      <div className="art-selection-table">
        {allArts && allArts.map((art) => (
          <Fragment>
            <div onClick={(e) => MainArtClick(e, art.id)} onDoubleClick={(e) => MainArtClick(e, null)}
              className="art-selection-table-element"
              key={art.id}>
              <hr />
              <input
                type="radio"
                name="artName"
                checked={art.id === selectedArtName ? true : false}
                onChange={() => setSelectedArt(art.id)}
              />
              <label>{art.name}</label>
            </div>
            {art.children?.map((subart) => (
              <div
                style={{ display: clickMainArt === subart.parent_id ? "block" : "none" }}
                className="art-selection-table-sub-element"
                key={subart.id}>
                <input
                  type="radio"
                  name="sub artName"
                  checked={subart.id === selectSubArtName ? true : false}
                  onChange={() => setSubArt(subart.id)}
                />
                <label>{subart.name}</label>
              </div>
            ))}
          </Fragment>
        ))}
        <div className="art-selection-table-element" >
          <hr />
          <input
            type="radio"
            name="artName"
          />
          <input
            style={{ backgroundColor: "black", color: "white", border: "0px" }}
            type="text"
            name="enterArt"
            value={name}
            placeholder="Enter Art"
            // onClick={(e) => {
            //   setSubArr("");
            // }}
            onChange={
              (e) => {
                setName(e.target.value);
              }}
          />
        </div>
      </div>
      <div className="art-selection-nextBtn">
        <button disabled={!name.length > 0 ? true : false} onClick={() => dispatch(newArt(name))}>Next</button>
      </div>
    </div>
  )
}
export default ArtSelection;

