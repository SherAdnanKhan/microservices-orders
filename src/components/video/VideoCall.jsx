
import React from 'react';
import { Link } from 'react-router-dom';

const VideoCall = () => {

  return (
    <React.Fragment>
      <div className="top-Header">
      </div>
      <div className="add-strq">
        <div className=" dropdown">
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          <div className="dropdown-content">
            <a href="/dashboard/video-call">View galleries</a>
            <a href="/dashboard/video-call">View profile</a>
            <a href="/dashboard/video-call">Send ticket</a>
            <a href="/dashboard/video-call">Block</a>
            <a href="/dashboard/video-call">Mute</a>
            <a href="/dashboard/video-call">Report</a>
            <a href="/dashboard/video-call">End chat</a>
          </div>
        </div>
        <div className="video-cube">
        </div>
        <div className="artist-name">
          salwa
    </div>
        <div style={{ marginLeft: "auto" }} >
          <Link to="/dashboard/video-call/add">
            <button className="btn-style" >Add Artist</button>
          </Link>
          <Link to="/dashboard/video-call/group">
            <button className="btn-style" style={{ marginLeft: "12px", marginRight: "12px" }} >Group Video</button>
          </Link>

        </div>
      </div>
      <div className="head-main-user">
        <div className="main-user">
          {/* For Mobile View Start */}
          <div className="mobile-Icon">
            <i className="fa fa-comments" aria-hidden="true" />
            <i className="fas fa-pencil-alt" aria-hidden="true" />
          </div>
          {/* Mobile View Code End */}
          <img className="add-user" src="/assets/images/avataricon.png" alt="add" />
          <div className="call-Actions">
            <i className="fa fa-microphone" aria-hidden="true" />
            <i className="fa fa-retweet" aria-hidden="true" />
            <i className="fa fa-camera" aria-hidden="true" />
          </div>
          <div className="call-Actions2">
            <i className="fa fa-comments" aria-hidden="true" />
            <i className="fas fa-pencil-alt" aria-hidden="true" />
            <i className="fas fa-user-plus" aria-hidden="true" />
            <i className="far fa-times-circle" />
          </div>
        </div>
        <div className="own-cube">
          <img src="/assets/images/red.png" alt="red" />
        </div>

      </div>
    </React.Fragment>
  );
}
export default VideoCall;