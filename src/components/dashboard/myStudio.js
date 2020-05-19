import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyStudio } from '../../actions/studioActions';
import ProfileCube from '../common/profileCube';
import { getGalleries } from '../../actions/exibitionAction';
import Gallery from '../common/gallery';
import { getGallery, clearGallery } from "../../actions/galleryActions";

const MyStudio = () => {
  const [edit, setEdit] = useState(true);
  const [activeGallery, setActiveGallery] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    studio: { myStudio },
    exibition: { ListOfGalleries: { data: galleries } },
    gallery: { gallery }

  } = useSelector(state => state);

  useEffect(() => {
    if (!myStudio)
      dispatch(getMyStudio());
  }, [dispatch, myStudio]);

  useEffect(() => {
    if (!galleries)
      dispatch(getGalleries());

    return () => {
      dispatch(clearGallery());
    }
  }, [galleries, dispatch])


  const handleGalleryChange = gallery => {
    dispatch(getGallery(gallery.slug));
    setActiveGallery(gallery);
  }

  return (
    <div className="my-studio">
      <div>
        <div className="header-bar">
          <div className="back-icon">
            <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')} />
          </div>
          {myStudio && <p>{myStudio.user.username}</p>}
        </div>
        <div className="wrapper">
          {edit &&
            <div className="studioScreen">
              <div className="studioHead">
                <div>

                </div>
                <div className="procu">
                  {myStudio && <ProfileCube avatars={myStudio.user.avatars} />}
                </div>
                <div>

                </div>
              </div>
              {myStudio &&
                <div className="profilebioname">
                  <span className="nameof" id="nameof"> {myStudio.user.username} </span>
                  <br />
                  <span className="artof" id="artof">
                    {myStudio.user.art &&
                      <>
                        {myStudio.user.art.parent && myStudio.user.art.parent.name + '/'}
                        {myStudio.user.art.name}
                      </>
                    }
                  </span>
                </div>
              }
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
            activeGallery={activeGallery}
            onGalleryChange={handleGalleryChange}
          />
        </div>
        <div className="total-post">
          <div className="icon-side">
            <i className="fas fa-square" />
            <i className="fa fa-th" />
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
              <img
                src="/assets/images/add.png"
                className="clickable"
                onClick={() => history.push(`/dashboard/exhibition/${activeGallery.id}`)}
                alt=""
              />
            }
          </div>
        </div>

      </div>
      <div className="wrapper">
        <div className="screen">
          <div className="scr-inner">
            {gallery &&
              gallery.posts.map((gallery, index) => (
                <div key={index}>
                  <img src={`${gallery?.image.path}`} alt="" style={{ width: '300px', height: "300px" }} />
                </div>
              ))}
          </div>
        </div>

        <div className="user-list-view">
            <div className="user-list-top">
              <div className="user-name">
                  <p>Akif</p>
              </div>
              <div className="user-cude">
            <div className="artcubecase">
              <div className="procusmallmove">
                <div className="scenesmall">
                  <a href="studio.php?idstudio=4&gal=1">
                    <div className="cubesmallmove">
                      <div className="cube-facesmall  cube-face-frontsmall" style={{borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange'}}><img src="./assets/images/logowhite.png" height="100%" /></div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange'}}><img src="./assets/images/logowhite.png" height="100%" /></div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange'}}><img src="./assets/images/logowhite.png" height="100%" /></div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange'}}><img src="./assets/images/logowhite.png" height="100%" /></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>    

            </div>
              <div className="user-link">
              <p>WebDesign/ <br/> Programmer </p>
            </div>
        
            </div>
            <div className="big-image">
                <img src="/assets/images/avataricongray.png" />
                <div className="right-box">
                </div>
            </div>
            <div>
              <p>Second</p>
            </div>
            <div className="user-btns">
              <div>
                <img src="/assets/images/strokeiconem.png" />
                <p>1 stroke</p>
              </div>
              <div>
                <img className="open-commet" src="/assets/images/crit1.png" />
              </div>
              <div>
                <img src="/assets/images/ncommnicon.png" />
              </div>  
            </div>
        </div>
        
       
      </div>

      <div className="comments-box">
        <div className="comment-bar">
          <div className="commnent-img">
              <img src="/assets/images/avataricongray.png" />
              <i className="fa fa-times close-comment"></i>
          </div>
          <div className="comment-sec">
              <div className="user-commet">
                <div className="user-cude">
                  <div className="artcubecase">
                    <div className="procusmallmove">
                      <div className="scenesmall">
                        <a href="studio.php?idstudio=4&gal=1">
                          <div className="cubesmallmove">
                            <div className="cube-facesmall  cube-face-frontsmall" style={{borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange'}}><img src="./assets/images/logowhite.png" height="100%" /></div>
                            <div className="cube-facesmall  cube-face-backsmall" style={{borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange'}}><img src="./assets/images/logowhite.png" height="100%" /></div>
                            <div className="cube-facesmall  cube-face-leftsmall" style={{borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange'}}><img src="./assets/images/logowhite.png" height="100%" /></div>
                            <div className="cube-facesmall  cube-face-rightsmall" style={{borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange'}}><img src="./assets/images/logowhite.png" height="100%" /></div>
                          </div>
                        </a>
                     </div>
                    </div>
                  </div>    
                </div>
                <div className="comment-info">
                  <p>Usman : <span>Message Here</span> </p>
                  <p> 20 h </p>
                </div>
              </div>
          </div>
          <div className="text-area">
              <div className="msg-input">
                <textarea placeholder=" Add a critique..." />
              </div>
              <button>
                <img src="/assets/images/crit1.png" />
              </button>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <p className="footer-text">production of: QuetzalArtz x R&amp;R </p>
      </div>
    </div>
  );
};

export default MyStudio;
