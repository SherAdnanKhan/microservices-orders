import React, { useState } from 'react';
import Input from '../../common/input';
import { useDispatch, useSelector } from 'react-redux';
import { createFeed } from '../../../actions/mzFlashActions';
import ToolTip from "../../common/toolTip/toolTip";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fileUpload } from '../../../actions/genericActions';
import ProgressBar from '../../common/progressBar';
import Feed from './feed';
import { toast } from "react-toastify";
import { IMAGE_UPLOAD_SIZE_ERROR, VIDEO_UPLOAD_SIZE_ERROR } from '../../../constants/errors';

const FeedSection = ({
  collectiveFeeds, onModelChange, showModel,
  currentUser, onCommentChange, onActiveFeedComment,
  activeFeedComment, comments, onPostComment, onRepost,
  onStroke, onUnstroke, onCallNextFeeds, feedLoader, nextPageUrl, currentPage
}) => {

  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const showError = true;
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    feed: '',
    doc_name: '',
    doc_path: '',
    doc_type: ''
  });

  const [progress, setProgress] = useState(0);
  const { feelColor } = useSelector(state => state.feelColor);

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
    if (input.type === 'file') {
      const fileSizeMb = convertFileSize(input.files[0].size);
      const fileType = input.files[0].type;
      const isErrors = validateFile(fileSizeMb, fileType);
      const fileData = new FormData();
      fileData.append('file_upload', input.files[0]);
      if (!isErrors) {
        dispatch(
          fileUpload(fileData,
            updatedProgress => {
              setProgress(updatedProgress)
            },
            result => {
              setProgress(0);
              if (result.doc_type === 'image') {
                setImageUrl(result.path);
                setVideoUrl('');
              } else {
                setImageUrl('');
                setVideoUrl(result.path);
              }
              setData({ ...data, doc_name: result.doc_name, doc_path: result.path, doc_type: result.doc_type });
            },
            err => {
              setProgress(0)
            }
          )
        );
        onModelChange(false)
      }
      else {
        onModelChange(false);
        toast.error(isErrors)
      }

    } else {
      setData({ ...data, [input.name]: input.value });
      setCharCount(input.value.length);
    }
  };

  const validate = () => {
    let error = '';

    if (!data.feed) {
      error = 'Feed cannot be empty';
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    let object;
    const error = validate();
    if (data.doc_name === "" && data.doc_path === "" && data.doc_type === "") {
      object = {
        feed: data.feed
      }
    }
    else {
      object = {
        feed: data.feed,
        doc_name: data.doc_name,
        doc_path: data.doc_path,
        doc_type: data.doc_type
      }
    }

    if (!error) {
      dispatch(createFeed(object));
      setData({ ...data, feed: '', doc_name: '', doc_path: '', doc_type: '' });
      setImageUrl('');
      setVideoUrl('');
      setCharCount(0);
    }
    setError(error);
  };

  const fetchData = () => {
    onCallNextFeeds();
  }

  return (
    collectiveFeeds.data.length > 0 &&
    <InfiniteScroll
      dataLength={collectiveFeeds?.data?.length}
      next={fetchData}
      height="85vh"
      style={{ border: "2px solid #C3C3C3" }}
      hasMore={nextPageUrl ? true : false}
    >
      <div
        className="col-4 box-3"
      >
        <div className="message-input">
          <form className="form-inline" onSubmit={handleSubmit}>
            <i
              className="fa fa-plus"
              aria-hidden="true"
              onClick={() => onModelChange(true)}
              data-for="addPost"
              data-tip="upload post"
            >
            </i>
            <ToolTip id="addPost" />
            <Input
              type="text"
              id="feed"
              name="feed"
              value={data.feed}
              maxLength={200}
              onChange={handleChange}
              error={error}
              showError={false}
            />
            <br />
            <input className="clickable btn-send" type="submit" defaultValue="Submit" />
          </form>
          {progress > 0 &&
            <ProgressBar
              progress={progress}
              feelColor={feelColor}
            />
          }
          {showError && error && (
            <div className="error">
              {error}
            </div>
          )}
          <div className="counter"> ({charCount}/200)</div>
          {imageUrl &&
            <div className="image-preview">
              <img alt="" src={imageUrl} />
            </div>
          }
          {videoUrl &&
            <div className="video-preview">
              <video >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
            </div>
          }
          {showModel &&
            <div className="add-media-box">
              <i
                style={{ backgroundColor: feelColor }}
                className="fa fa-times close-add-box"
                onClick={() => onModelChange(false)}
              />
              <label>
                <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: feelColor }} />
              Add Image
              <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </label>
              <label>
                <img alt="" src="/assets/images/plus.png" style={{ backgroundColor: feelColor }} />
              Add Video
              <input
                  type="file"
                  name="video"
                  accept=".mp4"
                  onChange={handleChange}
                />
              </label>
            </div>
          }
        </div>
        {collectiveFeeds?.data?.map((feed, index) => (
          <Feed
            key={feed.id}
            feed={feed}
            onStroke={() => onStroke(feed)}
            onUnstroke={() => onUnstroke(feed)}
            activeFeedComment={activeFeedComment}
            onActiveFeedComment={e => onActiveFeedComment(e, feed.id)}
            onRepost={e => onRepost(e, feed)}
            currentUser={currentUser}
          >
            <input
              type="text"
              id={`feed${feed.id}`}
              name={`feed${feed.id}`}
              value={comments[`feed${feed.id}`] ? comments[`feed${feed.id}`] : ''}
              placeholder="Enter a Comment..."
              onChange={onCommentChange}
              onKeyUp={e => onPostComment(e, feed.id, `feed${feed.id}`, feed.user)}
            />
          </Feed>
        ))}
      </div >
    </InfiniteScroll>
  );
};

export default FeedSection;
