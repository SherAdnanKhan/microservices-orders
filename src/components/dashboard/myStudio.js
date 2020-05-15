import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyStudio } from '../../actions/studioActions';
import ProfileCube from '../common/profileCube';
import Spinner from '../common/spinner';
import { getGalleries } from '../../actions/exibitionAction';
import Gallery from '../common/gallery';
import { getGallery, makeFav } from "../../actions/galleryActions";

const MyStudio = () => {
  const [edit, setEdit] = useState(true);
  const [activeGallery, setActiveGallery] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    studio: { myStudio },
    exibition: { ListOfGalleries: { data: galleries } },
    loading: { loading },
    studio: { studioUser },
    gallery: { galleryImages }

  } = useSelector(state => state);

  let url = window.location.href.split('/')[5];
  console.log("galleryImages",galleryImages.images)

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
    dispatch(getGallery(gallery.slug));
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
                <div className="studioHead">
                  <div>
                    <img src="/assets/images/strqicon.png" alt="" />
                  </div>
                    {url && 
                      url === 'user' 
                      ? studioUser &&
                         <div className="procu">
                          <ProfileCube avatars={ studioUser?.avatars } />
                        </div>
                      :  myStudio &&
                         <div className="procu">
                          <ProfileCube avatars={ myStudio?.user?.avatars } />
                        </div> 
                    } 
                  <div>
                    <img src="/assets/images/mzflash.png" alt="" />
                  </div>
                </div>
                <div className="profilebioname">
                  {url && 
                    url === 'user' 
                    ? studioUser && <span className="nameof" id="nameof"> {studioUser?.first_name}</span> 
                    :  myStudio && <span className="nameof" id="nameof"> {myStudio?.user?.username}</span> 
                  } 
                  <br />
                  <span className="artof" id="artof">Cosplay/1213</span>
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
              url={url}
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
              {
                url && 
                url === 'user' && 
                <img
                  src="/assets/images/catfave.png"
                  className="clickable"
                  onClick={() => makeFav(activeGallery.slug)}
                  alt=""
                />
              }
              {!url && 
               activeGallery &&
                <img
                  src="/assets/images/add.png"
                  className="clickable"
                  onClick={() => history.push(`/dashboard/exhibition/${activeGallery.id}`)}
                  alt=""
                />
              }
            </div>
          </div>
          {/* <div className="wrapper">
            <div className="screen">
              <div className="scr-inner">
                {galleryImages?.map((gallery, index) => (
                  <div key={index}>
                    <img src={ `${gallery?.images.path}`} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          <div className="wrapper">
            <p className="footer-text">production of: QuetzalArtz x R&amp;R </p>
          </div>
        </div>
      }
    </div>
  );
};

export default MyStudio;
