import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, clearUsers } from '../../../actions/userActions';
import Avatar from '../../common/avatar';
import { alphabetsWithoutSpecialChars } from "../../../constants/regex";
const Search = ({ feelColor }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);

  const validate = (value) => {
    if (!alphabetsWithoutSpecialChars.test(value) && value.length > 0) {
      setError("Special characters are not allowed in search")
      return true;
    }
    else {
      setError("")
      return false
    }
  }
  const handleChange = ({ target: input }) => {
    setQuery(input.value);
    const IsErrors = validate(input.value);
    if (!IsErrors) {
      dispatch(getAllUsers(input.value));
    }
    else {
      dispatch(clearUsers());
    }
  }
  return (
    <>
      <div
        className="search-bar"
        id="search-bar"
        style={{ backgroundColor: feelColor }}
      >
        <div className="back-btn" id="go-back">
          <i className="fa fa-arrow-left"></i>
        </div>
        <div className="search-input" style={{ backgroundColor: feelColor }} >
          <input
            type="text"
            id="search-field"
            value={query}
            onChange={handleChange}
            placeholder="Search" />
          {
            error.length > 0 &&
            <span className="error">{error}</span>
          }
        </div>
      </div>
      <div id="search-result">
        {users && query.length > 0 && error.length === 0 &&
          users.map((user, index) => (
            <div key={index} className="result-box">
              <div className="profile-pic">
                <Link
                  to={`/dashboard/studio/${user.slug}`}
                  onClick={clearUsers}
                >
                  <Avatar
                    user={user}
                  />
                </Link>
                <div>
                  <p className="usernames">
                    <Link to={`/dashboard/studio/${user.slug}`} >
                      {user.username}
                    </Link>
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

export default Search;
