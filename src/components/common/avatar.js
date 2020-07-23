import React from 'react';

const Avatar = ({ avatars, feelColor = 'red' }) => (
  <>
    {avatars && avatars.length > 0
      && (
        <div className={`artcubecase ${feelColor}`}>
          <div className="procusmallmove">
            <div className={`scenesmall ${feelColor}`}>
              <div className="cubesmallmove">
                {avatars.length === 1
                  && (
                    <>
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                    </>
                  )}
                {avatars.length === 2
                  && (
                    <>
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[1].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[1].path} height="100%" />
                      </div>
                    </>
                  )}
                {avatars.length === 3
                  && (
                    <>
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[1].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[2].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                    </>
                  )}
                {avatars.length >= 4
                  && (
                    <>
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[1].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[2].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: feelColor, boxShadow: `1px 1px 10px ${feelColor}` }}>
                        <img alt="" src={avatars[3].path} height="100%" />
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

export default Avatar;
