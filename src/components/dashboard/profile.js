import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();

  return (
    <div className="edit-profile-page">
      <div className="header-bar">
        <div className="back-icon">
          <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/my-studio')} />
        </div>
        <p>Edit Your Profile Cube Usman</p>
      </div>
      <div className="wrapper">
        <div className="edit-profile">
          <div className="scr-inner">
            <div className="item-box">
              <div className="editTool Edit">
                <img src="/assets/images/paintbrush.png" alt="" />
              </div>
              <img src="/assets/images/avataricon.png" alt="" />
            </div>
            <div className="item-box">
              <div className="editTool Edit">
                <img src="/assets/images/paintbrush.png" alt="" />
              </div>
              <img src="/assets/images/avataricon.png" alt="" />
            </div>
            <div className="item-box">
              <div className="editTool Edit">
                <img src="/assets/images/paintbrush.png" alt="" />
              </div>
              <img src="/assets/images/avataricon.png" alt="" />
            </div>
            <div className="item-box">
              <div className="editTool Edit">
                <img src="/assets/images/paintbrush.png" alt="" />
              </div>
              <img src="/assets/images/avataricon.png" alt="" />
            </div>
          </div>
          <p>Select a profile picture change</p>
          <button>
            <i className="fa fa-check" />
              Done
            </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
