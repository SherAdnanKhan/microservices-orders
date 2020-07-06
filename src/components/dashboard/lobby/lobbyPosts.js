import React from 'react';
import Avatar from "../../common/avatar";
import { Link } from 'react-router-dom';
import Stroke from '../../common/stroke';
import Comment from '../viewPost/comments';
import { completeFormattedDate } from '../../../utils/helperFunctions';
import ImageVideoSlider from '../../common/imageVideoSlider';

const LobbyPosts = ({
  post, ncomm, onClickNcomm,
  activeNcomm, onActivePost, activePost,
  onStrokePost, onUnstrokePost
}) => {

  return (
    <div className="post-page">
      <div className="post-head">
        <p className="usernames">
          <Link to={`/dashboard/studio/${post.user.slug}`} >
            {post.user.username}
          </Link>
        </p>
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
      <div className={
        activePost === post
          ? 'valut-icon show-valut'
          : 'valut-icon'
      }>
        <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
      </div>
      <div className="post-body" onClick={() => onActivePost(post)}>
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
      {activeNcomm === post &&
        <ImageVideoSlider ncomm={ncomm} />
      }
      <div className="onearttitle">
        <p>{post && post.title}</p>
        <div className={
          activePost === post
            ? 'lobby-icon lobby-icon-slide'
            : 'lobby-icon'
        }>
          <div className="action">
            <div className="strk-btn">
              <Stroke
                hasStroke={post.has_stroke.length}
                className="strk-img"
                onStroke={() => onStrokePost(post)}
                onUnstroke={() => onUnstrokePost(post)}
              />
              {post.stroke_users.length}
            </div>
          </div>
          <div className="action">
            <img className="comment-img open-commet" alt="" src="/assets/images/crit1.png" />
            {post.comments.length}
          </div>
          <div className="action">
            <img
              className="comment-img clickable"
              alt=""
              src="/assets/images/ncommnicon.png"
              onClick={() => onClickNcomm(post)}
            />
          </div>
        </div>
        <div className={
          activePost === post
            ? 'lobby-icon time-div lobby-icon-slide'
            : 'lobby-icon time-div'
        }>
          <div className=" time-row">
            <p className={`lobby-post-time ${post.user.feel_color}`}>
              {completeFormattedDate(post.created_at)}
            </p>
          </div>
        </div>

      </div>
      {activePost === post && <Comment post={activePost} />}
    </div >
  );
}

export default LobbyPosts;