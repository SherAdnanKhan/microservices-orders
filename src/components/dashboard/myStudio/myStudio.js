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
    // exibition: { ListOfGalleries: { data: galleries } },
    gallery: { gallery, myGalleries }

  } = useSelector(state => state);

  useEffect(() => {
    if (!myStudio)
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
    console.log(gallery);
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
      <StudioHeader myStudio={myStudio && myStudio} />
      {edit
        ? <EditProfile myStudio={myStudio} />
        : <ViewProfile myStudio={myStudio} />
      }
      {edit
        ? <EditButton onEdit={handleEdit} />
        : <ViewButton onEdit={handleEdit} />
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
        totalPosts={myStudio && myStudio.user.posts_count}
      />
      <StudioFooter gallery={gallery} user={myStudio && myStudio.user} />
    </div>
  );
};

export default MyStudio;
