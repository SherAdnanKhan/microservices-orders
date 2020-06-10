import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrivacies } from "../../../actions/privacyActions";
import GalleryPrivacy from "./galleryPrivacies";
import OtherPrivacy from "./otherPrivacies";

const Privacy = () => {
  const [activeGallery, setActiveGallery] = useState('');
  const [activeOtherPage, setActiveOtherPage] = useState('');

  const dispatch = useDispatch();
  const {
    userGalleries,
    privacyTypes,
    userOtherPages
  } = useSelector(state => state.privacies);

  useEffect(() => {
    dispatch(getPrivacies());
  }, [dispatch]);

  return (
    <div className="privacy">
      <GalleryPrivacy
        userGalleries={userGalleries}
        privacyTypes={privacyTypes}
        activeGallery={activeGallery}
        onActiveGallery={id => {
          id === activeGallery ? setActiveGallery('') : setActiveGallery(id);
        }}
      />
      <OtherPrivacy
        userOtherPages={userOtherPages}
        privacyTypes={privacyTypes}
        activeOtherPage={activeOtherPage}
        onActiveOtherPage={id => {
          id === activeOtherPage ? setActiveOtherPage('') : setActiveOtherPage(id);
        }}
      />
    </div>
  )
}
export default Privacy