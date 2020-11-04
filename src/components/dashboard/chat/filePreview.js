import React from 'react'

const FilePreview = ({ previewRef, image, video, document, onDeletePreview }) => {
  return (
    <div className="preview">
      {image &&
        <div className="image-preview">
          <i className="fas fa-trash" onClick={onDeletePreview}></i>
          <img src={image} alt="" />
        </div>
      }
      {video &&
        <div className="video-preview">
          <i className="fas fa-trash" onClick={onDeletePreview}></i>
          <video controls>
            <source src={video} type="video/mp4" />
            <source src={video} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        </div>
      }
      {document &&
        <div className="document-preview">
          <i className="fas fa-trash" onClick={onDeletePreview}></i>
          <i className="fas fa-file-alt"></i>
          <div> {document.doc_name && document.doc_name}</div>
        </div>
      }
      <div ref={previewRef}> </div>
    </div>
  );
};

export default FilePreview
