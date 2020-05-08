import React, { useState } from 'react';
import Input from '../common/input';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../../actions/authActions';
import Spinner from '../common/spinner';
import {Link} from "react-router-dom";
import { logout } from '../../actions/authActions';

const ChangePassword = () => {
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    old_password: '',
    password: '',
    confirm_password: ''
  });

  const dispatch = useDispatch();
  const {
    loading: { loading },
    error: { error }
  } = useSelector(state => state);

  const validate = () => {
    const errors = {};

    if (!data.old_password) {
      errors.old_password = 'Required';
    }
    if (data.password.length < 8) {
      errors.password = 'Password must have at least eight characters';
    } else if (data.password !== data.confirm_password) {
      errors.confirm_password = 'Password and confirm password do not match.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  const validateProperty = input => {
    const newErrors = { ...errors };

    switch (input.name) {
      case 'old_password':
        newErrors.old_password = !input.value ? 'Required.' : '';
        break;
      case 'password':
        newErrors.password = input.value.length < 8 ? 'Password must have at least eight characters.' : '';
        break;
      case 'confirm_password':
        newErrors.confirm_password = data.password !== input.value ? 'Password and confirm password do not match.' : '';
        break;
      default:
        break;
    }

    return Object.keys(newErrors).length === 0 ? null : newErrors;
  }

  const handleChange = ({ target: input }) => {
    const errors = validateProperty(input);
    if (errors) {
      setErrors(errors);
    }
    setData({ ...data, [input.name]: input.value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (success)
      setSuccess('');

    dispatch(changePassword(data, response => setSuccess(response.message)));
  }

  return (
    <>
    <div>
      <div className="colorChangerScreen">
        <div className="centerCenter">
          <div className="seventy">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconyellow.png" color="gold" />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/icongray.png" color="gray" />
            </div>
          </div>
          <div className="ninety">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconorange.png" color="orange" />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/icongreen.png" color="limegreen" />
            </div>
          </div>
          <div className="seventy">
            <div className="l">
              <img alt="" src="/assets/images/expressions/iconred.png" color="red" />
            </div>
            <div className="r">
              <img alt="" src="/assets/images/expressions/iconpurple.png" color="purple" />
            </div>
          </div>
          <div className="single">
            <div className="c">
              <img alt="" src="/assets/images/expressions/iconblue.png" color="dodgerblue" />
            </div>
          </div>
        </div>
      </div>
      <div className="frameReady red">
        <div className="top">
          <div className="contentFit d-flex">
            <div className="burgerMenu">
              <span className="menuBlock">
                <i className="fas fa-ellipsis-v" />
              </span>
            </div>
            <div className="search">
              <img src="/assets/images/icons/searchicon.png" alt="search Icon" />
            </div>
          </div>
          <Link to="" className="feelIcon">
            <img alt="" src="/assets/images/icons/feelicon.png" />
          </Link>
        </div>
        <nav>
          <ul className="dropdownM">
            <li>
              <a href="#__account">Account</a>
            </li>
            <li>
              <a href="#__changePassword">Change Password</a>
            </li>
            <li>
              <a href="#__privacy">Privacy</a>
            </li>
            <li>
              <a href="#__security">Security</a>
            </li>
            <li>
              <a href="#__tickets">Tickets</a>
            </li>
            <li>
              <a href="#__feelHistory">Feel History</a>
            </li>
            <li>
              <a href="#__vault">Vault</a>
            </li>
            <li>
              <a href="#__help">Help</a>
            </li>
            <li>
              <a href="#__about">About</a>
            </li>
            <li>
              <a href="#__searchHistory">Search History</a>
            </li>
            <li>
              <Link to="" onClick={() => logout()}>Logout</Link>
            </li>
          </ul>
        </nav>
        <hr className="do-not-delete" />
        <div className="base" id="sec"> 
        </div>
        <div className="wrapper changePasswordScreen">
       <div className="top">
            <div className="contentFit d-flex">
              <div className="burgerMenu">
                <span className="menuBlock">
                  <i className="fas fa-ellipsis-v" />
                </span>
              </div>
              <div className="search">
                <img src="./assets/images/icons/searchicon.png" alt="search Icon" />
              </div>
            </div>
            <Link to="" className="feelIcon">
              <img alt="" src="/assets/images/icons/feelicon.png" />
            </Link>
          </div>
      <form onSubmit={handleSubmit}>
        {success && <div className="success"> {success} </div>}
        {error && <div className="error"> {error.message && error.message} </div>}
        <Input
          type="password"
          name="old_password"
          id="old_password"
          label="Current Password"
          value={data.old_password}
          onChange={handleChange}
          error={errors.old_password}
        />
        <Input
          type="password"
          name="password"
          id="password"
          label="New Password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          type="password"
          name="confirm_password"
          id="confirm_password"
          label="Confirm New Password"
          value={data.confirm_password}
          onChange={handleChange}
          error={errors.confirm_password}
        />
        <button className="btn" disabled={validate()}> Change Password</button>
        {loading && <Spinner />}
      </form>
    </div>
        <div className="left" />
        <div className="right" />
        <div className="bottom">
          <a href="#__">
            <i className="fas fa-plus" />
          </a>
        </div>
        <div className="assist">
          <a href="#__">
            <img src="/assets/images/icons/LogoIconWhite.png" alt="support" />
          </a>
        </div>
      </div>
    </div>
  </>
  )
}

export default ChangePassword;
