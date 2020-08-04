import React from 'react';

const PostModal = ({ onPostModalClose, imagePath, mediaType }) => {
  console.log("image path=", imagePath, mediaType)
  return (
    <>

      <div className='add-img-vid-box'>
        <i
          className="fa fa-times close-add-box"
          onClick={() => onPostModalClose(false)}
        />
        {mediaType === 1 ?
          <img src={imagePath} style={{ width: "80%", height: "80%", marginTop: "45px", objectFit: "cover" }} alt="1"></img>
          :
          <div className="video" >
            <video controls>
              <source src={imagePath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
          </div>}

      </div>
    </>


  );
};

export default PostModal;

