import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ gallery }) => {
  return (
    <div className="wrapper  ">
      <div className="screen">
        <div className="post-picture">
          {gallery &&
            gallery.posts.map((post, index) => (
              <div key={index} className="">
                <Link to={`/dashboard/viewpost/${post.slug}`}>
                  <img src={`${post.image.path}`} alt="" style={{ width: '300px', height: "300px" }} />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Post;
