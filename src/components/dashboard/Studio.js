import React, { useState, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileCube from '../common/profileCube';
import Spinner from '../common/spinner';
import { getGalleries } from '../../actions/exibitionAction';
import { getGallery, favGallery, unfavGallery } from "../../actions/galleryActions";
import { getUserStudio } from "../../actions/studioActions";
import UserStudioGallery from "../common/userStudioGallery";

const Studio = () => {
  const [edit] = useState(true);
  const [activeGallery, setActiveGallery] = useState('');

  const { params: { slug } } = useRouteMatch();

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    studio: { userStudio },
    exibition: { ListOfGalleries: { data: galleries } },
    loading: { loading },
    gallery: { galleryImages }

  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getUserStudio(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (!galleries)
      dispatch(getGalleries());

  }, [galleries, dispatch])

  const handleGalleryChange = gallery => {
    setActiveGallery(gallery);
    dispatch(getGallery(gallery.slug))
  }

  const handleFav = () => {
    if (!galleryImages.has_faved) {
      dispatch(favGallery({ gallery_id: activeGallery.id }));
    } else {
      dispatch(unfavGallery({ gallery_id: activeGallery.id }))
    }
  }

  return (
    <div className="my-studio">
      {loading && <Spinner />}
      <div>
        <div className="header-bar">
          <div className="back-icon">
            <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')} />
          </div>
          {userStudio && <p>{userStudio.user.username}</p>}
          <div className="heart">
            <img src="/assets/images/favebackoff.png" alt="" />
          </div>
        </div>
        <div className="wrapper">
          {edit &&
            <div className="studioScreen">
              <div className="studioHead">
                <div>
                  <img src="/assets/images/strqicon.png" alt="" />
                </div>
                {userStudio &&
                  <div className="procu">
                    <ProfileCube avatars={userStudio?.user?.avatars} />
                  </div>
                }
                <div>
                  <Link to={`/dashboard/mz-flash/${slug}`}>
                    <img src="/assets/images/mzflash.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="profilebioname">
                {userStudio && <span className="nameof" id="nameof"> {userStudio?.user?.username}</span>}
                <br />
                <span className="artof" id="artof">{userStudio?.user?.art?.name}</span>
              </div>
              <form method="post" action="login.php">
                <label htmlFor="addbio" className="addbio-input">
                  <span className="labelText">Click edit Studio to add a bio.</span>
                  <input type="text" name="username" id="addbio" />
                </label>
                <div className="faved-btn">
                  <Link to={`/dashboard/faving/${'by'}`}>
                    <div className="faved-by-btn">
                      <img src="/assets/images/favers.png" alt="" />
                        Faved by
                      </div>
                    {userStudio && <span>{userStudio?.fav_by_count}</span>}
                  </Link>
                  <Link to="/dashboard/faving">
                    <div className="faved-by-btn">
                      <img src="/assets/images/faving.png" alt="" />
                        Faved
                      </div>
                    {userStudio && <span>{userStudio?.favs_count}</span>}
                  </Link>
                </div>
              </form>
            </div>
          }
          {!edit &&
            <div className="edit-studioScreen">
              {userStudio &&
                <div className="procu">
                  <div className="editTool Edit" onClick={() => history.push('/dashboard/my-studio/profile')}>
                    <img src="/assets/images/paintbrush.png" alt="" className="clickable" />
                  </div>
                  <ProfileCube avatars={userStudio?.user?.avatars} />
                </div>
              }
              <div className="profilebioname">
                <div className="editTool Edit">
                  <img src="/assets/images/paintbrush.png" alt="" />
                </div>
                {userStudio && <span className="nameof" id="nameof">{userStudio?.user?.username}</span>}
                <br />
                <span className="artof" id="artof">{userStudio?.user?.art?.name}</span>
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
                    {userStudio && <span>{userStudio?.fav_by_count}</span>}
                  </Link>
                  <Link to="#">
                    <div className="faved-by-btn">
                      <img src="/assets/images/faving.png" alt="" />
                        Faved
                      </div>
                    {userStudio && <span>{userStudio?.favs_count}</span>}
                  </Link>
                </div>
              </form>
            </div>
          }
        </div>
        <div className="editstudio-btn">
          <div style={{ height: '40px' }}></div>
        </div>
        <div className="wrapper">
          {
            <UserStudioGallery
              galleries={galleries}
              edit={edit}
              activeGallery={activeGallery}
              onGalleryChange={handleGalleryChange}
            />
          }
        </div>
        <div className="total-post">
          <div className="icon-side">
            <i className="fas fa-square" />
          </div>
          <div className="gallery">
            {!activeGallery &&
              <>
                <p>Select a Gallery</p>
                <p>Total posts: {galleries && galleries.length}</p>
              </>
            }
            {activeGallery && <p>Total Post: {activeGallery.posts_count}</p>}
          </div>
          <div className="heart-icon">
            {activeGallery &&
              <>
                {galleryImages &&
                  !galleryImages.has_faved
                  ? (
                    <img
                      src="/assets/images/catfave.png"
                      className="clickable"
                      onClick={handleFav}
                      alt=""
                    />
                  ) : (
                    <img
                      src="/assets/images/catfaveon.png"
                      className="clickable"
                      onClick={handleFav}
                      alt=""
                    />
                  )
                }
              </>
            }
          </div>
        </div>
        <div className="wrapper">
          <div className="screen">
            <div className="scr-inner">
              {galleryImages &&
                galleryImages.posts.map((gallery, index) => (
                  <div key={index}>
                    <img src={`${gallery.image.path}`} alt="" style={{ width: '300px', height: "300px" }} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="wrapper">
          <p className="footer-text">production of: QuetzalArtz x R&amp;R </p>
        </div>
      </div>
    </div>
  );
};

export default Studio;
