import React, { useEffect, useState } from 'react';
import {
  getFaveUsers,
  getInvitedUsers,
} from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../common/spinner';
import { useLocation } from 'react-router-dom';
import FavTabs from './favTabs';

import Faves from './faves';
import Invited from './invited';

const Faving = () => {
  const location = useLocation();
  const split = location.pathname.split('/');

  const dispatch = useDispatch();
  const {
    user: { faveUsers, invitedUsers },
    loading: { loading },
  } = useSelector(state => state);

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  const [tabs] = useState([
    { id: 1, value: 'Faves' },
    { id: 2, value: 'Invited' },
  ]);

  useEffect(() => {
    dispatch(getFaveUsers(''));
  }, [dispatch]);

  const handleChange = ({ target: input }) => {
    setQuery(input.value);
    dispatch(getFaveUsers(input.value));
  };

  const handleTabChange = id => {
    switch (id) {
      case 1:
        dispatch(getFaveUsers(''));
        break;
      case 2:
        dispatch(getInvitedUsers(4, 1));
        break;
      default:
        break;
    }
    setActiveTab(id);
  };

  return (
    <div className="favas">
      {loading && <Spinner />}
      {split[1] === 'my-studio'
        && (
          <FavTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
      {activeTab === 1
        && (
          <Faves
            faveUsers={faveUsers}
            query={query}
            onChange={handleChange}
          />
        )}
      {activeTab === 2
        && (
          <Invited
            invitedUsers={invitedUsers}
          />
        )}
    </div>
  );
};
export default Faving;
