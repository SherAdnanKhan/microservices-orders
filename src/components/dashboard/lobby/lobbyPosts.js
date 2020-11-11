import React, { useState } from 'react';
import Avatar from "../../common/avatar";
import { Link } from 'react-router-dom';
import Stroke from '../../common/stroke';
import Comment from '../viewPost/comments';
import { completeFormattedDate } from '../../../utils/helperFunctions';
import ImageVideoSlider from '../../common/imageVideoSlider';
import VideoPlayer from '../../common/videoPlayer';
import ImagePostOption from '../../common/ImagePostOption';
import ShowMoreText from 'react-show-more-text';
import DeleteModal from "../../common/deleteModal";
import SharePostModal from '../../common/sharePostModal';
import ReportPostModel from '../../common/reportPostModel';
import SharePostStrqModal from '../../common/sharePostStrqModal';
import TurnOffCrtiqueModal from "../../common/turnOffCritqueModal";
import RepostModal from "../../common/repostModal";
import MzFlashModal from "../../common/mzFlashModal";
import PostModal from "../../dashboard/mzFlashGroup/postModal";
import { useDispatch, useSelector } from 'react-redux';
import { unfavGallery } from '../../../actions/galleryActions';
import {
  getNcomm,
  clearNcomm,
  strokePost,
  storeVault,
  unstrokePost,
  deletePost,
  reportPost,
  changeCritqueStatus,
  repost,
  shareMzFlash
} from '../../../actions/postAction';
import ToolTip from '../../common/toolTip/toolTip';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfiniteScroll from 'react-infinite-scroll-component';

const LobbyPosts = ({ posts, onCallNextPosts, currentPage, postLoader, nextPageUrl }) => {
  const dispatch = useDispatch();
  const [activePost, setActivePost] = useState('');
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [showModelShare, setShowModelShare] = useState(false);
  const [showModelReport, setShowModelReport] = useState(false);
  const [showModelStrqShare, setshowModelStrqShare] = useState(false);
  const [showModalTurnOffCritque, setshowModalTurnOffCritque] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const [showMzFlashModal, setShowMzFlashModal] = useState(false);
  const [showPostModel, setShowPostModel] = useState(false);
  const [imagePath, setImagepath] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [activeNcomm, setActiveNcomm] = useState('');

  const {
    postView: { ncomm }
  } = useSelector(state => state);

  const handlePostShowModel = (value, type, image) => {
    if (value === true) {
      setImagepath(image.path);
      setMediaType(type);
    }
    setShowPostModel(value);
  };

  const handlePostDeleteModel = (post) => {
    setShowDeleteModel(post);
  };

  const handleDelete = (status, post) => {
    setShowDeleteModel(status);
    dispatch(deletePost(post));
  }

  const handleShareModel = (status, post) => {
    setShowModelShare(status);
  };

  const handleUnfavGallery = (gallery) => {
    dispatch(unfavGallery(gallery));
  }

  const handleReportModel = (status, post) => {
    setShowModelReport(status);
  }

  const onReport = (post) => {
    dispatch(reportPost(post.id));
    setShowModelReport(false);
  }

  const handleStrqShareModel = (status, post) => {
    setshowModelStrqShare(status);
  }



  const handleTurnOffCrtiquesModal = (value) => {
    setshowModalTurnOffCritque(value);
  }

  const handleTurnOnOffCrtique = (modalStatus, post, status) => {
    setshowModalTurnOffCritque(modalStatus);
    dispatch(changeCritqueStatus(post, status));

    setActivePost('');
  }

  const handleMzFlashModal = (status) => {
    setShowMzFlashModal(status);
  }

  const handleMzFlash = (status, post) => {
    setShowMzFlashModal(status);
    dispatch(shareMzFlash(post));
  }

  const getSelectedGalleryId = (gallery) => {
    setGalleryId(gallery);
  }

  const handleRepostModal = (status, post) => {
    setShowModalRepost(status);
  }

  const handleRepostLobby = (status, post, gallery) => {
    dispatch(repost(post.id, gallery))
    setShowModalRepost(status);
  }

  const handleVault = (post) => {
    dispatch(storeVault(post))
  }

  const handleOpenCommentModal = () => {
    setCommentModal(true);
  }

  const handleActivePost = post => {
    if (post.id === activePost.id) {
      setActivePost('');
    } else {
      setActivePost(post);
    }
  };

  const handleNcomm = post => {
    dispatch(clearNcomm());
    if (post.id === activeNcomm.id) {
      setActiveNcomm('');
    } else {
      dispatch(getNcomm(post.slug));
      setActiveNcomm(post);
    }
  };

  const handleUnstrokePost = (post) => {
    dispatch(unstrokePost(post.id, post.gallery_id, post.user))
  }

  const handleStrokePost = (post) => {
    dispatch(strokePost(post.id, post.gallery_id, post.user));
  }
  const addVault = (post) => {
    dispatch(storeVault(post))
    handleActivePost("")
  }
  const fetchData = () => {
    onCallNextPosts();
  }



  return (
    <>
      {showDeleteModel &&
        <DeleteModal
          onDelete={handleDelete}
          onModalClose={handlePostDeleteModel}
          activePost={activePost}
          mediaType={mediaType}
          onSharePost={handleShareModel}
        />
      }
      {showModelShare &&
        <SharePostModal
          onModalClose={handleShareModel}
          post={activePost}
        />
      }
      {showModelReport &&
        <ReportPostModel
          onReport={onReport}
          onModalClose={handleReportModel}
          post={activePost}
          selectedGallery={galleryId}
        />
      }
      {showModelStrqShare &&
        <SharePostStrqModal
          onModalClose={handleStrqShareModel}
          post={activePost}
        />
      }
      {showModalRepost &&
        <RepostModal
          onRepost={handleRepostLobby}
          onModalClose={handleRepostModal}
          post={activePost}
          selectedGalleryId={galleryId}
          onGalleryId={getSelectedGalleryId}
        />
      }
      {showModalTurnOffCritque &&
        <TurnOffCrtiqueModal
          onModalClose={handleTurnOffCrtiquesModal}
          post={activePost}
          onHandleCrtique={handleTurnOnOffCrtique}
        />
      }
      {showMzFlashModal &&
        <MzFlashModal
          onModalClose={handleMzFlashModal}
          post={activePost}
          onConfirm={handleMzFlash} />
      }
      {showPostModel &&
        <PostModal
          onPostModalClose={handlePostShowModel}
          imagePath={imagePath}
          mediaType={mediaType}
        />
      }
      <InfiniteScroll
        dataLength={posts?.length}
        next={fetchData}
        hasMore={nextPageUrl ? true : false}
      >
        {posts?.map(post => (
          <div className="post-page" key={post.id}>
            <div className="post-head">
              <p className="usernames">
                <Link to={`/dashboard/studio/${post.user.slug}?gallery=${post.gallery_id}`}>
                  {post.user.username}
                </Link>
              </p>
              <Link to={`/dashboard/studio/${post.user.slug}?gallery=${post.gallery_id}`}>
                <Avatar
                  user={post.user}
                />
              </Link>
              {post.user.art &&
                <>
                  {post.user.art.parent && post.user.art.parent.name + '/'}
                  {post.user.art.name && post.user.art.name}
                </>
              }
            </div>
            <div className="image-option-box">
              <ImagePostOption
                post={activePost}
                onUnFavGallery={handleUnfavGallery}
                onSharePost={handleShareModel}
                onReportPost={handleReportModel}
                onModelDelete={handlePostDeleteModel}
                onShareStrqModel={handleStrqShareModel}
                onTurnOffCrtiques={handleTurnOffCrtiquesModal}
                onRepostModal={handleRepostModal}
                onMzFlashModal={handleMzFlashModal}
                onAddVault={handleVault} />
            </div>
            <div className={
              activePost.id === post.id
                ? "valut-icon show-valut"
                : "valut-icon"
            }
            >
              <i className="fa fa-ellipsis-v postOptions" aria-hidden="true" data-tip="more" data-for="more" ></i>
              <ToolTip id="more" position="top" />
              <img className="valut-img" alt="" src="/assets/images/vaulticon.png" data-tip="vault" data-for="vault" onClick={() => addVault(post)} />
              <ToolTip id="vault" position="top" />
            </div>
            <div
              className="post-body"
              onClick={() => handleActivePost(post)}
            >
              {post.post_type === 2
                ? (
                  <VideoPlayer
                    path={post?.image?.path}
                  />
                ) : (
                  <LazyLoadImage
                    alt=""
                    src={post?.image?.path}
                  />
                )
              }
            </div>

            <div className={
              activeNcomm.id === post.id
                ? "ncomm-slider show"
                : "ncomm-slider"
            }>
              {ncomm?.data &&
                <ImageVideoSlider ncomm={ncomm} />
              }
            </div>
            <div className="onearttitle">
              <p>{post && post.title}</p>

              <div className={
                activePost.id === post.id
                  ? "lobby-icon lobby-icon-slide"
                  : "lobby-icon"
              }
                id={`post${post.id}`}>
                <div className="action">
                  <div className="strk-btn">
                    <Stroke
                      hasStroke={post.has_stroke.length}
                      className="strk-img"
                      onStroke={() => handleStrokePost(post)}
                      onUnstroke={() => handleUnstrokePost(post)}
                    />
                    <ToolTip id="stroke" />
                    <p> strokes {post.stroke_users_count} </p>
                  </div>
                </div>
                <div className="action">
                  <img
                    className="comment-img clickable"
                    alt=""
                    src="/assets/images/crit1.png"
                    onClick={() => handleOpenCommentModal(post)}
                    data-tip="comments"
                    data-for="comments"
                  />
                  <ToolTip id="comments" position="top" />
                  <p> comments {post.comments_count} </p>
                </div>
                <div className="action">
                  <img
                    className="comment-img ncomm-img clickable"
                    alt=""
                    src="/assets/images/ncommnicon.png"
                    onClick={() => handleNcomm(post)}
                    data-for="ncomm"
                    data-tip="ncomm"
                  />
                  <ToolTip id="ncomm" position="top" />
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
          </div>
        ))}
      </InfiniteScroll>
      {commentModal &&
        <Comment
          post={activePost}
          onClose={() => setCommentModal(false)}
        />
      }
    </>
  );
}

export default React.memo(LobbyPosts);