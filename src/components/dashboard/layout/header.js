import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Search from './search';

const Header = ({ feelColor }) => {
  const history = useHistory();

  return (
    <>
      <div
        className="top"
        id="main-menu"
        style={{ backgroundColor: feelColor }}
      >
        <div className="contentFit d-flex">
          <div className="logo-icon">
            <img className="valut-img" alt="" src="/assets/images/logowhite.png" />
          </div>
          <div className="burgerMenu">
            <span className="menuBlock" onClick={() => history.push('/dashboard/settings')}>
              <i className="fas fa-ellipsis-v" />
            </span>
          </div>
          <div className="left-icon">
            <img className="valut-img" alt="" src="/assets/images/lobbyicon.png" onClick={() => history.push('/dashboard/lobby')} />
            <img className="valut-img" alt="" src="/assets/images/newstudioicon.png" onClick={() => history.push('/dashboard/my-studio')} />
            <img className="valut-img" alt="" src="/assets/images/add.png" onClick={() => history.push('/dashboard/exhibition/new')} />
          </div>
          <div className="search" id="search">
            <img src="/assets/images/icons/searchicon.png" alt="search Icon" />
          </div>
          <div className="right-icon">
            <img className="valut-img"
              alt=""
              src="/assets/images/strqicon.png"
              onClick={() => history.push('/dashboard/conversations')}
            />
            <img className="valut-img"
              alt=""
              src="/assets/images/mzflash.png"
              onClick={() => history.push('/dashboard/mz-flash-group')}
            />
          </div>
        </div>
        <Link to="" className="feelIcon">
          <img alt="" src="/assets/images/icons/feelicon.png" />
        </Link>
      </div>
      <Search feelColor={feelColor} />

      <hr className="do-not-delete" />
    </>
  );
};

export default Header;
