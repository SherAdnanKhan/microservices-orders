import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar';
import { FAVES, SPRFVS, INVITE_ONLY } from '../../constants/privacyTypes';

const Post = ({
  gallery, user, activeGallery, galleryPrivacy, onSuperFav, isSprFvs
}) => {
  const [activePost, setActivePost] = useState({});

  const handleActivePost = post => {
    if (post === activePost) {
      setActivePost({});
    } else {
      setActivePost(post);
    }
  }

  const isAllowed = () => {
    const found = galleryPrivacy.find(g => g.gallery_id === activeGallery.id);
    return !!found.is_allowed;
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
                      <div className="valut-icon">
                        <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
                      </div>
                      {gallery &&
                        gallery.posts.map((post, index) => (
                          <div className="list-body" key={index}>
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
                            <div className={
                              activePost === post
                                ? 'lobby-icon lobby-icon-slide'
                                : 'lobby-icon'
                            }>
                              <div className="strk-btn">
                                <img className="strk-img" alt="" src="/assets/images/strokeiconfull.png" />
                              </div>
                              <div className="action">
                                <img className="comment-img" alt="" src="/assets/images/crit1.png" />
                              </div>
                              <div className="action ">
                                <img className="comment-img" alt="" src="/assets/images/ncommnicon.png" />
                              </div>
                            </div>
                          </div>
                        ))}
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
