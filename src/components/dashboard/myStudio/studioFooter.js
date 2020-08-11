import React from 'react';
import Avatar from '../../common/avatar';

const StudioFooter = ({ gallery, user }) => {
  return (
    <>
      <div className="wrapper">
        <div className="screen">
          <div className="post-picture">
            {gallery &&
              gallery.posts.map((gallery, index) => (
                <div className="" key={index}>
                  {gallery.post_type === 2
                    ? (
                      <video width="320" height="220" controls>
                        <source src={gallery.image && gallery.image.path} type="video/mp4" />
                        <source src={gallery.image && gallery.image.path} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={`${gallery.image && gallery.image.path}`} alt="" />
                    )
                  }
                </div>
              ))}
          </div>

          <div className="show-list">
            {gallery &&
              gallery.posts.map((post, index) => (
                <div className="list-body" key={index}>
                  <div className="s-l-header">
                    <p>{user && user.username}</p>
                    <Avatar avatars={user && user.avatars} feelColor={user && user.feel.color_code} />
                    {user && user.art &&
                      <>
                        {user.art.parent && user.art.parent.name + '/'}
                        {user.art.name && user.art.name}
                      </>
                    }
                  </div>
                  {post.post_type === 2
                    ? (
                      <video width="320" height="240" controls>
                        <source src={post.image.path} type="video/mp4" />
                        <source src={post.image.path} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={`${post.image.path}`} alt="" />
                    )
                  }
                  <p style={{ textAlign: 'center' }}>{post.title && post.title}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="wrapper">
        <p className="footer-text"> Meuzm </p>
      </div>
    </>
  );
};

export default StudioFooter;
