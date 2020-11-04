import React from 'react';

const ProgressBar = ({ progress, feelColor }) => {
  return (
    <div>
      <div className='progressBar'>
        <span className="text"> {progress}% </span>
        <div
          className="percent"
          style={{
            width: `${progress}%`,
            backgroundColor: feelColor
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
