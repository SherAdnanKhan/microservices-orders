import React, { useEffect, useState } from "react";
import { getFaveUsers } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../../common/avatar';
import Spinner from '../../common/spinner';
import { Link } from "react-router-dom";
import FavTabs from "./favTabs";

const Favas = (props) => {
  const dispatch = useDispatch();
  const { faveUsers } = useSelector(state => state.user);
  const { loading } = useSelector(state => state.loading);

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
    console.log(input.value);
    setQuery(input.value);
    dispatch(getFaveUsers(input.value))
  };

  const handleTabChange = id => {
    setActiveTab(id);
  };

  return (
    <div className="favas">
      {loading && <Spinner />}
      <FavTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div className="search-input">
        <input
          autoFocus
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
      </div>
      {faveUsers && faveUsers.length > 0 &&
        <div className="favas-row">
          {faveUsers &&
            faveUsers.map((user, index) => (
              <div className="favas-box" key={index}>
                <div className="favas-avatar">
                  <Link to={`/dashboard/studio/${user.slug}`}  >
                    <Avatar avatars={user?.avatars} feelColor={user?.feel_color} />
                  </Link>
                </div>
                <div>
                  <p>{user?.first_name}</p>
                  <p>{user?.art?.name}</p>
                  <p>
                    {user.art &&
                      <>
                        {user.art.parent && <> {user.art.parent.name + '/'} </>}
                        {user.art.name && <> {user.art.name} </>}
                      </>
                    }
                  </p>
                  <p>Faving Gallery</p>
                  <p>2</p>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}
export default Favas;