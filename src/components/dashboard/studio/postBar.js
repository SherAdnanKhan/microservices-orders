import React from 'react';
import Like from '../../common/like';
import { FAVES } from '../../../constants/privacyTypes';
import { useHistory } from 'react-router-dom';
import ToolTip from "../../common/toolTip/toolTip";

const PostBar = ({
  gallery, activeGallery,
  onFave, totalPosts, galleryPrivacy, user
}) => {

  const history = useHistory();
  const isAllowed = () => {
    if (!activeGallery) return false;
    const found = galleryPrivacy?.find(g => g.gallery_id === activeGallery.id);
    return found && found.is_allowed === 1 ? true : false;
  };
  return (
    <div
      className="total-post"
      style={{ backgroundColor: user?.feel.color_code }}
    >
      <div className="icon-side">
        {activeGallery && isAllowed() &&
          <>
            <i className="fas fa-square" data-for="fullView" data-tip="full view" />
            <ToolTip position="bottom" id="fullView" />
            <i className="fas fa-th" data-for="partialView" data-tip="partial view" />
            <ToolTip position="bottom" id="partialView" />
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
        {(activeGallery) &&
          <>
            <p>{activeGallery.title}</p>
            <p>Exhibits Faved by: {gallery?.faved_users.length}</p>
          </>
        }
      </div>
      <div className="heart-icon">
        {(activeGallery?.privacy?.privacy_type_id === FAVES || isAllowed())
          && gallery &&
          <>
            <span onClick={() => history.push(`/dashboard/studio/gallery-followers/${activeGallery.slug}`)} data-for="favedUsersList" data-tip="faved users">Faved({gallery && gallery.faved_users.length})</span>
            <ToolTip position="bottom" id="favedUsersList" />
            <Like    //heart with brush icon
              faved={gallery.has_faved}
              onLike={onFave}
            />
            <ToolTip position="bottom" id="fav" />
          </>
        }
      </div>
    </div >
  );
};

export default PostBar;
