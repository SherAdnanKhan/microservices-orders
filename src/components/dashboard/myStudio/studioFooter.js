import React from 'react';

const StudioFooter = ({ gallery }) => {
  return (
    <>
      <div className="wrapper">
        <div className="screen">
          <div className="post-picture">
            {gallery &&
              gallery.posts.map((gallery, index) => (
                <div className="" key={index} >
                  <img src={`${gallery?.image.path}`} alt="" />
                  </div>
              ))}
          </div>

          <div className="show-list">
            <div className="s-l-header">
              <p>user name</p>
              <div className="artcubecase">
                <div className="procusmallmove">
                  <div className="scenesmall">
                    <a href="studio.php?idstudio=4&gal=1">
                      <div className="cubesmallmove">
                        <div className="cube-facesmall  cube-face-frontsmall" ><img src="/assets/images/logowhite.png" height="100%" /></div>
                        <div className="cube-facesmall  cube-face-backsmall" ><img src="/assets/images/logowhite.png" height="100%" /></div>
                        <div className="cube-facesmall  cube-face-leftsmall" ><img src="/assets/images/logowhite.png" height="100%" /></div>
                        <div className="cube-facesmall  cube-face-rightsmall"><img src="/assets/images/logowhite.png" height="100%" /></div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <p>Postion</p>
            </div>
            <div className="list-body">
              <img src="/assets/images/limegreen.png" />
            </div>
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
