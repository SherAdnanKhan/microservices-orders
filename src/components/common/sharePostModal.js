import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share"

const SharePostModal = ({ onModalClose, post }) => {
  const url = "https://staging.meuzm.com/viewpost/" + post.slug;
  return (
    <div className="studio">
      <div className="gallery-model">
        <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
        <div className="gallery-container">
          <div className="heading"> Share Your posts to desire Social media</div>
          <div className="btn-section" >
            <FacebookShareButton
              url={url}
              hashtag={post.title}>
              <FacebookIcon logoFillColor="white" />
            </FacebookShareButton>
            <TwitterShareButton
              url={url}
              hashtag={post.title}>
              <TwitterIcon logoFillColor="white" />
            </TwitterShareButton>
            <WhatsappShareButton
              url={url}
              hashtag={post.title}>
              <WhatsappIcon logoFillColor="white" />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={url}>
              <LinkedinIcon logoFillColor="white" />
            </LinkedinShareButton>
          </div >
        </div >
      </div >

    </div >

  );
};

export default SharePostModal;