import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyStudio } from '../../../actions/studioActions';
import { getGalleries } from '../../../actions/exibitionAction';
import Gallery from './galleries';
import { getGallery, clearGallery } from "../../../actions/galleryActions";
import StudioHeader from './studioHeader';
import EditProfile from './editProfile';
import ViewProfile from './viewProfile';
import EditButton from './editButton';
import ViewButton from './viewbutton';
import PostBar from './postBar';
import StudioFooter from './studioFooter';

const MyStudio = () => {
  const [edit, setEdit] = useState(true);
  const [activeGallery, setActiveGallery] = useState('');
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

  const handleEdit = () => {
    setEdit(!edit);
    setActiveGallery('');
  }

  return (
    <div className="my-studio">
      <StudioHeader />
      {edit
        ? <EditProfile myStudio={myStudio} />
        : <ViewProfile myStudio={myStudio} />
      }
      {edit
        ? <EditButton onEdit={handleEdit} />
        : <ViewButton onEdit={handleEdit} />
      }
      <Gallery
        galleries={galleries}
        edit={edit}
        activeGallery={activeGallery}
        onGalleryChange={handleGalleryChange}
      />
      <PostBar
        myStudio={myStudio}
        activeGallery={activeGallery}
        totalPosts={myStudio && myStudio.user.posts_count}
      />
      <StudioFooter gallery={gallery} />
    </div>
  );
};

export default MyStudio;
