import React from 'react';
import { Link } from "react-router-dom";
import Avatar from './common/avatar';
import { useDispatch } from 'react-redux';
import { changeFeelColor } from '../actions/colorActions';

const Welcome = ({ user: { avatars } }) => {
  const dispatch = useDispatch();

  const handleColorChange = color => {
    dispatch(changeFeelColor(color));
  }

  return (
    <div className="selectMood">
      <div className="cubecenter">
        <div className="procufull">
          <div className="scenefull">
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
          <img alt="" src="./assets/images/expressions/iconyellow.png" color="gold" onClick={e => handleColorChange(e.currentTarget.attributes.color.value)} />
        </Link>
          Happy
      </div>
      <div className="confused">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/icongray.png" color="gray" onClick={e => handleColorChange(e.currentTarget.attributes.color.value)} />
        </Link>
         Confused
      </div>
      <div className="excited">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconorange.png" color="orange" onClick={e => handleColorChange(e.currentTarget.attributes.color.value)} />
        </Link>
          Excited
      </div>
      <div className="serene">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/icongreen.png" color="limegreen" onClick={e => handleColorChange(e.currentTarget.attributes.color.value)} />
        </Link>
          Serene
      </div>
      <div className="angry">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconred.png" color="red" onClick={e => handleColorChange(e.currentTarget.attributes.color.value)} />
        </Link>
        Angry
      </div>
      <div className="sad">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconblue.png" color="dodgerblue" onClick={e => handleColorChange(e.currentTarget.attributes.color.value)} />
        </Link>
        Sad
      </div>
      <div className="inspired">
        <Link to="/artselection">
          <img alt="" src="./assets/images/expressions/iconpurple.png" color="purple" onClick={e => handleColorChange(e.currentTarget.attributes.color.value)} />
        </Link>
         Sad
      </div>
    </div>
  );
};

export default Welcome;
