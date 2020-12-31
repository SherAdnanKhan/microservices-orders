import React from 'react';

const TimerLine = ({ progress, feelColor, timeerCount }) => {
  return (
    <div className='timerLine'>
      <span className="endTime"> 15</span>
      {/* <span className="text"> {progress}% </span> */}
      <div
        className="percent"
        style={{
          width: `${progress}%`,
          backgroundColor: feelColor
        }}
      >
        <span className="timerCount"> {timeerCount} </span>
      </div>
      <span className="startTime"> 0 </span>
    </div>
  )
}

export default TimerLine;
