import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyStudio } from '../../../actions/studioActions';
import Gallery from './galleries';
import { getGallery, clearGallery, getMyGalleries } from "../../../actions/galleryActions";
import StudioHeader from './studioHeader';
import EditProfile from './editProfile';
import ViewProfile from './viewProfile';
import EditButton from './editButton';
import ViewButton from './viewbutton';
import PostBar from './postBar';
import StudioFooter from './studioFooter';
import GalleryForm from './galleryForm';

const MyStudio = () => {
  const [show, setShow] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState('');

  const [edit, setEdit] = useState(true);
  const [activeGallery, setActiveGallery] = useState('');
  const dispatch = useDispatch();

  const {
    studio: { myStudio },
    gallery: { gallery, myGalleries },
    feelColor: { feelColor }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getMyStudio());
  }, [dispatch, myStudio]);

  useEffect(() => {
    if (!myGalleries)
      dispatch(getMyGalleries());

    return () => {
      dispatch(clearGallery());
    }
  }, [myGalleries, dispatch])


  const handleGalleryChange = gallery => {
    dispatch(getGallery(gallery.slug));
    setActiveGallery(gallery);
  };

  const handleEdit = () => {
    setEdit(!edit);
    setActiveGallery('');
  };

  const handleModelOpen = gallery => {
    setShow(true);
    setSelectedGallery(gallery)
  };

  const handleModelClose = (value) => {
    setShow(value);
  };

  return (
    <div className="my-studio">
      {show &&
        <GalleryForm
          onModelClose={handleModelClose}
          gallery={selectedGallery}
        />
      }
      <StudioHeader myStudio={myStudio && myStudio} feelColor={feelColor} />
      {edit
        ? <EditProfile myStudio={myStudio} feelColor={feelColor} />
        : <ViewProfile myStudio={myStudio} feelColor={feelColor} />
      }
      {edit
        ? <EditButton onEdit={handleEdit} feelColor={feelColor} />
        : <ViewButton onEdit={handleEdit} feelColor={feelColor} />
      }
      <Gallery
        galleries={myGalleries}
        edit={edit}
        activeGallery={activeGallery}
        onGalleryChange={handleGalleryChange}
        onModelOpen={handleModelOpen}
      />
      <PostBar
        myStudio={myStudio}
        activeGallery={activeGallery}
        gallery={gallery}
        totalPosts={myStudio && myStudio.user.posts_count}
        feelColor={feelColor}
      />
      <StudioFooter gallery={gallery} user={myStudio && myStudio.user} />
    </div>
  );
};

export default MyStudio;
