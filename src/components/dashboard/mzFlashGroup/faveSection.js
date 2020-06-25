import React from 'react';
import Avatar from '../../common/avatar';

const FaveSection = ({
  sprfvsFeeds, favesFeeds, favesAndSprfvsFeeds,
  activeTab, onTabChange
}) => {
  return (
    <div className="col-6 box-2 tab">
      <div className="row">
        <div
          className={`col-4 ${activeTab === 1 && 'active'}`}
          onClick={() => onTabChange(1)}
        >
          <button className="tablinks">
            <div className='artcubecase white'>
              <div className="procusmallmove">
                <div className='scenesmall white'>
                  <div className="cubesmallmove">
                    <div className="cube-facesmall  cube-face-frontsmall">
                      <img alt="" src="/assets/images/sprfvs_empty.png" height="100%" />
                    </div>
                    <div className="cube-facesmall  cube-face-backsmall">
                      <img alt="" src="/assets/images/sprfvs_empty.png" height="100%" />
                    </div>
                    <div className="cube-facesmall  cube-face-leftsmall">
                      <img alt="" src="/assets/images/sprfvs_empty.png" height="100%" />
                    </div>
                    <div className="cube-facesmall  cube-face-rightsmall">
                      <img alt="" src="/assets/images/sprfvs_empty.png" height="100%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div
          className={`col-4 ${activeTab === 2 && 'active'}`}
          onClick={() => onTabChange(2)}
        >
          <button className="tablinks">
            <div className='artcubecase white'>
              <div className="procusmallmove">
                <div className='scenesmall white'>
                  <div className="cubesmallmove">
                    <div className="cube-facesmall  cube-face-frontsmall">
                      <img alt="" src="/assets/images/fave_gallery_empty.png" height="100%" />
                    </div>
                    <div className="cube-facesmall  cube-face-backsmall">
                      <img alt="" src="/assets/images/fave_gallery_empty.png" height="100%" />
                    </div>
                    <div className="cube-facesmall  cube-face-leftsmall">
                      <img alt="" src="/assets/images/fave_gallery_empty.png" height="100%" />
                    </div>
                    <div className="cube-facesmall  cube-face-rightsmall">
                      <img alt="" src="/assets/images/fave_gallery_empty.png" height="100%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div
          className={`col-4 ${activeTab === 3 && 'active'}`}
          onClick={() => onTabChange(3)}
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
  );
};

export default FaveSection;
