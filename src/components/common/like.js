import React from 'react';

const Like = ({ faved, onLike }) => {
  return (
    <>
      {!faved
        ? (
          <img
            src="/assets/images/catfave.png"
            className="clickable"
            onClick={onLike}
            alt=""
          />
        ) : (
          <img
            src="/assets/images/catfaveon.png"
            className="clickable"
            onClick={onLike}
            alt=""
          />
        )
      }
    </>
  );
};

export default Like;
