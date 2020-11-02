import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeelColors } from '../../../actions/colorActions';
import UserContext from '../../../context/userContext';
import ProfileCube from '../../common/profileCube';
import useViewport from '../../common/useViewport';
import UserCube from "../../common/userCube";

const ChangeColor = ({ onColorChange }) => {
  const dispatch = useDispatch();
  const { feelColors } = useSelector(state => state.feelColor);
  const currentUser = useContext(UserContext);
  const { width } = useViewport();
  const breakpoint = 768;

  useEffect(() => {
    if (!feelColors)
      dispatch(getAllFeelColors());
  }, [dispatch, feelColors]);

  return (
    <div className="colorChangerScreen">
      <div className="centerCenter">
        {width > breakpoint
          ? (
            <div className="procu">
              <ProfileCube
                avatars={currentUser?.avatars}
                feelColor={currentUser?.feel?.color_code}
              />
            </div>
          ) : (
            <div className="feelColorCube">
              <UserCube
                user={currentUser}
              />
            </div>

          )
        }
        <div className="feelImg">
          {feelColors?.map((color, index) => (
            <div className={color.name} key={index}>
              <img alt="" src={color.image_path} color={color.color} onClick={() => onColorChange(color.id)} />
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default ChangeColor;
