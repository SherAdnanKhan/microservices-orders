import React from 'react';

const UserCube = ({ user }) => {
  return (
    <div className="cubescroll">
      <div className="procu_">
        <div className="scene">
          <a href="studio.php?idstudio=5">
            {user.avatars && user.avatars.length > 0 &&
              <div className="cube">
                {user.avatars.length === 1 &&
                  <>
                    <div className="cube-face  cube-face-front">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-back" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-left" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-right" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                  </>
                }
                {user.avatars.length === 2 &&
                  <>
                    <div className="cube-face  cube-face-front">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-back" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[1].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-left" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-right" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[1].path} height="100%" />
                    </div>
                  </>
                }
                {user.avatars.length === 3 &&
                  <>
                    <div className="cube-face  cube-face-front">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-back" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[1].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-left" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[2].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-right" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                  </>
                }
                {user.avatars.length >= 4 &&
                  <>
                    <div className="cube-face  cube-face-front">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-back" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[1].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-left" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[2].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-right" style={{ borderColor: 'gold' }}>
                      <img alt="" src={user.avatars[3].path} height="100%" />
                    </div>
                  </>
                }
              </div>}
          </a>
        </div>
      </div>
      <div className="cuna">
        <div className="namerow"> {user.first_name} </div>
        <div className="artrow"> {user.last_name} </div>
      </div>
    </div >
  );
};

export default UserCube;
