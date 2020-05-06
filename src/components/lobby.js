import React from 'react'
import { logout } from '../actions/authActions';

const Lobby = () => {
  return (
    <div className="lobby">
      <div className="lobbyText">
        Lobby
      </div>
      <div className="logout">
        <button className="btn clickable" onClick={() => logout()}> Logout </button>
      </div>
    </div>
  );
};

export default Lobby;
