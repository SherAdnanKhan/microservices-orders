import React from 'react';

const StudioFooter = ({ gallery }) => {
  return (
    <>
      <div className="wrapper">
        <div className="screen">
          <div className="">
            {gallery &&
              gallery.posts.map((gallery, index) => (
                <div className="post-picture" key={index} >
                  <img src={`${gallery?.image.path}`} alt="" />
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
