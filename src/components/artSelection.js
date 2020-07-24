import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArt, newArt, selectArt } from '../actions/artSelectionActions';
import Spinner from './common/spinner';
import { useHistory } from 'react-router-dom';

const ArtSelection = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedArt, setSelectedArt] = useState(0);
  const [selectedSubArt, setSelectedSubArt] = useState(0);
  const [selectedArtName, setSelectedArtName] = useState('');
  const [selectSubArtName, setSubArtName] = useState('');
  const [clickMainArt, setClickMain] = useState(0);
  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [subArtRadio, setSubArtRadio] = useState(false);
  const [mainArtRadio, setMainArtRadio] = useState(false);
  const allArts = useSelector(({ artSelections }) => artSelections.artName);

  const { loading } = useSelector(state => state.loading);

  useEffect(() => {
    dispatch(getArt());
  }, [dispatch]);

  function MainArtClick(e, id) {
    e.preventDefault();
    setClickMain(id);
    setName('');
    setSubName('');
  }

  function HandleNext(e) {
    e.preventDefault();
    let value = selectedArtName.length > 0
      ? selectArt({ art_id: selectedArt }, history)
      : selectSubArtName.length > 0
        ? selectArt({ art_id: selectedSubArt }, history)
        : subArtRadio
          ? newArt({ name: subName, parent_id: clickMainArt }, history)
          : mainArtRadio
            ? newArt({ name }, history)
            : {};
    if (value !== {}) {
      dispatch(value);
    }
  }

  return (
    <div className='art-selection'>
      {loading && <Spinner />}
      <div className="art-selection-header">
        <p>What is your art?</p>
        <p>{user.username}</p>
        <p>
          Whatever you are passionate about, Good at,Simply love
          doing,that is your art that makes you an
          artist Select a art category a sub-art or add a new one
        </p>
      </div>
      <div className="art-selection-table">
        {allArts && allArts.map((art, i) => (
          <Fragment key={i}>
            <div
              className="art-selection-table-element"
              key={art.id}
            >
              <hr />
              <input
                type="radio"
                name="artName"
                checked={art.id === selectedArt}
                onChange={() => {
                  setSelectedArt(art.id);
                  setSelectedArtName(art.name);
                  setSelectedSubArt('');
                  setSubArtName('');
                  setSubArtRadio(false);
                  setMainArtRadio(false);
                }}
              />
              <label
                onClick={(e) => {
                  e.stopPropagation();
                  MainArtClick(e, art.id);
                }}
                onDoubleClick={(e) => MainArtClick(e, null)}
              >
                {art.name}

              </label>
            </div>
            <div>
              {art.children
                && art.children.map((subart, j) => (
                  <div
                    key={j}
                    style={{
                      display:
                        clickMainArt === subart.parent_id
                          ? 'block'
                          : 'none',
                      backgroundColor: user.feel.color_code
                    }}
                    className="art-selection-table-sub-element"
                  >
                    <input
                      type="radio"
                      name="sub artName"
                      checked={subart.id === selectedSubArt}
                      onChange={() => {
                        setSelectedSubArt(subart.id);
                        setSubArtName(subart.name);
                        setSelectedArt('');
                        setSelectedArtName('');
                        setSubArtRadio(false);
                        setMainArtRadio(false);
                      }}
                    />
                    <label>{subart.name}</label>
                  </div>
                ))}
              <div
                className="art-selection-table-sub-element"
                style={{
                  display:
                    art.id === clickMainArt
                      ? 'block'
                      : 'none',
                  backgroundColor: user.feel.color_code
                }}>
                <input
                  type="radio"
                  name="artsubRadio"
                  checked={subArtRadio}
                  onChange={() => {
                    if (subName) {
                      setSubArtRadio(!subArtRadio);
                      setSelectedArt('');
                      setSelectedArtName('');
                      setSelectedSubArt('');
                      setSubArtName('');
                      setMainArtRadio(false);
                    }
                  }}
                />
                <input
                  style={{ backgroundColor: 'black', color: 'white', border: '0px' }}
                  type="text"
                  name="enterArt"
                  value={subName}
                  placeholder="Enter Art"
                  onChange={
                    (e) => {
                      setName('');
                      setSubName(e.target.value);
                    }
                  }
                />
              </div>

            </div>
          </Fragment>
        ))}
        <div className="art-selection-table-element">
          <hr />
          <input
            type="radio"
            name="artName"
            checked={mainArtRadio}
            onChange={() => {
              if (name) {
                setMainArtRadio(!mainArtRadio);
                setSelectedArt('');
                setSelectedArtName('');
                setSelectedSubArt('');
                setSubArtName('');
                setSubArtRadio(false);
              }
            }}
          />
          <input
            style={{ backgroundColor: 'black', color: 'white', border: '0px' }}
            type="text"
            name="enterArt"
            value={name}
            placeholder="Enter Art"
            onChange={
              (e) => {
                setSubName('');
                setName(e.target.value);
              }
            }
          />
        </div>
      </div>

      <div className="art-selection-nextBtn">
        <button
          disabled={
            selectedArtName.length === 0
            && selectSubArtName.length === 0
            && !subArtRadio && !mainArtRadio
          }
          onClick={(e) => HandleNext(e)}
          style={{ backgroundColor: user.feel.color_code }}
        >
          Next

        </button>
      </div>
    </div>
  );
};
export default ArtSelection;
