import React from 'react';

const Spinner = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'rgba(241, 242, 243, 0) none repeat scroll 0% 0%', display: 'block' }} width="10%" height="10%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <path d="M10 50A40 40 0 0 0 90 50A40 42.3 0 0 1 10 50" fill="#d4d4d4" stroke="none">
          <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.15;360 50 51.15" />
        </path>
      </svg>
    </>
  )
}

export default Spinner;
