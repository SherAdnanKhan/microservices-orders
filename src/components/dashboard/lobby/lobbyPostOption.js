import React, { useContext } from 'react';
import UserContext from "../../../context/userContext";
import { useHistory } from 'react-router-dom';

const LobbyPostOption = ({ post, onUnFavGallery, onSharePost, onModelDelete, onReportPost, onShareStrqModel, onTurnOffCrtiques, updatedCritqueStatus, onRepostModal, onMzFlashModal, }) => {
  const user = useContext(UserContext);
  const loggedInUserId = user.id;
  const history = useHistory();
  return (
    <div className="add-img-vid-box">
      <div className="img-option">
        {post.created_by === loggedInUserId ?
          <>
            <p
              onClick={
                () => history.push(`/dashboard/exhibition?gallery=${post.gallery_id}&post=${post.slug}`)
              }
            >
              Edit
            </p>
            <p onClick={() => onModelDelete(post, true)}> Delete </p>
            <p>Valut </p>
            <p onClick={() => onSharePost(true, post)}> Share </p>
            <p onClick={() => onShareStrqModel(true, post)}>Share On STRQ</p>
            {updatedCritqueStatus === 0 &&  //if crtiques are on
              <p onClick={() => onTurnOffCrtiques(true, post)}>Turn On critiques </p>
            }
            {updatedCritqueStatus === 1 &&   //if crtiques are off
              <p onClick={() => onTurnOffCrtiques(true, post)}>Turn Off critiques </p>
            }

          </>
          :
          <>
            <p onClick={() => onReportPost(true, post)}>Report </p>
            <p onClick={() => onUnFavGallery(post.gallery)}> Unfave Gallery</p>
            <p onClick={() => onRepostModal(true, post)}> Repost </p>
            <p onClick={() => onSharePost(true, post)}> Share </p>
            <p>Vault</p>
            <p onClick={() => onMzFlashModal(true, post)}>MzFlash </p>
          </>
        }
      </div>
    </div>

  );
};

export default LobbyPostOption;