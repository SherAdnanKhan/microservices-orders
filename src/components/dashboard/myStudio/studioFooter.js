import React from 'react';
import Avatar from '../../common/avatar';
import ImagePostOption from "../../common/ImagePostOption";
import ImageVideoSlider from "../../common/imageVideoSlider";
import Stroke from "../../common/stroke";
import Comment from '../../dashboard/viewPost/comments';
import { Link } from "react-router-dom";
import ShowMoreText from 'react-show-more-text';
import ToolTip from "../../common/toolTip/toolTip";

const StudioFooter = ({ gallery, user, activePost, handleActivePost,
  activeGallery, onUnFavGallery, onReportPost, onModelDelete, onSharePost,
  onShareStrqModel, onStrqShare, onTurnOffCrtiques, onRepostModal, onMzFlashModal,
  onNcomm, onStroke, onUnStroke, activeNcomm, ncomm, post, onVault
}) => {
  return (
    <>
      <div className="wrapper">
        <div className="screen">
          <div className="post-picture">
            {gallery &&
              gallery.posts.map((gallery, index) => (
                <div className="" key={index}>
                  <Link to={`/dashboard/viewpost/${gallery?.slug}`}>
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
                  </Link>
                </div>
              ))}
          </div>

          <div className="show-list">
            {gallery &&
              gallery.posts.map((post, index) => (
                <div className="list-body" key={index}>
                  <div className="s-l-header">
                    <p>{user && user.username}</p>
                    <Avatar
                      user={user}
                    />
                    {user && user.art &&
                      <>
                        {user.art.parent && user.art.parent.name + '/'}
                        {user.art.name && user.art.name}
                      </>
                    }
                  </div>
                  <div className="image-option-box">
                    <ImagePostOption
                      post={activePost}
                      onUnFavGallery={onUnFavGallery}
                      onSharePost={onSharePost}
                      onReportPost={onReportPost}
                      onModelDelete={onModelDelete}
                      onStrqShare={onStrqShare}
                      onShareStrqModel={onShareStrqModel}
                      onTurnOffCrtiques={onTurnOffCrtiques}
                      onRepostModal={onRepostModal}
                      onMzFlashModal={onMzFlashModal}
                      onVault={onVault} />
                  </div>
                  <div
                    className={
                      activePost?.id === post?.id
                        ? 'valut-icon show-valut'
                        : 'valut-icon'
                    }
                  >
                    <div style={{ marginRight: "auto", paddingLeft: "15px", paddingTop: "20px" }}>
                      <i className="fa fa-ellipsis-v" aria-hidden="true" data-tip="More" data-for="more" ></i>
                      <ToolTip position="top" id="more" />
                    </div>
                    <img className="valut-img" alt="" src="/assets/images/vaulticon.png" data-for="vault" />
                    <ToolTip position="bottom" id="vault" />
                  </div >
                  <div onClick={() => handleActivePost(post)}>

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
                  <div
                    className={
                      activeNcomm === post
                        ? 'ncomm-slider show'
                        : 'ncomm-slider'
                    }
                  >
                    <ImageVideoSlider ncomm={ncomm} />
                  </div>
                  <div className={
                    activePost.id === post.id
                      ? 'lobby-icon lobby-icon-slide'
                      : 'lobby-icon'
                  }>
                    <div className="strk-btn">
                      <Stroke
                        className="strk-img"
                        hasStroke={post.has_stroke.length}
                        onStroke={() => onStroke(post)}
                        onUnstroke={() => onUnStroke(post)}
                      />
                      <ToolTip position="bottom" />
                      <p> strokes {post.stroke_users_count} </p>
                    </div>

                    <div className="action">
                      <img
                        className="comment-img open-commet clickable"
                        alt=""
                        src="/assets/images/crit1.png"
                        data-tip="Comments"
                        data-for="comments"
                      />
                      <ToolTip position="bottom" id="comments" />
                      <p> comments {post.comments.length}</p>
                    </div>
                    <div className="action">
                      <img
                        className="comment-img clickable"
                        alt=""
                        src="/assets/images/ncommnicon.png"
                        onClick={() => onNcomm(post)}
                        data-tip="Ncomm"
                        data-for="ncomm"
                      />
                      <ToolTip position="bottom" id="ncomm" />
                    </div>
                  </div>
                  <div className='post-description' style={{ width: '100%', textAlign: 'center' }}>
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
                </div>
              ))
            }
            <Comment post={activePost} />
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
