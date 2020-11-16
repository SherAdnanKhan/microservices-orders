import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, clearUsers } from '../../../actions/userActions';
import Avatar from '../../common/avatar';
import LazyInput from '../../common/lazyInput';

const Search = ({ feelColor, onToggleSearch, showSearch }) => {
  const { users } = useSelector(state => state.user);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUnmount = () => {
    dispatch(clearUsers());
    onToggleSearch();
  }

  const handleNavigate = user => {
    handleUnmount();
    return history.push(`/dashboard/studio/${user.slug}`);
  }

  const handleSearchComplete = useCallback(result => {
    dispatch(getAllUsers(result));
  }, [dispatch]);

  const handleChange = (data) => {
    if (data?.length === 0) {
      dispatch(clearUsers());
    }
    setQuery(data);
  }

  return (
    <>
      <div
        className="search-bar"
        id="search-bar"
        style={{ backgroundColor: feelColor }}
      >
        <div className="back-btn" id="go-back" onClick={handleUnmount}>
          <i className="fa fa-arrow-left" ></i>
        </div>
        {showSearch &&
          <div className="search-input" style={{ backgroundColor: feelColor }}>
            <LazyInput
              type="text"
              id="search-field"
              placeholder="Search"
              onSearchComplete={handleSearchComplete}
              time={500}
              value={query}
              onChange={handleChange}
            />
          </div>
        }
      </div>
      <div id="search-result">
        {users && users.length === 0 &&
          <p id="search-error">No Data Found</p>
        }
        {users?.map((user, index) => (
          <div
            key={index}
            className="result-box clickable"
            onClick={() => handleNavigate(user)}
          >
            <div className="profile-pic">
              <Avatar
                user={user}
              />
              <div>
                <p className="usernames">
                  {user.username}
                </p>
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
              {user.posts_images_random.map((post_image, index_key) => {
                if (post_image.title.includes('.mp3') || post_image.title.includes('.mp4') || post_image.title.includes('.ogg')) {
                  return (
                    <video width="44" height="33" >
                      <source src={post_image.path} type="video/mp4" />
                      <source src={post_image.path} type="video/ogg" />
                            Your browser does not support the video tag.
                    </video>
                  )
                } else {
                  return (
                    <Link key={index_key} to='#'>
                      <img src={post_image.path} alt="" />
                    </Link>
                  )
                }
              }
              )}
            </div>
          </div>
        ))
        }
      </div>
    </>
  );
};

export default React.memo(Search);
