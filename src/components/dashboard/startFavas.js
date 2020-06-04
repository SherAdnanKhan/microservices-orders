import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendedGalleries } from '../../actions/galleryActions';


const StartFaves = () => {
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const { recommendedGalleries } = useSelector(state => state.gallery);

  useEffect(() => {
    if (!recommendedGalleries)
      dispatch(getRecommendedGalleries())
    console.log(recommendedGalleries);
  }, [dispatch, recommendedGalleries])

  return (
    <div className="wrapper fav-page">
      <div className="f-text-box">
        <h3 className="f-title">GETTING STARTED</h3>
        <p className="f-paragrah">Welcome {user.username} there are many other exibitions for you to see and enjoy and many other artist for you to meet</p>
        <h1>>></h1>
      </div>
      {recommendedGalleries &&
        recommendedGalleries.map((user, index) => (
          <div key={index} className="f-image-box">
            <div className="f-header">
              <h4>{user.username}</h4>
              <h4>{user.art_id && user.art.name}</h4>
            </div>
            <div className="f-gallery-box">

              <div className="f-img-box">
                <div className="main-img">
                  <img src={user.galleries[0].posts && user.galleries[0].posts[0].image.path} alt="avatar" />
                </div>
                <div className="other-img">
                  {user.galleries[0].posts.map((post, in_key) => (
                    <img key={in_key} src={post.image.path} alt="avatar" />
                  ))}
                </div>
              </div>
              <h2>{user.galleries[0].title}</h2>
            </div>
            <div className="f-footer">
              <Link to="/tutorial">
                <img style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
                  src="/assets/images/catfave.png"
                  alt="avatar"
                />
              </Link>
              <h3 className="f-footer-text">ADD TO FAV'S</h3>
            </div>
          </div>
        ))}

    </div>
  );
};
export default StartFaves;