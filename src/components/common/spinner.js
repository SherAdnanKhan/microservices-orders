import React from 'react';
import { getCurrentUser } from '../../actions/authActions';
const user = getCurrentUser();

const Spinner = () => {
  return (
    <div className="spinner customSpinner ">
      <div className={!user ? "smallCube defaultColorForLogin" : "smallCube"}>
        <div className="procusmaller">
          <div className="scenesmaller">
            <div className="cubesmallerload">
              <div id="frontload" className="cube-facesmallerload cube-face-frontsmaller tutorfeel cube-face-frontsmallerload"></div>
              <div id="backload" className="cube-facesmallerload cube-face-backsmaller tutorfeel cube-face-backsmallerload"></div>
              <div id="leftload" className="cube-facesmallerload cube-face-leftsmaller tutorfeel cube-face-leftsmallerload"></div>
              <div id="rightload" className="cube-facesmallerload cube-face-rightsmaller tutorfeel cube-face-rightsmallerload"></div>
              <div id="topload" className="cube-facesmallerload cutsmaller tutorfeel cutsmallerload"></div>
              <div id="bottomload" className="cube-facesmallerload cubsmaller tutorfeel cubsmallerload"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ margin: 'auto', background: 'rgba(241, 242, 243, 0) none repeat scroll 0% 0%', display: 'block' }}
        width="10%" height="10%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path d="M10 50A40 40 0 0 0 90 50A40 42.3 0 0 1 10 50" fill="#d4d4d4" stroke="none">
          <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.15;360 50 51.15" />
        </path>
      </svg> */}
    </div >
  )
}

export default Spinner;
