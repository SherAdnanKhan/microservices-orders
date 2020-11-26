import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNcomm, clearNcomm } from "../../../actions/postAction";
import ShowMoreText from 'react-show-more-text';
import ImageVideoSlider from "../../common/imageVideoSlider";
import { completeFormattedDate } from "../../../utils/helperFunctions";
import ToolTip from "../../common/toolTip/toolTip";
import Stroke from "../../common/stroke";
import Comment from "../viewPost/comments";
import { getCurrentUser } from "../../../actions/authActions";
import { useHistory } from "react-router-dom";

const PostFooter = ({ post, onStroke, onUnStroke }) => {
  const dispatch = useDispatch();
  const [hasNcomm, setHasNcomm] = useState(false);
  const history = useHistory();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const {
    postView: { ncomm },
  } = useSelector(state => state);

  const handleNcomm = post => {
    if (!getCurrentUser()) {
      history.push("/login")
    }
    else {
      if (hasNcomm) {
        setHasNcomm(false);
        dispatch(clearNcomm());
      } else {
        setHasNcomm(true);
        dispatch(getNcomm(post?.post.slug));
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearNcomm());
    }
  }, [dispatch]);

  const handleOpenCommentModal = () => {
    setShowCommentModal(true);
  }

  return (
    <div className="post-footer">
      {showCommentModal &&
        <Comment
          post={post?.post}
          onClose={() => setShowCommentModal(false)}
        />
      }

      <ImageVideoSlider ncomm={ncomm} />

      <h3 className="post-title">{post?.post?.title}</h3>

      <div className="post-footer-bar">
        <div className="poster-footer-stokes-btn">
          <Stroke
            hasStroke={post?.has_stroke}
            className="strk-img"
            onStroke={() => onStroke(post)}
            onUnstroke={() => onUnStroke(post)}
          />

          <ToolTip id="stroke" />
          <p>strokes {post?.post?.stroke_users_count}</p>
        </div>
        <div className="post-footer-icons">
          <img
            className="post-non-color-icon open-commet clickable"
            src="/assets/images/crit1.png"
            alt=""
            data-for="comments"
            data-tip="comments"
            onClick={() => handleOpenCommentModal(post)}
          />
          <ToolTip id="comments" />
          <p> comments {post?.post?.comments_count} </p>
        </div>
        <div
          className="post-footer-icons action-w"
          data-for="ncomm"
          data-tip="ncomm">
          {post &&
            <img
              className="post-non-color-icon clickable"
              src="/assets/images/ncommnicon.png"
              onClick={() => handleNcomm(post)}
              alt=""
            />
          }
          <ToolTip id="ncomm" />
        </div>
      </div>
      <div className='post-description' style={{ width: '80%', textAlign: 'center' }}>
        {post &&
          <ShowMoreText
            lines={2}
            more={<a style={{
              color: post?.post?.user?.feel?.color_code
            }} href="/"> View more </a>
            }
            less={<a style={{
              color: post?.post?.user?.feel?.color_code
            }} href="/"> View less </a>
            }
            expanded={false}
            width={600}
          >
            {post?.post?.description}
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
            color: post?.post?.user?.feel?.color_code
          }}
        >
          {completeFormattedDate(post?.post?.created_at)}
        </div>
      }
    </div>
  )
}
export default PostFooter;