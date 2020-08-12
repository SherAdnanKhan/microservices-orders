import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyStudio } from '../../../actions/studioActions';
import Gallery from './galleries';
import { getFavourites } from '../../../actions/userActions';
import { getUserArtById } from "../../../actions/userActions";
import { getGallery, clearGallery, getMyGalleries, unfavGallery } from "../../../actions/galleryActions";
import { strokePost, unstrokePost, getNcomm, clearNcomm, deletePost, reportPost, changeCritqueStatus, sharePostOnStrq, repost, shareMzFlash } from '../../../actions/postAction';
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
import UserContext from "../../../context/userContext";
import { useRouteMatch } from 'react-router-dom';


const MyStudio = () => {
  const user = useContext(UserContext);
  const userArtId = user.art_id;
  const [show, setShow] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState('');
  const [edit, setEdit] = useState(true);
  const [activeGallery, setActiveGallery] = useState('');
  const [activePost, setActivePost] = useState({});
  const [showModelShare, setShowModelShare] = useState(false);
  const [showModelReport, setShowModelReport] = useState(false);
  const [showModelStrqShare, setshowModelStrqShare] = useState(false);
  const [showModalTurnOffCritque, setshowModalTurnOffCritque] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const [showMzFlashModal, setShowMzFlashModal] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const { params: { slug } } = useRouteMatch();
  const [activeNcomm, setActiveNcomm] = useState('');

  const {
    user: { favouriteUsers },
    studio: { myStudio },
    gallery: { gallery, myGalleries },
    feelColor: { feelColor },
    postView: { sendUser, ncomm }
  } = useSelector(state => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyStudio(slug));
  }, [dispatch, myStudio, slug]);

  useEffect(() => {
    if (!myGalleries)
      dispatch(getMyGalleries());

    return () => {
      dispatch(clearGallery());
    }
  }, [myGalleries, dispatch])

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getUserArtById(userArtId));
  }, [dispatch, userArtId]);

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

  const onStrqShare = (post, userId) => {

    dispatch(sharePostOnStrq(post, userId));
  }
  const handleTurnOffCrtiquesModal = (value) => {
    setshowModalTurnOffCritque(value);
  }
  const handleTurnOnOffCrtique = (modalStatus, post, status) => {
    setshowModalTurnOffCritque(modalStatus);
    dispatch(changeCritqueStatus(post, status));
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
    dispatch(strokePost(post.id, post.gallery_id, post.user));
  };

  const handleUnstroke = post => {
    dispatch(unstrokePost(post.id, post.gallery_id, post.user));
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
        <StudioHeader myStudio={myStudio && myStudio} feelColor={feelColor} />
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
          onStrqShare={onStrqShare}
          onTurnOffCrtiques={handleTurnOffCrtiquesModal}
          onRepostModal={handleRepostModal}
          onMzFlashModal={handleMzFlashModal}
          handleActivePost={handleActivePost}
          onStroke={handleStroke}
          onUnStroke={handleUnstroke}
          onNcomm={handleNcomm}
          activeNcomm={activeNcomm}
          ncomm={ncomm}
        />
      </div>
    </>
  );
};

export default MyStudio;
