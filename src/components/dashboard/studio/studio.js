import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGallery, favGallery, unfavGallery, clearGallery, getMyGalleries } from "../../../actions/galleryActions";
import { getUserStudio, addToSuperFavs, addToInviteOnly, removeFromInviteOnly, unSuperFav } from "../../../actions/studioActions";
import Gallery from "./galleries";
import Post from '../../common/posts';
import PostBar from './postBar';
import StudioDetail from './studioDetail';
import StudioHeader from './studioHeader';
import StudioFooter from './studioFooter';
import GalleryModel from './galleryModel';
import Spinner from '../../common/spinner';
import queryString from 'query-string';
import UnSuperFvtModal from "./unsprfvtModal"; 

const Studio = () => {
  const [showModel, setShowModel] = useState(false);
  const [showModel2, setShowModel2] = useState(false);
  const [activeGallery, setActiveGallery] = useState('');
  const { params: { slug } } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    studio: { userStudio, loading },
    gallery: { gallery, myGalleries },
  } = useSelector(state => state);
  useEffect(() => {
    const { gallery } = queryString.parse(location.search);

    if (userStudio) {
      const foundGallery = userStudio.user.galleries.find(g => g.id === parseInt(gallery));
      if (foundGallery) {
        setActiveGallery(foundGallery);
        dispatch(getGallery(foundGallery.slug));
      }
    }
  }, [userStudio, dispatch, location]);

  useEffect(() => {
    dispatch(getUserStudio(slug));
    dispatch(getMyGalleries());

    return () => {
      dispatch(clearGallery());
    }
  }, [dispatch, slug]);

  const handleGalleryChange = gallery => {
    setActiveGallery(gallery);
    dispatch(getGallery(gallery.slug))
  };

  const handleLike = () => {
    return gallery.has_faved
      ? dispatch(unfavGallery(activeGallery))
      : dispatch(favGallery(activeGallery));
  };

  const handleSuperFav = () => {
    const privacy = {
      privacy_type_id: 3,
      user_id: userStudio && userStudio.user.id
    };

    dispatch(addToSuperFavs(privacy));
  };

  const handleShowModel = value => {
    setShowModel(value);
  };
  const handleShowModel2 = value => {
    setShowModel2(value);
  };

  const handleChange = ({ target: input }, galleryId) => {
    const privacy = {
      privacy_type_id: 4,
      user_id: userStudio.user.id,
      gallery_id: galleryId
    };

  

    if (input.checked)
      dispatch(addToInviteOnly(privacy));
    else
      dispatch(removeFromInviteOnly(privacy));
  };
  const handleUnSprFav= (status) => {
    console.log("status=",status)
    console.log("user is unfriend")
    const privacy = {
      privacy_type_id: 4,
      user_id: userStudio.user.id,
    };
    dispatch(unSuperFav(privacy))
    setShowModel2(false);
  }

  return (
    <div className='studio'>
      {loading && <Spinner />}
      {showModel &&
        <GalleryModel
          myGalleries={myGalleries}
          onModelClose={handleShowModel}
          onChange={handleChange}
          galleryInvitedList={userStudio && userStudio.gallery_invited_list}
          user={userStudio && userStudio.user}
        />

      }
         {showModel2 &&
        <UnSuperFvtModal
          myGalleries={myGalleries}
          onModelClose={handleShowModel2}
          onUnSprFav={handleUnSprFav}
        />
        
      }
      <StudioHeader
        userStudio={userStudio}
        onModelOpen={handleShowModel}
      />
      <StudioDetail
        userStudio={userStudio}
        slug={slug}
      />
      <Gallery
        galleries={userStudio && userStudio.user.galleries}
        activeGallery={activeGallery}
        onGalleryChange={handleGalleryChange}
        color={userStudio && userStudio.user.feel.color}
      />
      <PostBar
        galleries={userStudio && userStudio.user.galleries}
        activeGallery={activeGallery}
        gallery={gallery}
        onPostLike={handleLike}
        totalPosts={userStudio && userStudio.user.posts_count}
        galleryPrivacy={userStudio && userStudio.gallery_privacy}
        user={userStudio?.user}
      />
      <Post
        activeGallery={activeGallery}
        gallery={gallery}
        user={userStudio && userStudio.user}
        galleryPrivacy={userStudio && userStudio.gallery_privacy}
        onSuperFav={handleSuperFav}
        isSprFvs={userStudio && userStudio.is_sprfvs}
      />
      <StudioFooter />
    </div>
  );
};

export default Studio;
