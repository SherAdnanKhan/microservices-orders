import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAuthToken, getCurrentUser, logout } from '../../../actions/authActions';
import Search from './search';
import { useDispatch, useSelector } from 'react-redux';
import { changeFeelColor } from '../../../actions/colorActions';
import ChangeColor from './changeColor';
import socket from '../../../services/socketService';

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { feelColor } = useSelector(state => state.feelColor);
  const [showSearch, setShowSearch] = useState(false);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  }

  const handleColorChange = color => {
    dispatch(changeFeelColor(color));
  };

  const handleLogout = () => {
    const user = getCurrentUser();
    const token = getAuthToken();

    socket.emit('logout', { user, token });
    logout();

  }

  return (
    <div className={`frameReady ${feelColor}`}>
      <div className="top"
        id="main-menu"
        style={{ backgroundColor: feelColor }}
      >
        <div className="contentFit d-flex">
          <div className="burgerMenu">
            <span className="menuBlock" onClick={() => history.goBack()}>
              <i className="fas fa-arrow-left" />
            </span>
          </div>
          <div
            className="search"
            id="search"
            onClick={handleToggleSearch}
          >
            <img src="/assets/images/icons/searchicon.png" alt="search Icon" />
          </div>
        </div>
        <Link to="" className="feelIcon"
        // style={{
        //   borderLeft: '1px solid black',
        //   borderBottom: '1px solid black'
        // }}
        >
          <img alt="" src="/assets/images/icons/feelicon.png" />
        </Link>
      </div>

      <Search
        feelColor={feelColor}
        showSearch={showSearch}
        onToggleSearch={handleToggleSearch} />
      <ChangeColor onColorChange={handleColorChange} />
      <hr className="do-not-delete" />

      <nav style={{ backgroundColor: feelColor }}>
        <ul className="dropdownM">
          <li>
            <Link to="/dashboard/my-studio">My Studio</Link>
          </li>
          <li>
            <Link to="/dashboard/my-studio/profile">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/my-studio/vault">My Vault</Link>
          </li>
          <li>
            <Link to="/dashboard/change-password">Change Password</Link>
          </li>
          <li>
            <a href="/dashboard/privacy">Privacy</a>
          </li>
          <li>
            <a href="#__security">Security</a>
          </li>
          <li>
            <a href="#__tickets">Tickets</a>
          </li>
          <li>
            <a href="/dashboard/feel-history">Feel History</a>
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
            <Link className="logout" to="" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
