import React from 'react';
import { useHistory } from 'react-router-dom';

const PostBar = ({ myStudio, activeGallery, totalPosts, feelColor }) => {
  const history = useHistory();
  return (
    <div
      className="total-post"
      style={{ backgroundColor: feelColor }}
    >
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
            <span onClick={() => history.push(`/dashboard/studio/gallery-followers/${activeGallery.slug}`)}>Faved</span>
            <img
              src="/assets/images/add.png"
              className="clickable"
              onClick={() => history.push(`/dashboard/exhibition?gallery=${activeGallery.id}`)}
              alt=""
            />
          </>
        }
      </div>
    </div>
  );
};

export default PostBar;
