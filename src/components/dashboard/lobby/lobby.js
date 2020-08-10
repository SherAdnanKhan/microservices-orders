import React, { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../../../actions/userActions';
import UserCube from '../../common/userCube';
import LobbyPosts from './lobbyPosts';
import { Link } from "react-router-dom";
import { getUserArtById } from "../../../actions/userActions";
import FeedSection from '../mzFlashGroup/feedSection';
import { getCollectiveFeeds, createFeedComment, createFeed, strokeFeed, unstrokeFeed } from '../../../actions/mzFlashActions';
import { unfavGallery, getMyGalleries } from "../../../actions/galleryActions";
import UserContext from '../../../context/userContext';
import { getNcomm, clearNcomm, strokePost, unstrokePost, deletePost, reportPost, changeCritqueStatus, sharePostOnStrq, clearStatus, repost, shareMzFlash } from '../../../actions/postAction';
import VerticalSlider from '../../common/verticalSlider';
import HorizontalSlider from '../../common/horizontalSlider';
import PostModal from "../../dashboard/mzFlashGroup/postModal";
import LobbyModal from "../../common/lobbyModal";
import SharePostModal from '../../common/sharePostModal';
import ReportPostModel from '../../common/reportPostModel';
import SharePostStrqModal from '../../common/sharePostStrqModal';
import TurnOffCrtiqueModal from "../../common/turnOffCritqueModal";
import RepostModal from "../../common/repostModal";
import MzFlashModal from "../../common/mzFlashModal";

const Lobby = () => {
  const user_art_id = JSON.parse(localStorage.getItem('user'))?.art_id
  const dispatch = useDispatch();
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const {
    user: { favouriteUsers, favouritePosts, unreadCount },
    mzFlash: { collectiveFeeds },
    postView: { ncomm, crtiqueStatus, sendUser },
    feelColor: { feelColor },
    gallery: { myGalleries },

  } = useSelector(state => state);
  const [activeFeedComment, setActiveFeedComment] = useState(0);
  const [showPostModel, setShowPostModel] = useState(false);
  const [imagePath, setImagepath] = useState("");
  const [comments, setComments] = useState({})
  const [activePost, setActivePost] = useState('');
  const [activeNcomm, setActiveNcomm] = useState('');
  const [showModelShare, setShowModelShare] = useState(false);
  const [showModelReport, setShowModelReport] = useState(false);
  const [showModelStrqShare, setshowModelStrqShare] = useState(false);
  const [showModalTurnOffCritque, setshowModalTurnOffCritque] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const [showMzFlashModal, setShowMzFlashModal] = useState(false);


  const currentUser = useContext(UserContext);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getUserArtById(user_art_id));
  }, [dispatch, user_art_id]);

  useEffect(() => {
    dispatch(clearNcomm);
    setActiveNcomm('');
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCollectiveFeeds());
  }, [dispatch])

  useEffect(() => {
    dispatch(getMyGalleries());
  }, [dispatch]);

  const handleEnter = (e, feedId, comment) => {
    if (e.keyCode === 13 && comments[comment]) {
      const commentData = {
        feed_id: feedId,
        comment: comments[comment]
      };

      dispatch(createFeedComment(commentData));
      setComments({ ...comments, [comment]: '' });
    }
  };

  const handleCommentChange = ({ target: input }) => {
    setComments({ ...comments, [input.name]: input.value });
  };

  const handleActiveFeedComment = (e, feedId) => {
    e.preventDefault();
    if (feedId === activeFeedComment)
      setActiveFeedComment(0);
    else
      setActiveFeedComment(feedId);
  };

  const handleRepost = (e, feed) => {
    e.preventDefault();

    const formData = {};
    formData.feed_id = feed.id;

    dispatch(createFeed(formData));
  };

  const handleFeedStroke = id => {
    const data = {
      feed_id: id
    };
    dispatch(strokeFeed(data));
  };

  const handleFeedUnstroke = id => {
    const data = {
      feed_id: id
    };
    dispatch(unstrokeFeed(data));
  };

  const handleUnstrokePost = (post) => {
    dispatch(unstrokePost(post.id, post.gallery_id, post.user))
  }

  const handleStrokePost = (post) => {
    dispatch(strokePost(post.id, post.gallery_id, post.user));
  }

  const handleNcomm = post => {
    dispatch(clearNcomm());

    if (post.id === activeNcomm.id) {
      setActiveNcomm('');
    } else {
      dispatch(getNcomm(post.slug));
      setActiveNcomm(post);
    }
  };

  const handleActivePost = post => {
    if (post.id === activePost.id) {
      setActivePost('');
    } else {
      setActivePost(post);
    }
  }
  const handlePostShowModel = (value, type, image) => {
    if (value === true) {
      setImagepath(image.path);
      setMediaType(type);
    }
    setShowPostModel(value);
  };

  const handlePostDeleteModel = (value, post) => {
    setShowDeleteModel(value);
  };
  const handleDelete = (status, post) => {
    setShowDeleteModel(status);
    dispatch(deletePost(post));
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
  return (
    <div className="lobby-page">
      {unreadCount > 0 &&
        <div
          className="popUpChatMsg"
          style={{ backgroundColor: feelColor }}
        >
          <Link to="/dashboard/conversations">
            <img src="/assets/images/strqicon.png" alt="" />
          </Link>
          <div className="noticeicons" >
            <div
              className="noticecountright"
              style={{ border: `2px solid ${feelColor}` }}
            >
              {unreadCount}
            </div>
          </div>
        </div>
      }
      {showDeleteModel &&
        <LobbyModal
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
        <TurnOffCrtiqueModal onModalClose={handleTurnOffCrtiquesModal} post={activePost} updatedCritqueStatus={crtiqueStatus} onHandleCrtique={handleTurnOnOffCrtique} />
      }
      {showMzFlashModal &&
        <MzFlashModal onModalClose={handleMzFlashModal} post={activePost} onConfirm={handleMzFlash} />
      }
      <div className="row">
        <div className="col-2 section-1  box-1" id="sec">
          <VerticalSlider>
            {favouriteUsers &&
              favouriteUsers.map((user, index) => (
                <div
                  className={index === 0 ? 'item active' : 'item'}
                  key={index}
                >
                  <div className="cube">
                    <Link to={`/dashboard/studio/${user.slug}`}>
                      <UserCube user={user} />
                    </Link>
                  </div>
                </div>
              ))
            }
          </VerticalSlider>

          <HorizontalSlider>
            {favouriteUsers &&
              favouriteUsers.map((user, index) => (
                <div
                  className={index === 0 ? 'item active' : 'item'}
                  key={index}
                >
                  <div className="cube">
                    <Link to={`/dashboard/studio/${user.slug}`}>
                      <UserCube user={user} />
                    </Link>
                  </div>
                </div>
              ))
            }
          </HorizontalSlider>
        </div>
        <div className="col-6 section-2 box-2">
          {favouritePosts?.map((post, index) => (
            <div key={index}>
              <LobbyPosts
                onClickNcomm={handleNcomm}
                onActivePost={handleActivePost}
                onStrokePost={handleStrokePost}
                onUnstrokePost={handleUnstrokePost}
                onUnFavGallery={handleUnfavGallery}
                post={post}
                ncomm={ncomm}
                activeNcomm={activeNcomm}
                activePost={activePost}
                onModelDelete={handlePostDeleteModel}
                onSharePost={handleShareModel}
                onReportPost={handleReportModel}
                onShareStrqModel={handleStrqShareModel}
                onStrqShare={onStrqShare}
                onTurnOffCrtiques={handleTurnOffCrtiquesModal}
                updatedCritqueStatus={crtiqueStatus}
                onRepostModal={handleRepostModal}
                onMzFlashModal={handleMzFlashModal}

              />
            </div>
          ))
          }
        </div>
        {showPostModel &&
          <PostModal
            onPostModalClose={handlePostShowModel}
            imagePath={imagePath}
            mediaType={mediaType}
          />
        }
        <div className="section-3 box-3 col4">
          <FeedSection
            collectiveFeeds={collectiveFeeds}
            currentUser={currentUser}
            activeFeedComment={activeFeedComment}
            onActiveFeedComment={handleActiveFeedComment}
            onCommentChange={handleCommentChange}
            comments={comments}
            onPostComment={handleEnter}
            onRepost={handleRepost}
            onStroke={handleFeedStroke}
            onUnstroke={handleFeedUnstroke}
            onPostModal={handlePostShowModel}
          />
        </div>
        <div className="assist">
          <a href="#__">
            <img src="/assets/images/icons/LogoIconWhite.png" alt="support" />
          </a>
        </div>
        {/* <div className="smallCube">
        <div className="procusmaller">
          <div className="scenesmaller">
            <div className="cubesmallerload">
              <div id="frontload" className="cube-facesmallerload cube-face-frontsmaller tutorfeel cube-face-frontsmallerload"></div>
              <div id="backload" className="cube-facesmallerload cube-face-backsmaller tutorfeel cube-face-backsmallerload"></div>
              <div id="leftload" className="cube-facesmallerload cube-face-leftsmaller tutorfeel cube-face-leftsmallerload"></div>
              <div id="rightload" className="cube-facesmallerload cube-face-rightsmaller tutorfeel cube-face-rightsmallerload"></div>
              <div id="topload" className="cube-facesmallerload cutsmaller tutorfeel cutsmallerload"></div>
              <div id="bottomload" className="cube-facesmallerload cubsmaller tutorfeel cubsmallerload"></div>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </div >
  );
}
export default Lobby;
