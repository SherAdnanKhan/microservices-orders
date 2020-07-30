import React, { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../../../actions/userActions';
import UserCube from '../../common/userCube';
import LobbyPosts from './lobbyPosts';
import { Link } from "react-router-dom";
import { getUserArtById } from "../../../actions/userActions";
import FeedSection from '../mzFlashGroup/feedSection';
import { getCollectiveFeeds, createFeedComment, createFeed, strokeFeed, unstrokeFeed } from '../../../actions/mzFlashActions';
import UserContext from '../../../context/userContext';
import { getNcomm, clearNcomm, strokePost, unstrokePost,deletePost } from '../../../actions/postAction';
import VerticalSlider from '../../common/verticalSlider';
import HorizontalSlider from '../../common/horizontalSlider';
import LobbyModal from "../lobby/lobbyModal";

const Lobby = () => {
  const user_art_id = JSON.parse(localStorage.getItem('user'))?.art_id
  const dispatch = useDispatch();
    const [showModel2, setShowModel2] = useState(false);
    const [singlePost,setSinglePost]=useState({});
  const {
    user: { favouriteUsers, favouritePosts, unreadCount },
    mzFlash: { collectiveFeeds },
    postView: { ncomm },
    feelColor: { feelColor }
  } = useSelector(state => state);

  const [activeFeedComment, setActiveFeedComment] = useState(0);
  const [comments, setComments] = useState({})
  const [activePost, setActivePost] = useState('');
  const [activeNcomm, setActiveNcomm] = useState('');

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
    console.log(comments)
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
  const handleLobbyModal = (value,post) => {
    console.log("post and user id=",value,post)
    setShowModel2(value);
  };
  const handleDelete=(status,id)=>
  {
    setShowModel2(status);
    console.log("delete is called",id)
   const res= dispatch(deletePost(id));
   console.log(res);
  
  }
const getSinglePost=(singlePost)=>
{
  console.log("post data=",singlePost);
  setSinglePost(singlePost);

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
       {showModel2 &&
        <LobbyModal
        onDelete={handleDelete}
        onModalClose={handleLobbyModal}
        singlePostData={singlePost}
        />
        
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
                singlePostData={singlePost}
                onClickNcomm={handleNcomm}
                onActivePost={handleActivePost}
                onStrokePost={handleStrokePost}
                onUnstrokePost={handleUnstrokePost}
                post={post}
                ncomm={ncomm}
                activeNcomm={activeNcomm}
                activePost={activePost}
                onModelOpen2={handleLobbyModal}
                onGetPost={getSinglePost}
              />
            </div>
          ))
          }
        </div>
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
};
export default Lobby;
