import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/authActions';

const NavBar = () => {
  return (
    <nav>
      <ul className="dropdownM">
        <li>
          <Link to="/dashboard/my-studio">My Studio</Link>
        </li>
        <li>
          <Link to="/dashboard/my-studio/profile">My Profile</Link>
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
  );
};

export default NavBar;
