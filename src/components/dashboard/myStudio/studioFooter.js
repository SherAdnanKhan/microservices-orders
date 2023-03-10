import React, { useState } from 'react';
import Avatar from '../../common/avatar';
import ImagePostOption from "../../common/ImagePostOption";
import ImageVideoSlider from "../../common/imageVideoSlider";
import Stroke from "../../common/stroke";
import Comment from '../../dashboard/viewPost/comments';
import { Link } from "react-router-dom";
import ShowMoreText from 'react-show-more-text';
import ToolTip from "../../common/toolTip/toolTip";
import { LazyLoadImage } from "react-lazy-load-image-component";

const StudioFooter = ({ gallery, user, activePost, handleActivePost,
  activeGallery, onUnFavGallery, onReportPost, onModelDelete, onSharePost,
  onShareStrqModel, onTurnOffCrtiques, onRepostModal, onMzFlashModal,
  onNcomm, onStroke, onUnStroke, activeNcomm, ncomm, onAddVault
}) => {

  const [commentModal, setCommentModal] = useState(false);

  return (
    <>
      <div className="wrapper">
        <div className="screen">
          <div className="post-picture">
            {gallery &&
              gallery?.posts?.map((gallery, index) => (
                <div key={index}>

                  <Link to={`/viewpost/${gallery?.slug}`}>
                    {gallery.post_type === 2
                      ? (
                        <>
                          <p id="post-title">{gallery.title}</p>
                          <video width="320" height="220" controls>
                            <source src={gallery?.image?.path} type="video/mp4" />
                            <source src={gallery?.image?.path} type="video/ogg" />
                              Your browser does not support the video tag.
                          </video>
                        </>
                      ) : (
                        <>
                          <p id="post-title"> {gallery?.title}</p>
                          <LazyLoadImage
                            alt=""
                            src={gallery?.image?.path}
                          />
                        </>
                      )
                    }
                  </Link>
                </div>
              ))}
          </div>
          <div className="show-list">
            {gallery &&
              gallery?.posts?.map((post, index) => (
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
                      onShareStrqModel={onShareStrqModel}
                      onTurnOffCrtiques={onTurnOffCrtiques}
                      onRepostModal={onRepostModal}
                      onMzFlashModal={onMzFlashModal}
                      onAddVault={onAddVault} />
                  </div>
                  <div
                    className={
                      activePost?.id === post?.id
                        ? 'valut-icon show-valut'
                        : 'valut-icon'
                    }
                  >
                    <div style={{ marginRight: "auto", paddingLeft: "15px", paddingTop: "20px" }}>
                      <i className="fa fa-ellipsis-v postOptions" aria-hidden="true" data-tip="More" data-for="more" ></i>
                      <ToolTip position="top" id="more" />
                    </div>
                    <img
                      className="valut-img"
                      alt=""
                      src="/assets/images/vaulticon.png"
                      data-tip="vault"
                      data-for="vault"
                      onClick={() => onAddVault(post)}
                    />
                    <ToolTip position="top" id="vault" />
                  </div >
                  <div onClick={() => handleActivePost(post)}>
                    {post.post_type === 2
                      ? (
                        <>
                          <p id="post-title">{post?.title}</p>
                          <video width="320" height="240" controls>
                            <source src={post?.image?.path} type="video/mp4" />
                            <source src={post?.image?.path} type="video/ogg" />
                              Your browser does not support the video tag.
                          </video>
                        </>
                      ) : (
                        <>
                          <p id="post-title">{post?.title}</p>
                          <LazyLoadImage
                            alt="image"
                            src={post?.image?.path}
                          />
                        </>
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
                        hasStroke={post.has_stroke_count}
                        onStroke={() => onStroke(post)}
                        onUnstroke={() => onUnStroke(post)}
                      />
                      <ToolTip position="bottom" id="stroke" />
                      <p> strokes {post.stroke_users_count} </p>
                    </div>
                    <div className="action">
                      <img
                        className="comment-img clickable"
                        alt=""
                        src="/assets/images/crit1.png"
                        data-tip="Comments"
                        data-for="comments"
                        onClick={() => setCommentModal(true)}
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
                  <div className={
                    activePost.id === post.id
                      ? "lobby-icon lobby-icon-slide"
                      : "lobby-icon"
                  }>
                    <div
                      className='post-description'
                      style={{ width: '100%', textAlign: 'center' }}>
                      {post &&
                        <ShowMoreText
                          lines={2}
                          more={<a style={{
                            color: post?.user?.feel?.color_code
                          }} href="/"> View more </a>
                          }
                          less={<a style={{
                            color: post?.user?.feel?.color_code
                          }} href="/"> View less </a>
                          }
                          expanded={false}
                          width={600}
                        >
                          {post?.description}
                        </ShowMoreText>
                      }
                    </div>
                  </div>
                </div>
              ))
            }
            {commentModal &&
              <Comment
                post={activePost}
                onClose={() => setCommentModal(false)} />
            }
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
