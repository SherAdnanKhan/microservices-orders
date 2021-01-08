import React from 'react';

const MeuzmLogoMedium = () => {
  return (
    <div className='cubescroll'>
      <div className="procu_">
        <div className="scene">
          <div className="cube">
            <div
              className="cube-face  cube-face-front"
              style={{
                backgroundColor: 'black',
                borderColor: 'white',
                boxShadow: '0 0 20px white'
              }}
            >
              <img alt="" src='/assets/images/logowhite.png' height="100%" />
            </div>
            <div
              className="cube-face  cube-face-back"
              style={{
                backgroundColor: 'black',
                borderColor: 'white',
                boxShadow: '0 0 20px white'
              }}
            >
              <img alt="" src='/assets/images/logowhite.png' height="100%" />
            </div>
            <div
              className="cube-face  cube-face-left"
              style={{
                backgroundColor: 'black',
                borderColor: 'white',
                boxShadow: '0 0 20px white'
              }}
            >
              <img alt="" src='/assets/images/logowhite.png' height="100%" />
            </div>
            <div
              style={{
                backgroundColor: 'black',
                borderColor: 'white',
                boxShadow: '0 0 20px white'
              }}
              className="cube-face  cube-face-right"
            >
              <img alt="" src='/assets/images/logowhite.png' height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MeuzmLogoMedium;
