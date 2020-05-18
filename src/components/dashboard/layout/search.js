import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, clearUsers } from '../../../actions/userActions';
import Avatar from '../../common/avatar';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);

  const handleChange = ({ target: input }) => {
    dispatch(getAllUsers(input.value));
    setQuery(input.value);
  }

  const handleClear = () => {
    setQuery('');
    dispatch(clearUsers());
  }

  return (
    <>
      <div className="search-bar" id="search-bar">
        <div className="back-btn" id="go-back">
          <i className="fa fa-arrow-left"></i>
        </div>
        <div className="search-input">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search" />
        </div>
      </div>

      <div className="wrapper" id="search-result">
        {users &&
          users.map((user, index) => (
            <div key={index} className="result-box">
              <div className="profile-pic">
                <Link
                  to={`/dashboard/studio/${user.slug}`}
                  onClick={handleClear}
                >
                  <Avatar avatars={user?.avatars} />
                </Link>
                <div>
                  <p>{user.username}</p>
                  <p>
                    {user.art &&
                      <>
                        {user.art.parent && <> {user.art.parent.name + '/'} </>}
                        {user.art.name && <> {user.art.name} </>}
                      </>
                    }
                  </p>
                </div>
              </div>
              <div className="other-pic">
                {user.posts_images_random.map((post_image, index_key) => (
                  <Link key={index_key} to="#">
                    <img src={post_image.path} alt="" />
                  </Link>
                ))}

              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Search;
