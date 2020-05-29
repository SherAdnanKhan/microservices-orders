import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../../../actions/userActions';
import UserCube from '../../common/userCube';
import LobbyPosts from './lobbyPosts';
import { Link } from "react-router-dom";
import { getUserArtById } from "../../../actions/userActions"

const Lobby = () => {
  const user_art_id = JSON.parse(localStorage.getItem('user'))?.art_id
  const dispatch = useDispatch();
  const {
    user: { favouriteUsers, favouriteGalleries }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getUserArtById(user_art_id))
  }, [dispatch, user_art_id]);

  return (
    <div className="lobby-page">
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
    </div>
  );
};
export default Lobby;
