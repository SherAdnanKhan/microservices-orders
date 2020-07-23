import React from 'react';
import { useSelector } from 'react-redux';

const Spinner = () => {
  const { feelColor } = useSelector(state => state.feelColor);

  return (
    <div className="spinner customSpinner ">
      <div className='smallCube'>
        <div className="procusmaller">
          <div className="scenesmaller">
            <div className="cubesmallerload">
              <div
                id="frontload"
                className="cube-facesmallerload cube-face-frontsmaller tutorfeel cube-face-frontsmallerload"
                style={{ backgroundColor: feelColor ? feelColor : 'white' }}
              />
              <div
                id="backload"
                className="cube-facesmallerload cube-face-backsmaller tutorfeel cube-face-backsmallerload"
                style={{ backgroundColor: feelColor ? feelColor : 'white' }}
              />
              <div
                id="leftload"
                className="cube-facesmallerload cube-face-leftsmaller tutorfeel cube-face-leftsmallerload"
                style={{ backgroundColor: feelColor ? feelColor : 'white' }}
              />
              <div
                id="rightload"
                className="cube-facesmallerload cube-face-rightsmaller tutorfeel cube-face-rightsmallerload"
                style={{ backgroundColor: feelColor ? feelColor : 'white' }}
              />
              <div
                id="topload"
                className="cube-facesmallerload cutsmaller tutorfeel cutsmallerload"
                style={{ backgroundColor: feelColor ? feelColor : 'white' }}
              />
              <div
                id="bottomload"
                className="cube-facesmallerload cubsmaller tutorfeel cubsmallerload"
                style={{ backgroundColor: feelColor ? feelColor : 'white' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Spinner;
