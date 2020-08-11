import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar';
import { FAVES, SPRFVS, INVITE_ONLY } from '../../constants/privacyTypes';
import Comment from '../dashboard/viewPost/comments';
import Stroke from './stroke';
import { getFavourites, getUserArtById } from '../../actions/userActions';
import {
  strokePost, unstrokePost, getNcomm, clearNcomm, deletePost, reportPost,
  changeCritqueStatus, sharePostOnStrq, clearStatus, repost, shareMzFlash
} from '../../actions/postAction';
import { unfavGallery, getMyGalleries } from "../../actions/galleryActions";
import { useDispatch, useSelector } from 'react-redux';
import ImageVideoSlider from './imageVideoSlider';
import ImagePostOption from "../common/ImagePostOption";
import DeleteModal from "../common/deleteModal";
import SharePostModal from '../common/sharePostModal';
import ReportPostModel from '../common/reportPostModel';
import SharePostStrqModal from '../common/sharePostStrqModal';
import TurnOffCrtiqueModal from "../common/turnOffCritqueModal";
import RepostModal from "../common/repostModal";
import MzFlashModal from "../common/mzFlashModal";
const Post = ({
  gallery, user, activeGallery,
  galleryPrivacy, onSuperFav, isSprFvs
}) => {
  const user_art_id = JSON.parse(localStorage.getItem('user'))?.art_id
  const dispatch = useDispatch();
  const {
    postView: { ncomm, sendUser, post },
    user: { favouriteUsers },
    gallery: { myGalleries },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getUserArtById(user_art_id));
  }, [dispatch, user_art_id]);

  useEffect(() => {
    dispatch(getMyGalleries());
  }, [dispatch]);

  const [activePost, setActivePost] = useState({});
  const [activeNcomm, setActiveNcomm] = useState('');
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showModelShare, setShowModelShare] = useState(false);
  const [showModelReport, setShowModelReport] = useState(false);
  const [showModelStrqShare, setshowModelStrqShare] = useState(false);
  const [showModalTurnOffCritque, setshowModalTurnOffCritque] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const [showMzFlashModal, setShowMzFlashModal] = useState(false);

  const handleNcomm = post => {
    dispatch(clearNcomm());

    if (post.id === activeNcomm.id) {
      setActiveNcomm('');
    } else {
      setActiveNcomm(post);
      dispatch(getNcomm(post.slug));
    }
  };

  const handleActivePost = post => {
    if (post.id === activePost.id) {
      setActivePost('');
    } else {
      setActivePost(post);
    }
  }

  const isAllowed = () => {
    const found = galleryPrivacy.find(g => g.gallery_id === activeGallery.id);
    return found && found.is_allowed ? true : false;
  };

  const handleStroke = post => {
    dispatch(strokePost(post.id, post.gallery_id, post.user));
  };

  const handleUnstroke = post => {
    dispatch(unstrokePost(post.id, post.gallery_id, post.user));
  };



  const handlePostDeleteModel = (value) => {
    setShowDeleteModel(value);
  };
  const handleDelete = (status, post) => {
    setShowDeleteModel(status);
    dispatch(deletePost(post));
  }

  const handleShareModel = (status) => {
    setShowModelShare(status);
  };

  const handleUnfavGallery = (gallery) => {
    dispatch(unfavGallery(gallery));
  }

  const handleReportModel = (status) => {
    setShowModelReport(status);
  }

  const onReport = (post) => {
    dispatch(reportPost(post.id));
    setShowModelReport(false);
  }

  const handleStrqShareModel = (status) => {
    setshowModelStrqShare(status);
  }

  const onStrqShare = (post, userId) => {
    dispatch(sharePostOnStrq(post, userId))
    dispatch(clearStatus())
  }
  const handleTurnOffCrtiquesModal = (value) => {
    setshowModalTurnOffCritque(value);
  }
  const handleTurnOnOffCrtique = (modalStatus, post, status) => {
    setshowModalTurnOffCritque(modalStatus);
    dispatch(changeCritqueStatus(post, status));
    handleActivePost('');
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
  const handleRepostModal = (status) => {
    setShowModalRepost(status);
  }
  const handleRepostLobby = (status, post, gallery) => {
    dispatch(repost(post.id, gallery))
    setShowModalRepost(status);
  }
  return (
    <>
      {showDeleteModel &&
        <DeleteModal
          onDelete={handleDelete}
          onModalClose={handlePostDeleteModel}
          activePost={activePost}
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
          onShare={onStrqShare}
          onModalClose={handleStrqShareModel}
          post={activePost}
          favouriteUsers={favouriteUsers}
          sendUser={sendUser}
        />
      }
      {showModalRepost &&
        <RepostModal
          onRepost={handleRepostLobby}
          onModalClose={handleRepostModal}
          post={activePost}
          myGalleries={myGalleries}
          selectedGalleryId={galleryId}
          onGalleryId={getSelectedGalleryId}
          Updatedpost={post}
        />
      }
      {showModalTurnOffCritque &&
        <TurnOffCrtiqueModal onModalClose={handleTurnOffCrtiquesModal} post={activePost} onHandleCrtique={handleTurnOnOffCrtique} />
      }
      {showMzFlashModal &&
        <MzFlashModal onModalClose={handleMzFlashModal} post={activePost} onConfirm={handleMzFlash} />
      }
      <div className="wrapper">
        <div className="screen">
          {activeGallery
            && (
              <>
                {isAllowed()
                  && (
                    <div className="post">
                      <div className="post-picture">
                        {gallery
                          && gallery.posts.map((post, index) => (
                            <div key={index} className="">
                              <Link to={`/dashboard/viewpost/${post.slug}`}>
                                {post.post_type === 2
                                  ? (
                                    <video width="320" height="240" controls>
                                      <source src={post.image.path} type="video/mp4" />
                                      <source src={post.image.path} type="video/ogg" />
                                    Your browser does not support the video tag.
                                    </video>
                                  ) : (
                                    <img src={`${post.image.path}`} alt="" />
                                  )}
                              </Link>
                            </div>
                          ))}
                      </div>

                      <div className="show-list">
                        {gallery &&
                          gallery.posts.map((post, index) => (
                            <div className="list-body" key={index}>
                              <div className="s-l-header">
                                <p>
                                  {
                                    user &&
                                    <Link to={`/dashboard/studio/${user.slug}`} >
                                      {user.username}
                                    </Link>
                                  }
                                </p>
                                <Avatar avatars={user && user.avatars} feelColor={user && user.feel.color_code} />
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
                                  onUnFavGallery={handleUnfavGallery}
                                  onSharePost={handleShareModel}
                                  onReportPost={handleReportModel}
                                  onModelDelete={handlePostDeleteModel}
                                  onStrqShare={onStrqShare}
                                  onShareStrqModel={handleStrqShareModel}
                                  onTurnOffCrtiques={handleTurnOffCrtiquesModal}
                                  onRepostModal={handleRepostModal}
                                  onMzFlashModal={handleMzFlashModal} />
                              </div>
                              <div
                                className={
                                  activePost.id === post.id
                                    ? 'valut-icon show-valut'
                                    : 'valut-icon'
                                }
                              >
                                <i className="fa fa-ellipsis-v" aria-hidden="true" ></i>
                                <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
                              </div>
                              <div onClick={() => handleActivePost(post)}>
                                {post.post_type === 2
                                  ? (
                                    <video controls onClick={e => e.preventDefault()}>
                                      <source src={post.image.path} type="video/mp4" />
                                      <source src={post.image.path} type="video/ogg" />
                                    Your browser does not support the video tag.
                                    </video>
                                  ) : (
                                    <img src={`${post.image.path}`} alt="" />
                                  )}
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
                                    onStroke={() => handleStroke(post)}
                                    onUnstroke={() => handleUnstroke(post)}
                                  />
                                  <p> strokes {post.stroke_users_count} </p>
                                </div>

                                <div className="action">
                                  {post?.critiques_status === 1 &&
                                    <>
                                      < img
                                        className="comment-img open-commet clickable"
                                        alt=""
                                        src="/assets/images/crit1.png"
                                      />
                                      <p> comments {post.comments.length}</p>
                                    </>
                                  }

                                </div>


                                <div className="action">
                                  <img
                                    className="comment-img clickable"
                                    alt=""
                                    src="/assets/images/ncommnicon.png"
                                    onClick={() => handleNcomm(post)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        <Comment post={activePost} />
                      </div>
                    </div>
                  )}
                {(activeGallery?.privacy?.privacy_type_id === FAVES && !isAllowed())
                  && (
                    <div className="privacy-actions">
                      <img
                        src="/assets/images/catfave.png"
                        className="clickable fav-icon"
                        alt=""
                      />
                      <div>Fav this Gallery to view</div>
                    </div>
                  )}
                {(activeGallery?.privacy?.privacy_type_id === SPRFVS && !isAllowed())
                  && (
                    <div className="privacy-actions">
                      <button
                        disabled={isSprFvs > 0}
                        onClick={onSuperFav}
                      >
                        {isSprFvs > 0 && 'Requested'}
                        {isSprFvs === 0 && 'Request'}
                      </button>
                      <div> Only for SprFav </div>
                    </div>
                  )}
                {(activeGallery?.privacy?.privacy_type_id === INVITE_ONLY && !isAllowed())
                  && (
                    <div className="privacy-actions">
                      <img
                        src="/assets/images/invite_gallery_icon.png"
                        className="clickable fav-icon"
                        alt=""
                      />
                      <div>Private Gallery Invite Only</div>
                    </div>
                  )}
              </>
            )}
        </div>
      </div >
    </>
  );
};

export default Post;
