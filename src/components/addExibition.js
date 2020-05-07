import React, { Fragment, useState } from "react";
import { getCurrentUser } from '../actions/authActions';


const AddExibit = () => {
  const userName = getCurrentUser()?.username;
  const [title, setTitle] = useState('');
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
    <Fragment>
      <div>
        <span>
          <i className="fas fa-arrow-left"></i>
        </span>
        <span>Exhibit Your Art {userName}</span>
      </div>
      <br />
      <br />
      <form onSubmit={Submit}>
        <div>
          <div>
            <div>
              <input type="file" id="file" name="picture" accept="image/*" value={picture} onChange={(e) => setPiucture(e.target.value)} />
              <img id="preview" src="galleryadd.png" alt="" />
            </div>
            <div>
              <input type="text" placeholder="Give this art a title.." name="title" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="off" />
              <textarea placeholder="Tell us something about this work..." name="about" value={about} onChange={(e) => setAbout(e.target.value)} autoComplete="off"></textarea>
            </div>
          </div>
        </div>
        <hr />
        <br />
        <p> Choose Gallery</p>
        <br />

        <div>
          {
            untitle.map((val, index) => (
              <div key={index}>
                <input type="radio" name="gallery" value={val.value} checked={radioSelect === val.value ? true : false} onChange={(e) => { setRadioSelect(val.value) }} /><span > {val.value}: {val.name}  </span>
              </div>
            ))
          }
        </div>
        <br />
        <hr />
        <br />

        <div>
          <div id="submit" >
            <button type="submit" id="addex">Exhibit 》</button>
          </div>
        </div>

        <div>
          <img src="loader2red.png" alt="" />
        </div>
        <button id="submitfeel" type="submit" name="colorchange"></button>
      </form>
      <footer>
        <p>production of: QuetzalArtz x R&R</p>
      </footer>
    </Fragment>
  );
};

export default AddExibit;