import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar';
import { FAVES, SPRFVS, INVITE_ONLY } from '../../constants/privacyTypes';
import Comment from '../dashboard/viewPost/comments';
import Stroke from './stroke';
import { strokePost, unstrokePost, getNcomm } from '../../actions/postAction';
import { useDispatch, useSelector } from 'react-redux';
import ImageVideoSlider from './imageVideoSlider';

const Post = ({
  gallery, user, activeGallery,
  galleryPrivacy, onSuperFav, isSprFvs
}) => {

  const dispatch = useDispatch();
  const {
    postView: { ncomm },
  } = useSelector(state => state);

  const [activePost, setActivePost] = useState({});
  const [activeNcomm, setActiveNcomm] = useState('');

  const handleNcomm = post => {
    if (post.id === activeNcomm.id) {
      setActiveNcomm('');
    } else {
      setActiveNcomm(post);
      dispatch(getNcomm(post.slug));
    }
  };

  const handleActivePost = post => {
    if (post.id === activePost.id) {
      setActivePost('');
    } else {
      setActivePost(post);
    }
  }

  const isAllowed = () => {
    const found = galleryPrivacy.find(g => g.gallery_id === activeGallery.id);
    return !!found.is_allowed;
  };

  const handleStroke = post => {
    dispatch(strokePost(post.id, post.gallery_id));
  };

  const handleUnstroke = post => {
    dispatch(unstrokePost(post.id, post.gallery_id));
  };

  return (
    <div className="wrapper">
      <div className="screen">
        {activeGallery
          && (
            <>
              {isAllowed()
                && (
                  <div className="post">
                    <div className="post-picture">
                      {gallery
                        && gallery.posts.map((post, index) => (
                          <div key={index} className="">
                            <Link to={`/dashboard/viewpost/${post.slug}`}>
                              {post.post_type === 2
                                ? (
                                  <video width="320" height="240" controls>
                                    <source src={post.image.path} type="video/mp4" />
                                    <source src={post.image.path} type="video/ogg" />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <img src={`${post.image.path}`} alt="" />
                                )}
                            </Link>
                          </div>
                        ))}
                    </div>

                    <div className="show-list">
                      <div className="s-l-header">
                        <p className="usernames">
                          <Link to={`/dashboard/studio/${user.slug}`} >
                            {user.username}
                          </Link>
                        </p>
                        <Avatar avatars={user && user.avatars} feelColor={user && user.feel_color} />
                        {user && user.art
                          && (
                            <>
                              {user.art.parent && `${user.art.parent.name}/`}
                              {user.art.name && user.art.name}
                            </>
                          )}
                      </div>
                      {gallery &&
                        gallery.posts.map((post, index) => (
                          <div className="list-body" key={index}>
                            <div
                              className={
                                activePost.id === post.id
                                  ? 'valut-icon show-valut'
                                  : 'valut-icon'
                              }
                            >
                              <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
                            </div>
                            <div onClick={() => handleActivePost(post)}>
                              {post.post_type === 2
                                ? (
                                  <video width="320" height="240" controls>
                                    <source src={post.image.path} type="video/mp4" />
                                    <source src={post.image.path} type="video/ogg" />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <img src={`${post.image.path}`} alt="" />
                                )}
                              <p style={{ textAlign: 'center' }}>{post.title && post.title}</p>
                            </div>
                            {activeNcomm === post &&
                              <ImageVideoSlider ncomm={ncomm} />
                            }
                            <div className={
                              activePost.id === post.id
                                ? 'lobby-icon lobby-icon-slide'
                                : 'lobby-icon'
                            }>
                              <div className="strk-btn">
                                <Stroke
                                  className="strk-img"
                                  hasStroke={post.has_stroke.length}
                                  onStroke={() => handleStroke(post)}
                                  onUnstroke={() => handleUnstroke(post)}
                                />
                                <p> strokes {post.stroke_users_count} </p>
                              </div>
                              <div className="action">
                                <img
                                  className="comment-img open-commet clickable"
                                  alt=""
                                  src="/assets/images/crit1.png"
                                />
                                <p> comments {post.comments.length}</p>
                              </div>
                              <div className="action">
                                <img
                                  className="comment-img clickable"
                                  alt=""
                                  src="/assets/images/ncommnicon.png"
                                  onClick={() => handleNcomm(post)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      <Comment post={activePost} />
                    </div>
                  </div>
                )}
              {(activeGallery?.privacy?.privacy_type_id === FAVES && !isAllowed())
                && (
                  <div className="privacy-actions">
                    <img
                      src="/assets/images/catfave.png"
                      className="clickable fav-icon"
                      alt=""
                    />
                    <div>Fav this Gallery to view</div>
                  </div>
                )}
              {(activeGallery?.privacy?.privacy_type_id === SPRFVS && !isAllowed())
                && (
                  <div className="privacy-actions">
                    <button
                      disabled={isSprFvs > 0}
                      onClick={onSuperFav}
                    >
                      {isSprFvs === 2 && 'Requested'}
                      {isSprFvs === 0 && 'Request'}
                    </button>
                    <div> Only for SprFvs </div>
                  </div>
                )}
              {(activeGallery?.privacy?.privacy_type_id === INVITE_ONLY && !isAllowed())
                && (
                  <div className="privacy-actions">
                    <img
                      src="/assets/images/invite_gallery_icon.png"
                      className="clickable fav-icon"
                      alt=""
                    />
                    <div>Private Gallery Invite Only</div>
                  </div>
                )}
            </>
          )}
      </div>
    </div>
  );
};

export default Post;
