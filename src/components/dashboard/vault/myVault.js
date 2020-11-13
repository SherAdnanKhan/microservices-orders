import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../common/spinner';
import RightBorder from '../layout/rightBorder';
import Footer from '../layout/footer';
import LeftBorder from '../layout/leftBorder';
import { getMyVault } from '../../../actions/studioActions';
import VaultBar from "../vault/vaultBar";
import VaultHeader from "../vault/vaultHeader";
import PostLoader from "../../common/loader";
import InfiniteScroll from 'react-infinite-scroll-component';

const MyVault = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyVault());
  }, [dispatch]);

  const { loading } = useSelector(state => state.loading);
  const { feelColor } = useSelector(state => state.feelColor);
  const { studio: { vaults } } = useSelector(state => state);
  const [currentPage, setCurrentPage] = useState(1);
  const handleBackPress = () => {
    history.push('/dashboard/my-studio');
  }

  const fetchNextVaults = () => {
    dispatch(getMyVault(currentPage + 1));
    setCurrentPage(currentPage => currentPage + 1);
  }

  return (
    <div className={`frameReady ${feelColor}`} >
      <LeftBorder feelColor={feelColor} />
      <RightBorder feelColor={feelColor} />
      <div className="vault-page">
        {loading && <Spinner />}
        <VaultHeader />
        <VaultBar onBack={handleBackPress} feelColor={feelColor} />
        <div className="edit-user-page" >
          <div className="wrapper" >
            <div className="vault-posts">
              <div className="favas-box">
                <div className="wrapper">
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
                            {vaults ?
                              vaults?.data?.map((vault, index) =>
                                <div className="gallery-cover" key={index} >
                                  {vault?.post?.post_type === 2 ?
                                    <Link to={`/dashboard/studio/${vault?.post?.user?.slug}`}>
                                      <video controls >
                                        <source src={vault?.post?.image?.path} type="video/mp4" />
                                      </video>
                                    </Link>
                                    :
                                    <Link to={`/dashboard/studio/${vault?.post?.user?.slug}`}>
                                      <img src={vault?.post?.image?.path} alt="" />
                                    </Link>
                                  }
                                </div>
                              ) :
                              <PostLoader />
                            }
                          </InfiniteScroll>
                        </div>
                        {/* FOR Grid VIEW */}
                        <div className="show-list">
                          <Link
                            to={`/dashboard/studio/sarahsajjad`}
                          >
                            <InfiniteScroll
                              dataLength={vaults?.data}
                              next={fetchNextVaults}
                              hasMore={vaults?.next_page_url ? true : false}
                            >
                              <div className="gallery-cover" >
                                {vaults?.data?.map((vault, index) =>
                                  <>
                                    <div className="image-style" key={index}>
                                      {vault?.post?.post_type === 2 ?
                                        <Link to={`/dashboard/studio/${vault?.post?.user?.slug}`}>
                                          <video width="320" height="240" controls >
                                            <source src={vault?.post?.image?.path} type="video/mp4" />
                                          </video>
                                        </Link>
                                        :
                                        <Link to={`/dashboard/studio/${vault?.post?.user?.slug}`}>
                                          <img src={vault?.post?.image?.path} alt="" />
                                        </Link>
                                      }
                                    </div>
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
