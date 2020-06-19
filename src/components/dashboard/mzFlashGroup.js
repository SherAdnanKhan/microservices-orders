import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserCube from '../common/userCube';
import { getFavourites } from '../../actions/userActions';
import UserContext from '../../context/userContext';
import Avatar from '../common/avatar';
import { getMyFeeds, createFeed } from '../../actions/mzFlashActions';
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
    mzFlash: { feeds, loading }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getMyFeeds())
  }, [dispatch]);

  useEffect(() => {
    console.log(feeds);
  }, [feeds]);

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
                <Avatar
                  avatars={currentUser.avatars}
                  feelColor={currentUser.feel_color}
                />
              </button>
            </div>
            <div
              className={`col-4 ${activeTab === 2 && 'active'}`}
              onClick={() => setActiveTab(2)}
            >
              <button className="tablinks">
                {/* <img
                  src="https://placeimg.com/640/480/any"
                  alt="Forest"
                  className="img-css"
                /> */}
                <Avatar
                  avatars={currentUser.avatars}
                  feelColor={currentUser.feel_color}
                />
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
                <Avatar
                  avatars={currentUser.avatars}
                  feelColor={currentUser.feel_color}
                />
              </button>
            </div>
          </div>
          <div className="box-container">
            {activeTab === 1 &&
              <div className="sub-box tabcontent" id="tab1">
                <div className="row">
                  <div className="col-3">
                    {/* <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" /> */}
                    <Avatar
                      avatars={currentUser.avatars}
                      feelColor={currentUser.feel_color}
                    />
                  </div>
                  <div className="col-7">
                    <span>tab 1 content</span>
                    <span className="name-btn BT-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. </p>
                  </div>
                </div>
              </div>
            }
            {activeTab === 2 &&
              <div className="sub-box tabcontent" id="tab2">
                <div className="row">
                  <div className="col-3">
                    {/* <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" /> */}
                    <Avatar
                      avatars={currentUser.avatars}
                      feelColor={currentUser.feel_color}
                    />
                  </div>
                  <div className="col-7">
                    <span>tab 2 content</span>
                    <span className="name-btn BT-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. </p>
                  </div>
                </div>
              </div>
            }
            {activeTab === 3 &&
              <div className="tabcontent" id="tab3">
                <div className="sub-box">
                  <div className="row">
                    <div className="col-3">
                      {/* <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" /> */}
                      <Avatar
                        avatars={currentUser.avatars}
                        feelColor={currentUser.feel_color}
                      />
                    </div>
                    <div className="col-7">
                      <span>Tab 3 content</span>
                      <span className="name-btn BT-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                  </div>
                </div>
                <div className=" sub-box row">
                  <div className="col-3">
                    <Avatar
                      avatars={currentUser.avatars}
                      feelColor={currentUser.feel_color}
                    />
                  </div>
                  <div className="col-7">
                    <span>Name</span>
                    <span className="name-btn BT-2">
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. </p>
                    <div id="outer">
                    </div>
                  </div>
                  <div className="col-2">
                    
                  </div>
                </div>
              </div>
            }

          </div>
        </div>
        <div className="col-4 box-3">
       
          <div className="message-input">
          <form className="form-inline" onSubmit={handleSubmit}>
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
                  <span className="name-btn BT-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                  <p>{feed.feed} </p>                  
                </div>
                <div className="col-2">
                  {feed.image &&
                    <img
                      src={feed.image.path}
                      alt="Snow"
                      className="img-css"
                    />
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
