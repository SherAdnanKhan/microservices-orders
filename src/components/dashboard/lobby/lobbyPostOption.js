import React, { useContext } from 'react';
import UserContext from "../../../context/userContext";

const LobbyPostOption = ({ post, onUnFavGallery, onSharePost, onModelDelete }) => {
  const user = useContext(UserContext);
  const loggedInUserId = user.id;
  return (
    <div className="add-img-vid-box">
      <div className="img-option">
        {post.created_by === loggedInUserId ?
          <>
            <p>Edit </p>
            <p onClick={() => onModelDelete(post, true)}>Delete </p>
            <p>Valut </p>
            <p>Share </p>
            <p>Share On STRQ chat </p>
            <p>Turn off critiques </p>
          </>
          :
          <>
            <p>Report </p>
            <p onClick={() => onUnFavGallery(post.gallery)}>Unfave Gallery</p>
            <p>Repost </p>
            <p onClick={() => onSharePost(true, post)}> Share </p>
            <p>Vault</p>
            <p>MzFlash </p>
          </>
        }
      </div>
    </div>

  );
};

export default LobbyPostOption;