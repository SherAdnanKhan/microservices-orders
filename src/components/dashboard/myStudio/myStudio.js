import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyStudio } from '../../../actions/studioActions';
import Gallery from './galleries';
import { getGallery, clearGallery, getMyGalleries, unfavGallery, deleteGallery } from "../../../actions/galleryActions";
import { strokePost, unstrokePost, storeVault, getNcomm, clearNcomm, deletePost, reportPost, changeCritqueStatus, repost, shareMzFlash } from '../../../actions/postAction';
import StudioHeader from './studioHeader';
import EditProfile from './editProfile';
import ViewProfile from './viewProfile';
import EditButton from './editButton';
import ViewButton from './viewbutton';
import PostBar from './postBar';
import StudioFooter from './studioFooter';
import GalleryForm from './galleryForm';
import DeleteModal from "../../common/deleteModal";
import SharePostModal from '../../common/sharePostModal';
import ReportPostModel from '../../common/reportPostModel';
import SharePostStrqModal from '../../common/sharePostStrqModal';
import TurnOffCrtiqueModal from "../../common/turnOffCritqueModal";
import RepostModal from "../../common/repostModal";
import MzFlashModal from "../../common/mzFlashModal";
import { useRouteMatch } from 'react-router-dom';
import ConfirmationModal from '../chat/confirmationModal';

const MyStudio = () => {
  const [show, setShow] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState('');
  const [edit, setEdit] = useState(true);
  const [activeGallery, setActiveGallery] = useState('');
  const [activePost, setActivePost] = useState({});
  const [showModelShare, setShowModelShare] = useState(false);
  const [showModelReport, setShowModelReport] = useState(false);
  const [showDeleteGalleryModal, setshowDeleteGalleryModal] = useState(false);
  const [showModelStrqShare, setshowModelStrqShare] = useState(false);
  const [showModalTurnOffCritque, setshowModalTurnOffCritque] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const [showMzFlashModal, setShowMzFlashModal] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const { params: { slug } } = useRouteMatch();
  const [activeNcomm, setActiveNcomm] = useState('');

  const {
    studio: { myStudio },
    gallery: { gallery, myGalleries },
    feelColor: { feelColor },
    postView: { ncomm }
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyStudio(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (!myGalleries)
      dispatch(getMyGalleries());

    return () => {
      dispatch(clearGallery());
    }
  }, [myGalleries, dispatch])

  const handleGalleryChange = gallery => {
    dispatch(getGallery(gallery.slug));
    setActiveGallery(gallery);
  };

  const handleEdit = () => {
    setEdit(!edit);
    setActiveGallery('');
  };

  const handleModelOpen = gallery => {
    setShow(true);
    setSelectedGallery(gallery)
  };

  const handleModelClose = (value) => {
    setShow(value);
  };
  const handleActivePost = post => {
    if (post.id === activePost.id) {
      setActivePost('');
    } else {
      setActivePost(post);
    }
  }
  const handlePostDeleteModel = (value) => {
    setShowDeleteModel(value);
  };
  const handleDelete = (status, post) => {
    setShowDeleteModel(status);
    dispatch(deletePost(post));
  }

  const handleShareModel = (status) => {
    //dispatch(standardSharePost(post.id));
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
  const handleRepostLobby = (status, post, gallery) => {
    dispatch(repost(post.id, gallery))
    setShowModalRepost(status);
  }
  const handleRepostModal = (status,) => {
    setShowModalRepost(status);
  }
  const getSelectedGalleryId = (gallery) => {
    setGalleryId(gallery);
  }
  const handleStroke = post => {
    if (post.has_stroke.length === 0) {
      dispatch(strokePost(post.id, post.gallery_id, post.user));
    }
  };

  const handleUnstroke = post => {
    if (post.has_stroke.length > 0) {
      dispatch(unstrokePost(post.id, post.gallery_id, post.user));
    }
  };
  const handleNcomm = post => {
    dispatch(clearNcomm());

    if (post.id === activeNcomm.id) {
      setActiveNcomm('');
    } else {
      setActiveNcomm(post);
      dispatch(getNcomm(post.slug));
    }
  };
  const handleVault = (post) => {
    dispatch(storeVault(post));
    handleActivePost('');
  }

  const toggleDeleteGalleryModal = (value, gallery) => {
    setshowDeleteGalleryModal(value)
    setSelectedGallery(gallery)
  }

  const handleDeleteGallery = () => {
    dispatch(deleteGallery(selectedGallery));
    setshowDeleteGalleryModal(false)
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
      {showDeleteGalleryModal &&
        <ConfirmationModal
          message="Are you sure you want to delete this gallery"
          onCancel={toggleDeleteGalleryModal}
          onConfirm={() => handleDeleteGallery()}
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
          myGalleries={myGalleries}
          selectedGalleryId={galleryId}
          onGalleryId={getSelectedGalleryId}
        />
      }
      {showModalTurnOffCritque &&
        <TurnOffCrtiqueModal
          onModalClose={handleTurnOffCrtiquesModal}
          post={activePost}
          onHandleCrtique={handleTurnOnOffCrtique} />
      }
      {showMzFlashModal &&
        <MzFlashModal onModalClose={handleMzFlashModal}
          post={activePost}
          onConfirm={handleMzFlash} />
      }
      <div className="my-studio">
        {show &&
          <GalleryForm
            onModelClose={handleModelClose}
            gallery={selectedGallery}
          />
        }
        <StudioHeader
          myStudio={myStudio && myStudio}
          feelColor={feelColor}
          edit={edit}
          onEdit={handleEdit}
        />
        {edit
          ? <EditProfile myStudio={myStudio} feelColor={feelColor} />
          : <ViewProfile myStudio={myStudio} feelColor={feelColor} />
        }
        {edit
          ? <EditButton onEdit={handleEdit} feelColor={feelColor} />
          : <ViewButton onEdit={handleEdit} feelColor={feelColor} />
        }
        <Gallery
          galleries={myGalleries}
          edit={edit}
          activeGallery={activeGallery}
          onGalleryChange={handleGalleryChange}
          onModelOpen={handleModelOpen}
          onShowModal={toggleDeleteGalleryModal}
        />
        <PostBar
          myStudio={myStudio}
          activeGallery={activeGallery}
          gallery={gallery}
          totalPosts={myStudio && myStudio.user.posts_count}
          feelColor={feelColor}
        />
        <StudioFooter
          gallery={gallery}
          user={myStudio && myStudio.user}
          activeGallery={activeGallery}
          onActivePost={handleActivePost}
          onUnFavGallery={handleUnfavGallery}
          activePost={activePost}
          onModelDelete={handlePostDeleteModel}
          onSharePost={handleShareModel}
          onReportPost={handleReportModel}
          onShareStrqModel={handleStrqShareModel}
          onTurnOffCrtiques={handleTurnOffCrtiquesModal}
          onRepostModal={handleRepostModal}
          onMzFlashModal={handleMzFlashModal}
          handleActivePost={handleActivePost}
          onStroke={handleStroke}
          onUnStroke={handleUnstroke}
          onNcomm={handleNcomm}
          activeNcomm={activeNcomm}
          ncomm={ncomm}
          onAddVault={handleVault}
        />
      </div>
    </>
  );
};

export default MyStudio;
