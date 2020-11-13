import React, { useState, useContext, useEffect } from 'react'
import ImageCropper from '../../common/imageCropper';
import { isEmpty } from '../../../utils/helperFunctions';
import { useHistory } from 'react-router-dom';
import UserContext from "../../../context/userContext";
import { fileUpload } from '../../../actions/genericActions';
import { useDispatch } from 'react-redux';
import ProgressBar from '../../common/progressBar';
import { toast } from 'react-toastify';
import { IMAGE_UPLOAD_SIZE_ERROR, VIDEO_UPLOAD_SIZE_ERROR } from '../../../constants/errors';


const ExhibitionModel = ({ onSave, selectedImage, selectedVideo, feelColor }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [toggle, setToggle] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [progress, setProgress] = useState(0);

  const user = useContext(UserContext);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCompleteCrop = blob => {
    setCroppedImage(blob);
  };

  const handleToggle = value => {
    setToggle(value);
  };

  const handleSkip = value => {
    setToggle(value);
    setCroppedImage('');
  };

  const convertFileSize = (sizeBytes) => {
    const fileSizeKb = sizeBytes / 1000;
    const fileSizeMb = fileSizeKb / 1000;
    return fileSizeMb
  }

  const validateFile = (size, type) => {
    let error;
    if (type === "video/mp4" && size > 5) {
      error = VIDEO_UPLOAD_SIZE_ERROR;
    } else if ((type === "image/png" || type === "image/jpeg" || type === "image/jpg") && size > 2) {
      error = IMAGE_UPLOAD_SIZE_ERROR;
    }
    return error ? error : false
  }

  const handleChange = ({ target: input }) => {
    const fileSizeMb = convertFileSize(input?.files[0]?.size);
    const fileType = input?.files[0]?.type;
    let isErrors = validateFile(fileSizeMb, fileType);
    if (!isErrors) {
      if (input.name === 'image' && input.files[0]) {
        setToggle(false)
        setImage(input.files[0]);
        setImageUrl(URL.createObjectURL(input.files[0]));
        setToggle(true);
        setVideo(null);
        setVideoUrl(null);
        setIsValid(true);
      } else if (input.name === 'video' && input.files[0]) {
        setToggle(false)
        setVideo(input.files[0]);
        setVideoUrl(URL.createObjectURL(input.files[0]))
        setImage(null);
        setImageUrl(null);
        setToggle(false);
        setIsValid(true);
        setCroppedImage(null);
      }
    }
    else {
      setToggle(false)
      toast.error(isErrors)
    }
  };

  const handleSave = () => {
    const fileData = new FormData();
    if (croppedImage) {
      fileData.append('file_upload', croppedImage);
    } else if (image) {
      fileData.append('file_upload', image);
    } else if (video) {
      fileData.append('file_upload', video);
    }
    dispatch(
      fileUpload(fileData,
        updatedProgress => {
          setProgress(updatedProgress)
        },
        result => {
          setProgress(0);
          onSave(result);
        },
        err => {
          setProgress(0)
        }
      )
    );
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(imageUrl => imageUrl = selectedImage);
    } else if (selectedVideo) {
      setVideoUrl(videoUrl => videoUrl = selectedVideo);
    }
  }, [selectedImage, selectedVideo]);

  return (
    <div className="exhibition-model">
      <div className="update-image">
        <ImageCropper
          imageUrl={imageUrl}
          toggle={toggle}
          onToggle={handleToggle}
          onSkip={handleSkip}
          onCompleteCrop={handleCompleteCrop}
          croppedImage={croppedImage}
        />
        <div className="Exhibit-head">
          <div className="left-caret">
            <i
              className="fa fa-angle-left clickable"
              aria-hidden="true"
              onClick={() => history.goBack()}
            >
            </i>
          </div>

          <h2 >Add an Exhibit</h2>
        </div>
        <div className="up-img-box">
          {isEmpty(croppedImage) && !isEmpty(imageUrl) &&
            <img
              className="update-pic"
              src={imageUrl}
              alt="gallery1"
            />
          }
          {!isEmpty(croppedImage) &&
            <img
              className="update-pic"
              src={URL.createObjectURL(croppedImage)}
              alt="gallery2"
            />
          }
          {videoUrl &&
            <video width="320" height="240" controls>
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          }
          <div className="add-nag-icon" >
            <div className="nag">
              <div className="nag-icon" style={{ backgroundColor: user.feel.color_code }} >
                <img alt="" src="/assets/images/plus.png" />
              </div>
              <div className="nag-btn">
                Add image
              </div>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            <div className="nag">
              <div className="nag-icon" style={{ backgroundColor: user.feel.color_code }}>
                <img
                  alt=""
                  src="/assets/images/plus.png"
                />
              </div>
              <div className="nag-btn" >
                Add video
                </div>
              <input
                type="file"
                accept=".mp4"
                name="video"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="actions" >
          {progress > 0 &&
            <ProgressBar
              progress={progress}
              feelColor={feelColor}
            />
          }
          <button
            onClick={handleSave}
            className={isValid ? 'clickable' : 'btn-disable'}
            disabled={!isValid}
            style={{ backgroundColor: user.feel.color_code }}
          >
            Save
           </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionModel;
