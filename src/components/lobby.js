import React from 'react'
import { logout } from '../actions/authActions';
import { Link } from 'react-router-dom';
import Avatar from './common/avatar';

const Lobby = ({ user: { avatars } }) => {
  return (
    <>
      <div>
        <div className="colorChangerScreen">
          <div className="centerCenter">
            <div className="seventy">
              <div className="l">
                <img alt="" src="./assets/images/expressions/iconyellow.png" color="gold" />
              </div>
              <div className="r">
                <img alt="" src="./assets/images/expressions/icongray.png" color="gray" />
              </div>
            </div>
            <div className="ninety">
              <div className="l">
                <img alt="" src="./assets/images/expressions/iconorange.png" color="orange" />
              </div>
              <div className="r">
                <img alt="" src="./assets/images/expressions/icongreen.png" color="limegreen" />
              </div>
            </div>
            <div className="seventy">
              <div className="l">
                <img alt="" src="./assets/images/expressions/iconred.png" color="red" />
              </div>
              <div className="r">
                <img alt="" src="./assets/images/expressions/iconpurple.png" color="purple" />
              </div>
            </div>
            <div className="single">
              <div className="c">
                <img alt="" src="./assets/images/expressions/iconblue.png" color="dodgerblue" />
              </div>
            </div>
          </div>
        </div>
        <div className="frameReady red">
          <div className="top">
            <div className="contentFit d-flex">
              <div className="burgerMenu">
                <span className="menuBlock">
                  <i className="fas fa-ellipsis-v" />
                </span>
              </div>
              <div className="search">
                <img src="./assets/images/icons/searchicon.png" alt="search Icon" />
              </div>
            </div>
            <Link to="" className="feelIcon">
              <img alt="" src="./assets/images/icons/feelicon.png" />
            </Link>
          </div>
          <nav>
            <ul className="dropdownM">
              <li>
                <a href="#__account">Account</a>
              </li>
              <li>
                <Link to="/settings/change-password">Change Password</Link>
              </li>
              <li>
                <a href="#__privacy">Privacy</a>
              </li>
              <li>
                <a href="#__security">Security</a>
              </li>
              <li>
                <a href="#__tickets">Tickets</a>
              </li>
              <li>
                <a href="#__feelHistory">Feel History</a>
              </li>
              <li>
                <a href="#__vault">Vault</a>
              </li>
              <li>
                <a href="#__help">Help</a>
              </li>
              <li>
                <a href="#__about">About</a>
              </li>
              <li>
                <a href="#__searchHistory">Search History</a>
              </li>
              <li>
                <Link to="" onClick={() => logout()}>Logout</Link>
              </li>
            </ul>
          </nav>
          <hr className="do-not-delete" />
          <div className="base" id="sec">
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=5">
                    <div className="cube">
                      <div className="cube-face  cube-face-front">
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gold' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gold' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gold' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>{/* END PROCU */}
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow">WebDesign/Programmer</div>
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
            <div className="cubescroll">
              <div className="procu_">
                <div className="scene">
                  <a href="studio.php?idstudio=6">
                    <div className="cube">
                      <div className="cube-face  cube-face-front" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-back" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-left" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                      <div className="cube-face  cube-face-right" style={{ borderColor: 'gray' }}>
                        <img alt="" src="./assets/images/dummyData/sal.jpg" height="100%" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="cuna">
                <div className="namerow"> Sal </div>
                <div className="artrow" />
              </div>
            </div>
          </div>
          {/* UNDER NAV SMALL CUBE BEGIN */}

          <Avatar avatars={avatars} />

          {/* UNDER NAV SMALL CUBE END */}
          <div className="middleBody">
            {/* <img src="./assets/images/dummyData/03.jpg" alt="" /> */}
          </div>
          {/* SMALL CUBE ANIMATION BEGIN */}
          <div className="smallCube">
            <div className="procusmaller">
              <div className="scenesmaller">
                <div className="cubesmallerload">
                  <div id="frontload" className="cube-facesmallerload cube-face-frontsmaller tutorfeel cube-face-frontsmallerload" />
                  <div id="backload" className="cube-facesmallerload cube-face-backsmaller tutorfeel cube-face-backsmallerload" />
                  <div id="leftload" className="cube-facesmallerload cube-face-leftsmaller tutorfeel cube-face-leftsmallerload" />
                  <div id="rightload" className="cube-facesmallerload cube-face-rightsmaller tutorfeel cube-face-rightsmallerload" />
                  <div id="topload" className="cube-facesmallerload cutsmaller tutorfeel cutsmallerload" />
                  <div id="bottomload" className="cube-facesmallerload cubsmaller tutorfeel cubsmallerload" />
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CUBE ANIMATION END */}
          <div className="left" />
          <div className="right" />
          <div className="bottom">
            <a href="#__">
              <i className="fas fa-plus" />
            </a>
          </div>
          <div className="assist">
            <a href="#__">
              <img src="./assets/images/icons/LogoIconWhite.png" alt="support" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
