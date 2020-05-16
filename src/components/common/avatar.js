import React from 'react'

const Avatar = ({ avatars }) => {
  return (
    <>
      {avatars && avatars.length > 0 &&
        <div className="artcubecase">
          <div className="procusmallmove">
            <div className="scenesmall">
              <a href="studio.php?idstudio=4&gal=1">
                <div className="cubesmallmove">
                  {avatars.length === 1 &&
                    <>
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                    </>
                  }
                  {avatars.length === 2 &&
                    <>
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[1].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[1].path} height="100%" />
                      </div>
                    </>
                  }
                  {avatars.length === 3 &&
                    <>
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[1].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[2].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                    </>
                  }
                  {avatars.length >= 4 &&
                    <>
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[0].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[1].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[2].path} height="100%" />
                      </div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}>
                        <img alt="" src={avatars[3].path} height="100%" />
                      </div>
                    </>
                  }
                </div>
              </a>
            </div>
          </div>

          {/* onClick="imgOpsBye(815, 915)" */}
          {/* <div className="blocker" id={915} />
          <div className="exhibitartname">
            <span className="artof" id="artof" />
          </div> */}
        </div>
      }
    </>
  );
};

export default Avatar;
