import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar';

const Post = ({ gallery, user }) => {
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
            <p>{user && user.username}</p>
            <Avatar avatars={user && user.avatars} />
            {user && user.art &&
              <>
                {user.art.parent && user.art.parent.name + '/'}
                {user.art.name && user.art.name}
              </>
            }
          </div>
          {gallery &&
            gallery.posts.map((post, index) => (
              <div className="list-body">
                <img src={post.image.path} alt="" />
                <p style={{ textAlign: 'center' }}>{post.title && post.title}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Post;
