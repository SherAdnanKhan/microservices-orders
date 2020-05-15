import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyStudio } from '../../actions/studioActions';
import ProfileCube from '../common/profileCube';
import Spinner from '../common/spinner';
import { getGalleries } from '../../actions/exibitionAction';
import Gallery from '../common/gallery';

const MyStudio = () => {
  const [edit, setEdit] = useState(true);
  const [activeGallery, setActiveGallery] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    studio: { myStudio },
    exibition: { ListOfGalleries: { data: galleries } },
    loading: { loading }
  } = useSelector(state => state);

  useEffect(() => {
    if (!myStudio)
      dispatch(getMyStudio());
  }, [dispatch, myStudio]);

  useEffect(() => {
    if (!galleries)
      dispatch(getGalleries());
    else
      console.log(galleries)

  }, [galleries, dispatch])


  const handleGalleryChange = gallery => {
    setActiveGallery(gallery);
  }
  return (
    <div>
      {loading && <Spinner />}
      {!loading &&
        <div>
          <div className="wrapper">
            {edit &&
              <div className="studioScreen">
                {myStudio &&
                  <div className="procu">
                    <ProfileCube avatars={myStudio.user.avatars} />
                  </div>
                }
                <div className="profilebioname">
                  {myStudio && <span className="nameof" id="nameof"> {myStudio.user.username}</span>}
                  <br />
                  <span className="artof" id="artof">Cosplay/1213</span>
                </div>
                <form method="post" action="login.php">
                  <label htmlFor="addbio" className="addbio-input">
                    <span className="labelText">Click edit Studio to add a bio.</span>
                    <input type="text" name="username" id="addbio" />
                  </label>
                  <div className="faved-btn">
                    <Link to="/dashboard/faving/by">
                      <div className="faved-by-btn">
                        <img src="/assets/images/favers.png" alt="" />
                        Faved by
                      </div>
                      {myStudio && <span>{myStudio.fav_by_count}</span>}
                    </Link>
                    <Link to="/dashboard/faving">
                      <div className="faved-by-btn">
                        <img src="/assets/images/faving.png" alt="" />
                        Faved
                      </div>
                      {myStudio && <span>{myStudio.favs_count}</span>}
                    </Link>
                  </div>
                </form>
              </div>
            }
            {!edit &&
              <div className="edit-studioScreen">
                {myStudio &&
                  <div className="procu">
                    <div className="editTool Edit" onClick={() => history.push('/dashboard/my-studio/profile')}>
                      <img src="/assets/images/paintbrush.png" alt="" className="clickable" />
                    </div>
                    <ProfileCube avatars={myStudio.user.avatars} />
                  </div>
                }
                <div className="profilebioname">
                  <div className="editTool Edit">
                    <img src="/assets/images/paintbrush.png" alt="" />
                  </div>
                  {myStudio && <span className="nameof" id="nameof">{myStudio.user.username}</span>}
                  <br />
                  <span className="artof" id="artof">Cosplay/1213</span>
                </div>
                <form method="post" action="login.php">
                  <label htmlFor="addbio" className="addbio-input">
                    <div className="editTool Edit">
                      <img src="/assets/images/paintbrush.png" alt="" />
                    </div>
                    <span className="labelText">Click edit Studio to add a bio.</span>
                    <input type="text" name="username" id="addbio" />
                  </label>
                  <div className="faved-btn">
                    <Link to="#">
                      <div className="faved-by-btn">
                        <img src="/assets/images/favers.png" alt="" />
                        Faved by
                      </div>
                      {myStudio && <span>{myStudio.fav_by_count}</span>}
                    </Link>
                    <Link to="#">
                      <div className="faved-by-btn">
                        <img src="/assets/images/faving.png" alt="" />
                        Faved
                      </div>
                      {myStudio && <span>{myStudio.favs_count}</span>}
                    </Link>
                  </div>
                </form>
              </div>
            }
          </div>
          <div className="editstudio-btn">
            <button onClick={() => {
              setEdit(!edit);
              setActiveGallery('');
            }}>
              <img src="/assets/images/paintbrush.png" alt="" />
              {edit ? "Edit Studio" : "View Studio"}
            </button>
          </div>
          <div className="wrapper">
            <Gallery
              galleries={galleries}
              edit={edit}
              onGalleryChange={handleGalleryChange}
            />
          </div>
          <div className="total-post">
            <div className="icon-side">
              <i className="fas fa-square" />
            </div>
            <div className="gallery">
              {!activeGallery &&
                <>
                  <p>Select a Gallery</p>
                  <p>Total posts: 2</p>
                </>
              }
              {activeGallery && <p>{activeGallery.title}</p>}
            </div>

            <div className="heart-icon">
              {activeGallery && <img src="/assets/images/add.png" className="clickable" alt="" />}
            </div>
          </div>
          <div className="wrapper">
            <p className="footer-text">production of: QuetzalArtz x R&amp;R </p>
          </div>
        </div>
      }
    </div>
  );
};

export default MyStudio;
