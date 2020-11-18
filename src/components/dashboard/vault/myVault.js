import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../common/spinner';
import Footer from '../layout/footer';
import { clearVaults, getMyVault } from '../../../actions/studioActions';
import VaultBar from "../vault/vaultBar";
import PostLoader from "../../common/loader";
import InfiniteScroll from 'react-infinite-scroll-component';


const MyVault = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyVault());
    return () => {
      dispatch(clearVaults())
    }
  }, [dispatch]);

  const { loading } = useSelector(state => state.loading);
  const { feelColor } = useSelector(state => state.feelColor);
  const { studio: { vaults } } = useSelector(state => state);
  const [currentPage, setCurrentPage] = useState(1);
  const handleBackPress = () => {
    history.push('/my-studio');
  }

  const fetchNextVaults = () => {
    dispatch(getMyVault(currentPage + 1));
    setCurrentPage(currentPage => currentPage + 1);
  }

  return (
    <div className={`frameReady ${feelColor}`} >
      <div className="vault-page">
        {loading && <Spinner />}
        <VaultBar onBack={handleBackPress} feelColor={feelColor} />
        <div className="edit-user-page" >
          <div className="wrapper" >
            <div className="vault-posts">
              <div className="favas-box">
                <div className="vault-wrapper" >
                  <div className="screen">
                    <div className="details">
                      <div className="vault-post" >
                        <div className="post-picture">
                          {/* FOR list VIEW */}
                          <InfiniteScroll
                            style={{ overflow: "unset" }}
                            dataLength={vaults?.data}
                            next={fetchNextVaults}
                            hasMore={vaults?.next_page_url ? true : false}
                          >
                            <div className="gallery-cover" >
                              {vaults?.data?.map((vault, index) =>
                                <>
                                  {
                                    vault?.post &&
                                    <div className="image-style" key={index}>
                                      {vault?.post?.post_type === 2 ?
                                        <Link to={`/studio/${vault?.post?.user?.slug}`}>
                                          <video width="320" height="240" controls >
                                            <source src={vault?.post?.image?.path} type="video/mp4" />
                                          </video>
                                        </Link>
                                        :
                                        <Link to={`/studio/${vault?.post?.user?.slug}`}>
                                          <img src={vault?.post?.image?.path} alt="" />
                                        </Link>
                                      }
                                    </div>
                                  }
                                </>
                              )}
                            </div>
                          </InfiniteScroll>
                        </div>
                        {/* FOR Grid VIEW */}
                        <div className="show-list">
                          <Link
                            to={`/studio/sarahsajjad`}
                          >
                            <InfiniteScroll
                              dataLength={vaults?.data}
                              next={fetchNextVaults}
                              hasMore={vaults?.next_page_url ? true : false}
                            >
                              <div className="gallery-cover" >
                                {vaults?.data?.map((vault, index) =>
                                  <>
                                    {vault?.post &&
                                      <div className="image-style" key={index}>
                                        {vault?.post?.post_type === 2 ?
                                          <Link to={`/studio/${vault?.post?.user?.slug}`}>
                                            <video width="320" height="240" controls >
                                              <source src={vault?.post?.image?.path} type="video/mp4" />
                                            </video>
                                          </Link>
                                          :
                                          <Link to={`/studio/${vault?.post?.user?.slug}`}>
                                            <img src={vault?.post?.image?.path} alt="" />
                                          </Link>
                                        }
                                      </div>
                                    }
                                  </>
                                )}
                              </div>
                            </InfiniteScroll>
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
}


export default MyVault;
