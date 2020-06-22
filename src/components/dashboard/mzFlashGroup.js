import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserCube from '../common/userCube';
import { getFavourites } from '../../actions/userActions';
import UserContext from '../../context/userContext';
import Avatar from '../common/avatar';
import {
  getMyFeeds,
  createFeed,
  getMyFavesFeeds,
  getMySprfvsFeeds,
  getMySprfvsAndFavesFeeds
} from '../../actions/mzFlashActions';
import Spinner from '../common/spinner';

const MzFlashGroup = () => {
  const [activeTab, setActiveTab] = useState(1);

  const [data, setData] = useState({
    feed: '',
    video: null,
    image: null
  });

  const currentUser = useContext(UserContext);
  const dispatch = useDispatch();
  const {
    user: { favouriteUsers },
    mzFlash: { feeds, loading, favesFeeds, sprfvsFeeds, favesAndSprfvsFeeds }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getMyFeeds());
    dispatch(getMySprfvsFeeds());
    dispatch(getMyFavesFeeds());
    dispatch(getMySprfvsAndFavesFeeds());
  }, [dispatch]);

  const handleChange = ({ target: input }) => {
    if (input.type === 'file') {
      if (input.files[0]) {
        setData({ ...data, [input.name]: input.files[0] });
      }
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    console.log(data);

    for (let key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    dispatch(createFeed(formData));
  };

  return (
    <section className="mz-flash-group">
      {loading && <Spinner />}
      <div className="row">
        <div className="col-2 box-1">
          <i className="fa fa-caret-up fa-3x"></i>
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
                <div className='artcubecase gold'>
                  <div className="procusmallmove">
                    <div className='scenesmall gold'>
                      <div className="cubesmallmove">
                        <div className="cube-facesmall  cube-face-frontsmall">
                          <img alt="" src="/assets/images/sprfvs.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-backsmall">
                          <img alt="" src="/assets/images/sprfvs.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-leftsmall">
                          <img alt="" src="/assets/images/sprfvs.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-rightsmall">
                          <img alt="" src="/assets/images/sprfvs.png" height="100%" />
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
                <div className='artcubecase gold'>
                  <div className="procusmallmove">
                    <div className='scenesmall gold'>
                      <div className="cubesmallmove">
                        <div className="cube-facesmall  cube-face-frontsmall">
                          <img alt="" src="/assets/images/fave_icon.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-backsmall">
                          <img alt="" src="/assets/images/fave_icon.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-leftsmall">
                          <img alt="" src="/assets/images/fave_icon.png" height="100%" />
                        </div>
                        <div className="cube-facesmall  cube-face-rightsmall">
                          <img alt="" src="/assets/images/fave_icon.png" height="100%" />
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
                {/* <img
                  src="https://placeimg.com/640/480/any"
                  alt="Mountains"
                  className="img-css"
                /> */}

                <div className='artcubecase gold'>
                  <div className="procusmallmove">
                    <div className='scenesmall gold'>
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
                            <video controls>
                              <source src={feed.image.path} type="video/mp4" />
                              <source src={feed.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          }
                        </div>
                        <div className="col-2">
                          <span className="name-btn BT-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
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
                            <video controls>
                              <source src={feed.image.path} type="video/mp4" />
                              <source src={feed.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          }
                        </div>
                        <div className="col-2">
                          <span className="name-btn BT-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
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
                            <video controls>
                              <source src={feed.image.path} type="video/mp4" />
                              <source src={feed.image.path} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          }
                          <div id="outer">
                          </div>
                        </div>
                        <div className="col-2">
                          <span className="name-btn BT-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
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
              <i class="fa fa-plus" aria-hidden="true"></i>
              <input
                type="text"
                id="feed"
                name="feed"
                value={data.feed}
                onChange={handleChange}
              />
              <br />
              <input className="clickable btn-send" type="submit" defaultValue="Submit" />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              <input
                type="file"
                name="video"
                accept=".mp4"
                onChange={handleChange}
              />
            </form>

          </div>
          {<img src="https://placeimg.com/640/480/any" alt="Snow" className="form-img-css" />}
          <iframe width="180" height="150" src="https://www.youtube.com/embed/C0DPdy98e4c" title="simple video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          {feeds &&
            feeds.map((feed, index) => (
              <div className=" sub-box row" key={index}>
                <div className="col-3">
                  {/* <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" /> */}
                  <Avatar
                    avatars={currentUser.avatars}
                    feelColor={currentUser.feel_color}
                  />
                </div>
                <div className="col-7">
                  <span>Name</span>

                  <p>{feed.feed} </p>
                </div>

                <div className="col-2">
                  <span className="name-btn BT-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
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
                    <video controls>
                      <source src={feed.image.path} type="video/mp4" />
                      <source src={feed.image.path} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  }
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MzFlashGroup;
