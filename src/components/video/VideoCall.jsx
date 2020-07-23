
import React from 'react';
import { Link } from 'react-router-dom';

const VideoCall=()=> {

  return (
      <React.Fragment>
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
    <div style={{marginLeft:"auto"}} >
        <Link to="/dashboard/video-call/add">
        <button className="btn-style" >Add Artist</button>
        </Link>
        <Link to="/dashboard/video-call/group">
        <button className="btn-style" style={{marginLeft:"12px",marginRight:"12px"}} >Group Video</button>
        </Link>
     
    </div>
  </div>
  <div className="head-main-user">
    <div className="main-user">
      <img className="add-user" src="/assets/images/avataricon.png" alt="add" />
    </div>
    <div className="own-cube">
      <img  src="/assets/images/red.png"  alt="red" />
    </div>

  </div>
  </React.Fragment>
  );
}
export default VideoCall;