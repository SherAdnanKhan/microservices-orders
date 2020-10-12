import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileCube from '../components/common/profileCube';
import { useDispatch, useSelector } from 'react-redux';
import { changeFeelColor, getAllFeelColors } from '../actions/colorActions';
import Spinner from './common/spinner';
import { getCurrentUser } from "../actions/authActions";
import useViewport from "../components/common/useViewport";
import UserCube from "../components/common/userCube";

const Welcome = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector(state => state.loading);
  const { feelColors } = useSelector(state => state.feelColor);
  const { feelColor } = useSelector(state => state.feelColor);
  const currentUser = getCurrentUser();
  const { width } = useViewport();
  const breakpoint = 768;
  const toggleScreen = () => {
    var parent = document.getElementById("colorScreen");
    if (parent.style.display === "none") {
      parent.style.display = "flex";
    } else {
      parent.style.display = "none";
    }
  }
  useEffect(() => {
    if (!feelColors)
      dispatch(getAllFeelColors());
  }, [dispatch, feelColors]);

  const handleColorChange = colorId => {
    dispatch(changeFeelColor(colorId, () => history.push('/artSelection')));
  };

  return (

    <div className="welcomeScreen">
      <div className="feelIcon" style={{ backgroundColor: feelColor }} onClick={toggleScreen} id="feelIcon" >
        <img alt="" src="/assets/images/icons/feelicon.png"
          data-for="feelColor"
          data-tip="feel color" />
      </div>
      <div className="selectMood" id="colorScreen">

        {loading && <Spinner />}
        {width > breakpoint ?
          <div className="cubecenter" >
            <div className="procu" style={{ marginTop: "-140px" }}>
              <ProfileCube
                avatars={currentUser?.avatars}
                feelColor={currentUser?.feel.color_code}
              />
            </div>
          </div>
          :
          <div className="feelColorCube">
            <UserCube
              user={currentUser}
            />
          </div>
        }
        <div className="welcomeText">
          Welcome <strong>{user.username},</strong>
          <br />
	       How do you Feel?
      </div>
        {
          feelColors?.map(color => (
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
          ))
        }
      </div >
    </div>
  );
};

export default Welcome;
