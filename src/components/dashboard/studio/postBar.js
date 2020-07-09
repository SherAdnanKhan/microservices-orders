import React from 'react';
import Like from '../../common/like';
import { FAVES } from '../../../constants/privacyTypes';
import { useHistory } from 'react-router-dom';

const PostBar = ({
  gallery, activeGallery,
  onPostLike, totalPosts, galleryPrivacy
}) => {

  const history = useHistory();

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
        {(activeGallery?.privacy?.privacy_type_id === FAVES || isAllowed())
          && gallery &&
          <>
            <img
              src="/assets/images/fave_gallery_empty.png"
              className="clickable"
              onClick={() => history.push(`/dashboard/studio/gallery-followers/${activeGallery.slug}`)}
              alt=""
            />
            <Like
              faved={gallery.has_faved}
              onLike={onPostLike}
            />
          </>
        }
      </div>
    </div>
  );
};

export default PostBar;
