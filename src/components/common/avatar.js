import React from 'react';
import { useSelector } from 'react-redux';

const Avatar = ({ user }) => {
  const { onlineUsers } = useSelector(state => state.onlineUser);
  return (
    <>
      {user?.avatars?.length > 0
        && (
          <div className={`artcubecase ${user?.feel?.color_code}`}>
            <div className="procusmallmove">
              <div className={`scenesmall ${user?.feel?.color_code}`}>
                <div className="cubesmallmove">
                  {user.avatars.length === 1
                    && (
                      <>
                        <div
                          className="cube-facesmall  cube-face-frontsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-backsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-leftsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-rightsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                      </>
                    )}
                  {user.avatars.length === 2
                    && (
                      <>
                        <div
                          className="cube-facesmall  cube-face-frontsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-backsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-leftsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[1]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-rightsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[1]?.path} height="100%" />
                        </div>
                      </>
                    )}
                  {user.avatars.length === 3
                    && (
                      <>
                        <div
                          className="cube-facesmall  cube-face-frontsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-backsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[1]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-leftsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[2]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-rightsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                      </>
                    )}
                  {user.avatars.length >= 4
                    && (
                      <>
                        <div
                          className="cube-facesmall  cube-face-frontsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[0]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-backsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[1]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-leftsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[2]?.path} height="100%" />
                        </div>
                        <div
                          className="cube-facesmall  cube-face-rightsmall"
                          style={{
                            borderColor: user?.feel?.color_code,
                            boxShadow: onlineUsers?.some(slug => slug === user?.slug)
                              ? `1px 1px 10px ${user?.feel?.color_code}`
                              : ''
                          }}
                        >
                          <img alt="" src={user?.avatars[3]?.path} height="100%" />
                        </div>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};


export default Avatar;
