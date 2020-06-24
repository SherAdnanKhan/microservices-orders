import React from 'react';
import Like from '../../common/like';

const PostBar = ({
  gallery, activeGallery,
  onPostLike, totalPosts, galleryPrivacy
}) => {
  const isAllowed = () => {
    if (!activeGallery) return false;
    const found = galleryPrivacy?.find(g => g.gallery_id === activeGallery.id);
    return found && found.is_allowed === 1 ? true : false;
  };

  return (
    <div className="total-post">
      <div className="icon-side">
        {activeGallery && isAllowed() &&
          <>
            <i className="fas fa-square" />
            <i className="fas fa-th" />
          </>
        }
      </div>
      <div className="gallery">
        {!activeGallery &&
          <>
            <p>Select a Gallery</p>
            <p>Total posts: {totalPosts}</p>
          </>
        }
        {(activeGallery && isAllowed()) &&
          <p>Total Post: {activeGallery.posts.length}</p>
        }
      </div>
      <div className="heart-icon">
        {activeGallery &&
          gallery && isAllowed() &&
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
