import React from 'react';
const OtherUserOptions = ({ onReportModal, user }) => {
  return (
    <div className="add-strq">
      <div className="dropdown">
        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        <div className="dropdown-content">
          <a href={`/dashboard/studio/${user.slug}`} target="_blank" rel="noopener noreferrer">
            View galleries
         </a>
          <a href={`/dashboard/studio/${user.slug}`} target="_blank" rel="noopener noreferrer">
            View profile
         </a>
          <a href="/dashboard/video-call">Send ticket</a>
          <a href="/dashboard/video-call">Block</a>
          <a href="/dashboard/video-call">Mute</a>
          <p onClick={() => onReportModal(true)} style={{ cursor: "pointer", color: "red" }}>Report</p>
          <a href="/dashboard/video-call">End chat</a>
        </div>
      </div>
    </div>
  )
}
export default OtherUserOptions;