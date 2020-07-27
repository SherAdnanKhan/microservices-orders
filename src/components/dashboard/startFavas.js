import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendedGalleries, unfavRecommendedGallery, favRecommendedGallery } from '../../actions/galleryActions';
import { useHistory } from 'react-router-dom';
import HorizontalSlider from '../common/horizontalSlider';
import Avatar from '../common/avatar';

const StartFaves = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { recommendedGalleries } = useSelector(state => state.gallery);

  useEffect(() => {
    if (!recommendedGalleries)
      dispatch(getRecommendedGalleries())
    console.log(recommendedGalleries);
  }, [dispatch, recommendedGalleries])

  const handleLike = (user, gallery) => {
    const data = {
      user,
      gallery
    };

    if (gallery.has_faved) {
      dispatch(unfavRecommendedGallery(data));
    } else {
      dispatch(favRecommendedGallery(data));
    }
  };

  return (
    <div className="fav-page">
      <div
        className="header"
        style={{ backgroundColor: user.feel.color_code }}
      >
        <button
          onClick={() => history.push('/tutorial')}
          style={{ backgroundColor: user.feel.color_code }}
        >
          <i className="fa fa-check" />
           Done
        </button>
      </div>
      <div className="fav-page-container">
        <div className="f-text-box">
          <h3 className="f-title">GETTING STARTED</h3>
          <p className="f-paragrah">Welcome {user.username} there are many other exibitions for you to see and enjoy and many other artist for you to meet</p>
          <h1
            onClick={() => history.push('/tutorial')}
            className="clickable"
          >
            {'>>'}
          </h1>
        </div>
        <HorizontalSlider slidesToShow={1}>
          {recommendedGalleries &&
            recommendedGalleries.map((user, index) => (
              <div key={index} className="f-image-box">
                <div className="f-header">
                  <h4>{user.username}</h4>
                  <div className='avatar'>
                    <Avatar avatars={user.avatars} feelColor={user.feel.color_code} />
                  </div>
                  <h4>{user.art_id && user.art.name}</h4>
                </div>
                <div className="f-gallery-box">

                  <div className="f-img-box">
                    <div className="main-img">
                      <img src={user.galleries[0].image ? user.galleries[0].image.path : user.galleries[0].posts[0].image.path} alt="avatar" />
                    </div>
                    <div className="other-img">
                      {/* {user.galleries[0].posts.map((post, in_key) => (
                      <img key={in_key} src={post.image.path} alt="avatar" />
                    ))} */}
                      <img src="/assets/images/pic1.png" alt="avatar" />
                      <img src="/assets/images/pic1.png" alt="avatar" />
                      <img src="/assets/images/pic1.png" alt="avatar" />
                      <img src="/assets/images/pic1.png" alt="avatar" />
                      <img src="/assets/images/pic1.png" alt="avatar" />

                    </div>
                  </div>
                  <h2>{user.galleries[0].title}</h2>
                </div>
                <div className="f-footer">
                  {!user.galleries[0].has_faved
                    ? (
                      <img
                        src="/assets/images/catfave.png"
                        className="clickable"
                        onClick={() => handleLike(user, user.galleries[0])}
                        alt=""
                      />
                    ) : (
                      <img
                        src="/assets/images/catfaveon.png"
                        className="clickable"
                        onClick={() => handleLike(user, user.galleries[0])}
                        alt=""
                      />
                    )
                  }
                  <h3 className="f-footer-text">ADD TO FAV'S</h3>
                </div>
              </div>
            ))}
        </HorizontalSlider>
      </div>

    </div>
  );
};
export default StartFaves;