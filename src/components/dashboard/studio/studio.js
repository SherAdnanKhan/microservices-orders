import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleries } from '../../../actions/exibitionAction';
import { getGallery, favGallery, unfavGallery } from "../../../actions/galleryActions";
import { getUserStudio } from "../../../actions/studioActions";
import Gallery from "./galleries";
import Post from '../../common/posts';
import PostBar from './postBar';
import StudioDetail from './studioDetail';
import StudioHeader from './studioHeader';
import StudioFooter from './studioFooter';

const Studio = () => {
  const [activeGallery, setActiveGallery] = useState('');
  const { params: { slug } } = useRouteMatch();

  const dispatch = useDispatch();
  const {
    studio: { userStudio },
    exibition: { ListOfGalleries: { data: galleries } },
    gallery: { gallery }

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

  const handleLike = () => {
    return gallery.has_faved
      ? dispatch(unfavGallery({ gallery_id: activeGallery.id }))
      : dispatch(favGallery({ gallery_id: activeGallery.id }));
  }

  return (
    <div className="my-studio">
      <StudioHeader
        userStudio={userStudio}
      />
      <StudioDetail
        userStudio={userStudio}
        slug={slug}
      />
      <Gallery
        galleries={galleries}
        activeGallery={activeGallery}
        onGalleryChange={handleGalleryChange}
      />
      <PostBar
        galleries={galleries}
        activeGallery={activeGallery}
        gallery={gallery}
        onPostLike={handleLike}
      />
      <Post gallery={gallery} />
      <StudioFooter />
    </div>
  );
};

export default Studio;