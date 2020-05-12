import React, { useContext, useEffect } from 'react'
import Avatar from '../common/avatar';
import UserContext from '../../context/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteUsers } from '../../actions/lobbyActions';
import UserCube from '../common/userCube';
import Spinner from '../common/spinner';

const Lobby = () => {
  const user = useContext(UserContext);

  const dispatch = useDispatch();
  const {
    lobby: { favouriteUsers },
    loading: { loading }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getFavouriteUsers());
  }, [dispatch]);

  return (
    <>
      {!loading ?
        <div className="base" id="sec">
          {favouriteUsers &&
            favouriteUsers.map((user, index) => (
              <UserCube user={user} key={index} />
            ))
          }
        </div> :
        <div style={{ marginBottom: '15px' }}>
          <Spinner />
        </div>
      }

      <Avatar avatars={user.avatars && user.avatars} />

      <div className="middleBody">
      </div>
      <div className="smallCube">
        <div className="procusmaller">
          <div className="scenesmaller">
            <div className="cubesmallerload">
              <div id="frontload" className="cube-facesmallerload cube-face-frontsmaller tutorfeel cube-face-frontsmallerload" />
              <div id="backload" className="cube-facesmallerload cube-face-backsmaller tutorfeel cube-face-backsmallerload" />
              <div id="leftload" className="cube-facesmallerload cube-face-leftsmaller tutorfeel cube-face-leftsmallerload" />
              <div id="rightload" className="cube-facesmallerload cube-face-rightsmaller tutorfeel cube-face-rightsmallerload" />
              <div id="topload" className="cube-facesmallerload cutsmaller tutorfeel cutsmallerload" />
              <div id="bottomload" className="cube-facesmallerload cubsmaller tutorfeel cubsmallerload" />
            </div>
          </div>
        </div>
      </div>

      <div className="assist">
        <a href="#__">
          <img src="/assets/images/icons/LogoIconWhite.png" alt="support" />
        </a>
      </div>
    </>
  );
};

export default Lobby;