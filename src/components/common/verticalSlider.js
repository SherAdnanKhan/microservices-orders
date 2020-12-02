import React from 'react';

const VerticalSlider = ({ dataLength, next, hasMore, children }) => {
  return (
    <div className="my-slider-vertical">
      {children && children}
    </div>
  );
};

export default VerticalSlider;
