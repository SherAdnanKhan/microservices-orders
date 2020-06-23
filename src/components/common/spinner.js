import React from 'react';
import { getCurrentUser } from '../../actions/authActions';

const user = getCurrentUser();

const Spinner = () => (
  <div className="spinner customSpinner ">
    <div className={!user ? 'smallCube defaultColorForLogin' : 'smallCube'}>
      <div className="procusmaller">
        <div className="scenesmaller">
          <div className="cubesmallerload">
            <div id="frontload" className="cube-facesmallerload cube-face-frontsmaller tutorfeel cube-face-frontsmallerload" />
            <div id="backload" className="cube-facesmallerload cube-face-backsmaller tutorfeel cube-face-backsmallerload" />
            <div id="leftload" className="cube-facesmallerload cube-face-leftsmaller tutorfeel cube-face-leftsmallerload" />
            <div id="rightload" className="cube-facesmallerload cube-face-rightsmaller tutorfeel cube-face-rightsmallerload" />
            <div id="topload" className="cube-facesmallerload cutsmaller tutorfeel cutsmallerload" />
            <div id="bottomload" className="cube-facesmallerload cubsmaller tutorfeel cubsmallerload" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Spinner;
