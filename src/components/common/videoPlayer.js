import React, { useRef } from 'react'
import VizSensor from 'react-visibility-sensor';

const VideoPlayer = ({ path }) => {
  const videoRef = useRef();

  const handleVisibility = isVisible => {
    if (isVisible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <VizSensor onChange={handleVisibility}>
      <video
        ref={ref => videoRef.current = ref}
        className='lobby-video'
        controls
        onClick={e => e.preventDefault()}
      >
        <source src={path} type="video/mp4" />
        <source src={path} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </VizSensor>
  );
};

export default VideoPlayer;
