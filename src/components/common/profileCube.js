import React from 'react';

const ProfileCube = ({ avatars }) => {
  return (

    <div className="scene">
      <div className="cube">
        {avatars.length === 1 &&
          <>
            <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
            <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
            <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
            <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
          </>
        }
        {avatars.length === 2 &&
          <>
            <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
            <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src={avatars[1].path} alt="" /></div>
            <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
            <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src={avatars[1].path} alt="" /></div>
          </>
        }
        {avatars.length === 3 &&
          <>
            <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
            <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src={avatars[1].path} alt="" /></div>
            <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src={avatars[2].path} alt="" /></div>
            <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
          </>
        }
        {avatars.length === 4 &&
          <>
            <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src={avatars[0].path} alt="" /></div>
            <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src={avatars[1].path} alt="" /></div>
            <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src={avatars[2].path} alt="" /></div>
            <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src={avatars[3].path} alt="" /></div>
          </>
        }
      </div>
    </div>
  );
};

export default ProfileCube; 
