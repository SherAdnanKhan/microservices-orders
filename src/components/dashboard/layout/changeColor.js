import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeelColors } from '../../../actions/colorActions';

const ChangeColor = ({ onColorChange }) => {
  const dispatch = useDispatch();
  const { feelColors } = useSelector(state => state.feelColor);

  useEffect(() => {
    dispatch(getAllFeelColors());
  }, [dispatch]);

  useEffect(() => {
    console.log('colors: ', feelColors);
  }, [feelColors]);

  return (
    <div className="colorChangerScreen">
      <div className="centerCenter">
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
