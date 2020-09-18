import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNcomm, clearNcomm } from "../../../actions/postAction";
import ShowMoreText from 'react-show-more-text';
import ImageVideoSlider from "../../common/imageVideoSlider";
import { completeFormattedDate } from "../../../utils/helperFunctions";
import ToolTip from "../../common/toolTip/toolTip";

const PostFooter = ({ post, comments, handleStoke, handleUnStoke }) => {
  const dispatch = useDispatch();
  const [hasNcomm, setHasNcomm] = useState(false);
  const {
    postView: { ncomm },
  } = useSelector(state => state);
  const handleNcomm = post => {
    if (hasNcomm) {
      setHasNcomm(false);
      dispatch(clearNcomm());
    } else {
      setHasNcomm(true);
      dispatch(getNcomm(post?.post?.slug));
    }
  };
  useEffect(() => {
    return () => {
      dispatch(clearNcomm());
    }
  }, [dispatch]);

  const hasAllowedCritiques = () => {
    return post && post?.other_privacy?.is_allowed ? true : false;
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
                className="post-color-icon"        //stock icon full
                src="/assets/images/strokeiconfull.png"
                alt=""
                onClick={handleUnStoke}
                data-tip="unStroke"
                data-for="stroke"
              />

            ) : (
              <img
                className="post-non-color-icon"
                src="/assets/images/strokeiconem.png"
                alt=""
                onClick={handleStoke}
                data-tip="Stroke"
                data-for="stroke"
              />
            )
          }
          <ToolTip id="stroke" />
          <p>strokes {post && post?.stroke_users_count}</p>
        </div>
        {hasAllowedCritiques() &&
          <div className="post-footer-icons">
            <img
              className="post-non-color-icon open-commet clickable"
              src="/assets/images/crit1.png"
              alt=""
              data-for="comments"
              data-tip="comments"
            />
            <ToolTip id="comments" />
            <p> comments {comments.length} </p>
          </div>
        }
        <div className="post-footer-icons action-w">
          <img
            className="post-non-color-icon clickable"
            src="/assets/images/ncommnicon.png"
            onClick={() => handleNcomm(post)}
            alt=""
            data-for="ncomm"
            data-tip="ncomm"
          />
          <ToolTip id="ncomm" />
        </div>
      </div>
      <div className='post-description' style={{ width: '80%', textAlign: 'center' }}>
        {post &&
          <ShowMoreText
            lines={2}
            more="View more"
            less="View less"
            expanded={false}
            width={600}
          >
            {post?.description}
          </ShowMoreText>
        }
      </div>
      {post &&
        <div
          className='post-date'
          style={{
            width: '80%',
            marginTop: '20px',
            textAlign: 'left',
            color: post.user.feel.color_code
          }}
        >
          {completeFormattedDate(post.created_at)}
        </div>
      }
    </div>
  )
}
export default PostFooter;