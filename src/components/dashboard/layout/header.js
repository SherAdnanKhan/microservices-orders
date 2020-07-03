import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Search from './search';

const Header = () => {
  const history = useHistory();

  return (
    <>
      <div className="top" id="main-menu">
        <div className="contentFit d-flex">
          <div className="burgerMenu">
            <span className="menuBlock" onClick={() => history.push('/dashboard/settings')}>
              <i className="fas fa-ellipsis-v" />
            </span>
          </div>
          <div className="left-icon">
            <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
            <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
            <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
          </div>
          <div className="search" id="search">
            <img src="/assets/images/icons/searchicon.png" alt="search Icon" />
          </div>
          <div className="right-icon">
            <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
            <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
            <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
          </div>
          <Link to="" className="feelIcon">
            <img alt="" src="/assets/images/icons/feelicon.png" />
          </Link>
        </div>
      </div>

      <Search />

      <hr className="do-not-delete" />
    </>
  );
};

export default Header;
