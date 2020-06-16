import React from 'react';
import Avatar from "../../common/avatar";
import { Link } from 'react-router-dom';

const LobbyPosts = ({ post }) => {
  return (
    <div className="post-page">
      <div className="post-head">
        <p>{post.user.username}</p>
        <Link to={`/dashboard/studio/${post.user.slug}`} >
          <Avatar avatars={post.user.avatars && post.user.avatars} feelColor={post.user.feel_color} />
        </Link>
        {post.user.art &&
          <>
            {post.user.art.parent && post.user.art.parent.name + '/'}
            {post.user.art.name && post.user.art.name}
          </>
        }
      </div>
      <div className="post-body">
        {post.post_type === 2
          ? (
            <video width="320" height="240" controls>
              <source src={post.image.path} type="video/mp4" />
              <source src={post.image.path} type="video/ogg" />
           Your browser does not support the video tag.
            </video>
          ) : (
            <img src={post.image.path} alt="" stye={{ width: "100%", heigth: "100%" }} />
          )
        }

      </div>
      <div className="onearttitle">
        <p>{post && post.title}</p>
      </div>
    </div>
  );
}

export default LobbyPosts;