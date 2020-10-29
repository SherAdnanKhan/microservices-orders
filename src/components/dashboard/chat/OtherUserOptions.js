import React from 'react';
const OtherUserOptions = ({ onReportModal, onBlockModal, onMuteModal, user, isBlocked, isMuted }) => {
  return (
    <div className="add-strq">
      <div className="dropdown">
        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        <div className="dropdown-content">
          <a href={`/dashboard/studio/${user?.slug}`} target="_blank" rel="noopener noreferrer">
            View galleries
         </a>
          <a href={`/dashboard/studio/${user?.slug}`} target="_blank" rel="noopener noreferrer">
            View profile
         </a>
          <a href="/dashboard/video-call">Send ticket</a>
          {isBlocked ?
            <p onClick={() => onBlockModal(true)}>Unblock</p>
            :
            <p onClick={() => onBlockModal(true)}>Block</p>
          }
          {isMuted ?
            <p onClick={() => onMuteModal(true)}>Unmute</p>
            :
            <p onClick={() => onMuteModal(true)}>mute</p>
          }
          <p onClick={() => onReportModal(true)}>Report</p>
          <a href="/dashboard/video-call">End chat</a>
        </div>
      </div>
    </div>
  )
}
export default OtherUserOptions;