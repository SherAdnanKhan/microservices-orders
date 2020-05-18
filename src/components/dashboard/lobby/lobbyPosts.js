import React from 'react';
import Avatar from "../../common/avatar";
import { Link } from 'react-router-dom';

const LobbyPosts = ({ post }) => {
  console.log(post.user.avatars);
  return (
    <div className="post-page">
      <div className="post-head">
        <p>{post.user.username}</p>
        <Link to={`/dashboard/studio/${post.user.slug}`} >
          <Avatar avatars={post.user.avatars} />
        </Link>
        {post &&
          post.user &&
          post.user.art.parent
          ? <p>{post.user.art.parent.name}/{post.user.art}</p>
          : post.user.art.name && <p>{post.user.art.name}</p>
        }
      </div>
      <div className="post-body">
        {post && post.image && post.image.path && <img src={post.image.path} alt="" stye={{ width: "100%", heigth: "100%" }} />}
      </div>
    </div>
  );
}

export default LobbyPosts;