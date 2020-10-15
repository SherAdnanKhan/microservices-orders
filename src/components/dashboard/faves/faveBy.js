import React, { useEffect, useState } from "react";
import { getFaveByUsers } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../../common/avatar';
import Spinner from '../../common/spinner';
import { Link } from "react-router-dom";

const FaveBy = () => {
  const dispatch = useDispatch();
  const { faveByUsers } = useSelector(state => state.user);
  const { loading } = useSelector(state => state.loading);

  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(getFaveByUsers(""))
  }, [dispatch]);

  useEffect(() => {
  }, [faveByUsers]);

  const handleChange = ({ target: input }) => {
    setQuery(input.value);
    dispatch(getFaveByUsers(input.value))
  };

  return (
    <div className="favas">
      {loading && <Spinner />}
      <div className="search-input">
        <input
          autoFocus
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
      </div>
      {faveByUsers && faveByUsers.length > 0 &&
        <div className="favas-row">
          {faveByUsers &&
            faveByUsers.map((user, index) => (
              <div className="favas-box" key={index}>
                <div className="favas-avatar">
                  <Link to={`/dashboard/studio/${user.slug}`}  >
                    <Avatar
                      user={user}
                    />
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
                  <p>{user.galleries.length}</p>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}
export default FaveBy;