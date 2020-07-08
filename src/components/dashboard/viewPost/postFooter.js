import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNcomm, clearNcomm } from "../../../actions/postAction";

import ImageVideoSlider from "../../common/imageVideoSlider";

const PostFooter = ({ post, comments, handleStoke, handleUnStoke }) => {
  const dispatch = useDispatch();
  const {
    postView: { ncomm },
  } = useSelector(state => state);

  const handleNcomm = post => {
    dispatch(getNcomm(post.post.slug));
  };

  console.log(post);

  useEffect(() => {
    return () => {
      dispatch(clearNcomm());
    }
  }, [dispatch]);

  const hasAllowedCritiques = () => {
    return post && post.other_privacy.is_allowed ? true : false;
  };

  return (
    <div className="post-footer">

      <ImageVideoSlider ncomm={ncomm} />

      {post && post.post && post.post.title &&
        <h3 className="post-title">{post.post.title}</h3>
      }

      <div className="post-footer-bar">
        <div className="poster-footer-stokes-btn">
          {post && post.has_stroke
            ? (
              <img
                className="post-color-icon"
                src="/assets/images/strokeiconfull.png"
                alt=""
                onClick={handleUnStoke}
              />
            ) : (
              <img
                className="post-non-color-icon"
                src="/assets/images/strokeiconem.png"
                alt=""
                onClick={handleStoke}
              />
            )
          }
          <p>strokes {post && post.post && post.post.stroke_users_count}</p>
        </div>
        {hasAllowedCritiques() &&
          <div className="post-footer-icons">
            <img
              className="post-non-color-icon open-commet clickable"
              src="/assets/images/crit1.png"
              alt=""
            />
            {comments.length}
          </div>
        }
        <div className="post-footer-icons action-w">
          <img
            className="post-non-color-icon clickable"
            src="/assets/images/ncommnicon.png"
            onClick={() => handleNcomm(post)}
            alt=""
          />
        </div>
      </div>

    </div >
  )
}
export default PostFooter;