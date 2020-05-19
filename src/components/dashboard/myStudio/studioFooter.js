import React from 'react';

const StudioFooter = ({ gallery }) => {
  return (
    <>
      <div className="wrapper">
        <div className="screen">
          <div className="scr-inner">
            {gallery &&
              gallery.posts.map((gallery, index) => (
                <div key={index}>
                  <img src={`${gallery?.image.path}`} alt="" style={{ width: '300px', height: "300px" }} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="wrapper">
        <p className="footer-text">production of: QuetzalArtz x R&amp;R </p>
      </div>
    </>
  );
};

export default StudioFooter;
