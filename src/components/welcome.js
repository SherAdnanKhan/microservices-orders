import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from './common/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { changeFeelColor } from '../actions/colorActions';
import Spinner from './common/spinner';

const Welcome = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector(state => state.loading);

  const handleColorChange = color => {
    dispatch(changeFeelColor(color, () => history.push('/artSelection')));
  };

  return (
    <div className="selectMood">
      {loading && <Spinner />}
      <div className="cubecenter">
        <div className="procufull">
          <div className="scenefull">
            <Avatar avatars={user.avatars} />
          </div>
        </div>
      </div>

      <div className="welcomeText">
        Hi Welcome
        <br />
        {user.username}
      </div>

      <div className="happy">
        <Link to="#">
          <img
            alt=""
            src="./assets/images/expressions/iconyellow.png"
            color="gold"
            onClick={e => handleColorChange(e.currentTarget.attributes.color.value)}
          />
        </Link>
        Happy
      </div>
      <div className="confused">
        <Link to="#">
          <img
            alt=""
            src="./assets/images/expressions/icongray.png"
            color="gray"
            onClick={e => handleColorChange(e.currentTarget.attributes.color.value)}
          />
        </Link>
        Confused
      </div>
      <div className="excited">
        <Link to="#">
          <img
            alt=""
            src="./assets/images/expressions/iconorange.png"
            color="orange"
            onClick={e => handleColorChange(e.currentTarget.attributes.color.value)}
          />
        </Link>
        Excited
      </div>
      <div className="serene">
        <Link to="#">
          <img alt="" src="./assets/images/expressions/icongreen.png" color="limegreen" onClick={e => handleColorChange(e.currentTarget.attributes.color.value)} />
        </Link>
        Serene
      </div>
      <div className="angry">
        <Link to="#">
          <img
            alt=""
            src="./assets/images/expressions/iconred.png"
            color="red"
            onClick={e => handleColorChange(e.currentTarget.attributes.color.value)}
          />
        </Link>
        Angry
      </div>
      <div className="sad">
        <Link to="#">
          <img
            alt=""
            src="./assets/images/expressions/iconblue.png"
            color="dodgerblue"
            onClick={e => handleColorChange(e.currentTarget.attributes.color.value)}
          />
        </Link>
        Sad
      </div>
      <div className="inspired">
        <Link to="#">
          <img
            alt=""
            src="./assets/images/expressions/iconpurple.png"
            color="purple"
            onClick={e => handleColorChange(e.currentTarget.attributes.color.value)}
          />
        </Link>
        Sad
      </div>
    </div>
  );
};

export default Welcome;
