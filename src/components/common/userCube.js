import React from 'react';

const UserCube = ({ user }) => (
  <div className={`cubescroll ${user.feel_color}`}>
    <div className="procu_">
      <div className="scene">
        {user.avatars && user.avatars.length > 0
            && (
              <div className="cube">
                {user.avatars.length === 1
                && (
                  <>
                    <div className="cube-face  cube-face-front">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-back">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-left">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-right">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                  </>
                )}
                {user.avatars.length === 2
                && (
                  <>
                    <div className="cube-face  cube-face-front">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-back">
                      <img alt="" src={user.avatars[1].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-left">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-right">
                      <img alt="" src={user.avatars[1].path} height="100%" />
                    </div>
                  </>
                )}
                {user.avatars.length === 3
                && (
                  <>
                    <div className="cube-face  cube-face-front">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-back">
                      <img alt="" src={user.avatars[1].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-left">
                      <img alt="" src={user.avatars[2].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-right">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                  </>
                )}
                {user.avatars.length >= 4
                && (
                  <>
                    <div className="cube-face  cube-face-front">
                      <img alt="" src={user.avatars[0].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-back">
                      <img alt="" src={user.avatars[1].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-left">
                      <img alt="" src={user.avatars[2].path} height="100%" />
                    </div>
                    <div className="cube-face  cube-face-right">
                      <img alt="" src={user.avatars[3].path} height="100%" />
                    </div>
                  </>
                )}
              </div>
            )}
      </div>
    </div>
    <div className="cuna">
      <div className="namerow">
        {' '}
        {user.first_name}
        {' '}
      </div>
      <div className="artrow">
        {' '}
        {user.last_name}
        {' '}
      </div>
      <div className="user-art">
        {user.art
            && (
              <>
                {user.art.parent && (
                  <>
                    {`${user.art.parent.name}/`}
                  </>
                )}
                {user.art.name && (
                  <>
                    {user.art.name}
                  </>
                )}
              </>
            )}
      </div>
    </div>
  </div>
);

export default UserCube;
