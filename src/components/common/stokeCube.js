import React from 'react';

const StrokesCube = ({ avatars }) => {
  return (
    <div className="scene">
      <div className="cube">
        {avatars.length === 1 &&
          <>
            <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src={avatars.path} alt="" /></div>
            <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src={avatars.path} alt="" /></div>
            <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src={avatars.path} alt="" /></div>
            <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src={avatars.path} alt="" /></div>
          </>
        }
      </div>
    </div>
  );
};

export default StrokesCube; 
