import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from '../common/input';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/spinner';
import { login, getCurrentUser } from '../../actions/authActions';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const {
    loading: { loading },
    error: { error }
  } = useSelector(state => state);
  // const [errors, setErrors] = useState({});


  const validate = () => {
    const errors = {};

    if (!data.email) {
      errors.email = 'Please enter an artistname or email.';
    }

    if (!data.password) {
      errors.password = 'Please enter a password.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(data));
  };

  return (
    <>
      {getCurrentUser() && <Redirect to="/lobby" />}
      {loading && <Spinner />}
      <div className="wrapper">
        <div className="loginScreen">
          <div className="login-cube">
            <h1>Meuzm</h1>
            <div className="procu">
              <div className="scene">
                <div className="cube">
                  <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent', background: 'rgba(0,0,0,.9)' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent', background: 'rgba(0,0,0,.9)' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent', background: 'rgba(0,0,0,.9)' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent', background: 'rgba(0,0,0,.9)' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                </div>
              </div>
            </div>
            <div className="loginMessage">
              <p>
                Welcome to Meuzm, where you will have the opportunity to 
                discover your many Arts and be able to nurture and 
                share them with the world.
              </p>
              <p>
                Be one of the first to explore the Beta version of Meuzm,
                where your feedback will allow us to sculpt and refine 
                the quality of your experience. Please share your likes
                and dislikes, as well as recommendations to improve our 
                site. Your feedback is highly valued.
              </p>
            </div>
          </div>
          
          {/* <h2>LOGIN</h2> */}
          <div className="login-border">

          </div>

          <form onSubmit={handleSubmit}>
            {error
              && (
                <div className="error">
                  {error.message && error.message}
                  {error.email && error.email}
                </div>
              )}
            <Input
              name="email"
              id="email"
              label="Artistname or Email"
              value={data.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              id="password"
              label="password"
              value={data.password}
              onChange={handleChange}
            >
              <span className="passwordEye" eye="off">
                <i className="far fa-eye-slash" />
              </span>
            </Input>

            <button
              className="btn"
              name="login_user"
              disabled={validate()}
            >
              Login
            </button>
            <div className="rightLeftLine">  or  </div>

            <div className="registerBtn">
              <Link to="/register">Create New Artist Account</Link>
            </div>

            <div className="forgotPassword">
              <Link to="/forgot">Forgot password?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
