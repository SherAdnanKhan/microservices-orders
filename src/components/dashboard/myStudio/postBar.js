import React from 'react';
import { useHistory } from 'react-router-dom';

const PostBar = ({ myStudio, activeGallery, totalPosts, gallery }) => {
  const history = useHistory();
  console.log(gallery)

  return (
    <div className="total-post">
      <div className="icon-side">
        <i className="fas fa-square " />
        <i className="fas fa-th" />
      </div>
      <div className="gallery">
        {!activeGallery &&
          <>
            <p>Select a Gallery</p>
            {myStudio && <p>Total posts: {totalPosts}</p>}
          </>
        }
        {activeGallery && <p>{activeGallery.title}</p>}
      </div>
      <div className="heart-icon">

        {activeGallery &&
          <>
            <img
              src="/assets/images/favers.png"
              className="clickable"
              onClick={() => history.push(`/dashboard/my-studio/gallery-followers/${activeGallery.slug}`)}
              alt=""
            />
            <img
              src="/assets/images/add.png"
              className="clickable"
              onClick={() => history.push(`/dashboard/exhibition/${activeGallery.id}`)}
              alt=""
            />
          </>
        }
      </div>
    </div>
  );
};

export default PostBar;
