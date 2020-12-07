import React, { useEffect, useState } from 'react';
import ProgressBar from '../common/progressBar'
import { getCurrentUser } from '../../actions/authActions';
import Modal from './modal/modal';
import ModalBody from './modal/modalBody';
import ModalFooter from './modal/modalFooter';
import ModalHeader from './modal/modalHeader';
import { useDispatch } from "react-redux";
import { fileUpload } from "../../actions/genericActions";
import Input from './input';
import { sendFeedback } from "../../actions/userActions";
import { isEmpty, isValidFileSize } from "../../utils/helperFunctions"
import { IMAGE_UPLOAD_SIZE_ERROR } from '../../constants/errors';

const FeedBackModal = ({ onCancel }) => {
  const [feedback, setFeedback] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState('');
  const [errors, setErrors] = useState({})
  const [imageLoading, setImageLoading] = useState(false);
  const user = getCurrentUser();
  const dispatch = useDispatch();

  useEffect(() => {
  }, [errors]);

  const validate = () => {
    const _errors = {};

    if (!imageUrl) {
      _errors['imageUrl'] = 'Please select image';
    }
    if (!feedback) {
      _errors['feedback'] = 'Please enter feedback';
    }

    return Object.keys(_errors).length === 0 ? {} : _errors;
  }

  const handleDeletePreview = e => {
    e.preventDefault();
    e.stopPropagation();
    setImageUrl("");
  }

  const handleChange = ({ target: input }) => {
    if (input.type === 'file' && input.files[0]) {
      const fileData = new FormData();
      fileData.append('file_upload', input.files[0]);
      const isValid = isValidFileSize(input.files[0].size, 2);

      setErrors({ ...errors, imageUrl: isValid ? errors.imageUrl : IMAGE_UPLOAD_SIZE_ERROR })
      if (isValid) {
        dispatch(
          fileUpload(fileData,
            updatedProgress => {
              setProgress(updatedProgress)
            },
            result => {
              setProgress(0);
              if (result.doc_type === 'image') {
                setImageUrl(result.path);
                setImageLoading(true);
                setErrors({ ...errors, imageUrl: '' });
              } else {
                setImageUrl('')
              }
            },
            err => {
              setProgress(0)
            }
          )
        );
      }

    }
    else {
      if (input.value.length > 0) {
        setErrors({ ...errors, feedback: "" })
      }
      setFeedback(input.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const _errors = validate();
    if (isEmpty(_errors)) {
      let data = {
        feedback: feedback,
        image_path: imageUrl
      }
      dispatch(sendFeedback(data))
      onCancel(false)
    }
    setErrors(_errors)
  }

  const handleStopLoading = () => {
    setImageLoading(false);
  }

  return (
    <div className="feedback-modal">
      <Modal>
        <ModalHeader
          onClose={() => onCancel(false)}
          style={{ backgroundColor: user.feel.color_code }}
        />
        <ModalBody className="modal-content">
          <Input
            type="file"
            name="imageUrl"
            id="avatar"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            error={errors.imageUrl}
          >
            <h3 className="title">Click avatar to add image</h3>
            <label htmlFor="avatar" className={errors.imageUrl ? 'avatar clickable is-invalid' : 'avatar clickable'}>
              {imageUrl
                ? <div className="imagePreview">
                  {!imageLoading &&
                    <div className="trashSection" onClick={handleDeletePreview} >
                      <i className="fas fa-trash"></i>
                    </div>
                  }
                  <img src={imageUrl}
                    alt="avatar"
                    onLoad={handleStopLoading}
                  />
                </div>
                : <img src='/assets/images/avataricon.png' alt="avatar" />
              }
            </label>
          </Input>
          {
            progress > 0 &&
            <ProgressBar
              progress={progress}
              feelColor={user.feel.color_code}
            />
          }
          <div className="feedbackDescription">
            <textarea
              type="text"
              value={feedback}
              placeholder="Feedback Description"
              name="feedback"
              onChange={handleChange}
              rows="8"
              columns="50"
            ></textarea>
            <span className="error">{errors.feedback}</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            style={{ backgroundColor: user.feel.color_code }}
            onClick={handleSubmit} >Send</button>
        </ModalFooter>
      </Modal>
    </div>
  )
};
export default FeedBackModal;
