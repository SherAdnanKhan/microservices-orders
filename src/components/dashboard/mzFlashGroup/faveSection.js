import React, { useContext } from 'react';
import Avatar from '../../common/avatar';
import UserContext from '../../../context/userContext';
import Feed from './feed';

const FaveSection = ({
  sprfvsFeeds, favesFeeds, favesAndSprfvsFeeds, userFeeds,
  activeTab, activeUser, onTabChange, onCommentChange,
  activeFeedComment, onActiveFeedComment, onPostComment, onPostModal,
  comments, onRepost, onStroke, onUnstroke, myFeeds, activeUserList
}) => {

  const currentUser = useContext(UserContext);

  return (
    <div className="col-6 box-2 tab">
      <div className="row">
        <div
          className={`col-3 hide-mobile fav-tab-1 ${activeTab === 1 && 'active'}`}
          onClick={() => onTabChange(1)}
        >
          <button className="tablinks">
            {((activeUser && activeUserList !== 1) || !activeUser) &&
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
            }
            {activeUser && activeUserList === 1 &&
              <Avatar
                user={activeUser}
              />
            }
          </button>
        </div>
        <div
          className={`col-3 mobile-view fav-tab-2 ${activeTab === 2 && 'active'}`}
          onClick={() => onTabChange(2)}
        >
          <button className="tablinks">
            {((activeUser && activeUserList !== 2) || !activeUser) &&
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
            }
            {activeUser && activeUserList === 2 &&
              <Avatar
                user={activeUser}
              />
            }
          </button>
        </div>
        <div
          className={`col-3 mobile-view fav-tab-3 ${activeTab === 3 && 'active'}`}
          onClick={(e) => {
            e.preventDefault();
            onTabChange(3)
          }}
        >
          <button className="tablinks">
            {((activeUser && activeUserList !== 3) || !activeUser) &&
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
            }
            {activeUser && activeUserList === 3 &&
              <Avatar
                user={activeUser}
              />
            }
          </button>
        </div>
        <div
          className={`col-3 mobile-view fav-tab-4 ${activeTab === 4 && 'active'}`}
          onClick={() => onTabChange(4)}
        >
          <button className="tablinks">
            <Avatar
              user={currentUser}
            />
          </button>
        </div>
      </div>
      <div className="box-container">
        {activeTab === 1 &&
          <>
            {sprfvsFeeds?.data?.map((feed, index) => (
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
                  id={`fav${feed.id}`}
                  name={`fav${feed.id}`}
                  value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                  placeholder="Enter a Comment..."
                  onChange={onCommentChange}
                  onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                />
              </Feed>
            ))}
          </>
        }

        {activeTab === 2 &&
          <>
            {favesFeeds?.data?.map(feed => (
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
                  id={`fav${feed.id}`}
                  name={`fav${feed.id}`}
                  value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                  placeholder="Enter a Comment..."
                  onChange={onCommentChange}
                  onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                />
              </Feed>
            ))}
          </>
        }
        {activeTab === 3 &&
          <>
            {favesAndSprfvsFeeds?.data?.map(feed => (
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
                  id={`fav${feed.id}`}
                  name={`fav${feed.id}`}
                  value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                  placeholder="Enter a Comment..."
                  onChange={onCommentChange}
                  onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                />
              </Feed>
            ))}
          </>
        }

        {activeTab === 4 &&
          <>
            {myFeeds?.data?.map(feed => (
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
                  id={`fav${feed.id}`}
                  name={`fav${feed.id}`}
                  value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                  placeholder="Enter a Comment..."
                  onChange={onCommentChange}
                  onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                />
              </Feed>
            ))}
          </>
        }

        {activeTab === 0 &&
          <>
            {userFeeds?.data?.map(feed => (
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
                  id={`fav${feed.id}`}
                  name={`fav${feed.id}`}
                  value={comments[`fav${feed.id}`] ? comments[`fav${feed.id}`] : ''}
                  placeholder="Enter a Comment..."
                  onChange={onCommentChange}
                  onKeyUp={e => onPostComment(e, feed.id, `fav${feed.id}`, feed.user)}
                />
              </Feed>
            ))}
          </>
        }

      </div>
    </div >
  );
};

export default FaveSection;
