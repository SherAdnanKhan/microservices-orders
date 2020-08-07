import React from 'react';

const Like = ({ faved, onLike }) => (
  <>
    {!faved
      ? (
        <img
          src="/assets/images/fave_gallery_empty.png"
          className="clickable"
          onClick={onLike}
          alt=""
        />
      ) : (
        <img
          src="/assets/images/FaveGalleryFull.png"
          className="clickable"
          onClick={onLike}
          alt=""
        />
      )}
  </>
);

export default Like;
