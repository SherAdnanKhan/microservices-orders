import React from 'react'
import NavBar from './navBar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="top">
        <div className="contentFit d-flex">
          <div className="burgerMenu">
            <span className="menuBlock">
              <i className="fas fa-ellipsis-v" />
            </span>
          </div>
          <div className="search">
            <img src="/assets/images/icons/searchicon.png" alt="search Icon" />
          </div>
        </div>
        <Link to="" className="feelIcon">
          <img alt="" src="/assets/images/icons/feelicon.png" />
        </Link>
      </div>
      <NavBar />
      <hr className="do-not-delete" />
      <div className="colorChangerScreen">
        <div className="centerCenter">
          <div className="seventy">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconyellow.png" color="gold" />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/icongray.png" color="gray" />
            </div>
          </div>
          <div className="ninety">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconorange.png" color="orange" />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/icongreen.png" color="limegreen" />
            </div>
          </div>
          <div className="seventy">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconred.png" color="red" />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/iconpurple.png" color="purple" />
            </div>
          </div>
          <div className="single">
            <div className="c">
              <img alt="" src="/assets/images/expressions/iconblue.png" color="dodgerblue" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
