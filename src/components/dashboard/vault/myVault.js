import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../common/spinner';
import RightBorder from '../layout/rightBorder';
import Footer from '../layout/footer';
import LeftBorder from '../layout/leftBorder';
import { getMyVault } from '../../../actions/studioActions';
import VaultBar from "../vault/vaultBar";
import VaultHeader from "../vault/vaultHeader";

const MyVault = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyVault());
  }, [dispatch]);
  const { loading } = useSelector(state => state.loading);
  const { feelColor } = useSelector(state => state.feelColor);
  const { studio: vaultsList } = useSelector(state => state);
  let vaultPosts = vaultsList?.vaultsList?.vault_posts;
  let vaultFeeds = vaultsList?.vaultsList?.vault_feeds;
  const handleBackPress = () => {
    history.push('/dashboard/my-studio');
  }
  return (
    <div className={`frameReady ${feelColor}`}>

      <LeftBorder feelColor={feelColor} />
      <RightBorder feelColor={feelColor} />
      <div className="vault-page">
        {loading && <Spinner />}
        <VaultHeader />
        <VaultBar onBack={handleBackPress} feelColor={feelColor} />
        <div className="edit-user-page">
          <div className="wrapper">
            <div className="vault-posts">
              <div className="favas-box">
                <div className="favas-avatar">
                  {/* <Link to={`/dashboard/studio/sarahsajjad`}  >
                    {vaultPosts?.map(post =>
                      <div className="gallery-cover">
                        <div>{post.created_at}</div>
                        <img src={post?.post?.image?.path} alt="" />
                      </div>
                    )}
                  </Link> */}
                </div>
                <div className="wrapper">
                  <div className="screen">
                    <div className="details">
                      <div className="vault-post">
                        <div className="post-picture">
                          {/* FOR list VIEW */}

                          {vaultPosts?.map(vault =>
                            <div className="gallery-cover">
                              <Link to={`/dashboard/viewpost/${vault.post.slug}`}>
                                <img src={vault?.post?.image?.path} alt="" />
                              </Link>

                              <div style={{ textAlign: "center" }}>{vault?.post?.title}</div>
                            </div>
                          )}
                          {vaultFeeds && vaultFeeds?.map(vault =>
                            <div className="gallery-cover">
                              <video src={vault?.post?.image?.path} controls />
                              <div style={{ textAlign: "center" }}>{vault?.post?.title}</div>
                            </div>
                          )}

                        </div>
                        {/* FOR Grid VIEW */}
                        <div className="show-list">
                          <Link
                            to={`/dashboard/studio/sarahsajjad`}
                          >
                            <div className="gallery-cover">
                              {vaultPosts?.map(vault =>
                                <div className="image-style">
                                  <img src={vault?.post?.image?.path} alt="" />
                                  <div>{vault?.post?.title}</div>
                                </div>
                              )}
                              {vaultFeeds && vaultFeeds?.map(vault =>
                                <div className="gallery-cover">
                                  <img src={vault?.post?.image?.path} alt="" />
                                  <div style={{ textAlign: "center" }}>{vault?.post?.title}</div>
                                </div>
                              )}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
};

export default MyVault;
