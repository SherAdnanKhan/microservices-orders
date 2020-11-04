import React from 'react';

const FileUploadModal = ({ feelColor, onClose, onChange }) => {
  return (
    <div className="add-img-vid-box">
      <i
        style={{ backgroundColor: feelColor }}
        className="fa fa-times close-add-box"
        onClick={onClose}
      />
      <label>
        <img
          alt=""
          src="/assets/images/plus.png"
          style={{ backgroundColor: feelColor }}
        />
        <div className="nag-btn">
          Add Image
        </div>
        <input type="file" name="image" onChange={onChange} accept="image/*" />
      </label>
      <label>
        <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: feelColor }} />
        <div className="nag-btn">
          Add Video
        </div>
        <input type="file" name="video" onChange={onChange} accept=".mp4" />
      </label>
      <label>
        <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: feelColor }} />
        <div className="nag-btn">
          Add Document
        </div>
        <input
          type="file"
          name="video"
          onChange={onChange}
          accept=".pdf,.doc,.docx,.xlsx,.xlsm,.xlsb,.xltx,.csv"
        />
      </label>
    </div>
  )
}

export default FileUploadModal
