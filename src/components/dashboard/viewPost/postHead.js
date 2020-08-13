import React from 'react';
import Avatar from "../../common/avatar";
import { Link } from 'react-router-dom';

const PostHead = ({ post }) => {
  return (
    <div className="post-head">
      {post &&
        <div className="post-heder-inner">
          {<p>{post.user.username}</p>}
          {
            <Link to={`/dashboard/studio/${post.user.slug}`} >
              <Avatar
                avatars={post.user.avatars}
                feelColor={post.user.feel.color_code}
              />
            </Link>
          }
          <>
            {post?.user?.art?.parent && post.user.art.parent.name + '/'}
            {post?.user?.art?.name && post.user.art.name}
          </>
        </div>
      }
    </div >
  );
};

export default PostHead;