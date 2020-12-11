import React, { useEffect, useState, useContext } from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostFooter from "./postFooter";
import ViewPostHead from "./postHead";
import ViewPostBody from "./postBody";
import UserContext from "../../../context/userContext";
import ViewPostHeader from "./postHeader";
import Comment from './comments';
import DeleteModal from "../../common/deleteModal";
import SharePostModal from '../../common/sharePostModal';
import ReportPostModel from '../../common/reportPostModel';
import SharePostStrqModal from '../../common/sharePostStrqModal';
import TurnOffCrtiqueModal from "../../common/turnOffCritqueModal";
import RepostModal from "../../common/repostModal";
import MzFlashModal from "../../common/mzFlashModal";
import { getPost, strokePost, unstrokePost } from "../../../actions/postAction";
import { unfavGallery, getMyGalleries } from "../../../actions/galleryActions";
import { deletePost, reportPost, storeVault, changeCritqueStatus, repost, shareMzFlash, clearPost } from '../../../actions/postAction';
import { getCurrentUser } from '../../../actions/authActions';

const ViewPost = () => {
  const user = useContext(UserContext);
  const loggedInUserId = user?.id;
  const dispatch = useDispatch();
  const { params: { id } } = useRouteMatch();
  const history = useHistory();
  const {
    postView: { crtiqueStatus },
    gallery: { myGalleries },

  } = useSelector(state => state);
  const [activePost, setActivePost] = useState('');
  const [commentModal, setCommentModal] = useState(false);
  const [showModelShare, setShowModelShare] = useState(false);
  const [showModelReport, setShowModelReport] = useState(false);
  const [showModelStrqShare, setshowModelStrqShare] = useState(false);
  const [showModalTurnOffCritque, setshowModalTurnOffCritque] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const [showMzFlashModal, setShowMzFlashModal] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const {
    postView: { post, comments },
  } = useSelector(state => state);
  useEffect(() => {
    dispatch(getPost(id))
    return () => {
      dispatch(clearPost())
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getMyGalleries());
  }, [dispatch]);

  const handleUnStroke = (post) => {
    if (!getCurrentUser()) {
      history.push("/login")
    }
    else {
      if (post.has_stroke) {
        dispatch(unstrokePost(post?.post?.id, post?.post?.gallery_id, post?.post?.user))
      }
    }
  }

  const handleStroke = (post) => {
    if (!getCurrentUser()) {
      history.push("/login")
    }
    else {
      if (!post.has_stroke) {
        dispatch(strokePost(post.post.id, post.post.gallery_id, post.post.user));
      }
    }
  }

  const handlePostDeleteModel = (value) => {
    setShowDeleteModel(value);
  };
  const handleDelete = (status, post) => {
    setShowDeleteModel(status);
    dispatch(deletePost(post, history));
  }

  const handleShareModel = (status, post) => {
    //dispatch(standardSharePost(post.id));
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
    // handleActivePost('');
  }

  const handleMzFlashModal = (status) => {
    setShowMzFlashModal(status);
  }

  const handleMzFlash = (status, post) => {
    setShowMzFlashModal(status);
    dispatch(shareMzFlash(post));
  }

  const handleRepost = (status, post, gallery) => {
    dispatch(repost(post, gallery))
    setShowModalRepost(status);
  }

  const handleRepostModal = (status,) => {
    setShowModalRepost(status);
  }

  const getSelectedGalleryId = (gallery) => {
    setGalleryId(gallery);
  }

  const handleActivePost = post => {
    if (post.id === activePost.id) {
      setActivePost('');
    } else {
      setActivePost(post);
    }
  }

  const handleVault = (post) => {
    if (!getCurrentUser()) {
      history.push("/login")
    }
    else {
      dispatch(storeVault(post));
    }
  }

  return (
    <>
      {commentModal &&
        <Comment
          post={post?.post}
          onClose={() => setCommentModal(false)}
        />
      }
      {showDeleteModel &&
        <DeleteModal
          onDelete={handleDelete}
          onModalClose={handlePostDeleteModel}
          activePost={post?.post}
          onSharePost={handleShareModel}
        />
      }
      {showModelShare &&
        <SharePostModal
          onModalClose={handleShareModel}
          post={post?.post}
        />
      }
      {showModelReport &&
        <ReportPostModel
          onReport={onReport}
          onModalClose={handleReportModel}
          post={post?.post}
          selectedGallery={galleryId}
        />
      }
      {showModelStrqShare &&
        <SharePostStrqModal
          onModalClose={handleStrqShareModel}
          post={post?.post}
        />
      }
      {showModalRepost &&
        <RepostModal
          onRepost={handleRepost}
          onModalClose={handleRepostModal}
          post={post?.post}
          myGalleries={myGalleries}
          selectedGalleryId={galleryId}
          onGalleryId={getSelectedGalleryId}
        />
      }
      {showModalTurnOffCritque &&
        <TurnOffCrtiqueModal
          onModalClose={handleTurnOffCrtiquesModal}
          post={post?.post}
          updatedCritqueStatus={crtiqueStatus}
          onHandleCrtique={handleTurnOnOffCrtique} />
      }
      {showMzFlashModal &&
        <MzFlashModal onModalClose={handleMzFlashModal} post={post?.post} onConfirm={handleMzFlash} />
      }
      <div className={`post-page ${post && post?.user?.feel_color}`}>
        <ViewPostHeader
          post={post && post?.post}
        />
        <ViewPostHead
          post={post && post?.post}
          userId={loggedInUserId}
        />
        <ViewPostBody
          post={post}
          onActivePost={handleActivePost}
          onUnFavGallery={handleUnfavGallery}
          activePost={activePost}
          onModelDelete={handlePostDeleteModel}
          onSharePost={handleShareModel}
          onReportPost={handleReportModel}
          onShareStrqModel={handleStrqShareModel}
          onTurnOffCrtiques={handleTurnOffCrtiquesModal}
          updatedCritqueStatus={crtiqueStatus}
          onRepostModal={handleRepostModal}
          onMzFlashModal={handleMzFlashModal}
          onAddVault={handleVault}
        />
        <PostFooter
          post={post}
          isAllowedCritiques={post?.other_privacy?.is_allowed ? 1 : 0}
          comments={comments}
          onStroke={handleStroke}
          onUnStroke={handleUnStroke}
          updatedCritqueStatus={crtiqueStatus}
        />
      </div>
    </>
  )
}
export default ViewPost;