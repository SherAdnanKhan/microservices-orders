import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../../../actions/userActions';
import UserCube from '../../common/userCube';
import LobbyPosts from './lobbyPosts';
import { Link } from "react-router-dom";
import { getUserArtById } from "../../../actions/userActions";

const Lobby = () => {
  const user_art_id = JSON.parse(localStorage.getItem('user'))?.art_id
  const dispatch = useDispatch();
  const {
    user: { favouriteUsers, favouriteGalleries, unreadCount }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getUserArtById(user_art_id))
  }, [dispatch, user_art_id]);

  return (
    <div className="lobby-page">
      {unreadCount > 0 &&
        <div className="popUpChatMsg">
          <Link to="/dashboard/conversations">
            <img src="/assets/images/strqicon.png" alt="" />
          </Link>
          <div className="noticeicons">
            <div className="noticecountright">{unreadCount}</div>
          </div>
        </div>
      }
      <div className="base" id="sec">
        {favouriteUsers &&
          favouriteUsers.map((user, index) => (
            <Link to={`/dashboard/studio/${user.slug}`} key={index} >
              <UserCube user={user} />
            </Link>
          ))
        }
      </div>
      {favouriteGalleries &&
        favouriteGalleries.fav_galleries.map((gallery, index) => (
          <div key={index}>
            {gallery.posts.map((post, post_index) => (
              <div key={post_index}>
                <LobbyPosts post={post} />
              </div>
            ))
            }
          </div>
        ))
      }

      <div className="assist">
        <a href="#__">
          <img src="/assets/images/icons/LogoIconWhite.png" alt="support" />
        </a>
      </div>
      <div className="smallCube">
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
      </div>
    </div >
  );
};
export default Lobby;
