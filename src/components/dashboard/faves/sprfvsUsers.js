import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../common/spinner';
import FavTabs from './favTabs';
import SPRFVS from './sprfvs';
import Request from './requests';
import {
  approveRequest,
  rejectRequest,
  getSprfvsUsers,
  getUserRequests,
} from '../../../actions/userActions';
import { useLocation, useRouteMatch } from 'react-router-dom';

const SprfvsUser = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const split = location.pathname.split('/');
  const { params: { slug } } = useRouteMatch();

  const {
    user: {
      sprfvsUsers, userRequests,
    },
    loading: { loading },
  } = useSelector(state => state);

  const [activeTab, setActiveTab] = useState(1);

  const [tabs] = useState([
    { id: 1, value: 'SPRFVS' },
    { id: 2, value: 'Requests' }
  ]);

  useEffect(() => {
    dispatch(getSprfvsUsers(3, 1, slug));
  }, [dispatch, slug]);

  const handleApprovedRequest = (request) => {
    dispatch(approveRequest(request));
  };

  const handleRejectedRequest = (request) => {
    dispatch(rejectRequest(request));
  };

  const handleTabChange = id => {
    switch (id) {
      case 1:
        dispatch(getSprfvsUsers(3, 1));
        break;
      case 2:
        dispatch(getUserRequests(3, 0));
        break;;
      default:
        break;
    }
    setActiveTab(id);
  };

  return (
    <div className="favas">
      {loading && <Spinner />}
      {split[1] === 'my-studio' &&
        <FavTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      }
      {activeTab === 1
        && (
          <SPRFVS
            sprfvsUsers={sprfvsUsers}
          />
        )}
      {activeTab === 2
        && (
          <Request
            userRequests={userRequests}
            onApprovedRequest={handleApprovedRequest}
            onRejectedRequest={handleRejectedRequest}
          />
        )}
    </div>
  );
};
export default SprfvsUser;
