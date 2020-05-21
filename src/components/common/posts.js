import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ gallery }) => {
  return (
    <div className="wrapper">
      <div className="screen">
        <div className="post-picture">
          {gallery &&
            gallery.posts.map((post, index) => (
              <div key={index} className="">
                <Link to={`/dashboard/viewpost/${post.slug}`}>
                  <img src={`${post.image.path}`} alt="" />
                </Link>
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
                      <div className="cube-facesmall  cube-face-frontsmall" ><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-backsmall" ><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-leftsmall" ><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-rightsmall"><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <p>Postion</p>
          </div>
          <div className="list-body">
            <img src="/assets/images/limegreen.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;
