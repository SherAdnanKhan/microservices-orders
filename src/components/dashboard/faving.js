import React, { useEffect, useState } from "react";
import { getOtherFavouriteUsers, getOtherFavouriteByUsers } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../common/avatar';
import Spinner from '../common/spinner';
import { Link, useRouteMatch } from "react-router-dom";

const Favas = (props) => {
  const dispatch = useDispatch();
  const favas = useSelector(({ user }) => user?.otherFavouriteUsers);
  const { params: { name } } = useRouteMatch();
  const { loading } = useSelector(state => state.loading);

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (name) {
      dispatch(getOtherFavouriteByUsers(""))
    } else {
      dispatch(getOtherFavouriteUsers(""))
    }
  }, [dispatch, name]);

  const handleChange = ({ target: input }) => {
    console.log(input.value);
    setQuery(input.value);

    if (name) {
      dispatch(getOtherFavouriteByUsers(input.value))
    } else {
      dispatch(getOtherFavouriteUsers(input.value))
    }
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
      {favas && favas.length > 0 &&
        <div className="favas-row">
          {favas?.map((user, index) => (
            <div className="favas-box" key={index}>
              <div className="favas-avatar">
                <Link to={`/dashboard/studio/${user.slug}`}  >
                  <Avatar avatars={user?.avatars} />
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