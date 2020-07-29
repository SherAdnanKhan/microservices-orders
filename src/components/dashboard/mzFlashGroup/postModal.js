import React from 'react';

const PostModal = ({  onPostModalClose,imagePath}) => {
    return (
        <div className='add-img-vid-box'>
            <i
              className="fa fa-times close-add-box"
              onClick={() =>onPostModalClose(false)}
            />
            <img src={imagePath} style={{width:"80%", height:"80%",marginTop:"45px" }} alt="1"></img>
          </div>
  );
};

export default PostModal;

