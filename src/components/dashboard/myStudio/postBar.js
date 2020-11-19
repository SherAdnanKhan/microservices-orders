import React from 'react';
import { useHistory } from 'react-router-dom';
import ToolTip from "../../common/toolTip/toolTip";

const PostBar = ({ myStudio, activeGallery, gallery, totalPosts, feelColor }) => {
  const history = useHistory();
  return (
    <div
      className="total-post"
      style={{ backgroundColor: feelColor }}
    >
      <div className="icon-side" >
        <i className="fas fa-square " data-for="fullView" data-tip="View Full Post" />
        <i className="fas fa-th" data-for="fullView" data-tip="View All Post" />
        <ToolTip position="top" id="fullView" />
      </div>
      <div className="gallery">
        {!activeGallery &&
          <>
            <p>Select a Gallery</p>
            {myStudio && <p>Total posts: {totalPosts}</p>}
          </>
        }
        {activeGallery &&
          <>
            <p>{activeGallery.title}</p>
            <p>Exhibits : {gallery?.posts?.length} </p>
            <p>Faved by : {gallery?.faved_users.length}</p>
          </>
        }
      </div>
      <div className="heart-icon">

        {activeGallery &&
          <>
            <span
              onClick={() => history.push(`/studio/gallery-followers/${activeGallery.slug}`)}
              data-for="faved"
              data-tip="Faved Users" >
              Faved
                ({gallery && gallery.faved_users.length})
              </span>
            <ToolTip postion="left" id="faved" />
            <img
              src="/assets/images/add.png"
              className="clickable"
              onClick={() => history.push(`/exhibition?gallery=${activeGallery.id}`)}
              alt=""
              data-for="addExhibitionMy"
              data-tip="Add Exhibition"
            />
            <ToolTip postion="left" id="addExhibitionMy" />
          </>
        }
      </div>
    </div>
  );
};

export default PostBar;
