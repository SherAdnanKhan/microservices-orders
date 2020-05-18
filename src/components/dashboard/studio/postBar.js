import React from 'react';
import Like from '../../common/like';

const PostBar = ({ gallery, activeGallery, galleries, onPostLike }) => {
  return (
    <div className="total-post">
      <div className="icon-side">
        <i className="fas fa-square" />
      </div>
      <div className="gallery">
        {!activeGallery &&
          <>
            <p>Select a Gallery</p>
            <p>Total posts: {galleries && galleries.length}</p>
          </>
        }
        {activeGallery && <p>Total Post: {activeGallery.posts_count}</p>}
      </div>
      <div className="heart-icon">
        {activeGallery &&
          gallery &&
          <Like
            faved={gallery.has_faved}
            onLike={onPostLike}
          />
        }
      </div>
    </div>
  );
};

export default PostBar;
