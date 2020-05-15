import React from 'react'
import NavBar from './navBar';
import { Link } from 'react-router-dom';
import Search from './search';

const Header = () => {
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
    </>
  );
};

export default Header;
