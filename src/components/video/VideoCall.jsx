
import React from 'react';
import { Link } from 'react-router-dom';

const VideoCall = () => {

  return (
    <div className="video-call-screen">
      {/* <div className="top-Header">
      </div> */}
      <div className="head-main-user">
        <div className="main-user">
          <div className="add-strq">
            <div className=" dropdown">
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              <div className="dropdown-content">
                <a href="/video-call">View galleries</a>
                <a href="/video-call">View profile</a>
                <a href="/video-call">Send ticket</a>
                <a href="/video-call">Block</a>
                <a href="/video-call">Mute</a>
                <a href="/video-call">Report</a>
                <a href="/video-call">End chat</a>
              </div>
            </div>
            <div className="video-cube">
            </div>
            <div className="artist-name">
              salwa
            </div>
            <div style={{ marginLeft: "auto" }} >
              {/* <Link to="/video-call/add">
                <button className="btn-style" >Add Artist</button>
              </Link>
              <Link to="/video-call/group">
                <button className="btn-style" style={{ marginLeft: "12px", marginRight: "12px" }} >Group Video</button>
              </Link> */}

            </div>
          </div>
          {/* For Mobile View Start */}
          <div className="mobile-Icon">
            <img className="valut-img" alt="" src="/assets/images/strqicon.png"></img>
            <img src="/assets/images/icons/DrawStrq.png" alt="Draw"></img>
          </div>
          {/* Mobile View Code End */}
          <img className="add-user" src="/assets/images/avataricon.png" alt="add" />
          <div className="call-Actions">
            <i className="fa fa-microphone" aria-hidden="true" data-tip="hello world" />
            <i className="fa fa-retweet" aria-hidden="true" />
            <i className="fa fa-camera" aria-hidden="true" />
          </div>
          <div className="call-Actions2">
            <img className="valut-img" alt="" src="/assets/images/strqicon.png"></img>
            <img src="/assets/images/icons/DrawStrq.png" alt="Draw"></img>
            <i className="fas fa-user-plus" aria-hidden="true" />
            <i className="far fa-times-circle" />
          </div>
        </div>
        <div className="own-cube">
          <img src="/assets/images/red.png" alt="red" />
        </div>
      </div>
    </div>
  );
}
export default VideoCall;