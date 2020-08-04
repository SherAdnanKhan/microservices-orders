import React from 'react';
import Avatar from "../../common/avatar";
import { Link } from 'react-router-dom';
import Stroke from '../../common/stroke';
import Comment from '../viewPost/comments';
import { completeFormattedDate } from '../../../utils/helperFunctions';
import ImageVideoSlider from '../../common/imageVideoSlider';
import VideoPlayer from '../../common/videoPlayer';
import LobbyPostOption from './lobbyPostOption';


const LobbyPosts = ({
  post, ncomm, onClickNcomm,
  activeNcomm, onActivePost, activePost, onModelDelete,
  onStrokePost, onUnstrokePost, onUnFavGallery, onSharePost
}) => {
  return (
    <div className="post-page">
      <div className="post-head">
        <p className="usernames">
          <Link to={`/dashboard/studio/${post.user.slug}?gallery=${post.gallery_id}`}>
            {post.user.username}
          </Link>
        </p>
        <Link to={`/dashboard/studio/${post.user.slug}?gallery=${post.gallery_id}`}>
          <Avatar avatars={post.user.avatars && post.user.avatars} feelColor={post.user.feel.color_code} />
        </Link>
        {post.user.art &&
          <>
            {post.user.art.parent && post.user.art.parent.name + '/'}
            {post.user.art.name && post.user.art.name}
          </>
        }
      </div>
      <div className="image-option-box">
        <LobbyPostOption post={activePost} onUnFavGallery={onUnFavGallery} onSharePost={onSharePost} onModelDelete={onModelDelete} />
      </div>
      <div className={
        activePost.id === post.id
          ? 'valut-icon show-valut'
          : 'valut-icon'
      }>
        <i className="fa fa-ellipsis-v" aria-hidden="true" ></i>
        <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
      </div>
      <div className="post-body" onClick={() => onActivePost(post)}>
        {post.post_type === 2
          ? (
            <VideoPlayer
              path={post.image.path}
            />
          ) : (
            <img src={post.image.path} alt="" stye={{ width: "100%", heigth: "100%" }} />
          )
        }
      </div>

      <div
        className={
          activeNcomm === post
            ? 'ncomm-slider show'
            : 'ncomm-slider'
        }
      >
        <ImageVideoSlider ncomm={ncomm} />
      </div>


      <div className="onearttitle">
        <p>{post && post.title}</p>
        <div className={
          activePost.id === post.id
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
              <p> strokes {post.stroke_users.length} </p>
            </div>
          </div>
          <div className="action">
            <img
              className="comment-img open-commet clickable"
              alt=""
              src="/assets/images/crit1.png"
            />
            <p> comments {post.comments.length} </p>
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
          activePost.id === post.id
            ? 'lobby-icon time-div lobby-icon-slide'
            : 'lobby-icon time-div'
        }>
          <div className=" time-row">
            <p
              className='lobby-post-time'
              style={{ color: post.user.feel.color_code }}
            >
              {completeFormattedDate(post.created_at)}
            </p>
          </div>
        </div>

      </div>
      {activePost.id === post.id && <Comment post={activePost} />}
    </div >
  );
}

export default LobbyPosts;