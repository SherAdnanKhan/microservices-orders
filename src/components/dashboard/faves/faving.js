import React, { useEffect, useState } from "react";
import { getFaveUsers } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from '../../common/spinner';
import { useLocation } from "react-router-dom";
import FavTabs from "./favTabs";
import { approveRequest, getSprfvsUsers, getUserRequests, getInvitedUsers } from "../../../actions/privacyActions";
import Faves from "./faves";
import SPRFVS from "./sprfvs";
import Request from './requests';
import Invited from './invited';

const Faving = (props) => {
  const location = useLocation();
  const split = location.pathname.split('/');

  const dispatch = useDispatch();
  const {
    user: { faveUsers },
    loading: { loading },
    privacies: { sprfvsUsers, userRequests, invitedUsers }
  } = useSelector(state => state);

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  const [tabs] = useState([
    { id: 1, value: 'Faves' },
    { id: 2, value: 'SPRFVS' },
    { id: 3, value: 'Requests' },
    { id: 4, value: 'Invited' },
  ]);

  useEffect(() => {
    dispatch(getFaveUsers(""))
  }, [dispatch]);

  const handleChange = ({ target: input }) => {
    setQuery(input.value);
    dispatch(getFaveUsers(input.value))
  };

  const handleApprovedRequest = (request) => {
    console.log(request);
    dispatch(approveRequest(request));
  };

  const handleTabChange = id => {
    switch (id) {
      case 1:
        dispatch(getFaveUsers(""));
        break;
      case 2:
        dispatch(getSprfvsUsers(3, 1));
        break;
      case 3:
        dispatch(getUserRequests(3, 0));
        break;
      case 4:
        dispatch(getInvitedUsers(4, 1));
        break;
      default:
        break;
    };
    setActiveTab(id);
  };

  return (
    <div className="favas">
      {loading && <Spinner />}
      {split[2] === 'my-studio' &&
        <FavTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      }
      {activeTab === 1 &&
        <Faves
          faveUsers={faveUsers}
          query={query}
          onChange={handleChange}
        />
      }
      {activeTab === 2 &&
        <SPRFVS
          sprfvsUsers={sprfvsUsers}
        />
      }
      {activeTab === 3 &&
        <Request
          userRequests={userRequests}
          onApprovedRequest={handleApprovedRequest}
        />
      }
      {activeTab === 4 &&
        <Invited
          invitedUsers={invitedUsers}
        />
      }
    </div>
  );
};
export default Faving;