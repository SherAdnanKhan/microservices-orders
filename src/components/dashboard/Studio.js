import React, { useState, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileCube from '../common/profileCube';
import Spinner from '../common/spinner';
import { getGalleries } from '../../actions/exibitionAction';
import { getGallery, makeFav } from "../../actions/galleryActions";
import { getUserStudio } from "../../actions/studioActions";

const Studio = () => {
  const [edit, setEdit] = useState(true);
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
    if (!userStudio)
      dispatch(getUserStudio(slug));
  }, [dispatch, userStudio,slug]);

  useEffect(() => {
    if (!galleries)
      dispatch(getGalleries());

  }, [galleries, dispatch])

  function handleGallery(e,gallery){
    e.preventDefault();
    setActiveGallery(gallery);
    dispatch(getGallery(gallery.slug))
  }

  return (
    <div>
      {loading && <Spinner />}
      {!loading &&
        <div>
          <div className="wrapper">
            {edit &&
              <div className="studioScreen">
                <div className="studioHead">
                  <div>
                    <img src="/assets/images/strqicon.png" alt="" />
                  </div>
                  { userStudio &&
                    <div className="procu">
                      <ProfileCube avatars={userStudio?.user?.avatars} />
                    </div>
                  }
                  <div>
                    <img src="/assets/images/mzflash.png" alt="" />
                  </div>
                </div>
                <div className="profilebioname">
                  { userStudio && <span className="nameof" id="nameof"> {userStudio?.user?.username}</span> }
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
            <button onClick={() => {
              setEdit(!edit);
              setActiveGallery('');
            }}>
              <img src="/assets/images/paintbrush.png" alt="" />
              {edit ? "Edit Studio" : "View Studio"}
            </button>
          </div>
          <div className="wrapper">
            {
             userStudio && userStudio.user && userStudio.user.galleries.map((gal,index) =>(
               <img src="/assets/images/avataricongreen.png" alt="" key={index} onClick={(e) => handleGallery(e,gal)} />
             )) 
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
                  <p>Total posts: 2</p>
                </>
              }
              {activeGallery && <p>{activeGallery.title}</p>}
            </div>

            <div className="heart-icon">
              {activeGallery &&
                slug &&
                <img
                  src="/assets/images/catfave.png"
                  className="clickable"
                  onClick={() => makeFav(activeGallery.slug)}
                  alt=""
                />
              }
              {activeGallery && 
                !slug &&
                <img
                  src="/assets/images/add.png"
                  className="clickable"
                  onClick={() => history.push(`/dashboard/exhibition/${activeGallery.id}`)}
                  alt=""
                />
              }
            </div>
          </div>
          <div className="wrapper">
            <div className="screen">
              <div className="scr-inner">
                {galleryImages?.map((gallery, index) => (
                  <div key={index}>
                    <img src={ `${gallery?.image.path}`} alt="" style={{width:'20%'}} />
                  </div>
                ))}
              </div>
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

export default Studio;
