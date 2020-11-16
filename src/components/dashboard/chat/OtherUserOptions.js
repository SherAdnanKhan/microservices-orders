import React from 'react';
const OtherUserOptions = ({ onReportModal, onBlockModal, onMuteModal, user, isBlocked, isMuted }) => {
  return (
    <div className="add-strq">
      <div className="dropdown">
        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        <div className="dropdown-content">
          <a href={`/studio/${user?.slug}`} target="_blank" rel="noopener noreferrer">
            View galleries
         </a>
          <a href={`/studio/${user?.slug}`} target="_blank" rel="noopener noreferrer">
            View profile
         </a>
          <p>Send ticket</p>
          {isBlocked ?
            <p onClick={() => onBlockModal(true)}>Unblock</p>
            :
            <p onClick={() => onBlockModal(true)}>Block</p>
          }
          {isMuted ?
            <p onClick={() => onMuteModal(true)}>Unmute</p>
            :
            <p onClick={() => onMuteModal(true)}>Mute</p>
          }
          <p onClick={() => onReportModal(true)}>Report</p>
          <p>End call</p>
        </div>
      </div>
    </div>
  )
}
export default OtherUserOptions;