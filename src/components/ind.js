import React from 'react';
import {Link} from "react-router-dom";
import Avatar from './common/avatar';

const Ind = ({ user: { avatars } }) => {
  return (
    <div className="selectMood">
      <div className="cubecenter">
        <div className="procufull">
          <div className="scenefull">
            {/* <div className="cubefull">
              <div className="cube-facefull  bordermenufeel cube-face-frontfull" style={{ borderColor: 'red' }}>
                 <img alt="" src="./assets/images/dummyData/03.png" height="100%" />
              </div>
              <div className="cube-facefull  bordermenufeel cube-face-backfull" style={{ borderColor: 'red' }}>
                 <img alt="" src="./assets/images/dummyData/03.png" height="100%" />
              </div>
              <div className="cube-facefull  bordermenufeel cube-face-leftfull" style={{ borderColor: 'red' }}>
                  <img alt="" src="./assets/images/dummyData/03.png" height="100%" />
              </div>
              <div className="cube-facefull bordermenufeel cube-face-rightfull" style={{ borderColor: 'red' }}>
                  <img alt="" src="./assets/images/dummyData/03.png" height="100%" />
              </div>
            </div> */}
            <Avatar avatars={avatars} />
          </div>
        </div>
        
      </div>
     
      <div className="welcomeText">
        Hi Welcome<br />
      Second line
      </div>
      <div className="happy">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconyellow.png" color="gold" />
        </Link>
          Happy
        
      </div>
      <div className="confused">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/icongray.png" color="gray" />
        </Link>  
          Confused
        
      </div>
      <div className="excited">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconorange.png" color="orange" />
        </Link>
          Excited
      </div>
      <div className="serene">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/icongreen.png" color="limegreen" />
        </Link>
          Serene
      </div>
      <div className="angry">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconred.png" color="red" />
        </Link>
        Angry
      </div>
      <div className="sad">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconblue.png" color="dodgerblue" />
        </Link>
        Sad
      </div>
      <div className="inspired">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconpurple.png" color="purple" />
        </Link>
      Sad
      </div>
    </div>
  );
};

export default Ind;
