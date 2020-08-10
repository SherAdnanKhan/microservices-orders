import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrivacies, changeGalleryPrivacy, changeOtherPrivacy } from "../../../actions/privacyActions";
import GalleryPrivacy from "./galleryPrivacies";
import OtherPrivacy from "./otherPrivacies";
import Spinner from '../../common/spinner';

const Privacy = () => {
  const [activeGallery, setActiveGallery] = useState('');
  const [activeOtherPage, setActiveOtherPage] = useState('');
  const { feelColor } = useSelector(state => state.feelColor);
  const dispatch = useDispatch();
  const {
    userGalleries,
    privacyTypes,
    userOtherPages,
    loading
  } = useSelector(state => state.privacies);
  useEffect(() => {
    dispatch(getPrivacies());
  }, [dispatch]);

  const handleGalleryPrivacyChange = privacy => {
    dispatch(changeGalleryPrivacy(privacy));
  };

  const handleOtherPrivacyChange = privacy => {
    dispatch(changeOtherPrivacy(privacy));
  };
  return (
    <div className="privacy">
      {loading && <Spinner />}
      <GalleryPrivacy
        userGalleries={userGalleries}
        privacyTypes={privacyTypes}
        activeGallery={activeGallery}
        onGalleryPrivacyChange={handleGalleryPrivacyChange}
        onActiveGallery={id => {
          id === activeGallery ? setActiveGallery('') : setActiveGallery(id);
        }}
        feelColor={feelColor}
      />
      <OtherPrivacy
        userOtherPages={userOtherPages}
        privacyTypes={privacyTypes}
        activeOtherPage={activeOtherPage}
        onOtherPrivacyChange={handleOtherPrivacyChange}
        onActiveOtherPage={id => {
          id === activeOtherPage ? setActiveOtherPage('') : setActiveOtherPage(id);
        }}
        feelColor={feelColor}
      />
    </div>
  )
}
export default Privacy