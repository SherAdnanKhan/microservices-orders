import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from './common/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { changeFeelColor, getAllFeelColors } from '../actions/colorActions';
import Spinner from './common/spinner';

const Welcome = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector(state => state.loading);
  const { feelColors } = useSelector(state => state.feelColor);

  useEffect(() => {
    if (!feelColors)
      dispatch(getAllFeelColors());
  }, [dispatch, feelColors]);

  const handleColorChange = colorId => {
    dispatch(changeFeelColor(colorId, () => history.push('/artSelection')));
  };

  return (
    <div className="selectMood">
      {loading && <Spinner />}
      <div className="cubecenter">
        <div className="procufull">
          <div className="scenefull">
            <Avatar
              user={user}
            />
          </div>
        </div>
      </div>

      <div className="welcomeText">
        Welcome <strong>{user.username},</strong>
        <br />
	       How do you Feel?
      </div>

      {feelColors?.map(color => (
        <div className={color.color}>
          <Link to="#">
            <img
              alt=""
              src={color.image_path}
              color={color.color}
              onClick={() => handleColorChange(color.id)}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Welcome;
