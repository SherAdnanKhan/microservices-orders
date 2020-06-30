import React from "react";

const PostFooter = ({ post, handleStoke, handleUnStoke }) => {
  const hasAllowedCritiques = () => {
    return post && post.other_privacy.is_allowed ? true : false;
  }

  return (
    <div className="post-footer">
      {post && post.post && post.post.title && <h3 className="post-title">{post.post.title}</h3>}
      <div className="post-footer-bar">
        <div className="poster-footer-stokes-btn" >
          {post && post.has_stroke
            ? (
              <img
                className="post-color-icon"
                src="/assets/images/strokeiconfull.png"
                alt=""
                onClick={(e) => handleUnStoke(e, post && post.post && post.post.id)}
              />
            ) : (
              <img
                className="post-non-color-icon"
                src="/assets/images/strokeiconem.png"
                alt=""
                onClick={(e) => handleStoke(e, post && post.post && post.post.id)}
              />
            )
          }
          <p>strokes {post && post.post && post.post.stroke_users_count}</p>
        </div>
        <div className="post-footer-icons">
          <img className="post-non-color-icon open-commet" src="/assets/images/crit1.png" alt="" />
        </div>
        {hasAllowedCritiques() &&
          <div className="post-footer-icons action-w">
            <img className="post-non-color-icon" src="/assets/images/ncommnicon.png" alt="" />
          </div>
        }
      </div>
      {post && post.post && post.post.title && <div> <h3>{post.post.title}</h3> </div>}
    </div>
  )
}
export default PostFooter;