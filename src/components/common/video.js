import React, { useRef, useState } from 'react';

const Video = ({ url }) => {
  const videoRef = useRef();
  const [duration, setDuration] = useState('');

  const handleReady = () => {
    setDuration(duration => Math.floor(videoRef.current.duration));
  };

  return (
    <div>
      <video
        width="320"
        height="240"
        controls
        ref={videoRef}
        onCanPlay={handleReady}
      >
        <source src={url} type="video/mp4" />
        <source src={url} type="video/ogg" />
        <source src={url} type="video/mov" />
        <source src={url} type="video/mpeg" />
       Your browser does not support the video tag.
      </video>
      <div style={{ opacity: duration ? 1 : 0 }}>
        {
          <>
            vm
            <i className="fas fa-video" style={{ margin: '0 5px', fontSize: '11px' }}></i>
            .{duration}
          </>
        }
      </div>
    </div>
  )
}

export default Video
