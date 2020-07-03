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

      <div className="section-1 base" id="sec">
        <div className="vSlider">
          <div className="controls">
            <i className="arrow-up fa fa-caret-up fa-3x"></i>
            <i className="arrow-down fa fa-caret-down fa-3x"></i>
          </div>
          <div className="slides">
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
          </div>
        </div>
      </div>


      <div className="section-2">
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
      </div>

      <div className="section-3">
        <div className=" sub-box row set-sources"><div className="reposted-text"> You have reposted this feed </div><div className="col-12 cube-top"><a href="/dashboard/studio/qa-test"><div className="artcubecase limegreen"><div className="procusmallmove"><div className="scenesmall limegreen"><div className="cubesmallmove"><div className="cube-facesmall  cube-face-frontsmall"><img alt="" src="https://meuzm-stage.s3.us-west-1.amazonaws.com/artists/Dyb0Qk0jCY-1592560648.jpg" height="100%" /></div><div className="cube-facesmall  cube-face-backsmall"><img alt="" src="https://meuzm-stage.s3.us-west-1.amazonaws.com/artists/PWRGH76QcB-1592996695.jpg" height="100%" /></div><div className="cube-facesmall  cube-face-leftsmall"><img alt="" src="https://meuzm-stage.s3.us-west-1.amazonaws.com/artists/nQAMyoeWPV-1592996728.jpg" height="100%" /></div><div className="cube-facesmall  cube-face-rightsmall"><img alt="" src="https://meuzm-stage.s3.us-west-1.amazonaws.com/artists/Dyb0Qk0jCY-1592560648.jpg" height="100%" /></div></div></div></div></div></a><span className="date-time">June 30th 2020</span></div><div className="time">11:16 AM</div><div className="col-12"><span className="usernames"><a href="/dashboard/studio/qa-test">qa</a></span></div><p className="submit-text">test </p><div className="imgvideo-mzflash" /><div className="flex-container-nested"><div className="action-cube"><a href="/dashboard/studio/qa-test"><div className="artcubecase gray"><div className="procusmallmove"><div className="scenesmall gray"><div className="cubesmallmove"><div className="cube-facesmall  cube-face-frontsmall"><img alt="" src="https://meuzm-stage.s3.us-west-1.amazonaws.com/artists/Dyb0Qk0jCY-1592560648.jpg" height="100%" /></div><div className="cube-facesmall  cube-face-backsmall"><img alt="" src="https://meuzm-stage.s3.us-west-1.amazonaws.com/artists/PWRGH76QcB-1592996695.jpg" height="100%" /></div><div className="cube-facesmall  cube-face-leftsmall"><img alt="" src="https://meuzm-stage.s3.us-west-1.amazonaws.com/artists/nQAMyoeWPV-1592996728.jpg" height="100%" /></div><div className="cube-facesmall  cube-face-rightsmall"><img alt="" src="https://meuzm-stage.s3.us-west-1.amazonaws.com/artists/Dyb0Qk0jCY-1592560648.jpg" height="100%" /></div></div></div></div></div></a><span className="date-time">June 19th 2020</span></div><div className="time">07:10 PM</div><div className="user-name-parent"><p className="user-name usernames"><a href="/dashboard/studio/qa-test">qa</a></p></div><p className="submit-text">test </p></div><div className="flex-container"><div className="action"><span className="coment-counter">0 comment </span><img className="comment-img" alt="" src="/assets/images/crit1.png" /></div><div className="strk-btn"><span className="strk-counter"> 1 stroke </span><img className="strk-img clickable" src="/assets/images/strokeiconfull.png" alt="" /></div><div className="actions-repost"><button className="repost">Repost</button></div></div><div className="view-comment" /><input type="text" id="feed118" name="feed118" placeholder="Enter a Comment..." defaultValue /></div>
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
    </div >
  );
};
export default Lobby;
