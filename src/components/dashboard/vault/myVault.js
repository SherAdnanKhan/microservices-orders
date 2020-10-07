import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../common/spinner';
import RightBorder from '../layout/rightBorder';
import Footer from '../layout/footer';
import LeftBorder from '../layout/leftBorder';
import { getMyVault } from '../../../actions/studioActions';
import VaultBar from "../vault/vaultBar";

const MyVault = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyVault());
  }, [dispatch]);
  const { loading } = useSelector(state => state.loading);
  const { feelColor } = useSelector(state => state.feelColor);
  const { studio: vaultsList } = useSelector(state => state);
  console.log("vaultsList=", vaultsList?.vaultsList)
  const handleBackPress = () => {
    history.push('/dashboard/my-studio');
  }
  return (
    <div className={`frameReady ${feelColor}`}>
      <LeftBorder feelColor={feelColor} />
      <RightBorder feelColor={feelColor} />
      <div className="vault-page">
        {loading && <Spinner />}
        <VaultBar onBack={handleBackPress} feelColor={feelColor} />
        <div className="edit-user-page">
          <div className="wrapper">
            <div className="vault-posts">
              <div className="favas-box">
                <div className="favas-avatar">
                  <Link to={`/dashboard/studio/sarahsajjad`}  >
                    {/* <Avatar avatars={gallery?.user?.avatars} feelColor={gallery?.user?.feel.color_code} /> */}
                  </Link>
                </div>
                <div className="wrapper">
                  <div className="screen">
                    <div className="details">

                      <div className="post-picture">
                        <Link
                          to={`/dashboard/studio/sarahsajjad`}
                        >
                          <div className="gallery-cover">
                            <img src='https://meuzm-stage.s3.us-west-1.amazonaws.com/posts/dCQATIoJ4B-1594130513.png' alt="" />
                            <img src='https://meuzm-stage.s3.us-west-1.amazonaws.com/posts/dCQATIoJ4B-1594130513.png' alt="" />
                            <img src='https://meuzm-stage.s3.us-west-1.amazonaws.com/posts/dCQATIoJ4B-1594130513.png' alt="" />
                          </div>
                        </Link>
                      </div>
                      {/* FOR LIST VIEW */}
                      <div className="show-list">
                        <Link
                          to={`/dashboard/studio/sarahsajjad`}
                        >
                          <div className="gallery-cover">
                            <img src='https://meuzm-stage.s3.us-west-1.amazonaws.com/posts/dCQATIoJ4B-1594130513.png' alt="" />
                            <img src='https://meuzm-stage.s3.us-west-1.amazonaws.com/posts/dCQATIoJ4B-1594130513.png' alt="" />
                            <img src='https://meuzm-stage.s3.us-west-1.amazonaws.com/posts/dCQATIoJ4B-1594130513.png' alt="" />
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
      <Footer />
    </div >
  );
};

export default MyVault;
