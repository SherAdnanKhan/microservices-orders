import React from 'react'
import NavBar from './navBar';
import { Link } from 'react-router-dom';
import Search from './search';

const Header = ({ onColorChange }) => {
  return (
    <>
      <div className="top" id="main-menu">
        <div className="contentFit d-flex">
          <div className="burgerMenu">
            <span className="menuBlock">
              <i className="fas fa-ellipsis-v" />
            </span>
          </div>
          <div className="search" id="search">
            <img src="/assets/images/icons/searchicon.png" alt="search Icon" />
          </div>
        </div>
        <Link to="" className="feelIcon">
          <img alt="" src="/assets/images/icons/feelicon.png" />
        </Link>
      </div>

      <Search />

      <NavBar />
      <hr className="do-not-delete" />
      <div className="colorChangerScreen">
        <div className="centerCenter">
          <div className="seventy">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconyellow.png" color="gold" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/icongray.png" color="gray" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
            </div>
          </div>
          <div className="ninety">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconorange.png" color="orange" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/icongreen.png" color="limegreen" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
            </div>
          </div>
          <div className="seventy">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconred.png" color="red" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/iconpurple.png" color="purple" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
            </div>
          </div>
          <div className="single">
            <div className="c">
              <img alt="" src="/assets/images/expressions/iconblue.png" color="dodgerblue" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
