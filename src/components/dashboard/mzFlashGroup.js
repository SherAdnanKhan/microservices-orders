import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserCube from '../common/userCube';
import { getFavourites, getFaveAndSprfvsUsers, getSprfvsUsers } from '../../actions/userActions';
import UserContext from '../../context/userContext';
import Avatar from '../common/avatar';
import Input from '../common/input';

import {
  getCollectiveFeeds,
  createFeed,
  getMyFavesFeeds,
  getMySprfvsFeeds,
  getMySprfvsAndFavesFeeds
} from '../../actions/mzFlashActions';
import Spinner from '../common/spinner';

const MzFlashGroup = () => {
  const [charCount, setCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState(2);
  const [showModel, setShowModel] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [error, setError] = useState('');
  const [data, setData] = useState({
    feed: '',
    video: null,
    image: null
  });

  const currentUser = useContext(UserContext);
  const dispatch = useDispatch();
  const {
    user: { favouriteUsers, faveAndSprfvsUsers, sprfvsUsers },
    mzFlash: { collectiveFeeds, loading, favesFeeds, sprfvsFeeds, favesAndSprfvsFeeds }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getFaveAndSprfvsUsers());
    dispatch(getSprfvsUsers());
    dispatch(getCollectiveFeeds());
    dispatch(getMySprfvsFeeds());
    dispatch(getMyFavesFeeds());
    dispatch(getMySprfvsAndFavesFeeds());
  }, [dispatch]);

  const handleChange = ({ target: input }) => {
    if (input.type === 'file') {
      setShowModel(false);
      if (input.files[0]) {
        if (input.name === 'image') {
          setData({ ...data, image: input.files[0], video: null });
          setImageUrl(URL.createObjectURL(input.files[0]));
          setVideoUrl('');
        } else if (input.name === 'video') {
          setData({ ...data, video: input.files[0], image: null });
          setVideoUrl(URL.createObjectURL(input.files[0]));
          setImageUrl('');
        }
      }
    } else {
      setData({ ...data, [input.name]: input.value });
      setCharCount(input.value.length);
    }
  }

  const validate = () => {
    let error = '';

    if (!data.feed) {
      error = 'Please enter your feed';
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const error = validate();
    const formData = new FormData();

    if (!error) {
      for (let key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }
      dispatch(createFeed(formData));
      setData({ ...data, image: null, video: null, feed: '' });
      setImageUrl('');
      setVideoUrl('');
      setCharCount(0);
    }
    setError(error);
  };

  return (
    <section className="mz-flash-group">
      {loading && <Spinner />}
      <div className="row">
        <div className="col-2 box-1">
          <i className="fa fa-caret-up fa-3x"></i>
          {activeTab === 1 &&
            <div className="box-css">
              <div id="demo">
                <div className="cv-carousel">
                  {sprfvsUsers &&
                    sprfvsUsers.map((user, index) => (
                      <div className="item" key={index}>
                        <Link to={`/dashboard/studio/${user.slug}`} key={index} >
                          <UserCube user={user} />
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          }
          {activeTab === 2 &&
            <div className="box-css">
              <div id="demo">
                <div className="cv-carousel">
                  {favouriteUsers &&
                    favouriteUsers.map((user, index) => (
                      <div className="item" key={index}>
                        <Link to={`/dashboard/studio/${user.slug}`} key={index} >
                          <UserCube user={user} />
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          }
          {activeTab === 3 &&
            <div className="box-css">
              <div id="demo">
                <div className="cv-carousel">
                  {faveAndSprfvsUsers &&
                    faveAndSprfvsUsers.map((user, index) => (
                      <div className="item" key={index}>
                        <Link to={`/dashboard/studio/${user.slug}`} key={index} >
                          <UserCube user={user} />
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          }
          <i className="fa fa-caret-down fa-3x"></i>
        </div>
        <div className="col-6 box-2 tab">
          <div className="row">
            <div
              className={`col-4 ${activeTab === 1 && 'active'}`}
              onClick={() => setActiveTab(1)}
            >
              <button className="tablinks">
                {/* <img
                  src="https://placeimg.com/640/480/any"
                  alt="Snow"
                  className="img-css"
                /> */}
                <div className='artcubecase white'>
                  <div className="procusmallmove">
                    <div className='scenesmall white'>
                      <div className="cubesmallmove">
                        <div className="cube-facesmall  cube-face-frontsmall">
                          <img alt="" src="/assets/images/SPRFVFULL.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-backsmall">
                          <img alt="" src="/assets/images/SPRFVFULL.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-leftsmall">
                          <img alt="" src="/assets/images/SPRFVFULL.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-rightsmall">
                          <img alt="" src="/assets/images/SPRFVFULL.png" height="100%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <div
              className={`col-4 ${activeTab === 2 && 'active'}`}
              onClick={() => setActiveTab(2)}
            >
              <button className="tablinks">
                <div className='artcubecase white'>
                  <div className="procusmallmove">
                    <div className='scenesmall white'>
                      <div className="cubesmallmove">
                        <div className="cube-facesmall  cube-face-frontsmall">
                          <img alt="" src="/assets/images/FaveGalleryFull.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-backsmall">
                          <img alt="" src="/assets/images/FaveGalleryFull.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-leftsmall">
                          <img alt="" src="/assets/images/FaveGalleryFull.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-rightsmall">
                          <img alt="" src="/assets/images/FaveGalleryFull.png" height="100%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <div
              className={`col-4 ${activeTab === 3 && 'active'}`}
              onClick={() => setActiveTab(3)}
            >
              <button className="tablinks">
                <div className='artcubecase white'>
                  <div className="procusmallmove">
                    <div className='scenesmall white'>
                      <div className="cubesmallmove">
                        <div className="cube-facesmall  cube-face-frontsmall">
                          <img alt="" src="/assets/images/logowhite.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-backsmall">
                          <img alt="" src="/assets/images/logowhite.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-leftsmall">
                          <img alt="" src="/assets/images/logowhite.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-rightsmall">
                          <img alt="" src="/assets/images/logowhite.png" height="100%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="box-container">
            {activeTab === 1 &&
              <>
                {sprfvsFeeds &&
                  sprfvsFeeds.data.map((feed, index) => (
                    <div
                      className="sub-box tabcontent"
                      id="tab1"
                      key={index}
                    >
                      <div className="row">
                        <div className="col-3">
                          {/* <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" /> */}
                          <Avatar
                            avatars={feed.user.avatars}
                            feelColor={feed.user.feel_color}
                          />
                        </div>
                        <div className="col-7">
                          <span>Name: {feed.user.username}</span>
                          <p> {feed.feed}</p>
                          {feed.feed_type === 1 &&
                            feed.image &&
                            <img
                              src={feed.image.path}
                              alt="Snow"
                              className="img-css"
                            />
                          }
                          {feed.feed_type === 2 &&
                            feed.image &&
                            <div className="video left-space">
                              <video controls>
                                <source src={feed.image.path} type="video/mp4" />
                                <source src={feed.image.path} type="video/ogg" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            }
            {activeTab === 2 &&
              <>
                {favesFeeds &&
                  favesFeeds.data.map((feed, index) => (
                    <div
                      className="sub-box tabcontent"
                      id="tab2"
                      key={index}
                    >
                      <div className="row">
                        <div className="col-3">
                          {/* <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" /> */}
                          <Avatar
                            avatars={feed.user.avatars}
                            feelColor={feed.user.feel_color}
                          />
                        </div>
                        <div className="col-7">
                          <span>Name: {feed.user.username}</span>
                          <p> {feed.feed} </p>
                          {feed.feed_type === 1 &&
                            feed.image &&
                            <img
                              src={feed.image.path}
                              alt="Snow"
                              className="img-css"
                            />
                          }
                          {feed.feed_type === 2 &&
                            feed.image &&
                            <div className="video left-space">
                              <video controls>
                                <source src={feed.image.path} type="video/mp4" />
                                <source src={feed.image.path} type="video/ogg" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            }
            {activeTab === 3 &&
              <>
                {favesAndSprfvsFeeds &&
                  favesAndSprfvsFeeds.data.map((feed, index) => (
                    <div
                      className="tabcontent"
                      id="tab3"
                      key={index}
                    >
                      <div className=" sub-box row">
                        <div className="col-3">
                          <Avatar
                            avatars={feed.user.avatars}
                            feelColor={feed.user.feel_color}
                          />
                        </div>
                        <div className="col-7">
                          <span>Name: {feed.user.username}</span>
                          <p>{feed.feed} </p>
                          {feed.feed_type === 1 &&
                            feed.image &&
                            <img
                              src={feed.image.path}
                              alt="Snow"
                              className="img-css"
                            />
                          }
                          {feed.feed_type === 2 &&
                            feed.image &&
                            <div className="video left-space">
                              <video controls>
                                <source src={feed.image.path} type="video/mp4" />
                                <source src={feed.image.path} type="video/ogg" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          }
                          <div id="outer">
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            }

          </div>
        </div>
        <div className="col-4 box-3">
          <div className="message-input">
            <form className="form-inline" onSubmit={handleSubmit}>
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={() => setShowModel(true)}
              >
              </i>
              <Input
                type="text"
                id="feed"
                name="feed"
                value={data.feed}
                maxLength={10}
                onChange={handleChange}
                error={error}
              />
              <br />
              <input className="clickable btn-send" type="submit" defaultValue="Submit" />
            </form>
            <div class="counter"> ({charCount}/200)</div>
            {imageUrl &&
              <div className="image-preview">
                <img alt="" src={imageUrl} />
              </div>
            }
            {videoUrl &&
              <div className="video-preview">
                <video controls>
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl} type="video/ogg" />
                  Your browser does not support the video tag.
              </video>
              </div>
            }
            {showModel &&
              <div className="add-img-vid-box">
                <i
                  className="fa fa-times close-add-box"
                  onClick={() => setShowModel(false)}
                />
                <label>
                  <img alt="" src="/assets/images/plus.png" />
                  Add Image
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <img alt="" src="/assets/images/plus.png" />
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
          {collectiveFeeds &&
            collectiveFeeds.data.map((feed, index) => (
              <div className=" sub-box row set-sources" key={index}>
                <div className="col-3">
                  {/* <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" /> */}
                  <Avatar
                    avatars={currentUser.avatars}
                    feelColor={currentUser.feel_color}
                  />
                </div>
                <div className="col-9">
                  <span>Name</span>

                </div>
                <p class="submit-text">{feed.feed} </p>
                <div class="imgvideo-mzflash">
                  {feed.feed_type === 1 &&
                    feed.image &&
                    <img
                      src={feed.image.path}
                      alt="Snow"
                      className="img-css"
                    />
                  }
                  {feed.feed_type === 2 &&
                    feed.image &&
                    <div className="video">
                      <video controls>
                        <source src={feed.image.path} type="video/mp4" />
                        <source src={feed.image.path} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  }
                </div>
                <div class="flex-container">
                  <div className="action">
                    <button className="comment">Comment</button>
                  </div>
                  <div className="actions-repost">
                    <button className="repost">Repost</button>
                  </div>
                </div>
                <input
                  type="text"
                  id="feed"
                  name="feed"
                  placeholder="Enter Comment..."
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MzFlashGroup;
