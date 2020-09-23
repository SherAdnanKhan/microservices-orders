import React from 'react';

const Like = ({ faved, onLike }) => (
  <>
    <img
      src={`/assets/images/${faved ? 'FaveGalleryFull.png' : 'fave_gallery_empty.png'}`}
      className="clickable"
      onClick={onLike}
      alt=""
      data-tip={faved ? "unfav gallery" : "fav gallery"}
      data-for="fav"
    />
  </>
);

export default Like;
