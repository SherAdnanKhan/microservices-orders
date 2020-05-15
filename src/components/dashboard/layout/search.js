import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions/userActions';
import Avatar from '../../common/avatar';
import { selectUserForStudio } from "../../../actions/studioActions";

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);

  const handleChange = ({ target: input }) => {
    dispatch(getAllUsers(input.value));
    setQuery(input.value);
  }

  const handleLink = (data) => {
    dispatch(selectUserForStudio(data));
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
                <Link to={`/dashboard/my-studio/user`} onClick={() => handleLink(user)}>
                  <Avatar avatars={user?.avatars} />
                </Link>
                <div>
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="other-pic">
                <Link to="#">
                  <img src="/assets/images/other-1.png" alt="" />
                </Link>
                <Link to="#">
                  <img src="/assets/images/other-1.png" alt="" />
                </Link>
                <Link to="#">
                  <img src="/assets/images/other-1.png" alt="" />
                </Link>
                <Link to="#">
                  <img src="/assets/images/other-1.png" alt="" />
                </Link>
              </div>
            </div>
          ))
        }
        
      </div>
    </>
  );
};

export default Search;
