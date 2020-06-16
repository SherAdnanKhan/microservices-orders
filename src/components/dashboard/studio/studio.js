import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGallery, favGallery, unfavGallery, clearGallery } from "../../../actions/galleryActions";
import { getUserStudio, addToSuperFavs, addToInviteOnly } from "../../../actions/studioActions";
import Gallery from "./galleries";
import Post from '../../common/posts';
import PostBar from './postBar';
import StudioDetail from './studioDetail';
import StudioHeader from './studioHeader';
import StudioFooter from './studioFooter';
import { getGalleries } from '../../../actions/exibitionAction';
import GalleryModel from './galleryModel';
import Spinner from '../../common/spinner';

const Studio = () => {
  const [showModel, setShowModel] = useState(false);
  const [activeGallery, setActiveGallery] = useState('');

  const { params: { slug } } = useRouteMatch();

  const dispatch = useDispatch();
  const {
    studio: { userStudio, loading },
    gallery: { gallery },
    exibition: { ListOfGalleries: { data: myGalleries } }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getUserStudio(slug));
    dispatch(getGalleries());

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
      ? dispatch(unfavGallery({ gallery_id: activeGallery.id }))
      : dispatch(favGallery({ gallery_id: activeGallery.id }));
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

  const handleChange = ({ target: input }, galleryId) => {
    if (input.checked) {
      const privacy = {
        privacy_type_id: 4,
        user_id: userStudio.user.id,
        gallery_id: galleryId
      };
      dispatch(addToInviteOnly(privacy));
    }
  };

  return (
    <div className={`studio ${userStudio && userStudio.user.feel_color}`}>
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
        color={userStudio && userStudio.user.feel_color}
      />
      <PostBar
        galleries={userStudio && userStudio.user.galleries}
        activeGallery={activeGallery}
        gallery={gallery}
        onPostLike={handleLike}
        totalPosts={userStudio && userStudio.user.posts_count}
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
