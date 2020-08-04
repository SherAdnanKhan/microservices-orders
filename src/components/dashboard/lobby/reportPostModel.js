import React from 'react';

const ReportPostModel = ({ onReport, onModalClose, post }) => {
  return (
    <div className="studio">
      <div className="gallery-model">
        <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
        <div className="gallery-container">
          <div className="heading"> Are you sure you want to Report this post</div>
          <div className="btn-section" >
            <button className="button success" onClick={() => onReport(post)}>Report</button>
            <button className="button danger" onClick={() => onModalClose(false)}>Cancel</button>
          </div>
        </div>
      </div>

    </div>

  );
};

export default ReportPostModel;